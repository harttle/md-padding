import { NodeKind } from './node-kind'
import { Node } from './node'

export type BlockCodeDelimiter = '---' | '```'

export class BlockCode implements Node {
  readonly children: Node[] = []
  readonly lang: string
  readonly kind = NodeKind.BlockCode
  readonly closed: boolean
  readonly langClosed: boolean
  readonly delimiter: BlockCodeDelimiter

  constructor (lang: string, delimiter: BlockCodeDelimiter, children: Node[], closed = true, langClosed = true) {
    this.delimiter = delimiter
    this.lang = lang
    this.children = children
    this.closed = closed
    this.langClosed = langClosed
  }

  getCode () {
    return this.children.map(x => x.toMarkdown()).join('')
  }

  toMarkdown () {
    return this.delimiter + this.lang +
      (this.langClosed ? '\n' : '') +
      this.getCode() +
      (this.closed ? this.delimiter : '')
  }
}
