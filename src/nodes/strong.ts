import { NodeKind } from './node-kind'
import { Node } from './node'
import { Delimited } from './delimited'

export type StrongDelimiter = '**' | '__'

export class Strong extends Delimited implements Node {
  readonly children: Node[] = []
  readonly separator: string
  readonly kind = NodeKind.Strong

  constructor (children: Node[], separator: StrongDelimiter) {
    super(separator, separator)
    this.children = children
    this.separator = separator
  }
}
