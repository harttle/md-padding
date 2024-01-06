import { NodeKind } from './node-kind'
import { Node } from './node'
import { isInlineBlank } from '../utils/char'

export type BlockquotePrefix = '> '

export class BlockquoteItem implements Node {
  readonly children: Node[] = []
  readonly prefix: string
  readonly kind = NodeKind.BlockquoteItem

  constructor(prefix: string, children: Node[]) {
    this.prefix = prefix
    this.children = children
  }

  toMarkdown() {
    return this.prefix + this.children.map(x => x.toMarkdown()).join('')
  }

  static isValidPrefix(str: string) {
    return str[0] === '>' && isInlineBlank(str[1])
  }
}