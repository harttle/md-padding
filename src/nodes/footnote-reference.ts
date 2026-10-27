import { NodeKind } from './node-kind'
import { Node } from './node'

export class FootnoteReference implements Node {
  readonly children: Node[] = []
  readonly label: string
  readonly kind = NodeKind.FootnoteReference

  constructor (label: string) {
    this.label = label
  }

  toMarkdown () {
    return `[^${this.label}]`
  }
}
