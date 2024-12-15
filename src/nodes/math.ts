import { NodeKind } from './node-kind'
import { Node } from './node'

export type MathDelimiter = '$' | '$$'

export class MathNode implements Node {
  readonly children: Node[] = []
  readonly code: string
  readonly kind = NodeKind.Math
  readonly delimiter: string

  constructor (code: string, delimiter: MathDelimiter) {
    this.delimiter = delimiter
    this.code = code
  }

  toMarkdown () {
    return this.delimiter + this.code + this.delimiter
  }
}
