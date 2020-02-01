import { Node } from './node'

export abstract class Delimited {
  children: Node[] = []
  private prefix: string
  private postfix: string

  constructor (prefix: string, postfix: string) {
    this.prefix = prefix
    this.postfix = postfix
  }

  text () {
    return this.children.map(c => c.toMarkdown()).join('')
  }

  toMarkdown () {
    return this.prefix + this.text() + this.postfix
  }
}
