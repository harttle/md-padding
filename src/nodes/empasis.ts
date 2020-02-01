import { NodeKind } from './node-kind'
import { Delimited } from './delimited'
import { Node } from './node'

export type EmphasisDelimiter = '*' | '_'

export class Emphasis extends Delimited implements Node {
  readonly children: Node[] = []
  readonly separator: string
  readonly kind = NodeKind.Emphasis

  constructor (children: Node[], separator: EmphasisDelimiter = '*') {
    super(separator, separator)
    this.children = children
    this.separator = separator
  }
}
