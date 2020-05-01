import { NodeKind } from './node-kind'
import { Node } from './node'

export class ReferenceImage implements Node {
  readonly kind = NodeKind.ReferenceImage

  constructor (
    public readonly children: Node[],
    public readonly target: string,
    public readonly attributes?: string) {}

  text () {
    return this.children.map(x => x.toMarkdown()).join('')
  }

  toMarkdown () {
    const attr = this.attributes === undefined ? '' : `{${this.attributes}}`
    return `![${this.text()}][${this.target}]${attr}`
  }
}
