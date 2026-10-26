import { NodeKind } from './node-kind'
import { Node } from './node'

export class FootnoteDefinition implements Node {
  readonly children: Node[] = []
  readonly label: string
  readonly kind = NodeKind.FootnoteDefinition

  constructor (label: string, children: Node[]) {
    this.label = label
    this.children = children
  }

  toMarkdown () {
    return `[^${this.label}]:${this.children.map(x => x.toMarkdown()).join('')}`
  }
}
