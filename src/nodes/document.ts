import { NodeKind } from './node-kind'
import { Node } from './node'

export class Document implements Node {
  children: Node[]
  kind = NodeKind.Document

  constructor (children: Node[]) {
    this.children = children
  }

  toMarkdown () {
    return this.children.map(x => x.toMarkdown()).join('')
  }
}
