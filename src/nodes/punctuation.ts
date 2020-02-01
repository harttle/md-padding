import { NodeKind } from './node-kind'
import { Node } from './node'
import { isPunctuation, isFullwidthPunctuation } from '../utils/char'

export class Punctuation implements Node {
  readonly children: Node[] = []
  readonly char: string
  readonly kind = NodeKind.Punctuation
  private static cache = new Map<string, Punctuation>()

  private constructor (char: string) {
    this.char = char
  }

  needPaddingAfter () {
    return ',<>=!'.includes(this.char)
  }

  needPaddingBefore () {
    return '<>='.includes(this.char)
  }

  isFullSize () {
    return isFullwidthPunctuation(this.char)
  }

  toMarkdown () {
    return this.char
  }

  // create a flyweight punctuation
  static create (char: string): Punctuation {
    if (!Punctuation.cache.has(char)) {
      Punctuation.cache.set(char, new Punctuation(char))
    }
    return Punctuation.cache.get(char)!
  }

  static is (char: any): char is string {
    return isPunctuation(char)
  }
}
