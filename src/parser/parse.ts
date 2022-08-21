import { isBlank, isWordBoundary } from '../utils/char'
import { isBlank as isBlankNode } from '../nodes/type-guards'
import { InlineImage } from '../nodes/inline-image'
import { ReferenceImage } from '../nodes/reference-image'
import { NodeKind } from '../nodes/node-kind'
import { AlphabetNumeric } from '../nodes/alphabet-numeric'
import { UnicodeString } from '../nodes/unicode-string'
import { SquareQuoted } from '../nodes/square-quoted'
import { Emphasis, EmphasisDelimiter } from '../nodes/empasis'
import { Quoted } from '../nodes/quoted'
import { Strong, StrongDelimiter } from '../nodes/strong'
import { Strikethrough } from '../nodes/strikethrough'
import { Document } from '../nodes/document'
import { compactTree } from '../transformers/compact'
import { HTMLTag } from '../nodes/html-tag'
import { Punctuation } from '../nodes/punctuation'
import { ReferenceLink } from '../nodes/reference-link'
import { ReferenceDefinition } from '../nodes/reference-definition'
import { InlineLink } from '../nodes/inline-link'
import { Node } from '../nodes/node'
import { InlineCode, InlineCodeDelimiter } from '../nodes/inline-code'
import { Math, MathDelimiter } from '../nodes/math'
import { BlockCode, BlockCodeDelimiter } from '../nodes/block-code'
import { Blank } from '../nodes/blank'
import { Raw } from '../nodes/raw'
import { OrderedListItem } from '../nodes/ordered-list-item'
import { UnorderedListItem } from '../nodes/unordered-list-item'
import { State } from './state'
import { Stack } from '../utils/stack'
import { Mask } from './mask'
import { stateMasks } from './state-masks'
import { Context } from './context'
import { parseCode } from './parse-code'

