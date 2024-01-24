import { NodeKind } from './node-kind'
import { Node } from './node'
import { Delimited } from './delimited'

export class Highlight extends Delimited implements Node {
  readonly children: Node[] = []
  readonly kind = NodeKind.Highlight

  constructor (children: Node[]) {
    super('==', '==')
    this.children = children
  }
}
