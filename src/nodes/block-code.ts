import { NodeKind } from './node-kind'
import { Node } from './node'

export class BlockCode implements Node {
  readonly children: Node[] = []
  readonly lang: string
  readonly kind = NodeKind.BlockCode
  readonly closed: boolean
  readonly langClosed: boolean

  constructor (lang: string, children: Node[], closed = true, langClosed = true) {
    this.lang = lang
    this.children = children
    this.closed = closed
    this.langClosed = langClosed
  }

  getCode () {
    return this.children.map(x => x.toMarkdown()).join('')
  }

  toMarkdown () {
    return '```' + this.lang +
      (this.langClosed ? '\n' : '') +
      this.getCode() +
      (this.closed ? '```' : '')
  }
}