export function parse (str: string): Document {
  const stack = new Stack<Context>()
  const mask = new Mask()

  let i = 0
  let blankLine = true
  let listPrefix = ''
  let codeLang = ''
  let strongDelimiter: StrongDelimiter = '**'
  let emphasisDelimiter: EmphasisDelimiter = '*'
  let inlineCodeDelimiter: InlineCodeDelimiter = '`'
  let blockCodeDelimiter: BlockCodeDelimiter = '```'
  let mathDelimiter: MathDelimiter = '$'
  let linkText: Node[] = []
  let imageText: Node[] = []
  let imageHref
  let imageId

  push(State.Init)
  while (i < str.length) {
    const state = stack.top().state
    const c = str[i]
    const c2 = str.substr(i, 2)
    const c3 = str.substr(i, 3)

    if (c === '\n') {
      while (forceCloseInlineNodes() !== false); // expand all inline nodes
    }

    // Inline Code
    if (state === State.InlineCode &&
      str.substr(i, inlineCodeDelimiter.length) === inlineCodeDelimiter
    ) {
      resolve(new InlineCode(popMarkdown(), inlineCodeDelimiter))
      i += inlineCodeDelimiter.length
    }

    // Code Blocks
    else if (state === State.BlockCodeLang && str[i] === '\n') {
      codeLang = popMarkdown()
      push(State.BlockCodeBody)
      i++
    }
    else if (state === State.BlockCodeBody && c3 === blockCodeDelimiter) {
      resolve(new BlockCode(codeLang, blockCodeDelimiter, parseCode(popMarkdown(), codeLang, parse)))
      i += 3
    }

    // Math
    else if (state === State.Math &&
      str.substr(i, mathDelimiter.length) === mathDelimiter
    ) {
      resolve(new Math(popMarkdown(), mathDelimiter))
      i += mathDelimiter.length
    }

    // Images
    else if (state === State.ImageAttributes && c === '}') {
      const attr = popMarkdown()
      if (imageId !== undefined) {
        resolve(new ReferenceImage(imageText, imageId, attr))
        imageId = undefined
      } else {
        resolve(new InlineImage(imageText, imageHref, attr))
        imageHref = undefined
      }
      i++
    }
    else if (state === State.ImageReferingID && c === ']') {
      if (c2 === ']{') {
        imageId = popMarkdown()
        push(State.ImageAttributes)
        i += 2
      } else {
        resolve(new ReferenceImage(imageText, popMarkdown()))
        i++
      }
    }
    else if (state === State.ImageReferingUrl && c === ')') {
      if (c2 === '){') {
        imageHref = popMarkdown()
        push(State.ImageAttributes)
        i += 2
      } else {
        resolve(new InlineImage(imageText, popMarkdown()))
        i++
      }
    }
    else if (state === State.ImageText && c === ']') {
      imageText = popNodes()
      if (c2 === '][') {
        i += 2
        push(State.ImageReferingID)
      } else if (c2 === '](') {
        i += 2
        push(State.ImageReferingUrl)
      } else {
        resolve(Punctuation.create('!'), new SquareQuoted(imageText))
        i++
      }
    }

    // Links
    else if (state === State.ReferingID && c === ']') {
      resolve(new ReferenceLink(linkText, popMarkdown()))
      i++
    }
    else if (state === State.ReferingUrl && c === ')') {
      resolve(new InlineLink(linkText, popMarkdown()))
      i++
    }
    else if (state === State.ReferenceLinkUrl && c === '\n') {
      resolve(new ReferenceDefinition(linkText, popMarkdown()))
      resolve(new Blank(c))
      i++
    }
    else if (state === State.LinkText && c === ']') {
      linkText = popNodes()
      if (c2 === ']:') {
        i += 2
        push(State.ReferenceLinkUrl)
      } else if (c2 === '][') {
        i += 2
        push(State.ReferingID)
      } else if (c2 === '](') {
        i += 2
        push(State.ReferingUrl)
      } else {
        resolve(new SquareQuoted(linkText))
        i++
      }
    }

    // HTML Tags
    else if (state === State.HTMLTag && c === '>') {
      resolve(new HTMLTag(popMarkdown()))
      i++
    }

    // Strong, Emphasis, Strikethrough
    else if (state === State.Emphasis && c === emphasisDelimiter && c === '_' && isWordBoundary(str[i + 1])) {
      resolve(new Emphasis(popNodes(), emphasisDelimiter))
      i++
    }
    else if (state === State.Emphasis && c === emphasisDelimiter && c === '*') {
      resolve(new Emphasis(popNodes(), emphasisDelimiter))
      i++
    }
    else if (state === State.Strong && c2 === strongDelimiter) {
      resolve(new Strong(popNodes(), strongDelimiter))
      i += 2
    }
    else if (state === State.Strikethrough && c2 === '~~') {
      resolve(new Strikethrough(popNodes()))
      i += 2
    }

    // ListItems
    else if (state === State.UnorderedListItem && c === '\n') {
      resolve(new UnorderedListItem(listPrefix, popNodes()), new Blank(c))
      i++
    }
    else if (state === State.OrderedListItem && c === '\n') {
      resolve(new OrderedListItem(listPrefix, popNodes()), new Blank(c))
      i++
    }

    // Quoted
    else if (state === State.Quoted && c === '"') {
      resolve(new Quoted(popNodes()))
      i++
    }

    // state === State.Text
    else if (c === '[' && allow(NodeKind.Link)) {
      push(State.LinkText)
      i++
    }
    else if (c2 === '![' && allow(NodeKind.Image)) {
      push(State.ImageText)
      i += 2
    }
    else if (c === '<' && allow(NodeKind.HTMLTag)) {
      push(State.HTMLTag)
      i++
    }
    else if (c3 === '```' && allow(NodeKind.BlockCode)) {
      push(State.BlockCodeLang)
      i += 3
    }
    else if (c3 === '---' && allowFrontMatter()) {
      push(State.BlockCodeLang)
      blockCodeDelimiter = c3
      i += 3
    }
    else if (c2 === '``' && allow(NodeKind.InlineCode)) {
      inlineCodeDelimiter = c2
      push(State.InlineCode)
      i += 2
    } else if (c === '`' && allow(NodeKind.InlineCode)) {
      inlineCodeDelimiter = c
      push(State.InlineCode)
      i++
    }
    else if (c2 === '$$' && allow(NodeKind.Math)) {
      mathDelimiter = c2
      push(State.Math)
      i += 2
    } else if (c === '$' && allow(NodeKind.Math)) {
      mathDelimiter = c
      push(State.Math)
      i++
    } else if (blankLine && UnorderedListItem.isValidPrefix(c2) && allow(NodeKind.UnorderedListItem)) {
      push(State.UnorderedListItem)
      listPrefix = c2
      i += 2
    } else if (blankLine && OrderedListItem.isValidPrefix(c3) && allow(NodeKind.OrderedListItem)) {
      push(State.OrderedListItem)
      listPrefix = c3
      i += 3
    } else if (c2 === '~~' && allow(NodeKind.Strikethrough)) {
      push(State.Strikethrough)
      i += 2
    } else if ((c2 === '**' || c2 === '__') && allow(NodeKind.Strong)) {
      strongDelimiter = c2
      i += 2
      push(State.Strong)
    } else if (c === '*' && allow(NodeKind.Emphasis)) {
      emphasisDelimiter = c
      i++
      push(State.Emphasis)
    } else if (c === '_' && isWordBoundary(str[i - 1]) && allow(NodeKind.Emphasis)) {
      emphasisDelimiter = c
      i++
      push(State.Emphasis)
    } else if (c === '"' && allow(NodeKind.Quoted)) {
      push(State.Quoted)
      i++
    } else if (Blank.is(c)) {
      resolve(new Blank(c))
      i++
    } else if (AlphabetNumeric.is(c)) {
      resolve(AlphabetNumeric.create(c))
      i++
    } else if (str.substr(i, 7) === '@import' && allow(NodeKind.BlockCode)) {
      const j = str.indexOf('\n', i)
      const end = j === -1 ? str.length : j
      resolve(new Raw(str.slice(i, end)))
      i = end
    } else if (Punctuation.is(c)) {
      resolve(Punctuation.create(c))
      i++
    } else {
      resolve(new UnicodeString(c))
      i++
    }

    if (c === '\n') {
      blankLine = true
    }
    if (blankLine && !isBlank(c)) {
      blankLine = false
    }
  }

  while (stack.size() > 1) {
    // close block nodes if all inline nodes are closed
    if (forceCloseInlineNodes() === false) {
      if (forceCloseBlockNodes() === false) {
        throw new Error(`closing ${stack.top().state} is not implemented`)
      }
    }
  }

  return compactTree(new Document(popNodes()))

  function forceCloseInlineNodes () {
    switch (stack.top().state) {
      case State.Quoted:
        resolve(Punctuation.create('"'), ...popNodes())
        break
      case State.Strikethrough:
        resolve(Punctuation.create('~'), Punctuation.create('~'), ...popNodes())
        break
      case State.Emphasis:
        resolve(Punctuation.create(emphasisDelimiter), ...popNodes())
        break
      case State.Strong:
        resolve(...[...strongDelimiter].map(c => Punctuation.create(c)), ...popNodes())
        break
      case State.InlineCode:
        resolve(
          ...[...inlineCodeDelimiter].map(c => Punctuation.create(c)),
          ...popNodes()
        )
        break
      case State.Math:
        resolve(
          ...[...mathDelimiter].map(c => Punctuation.create(c)),
          ...popNodes()
        )
        break
      case State.LinkText:
        resolve(Punctuation.create('['), ...popNodes())
        break
      case State.ReferingUrl:
        resolve(new SquareQuoted(linkText), Punctuation.create('('), ...popNodes())
        break
      case State.ReferingID:
        resolve(new SquareQuoted(linkText), Punctuation.create('['), ...popNodes())
        break
      case State.ImageText:
        resolve(Punctuation.create('!'), Punctuation.create('['), ...popNodes())
        break
      case State.ImageReferingUrl:
        resolve(
          Punctuation.create('!'), new SquareQuoted(imageText),
          Punctuation.create('('), ...popNodes()
        )
        break
      case State.ImageReferingID:
        resolve(
          Punctuation.create('!'), new SquareQuoted(imageText),
          Punctuation.create('['), ...popNodes()
        )
        break
      case State.HTMLTag:
        resolve(Punctuation.create('<'), ...popNodes())
        break
      default:
        return false
    }
  }

  function forceCloseBlockNodes () {
    switch (stack.top().state) {
      case State.ReferenceLinkUrl:
        resolve(new ReferenceDefinition(linkText, popMarkdown()))
        break
      case State.OrderedListItem:
        resolve(new OrderedListItem(listPrefix, popNodes()))
        break
      case State.UnorderedListItem:
        resolve(new UnorderedListItem(listPrefix, popNodes()))
        break
      case State.BlockCodeBody:
        resolve(new BlockCode(codeLang, blockCodeDelimiter, parseCode(popMarkdown(), codeLang, parse), false))
        break
      case State.BlockCodeLang:
        codeLang = popMarkdown()
        resolve(new BlockCode(codeLang, blockCodeDelimiter, [], false, false))
        break
      default:
        return false
    }
  }

  function push (state: State) {
    stack.push({ state, nodes: [], begin: i })
    mask.add(stateMasks[state])
  }

  function resolve (...nodes: Node[]) {
    stack.top().nodes.push(...nodes)
  }

  function pop () {
    if (!stack.size()) return undefined
    const top = stack.pop()!
    mask.remove(stateMasks[top.state])
    return top
  }

  function popNodes () {
    return pop()!.nodes
  }

  function popMarkdown () {
    return popNodes().map(x => x.toMarkdown()).join('')
  }

  function allow (kind: NodeKind) {
    return !(mask.mask & kind)
  }

  function allowFrontMatter () {
    if (!allow(NodeKind.BlockCode)) return false
    for (const block of stack) {
      for (const node of block.nodes) {
        if (!isBlankNode(node)) {
          return false
        }
      }
    }
    return true
  }
}
