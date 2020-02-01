import { NodeKind } from './node-kind'
import { Node } from './node'
import { Delimited } from './delimited'

export class Strikethrough extends Delimited implements Node {
  readonly children: Node[] = []
  readonly kind = NodeKind.Strikethrough

  constructor (children: Node[]) {
    super('~~', '~~')
    this.children = children
  }
}
