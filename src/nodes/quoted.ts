import { NodeKind } from './node-kind'
import { Node } from './node'
import { Delimited } from './delimited'

export class Quoted extends Delimited implements Node {
  readonly kind = NodeKind.Quoted

  constructor (children: Node[]) {
    super('"', '"')
    this.children = children
  }
}
