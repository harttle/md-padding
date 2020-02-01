import { NodeKind } from './node-kind'
import { Node } from './node'

export class InlineLink implements Node {
  readonly children: Node[] = []
  readonly target: string
  readonly kind = NodeKind.InlineLink

  constructor (children: Node[], target: string) {
    this.children = children
    this.target = target
  }

  text () {
    return this.children.map(x => x.toMarkdown()).join('')
  }

  toMarkdown () {
    return `[${this.text()}](${this.target})`
  }
}
