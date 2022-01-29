import { NodeKind } from './node-kind'
import { Node } from './node'

export class Raw implements Node {
  children: Node[] = []
  content: string
  kind = NodeKind.Raw

  constructor (content: string) {
    this.content = content
  }

  toMarkdown () {
    return this.content
  }
}
