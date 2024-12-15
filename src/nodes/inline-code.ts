import { NodeKind } from './node-kind'
import { Node } from './node'

export type InlineCodeDelimiter = '`' | '``' | '```'

export class InlineCode implements Node {
  readonly children: Node[] = []
  readonly code: string
  readonly kind = NodeKind.InlineCode
  readonly delimiter: string

  constructor (code: string, delimiter: InlineCodeDelimiter) {
    this.delimiter = delimiter
    this.code = code
  }

  toMarkdown () {
    return this.delimiter + this.code + this.delimiter
  }
}
