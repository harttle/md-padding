import { NodeKind } from './node-kind'
import { Node } from './node'

export class UnicodeString implements Node {
  readonly children: Node[] = []
  readonly text: string
  readonly kind = NodeKind.UnicodeString

  constructor (str: string) {
    this.text = str
  }

  toMarkdown () {
    return this.text
  }

  static is (str: any): str is string {
    if (typeof str !== 'string') return false
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) < 256) return false
    }
    return true
  }
}
