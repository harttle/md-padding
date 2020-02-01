import { NodeKind } from './node-kind'
import { Node } from './node'
import { Delimited } from './delimited'

export class SquareQuoted extends Delimited implements Node {
  readonly children: Node[]
  readonly kind = NodeKind.SquareQuoted

  constructor (children: Node[]) {
    super('[', ']')
    this.children = children
  }
}
