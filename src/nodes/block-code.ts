import { NodeKind } from './node-kind'
import { Node } from './node'

export class BlockCode implements Node {
  readonly children: Node[] = []
  readonly lang: string
  readonly code: string
  readonly kind = NodeKind.BlockCode
  readonly closed: boolean
  readonly langClosed: boolean

  constructor (lang: string, code: string, closed = true, langClosed = true) {
    this.lang = lang
    this.code = code
    this.closed = closed
    this.langClosed = langClosed
  }

  toMarkdown () {
    return '```' + this.lang +
      (this.langClosed ? '\n' : '') +
      this.code +
      (this.closed ? '```' : '')
  }
}
