import { NodeKind } from './node-kind'
import { Node } from './node'

export class Callout implements Node {
  readonly children: Node[] = []
  readonly text: string
  readonly kind = NodeKind.CalloutItem

  constructor (text: string) {
    this.text = text
  }

  toMarkdown () {
    return `[!${this.text}]`
  }
}
