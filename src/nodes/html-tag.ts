import { NodeKind } from './node-kind'
import { Node } from './node'

export class HTMLTag implements Node {
  readonly children: Node[] = []
  readonly text: string
  readonly kind = NodeKind.HTMLTag

  constructor (text: string) {
    this.text = text
  }

  toMarkdown () {
    return `<${this.text}>`
  }
}
