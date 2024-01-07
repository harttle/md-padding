import { parse } from '../../src/parser/parse'
import { NodeKind } from '../../src/nodes/node-kind'
import { BlockCode } from '../../src/nodes/block-code'

describe('parse()', () => {
  const options = { ignoreWords: new Set<string>() }

  describe('AlphabetNumeric', () => {
    it('should parse a single word', () => {
      const doc = parse('foo', options)
      expect(doc.children).toHaveLength(1)
      expect(doc.children[0]).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'foo'
      })
    })
  })

  describe('InlineLink', () => {
    it('should parse inline link', () => {
      const doc = parse('[foo](bar)', options)
      expect(doc.children).toHaveLength(1)
      expect(doc.children[0]).toMatchObject({
        kind: NodeKind.InlineLink,
        target: 'bar'
      })
      expect(doc.children[0].children).toHaveLength(1)
      expect(doc.children[0].children[0]).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'foo'
      })
    })
  })

  describe('InlineImage', () => {
    it('should parse inline image', () => {
      const doc = parse('![foo](bar)', options)
      expect(doc.children).toHaveLength(1)
      expect(doc.children[0]).toMatchObject({
        kind: NodeKind.InlineImage,
        target: 'bar'
      })
      expect(doc.children[0].children).toHaveLength(1)
      expect(doc.children[0].children[0]).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'foo'
      })
    })
    it('should parse inline image with attributes', () => {
      // see: https://kramdown.gettalong.org/syntax.html#images
      const doc = parse('![smiley](smiley.png){:height="36px" width="36px"}', options)
      expect(doc.children).toHaveLength(1)
      const [img] = doc.children
      expect(img).toMatchObject({
        kind: NodeKind.InlineImage,
        target: 'smiley.png',
        attributes: ':height="36px" width="36px"'
      })

      expect(img.children).toHaveLength(1)
      const [text] = img.children
      expect(text).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'smiley'
      })
    })
  })
  it('should parse reference image with attributes', () => {
    // see: https://kramdown.gettalong.org/syntax.html#images
    const doc = parse('![smiley][smiley]{:height="36px" width="36px"}', options)
    expect(doc.children).toHaveLength(1)
    const [img] = doc.children
    expect(img).toMatchObject({
      kind: NodeKind.ReferenceImage,
      target: 'smiley',
      attributes: ':height="36px" width="36px"'
    })

    expect(img.children).toHaveLength(1)
    const [text] = img.children
    expect(text).toMatchObject({
      kind: NodeKind.AlphabetNumeric,
      text: 'smiley'
    })
  })

  describe('ReferenceImage', () => {
    it('should parse reference image', () => {
      const doc = parse('![foo][bar]', options)
      expect(doc.children).toHaveLength(1)

      const [image] = doc.children
      expect(image).toMatchObject({
        kind: NodeKind.ReferenceImage,
        target: 'bar'
      })
      expect(image.children).toHaveLength(1)

      const [text] = image.children
      expect(text).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'foo'
      })
    })
  })

  describe('ReferenceLink', () => {
    it('should parse reference link', () => {
      const doc = parse('[foo][bar]', options)
      expect(doc.children).toHaveLength(1)
      expect(doc.children[0]).toMatchObject({
        kind: NodeKind.ReferenceLink,
        target: 'bar'
      })
      expect(doc.children[0].children).toHaveLength(1)
      expect(doc.children[0].children[0]).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'foo'
      })
    })

    it('should expand "[foo][bar" when NL found', () => {
      const doc = parse('[foo][bar', options)
      expect(doc.children).toHaveLength(3)

      const [square, punc, text] = doc.children
      expect(square).toMatchObject({ kind: NodeKind.SquareQuoted })
      expect(square.toMarkdown()).toEqual('[foo]')
      expect(square.children).toHaveLength(1)

      const [textInSquare] = square.children
      expect(textInSquare).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'foo'
      })

      expect(punc).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '['
      })
      expect(text).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'bar'
      })
    })
  })

  describe('ReferenceDefinition', () => {
    it('should parse reference definition', () => {
      const doc = parse('[foo]: http://harttle.land', options)
      expect(doc.children).toHaveLength(1)

      const dfn = doc.children[0]
      expect(dfn).toMatchObject({
        kind: NodeKind.ReferenceDefinition,
        target: ' http://harttle.land'
      })
      expect(dfn.toMarkdown()).toEqual('[foo]: http://harttle.land')
    })
    it('should parse multiple reference definitions', () => {
      const doc = parse('[foo]: http://harttle.land\n[bar]: http://example.com', options)
      expect(doc.children).toHaveLength(3)

      const [dfn1, blank, dfn2] = doc.children
      expect(dfn1).toMatchObject({
        kind: NodeKind.ReferenceDefinition,
        target: ' http://harttle.land'
      })
      expect(dfn1.toMarkdown()).toEqual('[foo]: http://harttle.land')

      expect(blank).toMatchObject({
        kind: NodeKind.Blank,
        char: '\n'
      })

      expect(dfn2).toMatchObject({
        kind: NodeKind.ReferenceDefinition,
        target: ' http://example.com'
      })
      expect(dfn2.toMarkdown()).toEqual('[bar]: http://example.com')
    })
  })

  describe('HTMLTag', () => {
    it('should parse anchor tag', () => {
      const doc = parse('<http://harttle.land>', options)
      expect(doc.children).toHaveLength(1)
      expect(doc.children[0]).toMatchObject({
        kind: NodeKind.HTMLTag,
        text: 'http://harttle.land'
      })
    })
    it('should expand unclosed tag when read NL', () => {
      const doc = parse('<foo', options)
      expect(doc.children).toHaveLength(2)

      const [punc, text] = doc.children
      expect(punc).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '<'
      })
      expect(text).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'foo'
      })
    })
  })

  describe('InlineCode', () => {
    it('should parse inline code', () => {
      const doc = parse('`code`', options)
      expect(doc.children).toHaveLength(1)
      expect(doc.children[0]).toMatchObject({
        kind: NodeKind.InlineCode,
        code: 'code'
      })
    })
    it('should support doulbe `` inline code', () => {
      const doc = parse('``code``', options)
      expect(doc.children).toHaveLength(1)
      expect(doc.children[0]).toMatchObject({
        kind: NodeKind.InlineCode,
        code: 'code'
      })
    })
    it('should ignore quoted inside inline code', () => {
      const doc = parse('`"code"`', options)
      expect(doc.children).toHaveLength(1)

      const code = doc.children[0]
      expect(code.children).toHaveLength(0)

      expect(code).toMatchObject({
        kind: NodeKind.InlineCode,
        code: '"code"'
      })
    })
    it('should ignore emphasis inside inline code', () => {
      const doc = parse('`what *is* this`', options)

      expect(doc.children).toHaveLength(1)
      expect(doc.children[0]).toMatchObject({
        kind: NodeKind.InlineCode,
        code: 'what *is* this'
      })
    })
    it('should parse nested code inside link text', () => {
      const doc = parse('[`code`](bar)', options)
      expect(doc.children).toHaveLength(1)

      const link = doc.children[0]
      expect(link).toMatchObject({
        kind: NodeKind.InlineLink,
        target: 'bar'
      })
      expect(link.children).toHaveLength(1)

      const code = link.children[0]
      expect(code).toMatchObject({
        kind: NodeKind.InlineCode,
        code: 'code'
      })
    })
  })

  describe('Emphasis', () => {
    it('should not parse as emphasis if not in word boundary', () => {
      const doc = parse('a_single_word', options)
      expect(doc.children).toHaveLength(5)

      const [t1, p1, t2, p2, t3] = doc.children
      expect(t1).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'a'
      })
      expect(p1).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '_'
      })
      expect(t2).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'single'
      })
      expect(p2).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '_'
      })
      expect(t3).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'word'
      })
    })
    it('should expand emphasis when NL', () => {
      const doc = parse('*important\nnote', options)
      expect(doc.children).toHaveLength(4)

      const [punc, text1, blank, text2] = doc.children
      expect(punc).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '*'
      })
      expect(text1).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'important'
      })
      expect(blank).toMatchObject({
        kind: NodeKind.Blank,
        char: '\n'
      })
      expect(text2).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'note'
      })
    })
    it('should expand unclosed emphasis when EOF', () => {
      const doc = parse('not *important', options)
      expect(doc.children).toHaveLength(4)

      const [text1, blank, punc, text2] = doc.children
      expect(text1).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'not'
      })
      expect(blank).toMatchObject({
        kind: NodeKind.Blank,
        char: ' '
      })
      expect(punc).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '*'
      })
      expect(text2).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'important'
      })
    })
  })

  describe('Quoted', () => {
    it('should expand quoted when NL found', () => {
      const doc = parse('"someone\nsaid', options)
      expect(doc.children).toHaveLength(4)

      const [punc, text1, blank, text2] = doc.children
      expect(punc).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '"'
      })
      expect(text1).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'someone'
      })
      expect(blank).toMatchObject({
        kind: NodeKind.Blank,
        char: '\n'
      })
      expect(text2).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'said'
      })
    })
  })

  describe('SquareQuoted', () => {
    it('should expand "[xx" as a Punctuation + AlphabetNumeric', () => {
      const doc = parse('[xx', options)
      expect(doc.children).toHaveLength(2)

      const [punc, alphabet] = doc.children
      expect(punc).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '['
      })
      expect(alphabet).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'xx'
      })
    })
    it('should handle "[xx\n" as a Punctuation + AlphabetNumeric + blank', () => {
      const doc = parse('[xx\n', options)
      expect(doc.children).toHaveLength(3)

      const [punc, alphabet, blank] = doc.children
      expect(punc).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '['
      })
      expect(alphabet).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'xx'
      })
      expect(blank).toMatchObject({
        kind: NodeKind.Blank,
        char: '\n'
      })
    })
  })

  describe('Strong', () => {
    it('should allow nested emphasis', () => {
      const doc = parse('**_foo_**', options)
      expect(doc.children).toHaveLength(1)

      const strong = doc.children[0]
      expect(strong).toMatchObject({
        kind: NodeKind.Strong
      })
      expect(strong.toMarkdown()).toEqual('**_foo_**')
      expect(strong.children).toHaveLength(1)

      const emphasis = strong.children[0]
      expect(emphasis).toMatchObject({
        kind: NodeKind.Emphasis
      })
      expect(emphasis.toMarkdown()).toEqual('_foo_')
      expect(emphasis.children).toHaveLength(1)

      const text = emphasis.children[0]
      expect(text).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'foo'
      })
    })

    it('should expand repeatedly Strong when NL found', () => {
      const doc = parse('**_foo\n**bar**', options)
      expect(doc.children).toHaveLength(6)

      const [p1, p2, p3, t1, blank, s1] = doc.children
      expect(p1).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '*'
      })
      expect(p2).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '*'
      })
      expect(p3).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '_'
      })
      expect(t1).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'foo'
      })
      expect(blank).toMatchObject({
        kind: NodeKind.Blank,
        char: '\n'
      })
      expect(s1).toMatchObject({ kind: NodeKind.Strong })
      expect(s1.toMarkdown()).toEqual('**bar**')
    })

    it('should expand Strong when EOF found', () => {
      const doc = parse('**_foo', options)
      expect(doc.children).toHaveLength(4)

      const [p1, p2, p3, t1] = doc.children
      expect(p1).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '*'
      })
      expect(p2).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '*'
      })
      expect(p3).toMatchObject({
        kind: NodeKind.Punctuation,
        char: '_'
      })
      expect(t1).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'foo'
      })
    })
  })

  describe('BlockCode', () => {
    it('should parse block code', () => {
      const doc = parse('```\ncode\n```', options)
      expect(doc.children).toHaveLength(1)
      const blockCode = doc.children[0] as BlockCode
      expect(blockCode).toMatchObject({
        kind: NodeKind.BlockCode,
        lang: ''
      })
      expect(blockCode.getCode()).toEqual('code\n')
    })
    it('should ignore emphasis inside block code', () => {
      const doc = parse('```cpp\nwhat *is* this```', options)

      expect(doc.children).toHaveLength(1)
      const blockCode = doc.children[0] as BlockCode
      expect(doc.children[0]).toMatchObject({
        kind: NodeKind.BlockCode,
        lang: 'cpp'
      })
      expect(blockCode.getCode()).toEqual('what *is* this')
    })
    it('should tokenize block code with lang', () => {
      const doc = parse('```cpp\ncode\n```', options)
      expect(doc.children).toHaveLength(1)
      const blockCode = doc.children[0] as BlockCode
      expect(doc.children[0]).toMatchObject({
        kind: NodeKind.BlockCode,
        lang: 'cpp'
      })
      expect(blockCode.getCode()).toEqual('code\n')
    })
    it('should parse mixed text and code', () => {
      const doc = parse('A`inline code`B```\nblock code\n```C', options)
      expect(doc.children).toHaveLength(5)

      expect(doc.children[0]).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'A'
      })
      expect(doc.children[1]).toMatchObject({
        kind: NodeKind.InlineCode,
        code: 'inline code'
      })
      expect(doc.children[2]).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'B'
      })
      const blockCode = doc.children[3] as BlockCode
      expect(blockCode).toMatchObject({
        kind: NodeKind.BlockCode,
        lang: ''
      })
      expect(blockCode.getCode()).toEqual('block code\n')
      expect(doc.children[4]).toMatchObject({
        kind: NodeKind.AlphabetNumeric,
        text: 'C'
      })
    })
    it('when there is front matter, the delimiter of the code block should be ``` instead of ---', () => {
      const doc = parse('---\ntest:1\n---\n```js\nconsole.log(1)\n```', options)
      expect(doc.children).toHaveLength(3)

      const [blockCode1, blank, blockCode2] = doc.children

      expect(blockCode1).toMatchObject({
        kind: NodeKind.BlockCode,
        lang: '',
        delimiter: '---',
        closed: true
      })
      expect(blockCode1.getCode()).toEqual('test:1\n')

      expect(blank).toMatchObject({
        kind: NodeKind.Blank,
        char: '\n'
      })

      expect(blockCode2).toMatchObject({
        kind: NodeKind.BlockCode,
        lang: 'js',
        delimiter: '```',
        closed: true
      })
      expect(blockCode2.getCode()).toEqual('console.log(1)\n')
    })
  })

  describe('UnorderedListItem', () => {
    it('should parse unordered list item', () => {
      const doc = parse('* foo\n* bar', options)
      expect(doc.children).toHaveLength(3)

      const [item1, blank, item2] = doc.children
      expect(item1).toMatchObject({
        kind: NodeKind.UnorderedListItem,
        prefix: '* '
      })
      expect(item1.toMarkdown()).toEqual('* foo')

      expect(blank).toMatchObject({
        kind: NodeKind.Blank,
        char: '\n'
      })

      expect(item2).toMatchObject({
        kind: NodeKind.UnorderedListItem,
        prefix: '* '
      })
      expect(item2.toMarkdown()).toEqual('* bar')
    })
    it('should allow \t as prefix separater', () => {
      const doc = parse('-\tfoo\n*\tbar', options)
      expect(doc.children).toHaveLength(3)

      const [item1, blank, item2] = doc.children
      expect(item1).toMatchObject({
        kind: NodeKind.UnorderedListItem,
        prefix: '-\t'
      })
      expect(item1.toMarkdown()).toEqual('-\tfoo')

      expect(blank).toMatchObject({
        kind: NodeKind.Blank,
        char: '\n'
      })

      expect(item2).toMatchObject({
        kind: NodeKind.UnorderedListItem,
        prefix: '*\t'
      })
      expect(item2.toMarkdown()).toEqual('*\tbar')
    })
  })

  describe('Blockquote', () => {
    it('should allow spaces around', () => {
      const doc = parse('>   foo\n > bar', options)
      expect(doc.children).toHaveLength(4)
      const [blockquote, blank1, blank2, blockquote2] = doc.children
      expect(blockquote).toMatchObject({
        kind: NodeKind.BlockquoteItem,
        prefix: '>',
        children: [{
          kind: NodeKind.Blank,
          char: ' '
        }, {
          kind: NodeKind.Blank,
          char: ' '
        }, {
          kind: NodeKind.Blank,
          char: ' '
        }, {
          kind: NodeKind.AlphabetNumeric,
          text: 'foo'
        }]
      })
      expect(blank1).toMatchObject({
        kind: NodeKind.Blank,
        char: '\n'
      })
      expect(blank2).toMatchObject({
        kind: NodeKind.Blank,
        char: ' '
      })
      expect(blockquote2).toMatchObject({
        kind: NodeKind.BlockquoteItem,
        prefix: '>',
        children: [{
          kind: NodeKind.Blank,
          char: ' '
        }, {
          kind: NodeKind.AlphabetNumeric,
          text: 'bar'
        }]
      })
      expect(doc.toMarkdown()).toEqual('>   foo\n > bar')
    })
    it('should recognize UnorderedListItem with * prefix in blockquote', () => {
      const doc = parse('> * **测试**', options)
      expect(doc.children).toHaveLength(1)
      const [blockquote] = doc.children
      expect(blockquote).toMatchObject({
        kind: NodeKind.BlockquoteItem,
        prefix: '>'
      })
      expect(blockquote.children).toHaveLength(2)
      const [blank, unorderedList] = blockquote.children
      expect(blank).toMatchObject({
        kind: NodeKind.Blank,
        char: ' '
      })
      expect(unorderedList.children).toHaveLength(1)
      expect(unorderedList).toMatchObject({
        kind: NodeKind.UnorderedListItem,
        prefix: '* '
      })
      const [strong] = unorderedList.children
      expect(strong.children).toHaveLength(1)
      expect(strong).toMatchObject({
        kind: NodeKind.Strong,
        prefix: '**'
      })
      expect(strong.toMarkdown()).toEqual('**测试**')
      expect(doc.toMarkdown()).toEqual('> * **测试**')
    })
    it('should recognize UnorderedListItem with * prefix in nested blockquote', () => {
      const doc = parse('> >* *测试*', options)
      expect(doc.children).toHaveLength(1)
      const [_blockquote] = doc.children
      expect(_blockquote).toMatchObject({
        kind: NodeKind.BlockquoteItem,
        prefix: '>'
      })

      expect(_blockquote.children).toHaveLength(2)
      const [blank, subBlockquote] = _blockquote.children
      expect(blank).toMatchObject({
        kind: NodeKind.Blank,
        char: ' '
      })
      expect(subBlockquote).toMatchObject({
        kind: NodeKind.BlockquoteItem,
        prefix: '>'
      })

      const [unorderedList] = subBlockquote.children
      expect(unorderedList.children).toHaveLength(1)
      expect(unorderedList).toMatchObject({
        kind: NodeKind.UnorderedListItem,
        prefix: '* '
      })

      const [emphasis] = unorderedList.children
      expect(emphasis.children).toHaveLength(1)
      expect(emphasis).toMatchObject({
        kind: NodeKind.Emphasis,
        prefix: '*'
      })
      expect(emphasis.toMarkdown()).toEqual('*测试*')

      expect(doc.toMarkdown()).toEqual('> >* *测试*')
    })
  })

  describe('Math', () => {
    it('should recognize $inline math$ in unordered list', () => {
      const doc = parse('- 前$Latex$后', options)
      expect(doc.children).toHaveLength(1)
      expect(doc.children[0]).toMatchObject({
        kind: NodeKind.UnorderedListItem,
        prefix: '- '
      })

      const sub = doc.children[0].children
      expect(sub).toHaveLength(3)
      const [before, math, after] = sub
      expect(before.toMarkdown()).toEqual('前')
      expect(math).toMatchObject({
        kind: NodeKind.Math,
        delimiter: '$',
        code: 'Latex'
      })
      expect(after.toMarkdown()).toEqual('后')
    })
  })
})
