import { NodeKind } from './node-kind'
import { Node } from './node'

export class Document implements Node {
  public readonly children: Node[]
  public readonly kind: NodeKind = NodeKind.Document
  // serve as a differentiator for Document duck type
  public readonly isDoc = true

  constructor (children: Node[]) {
    this.children = children
  }

  toMarkdown () {
    return this.children.map(x => x.toMarkdown()).join('')
  }
}
