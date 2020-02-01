import { NodeKind } from './node-kind'
import { isNumeric } from '../utils/char'
import { Node } from './node'

export class OrderedListItem implements Node {
  readonly children: Node[] = []
  readonly prefix: string
  readonly kind = NodeKind.OrderedListItem

  constructor (prefix: string, children: Node[]) {
    this.prefix = prefix
    this.children = children
  }
  toMarkdown () {
    return this.prefix + this.children.map(x => x.toMarkdown()).join('')
  }

  static isValidPrefix (str: string) {
    return isNumeric(str[0]) && str[1] === '.' && str[2] === ''
  }
}
