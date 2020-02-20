import { NodeKind } from './node-kind'
import { Node } from './node'
import { isNumeric, isStartCharacter, isEndCharacter, isPunctuationCharacter, isFullwidthPunctuation } from '../utils/char'
import { isAlphabetNumeric, isPunctuation } from './type-guards'

export class Punctuation implements Node {
  readonly children: Node[] = []
  readonly char: string
  readonly kind = NodeKind.Punctuation
  private static cache = new Map<string, Punctuation>()

  private constructor (char: string) {
    this.char = char
  }

  needPaddingAfter (next: Node) {
    if (this.isFullSize()) return false
    if (isPunctuation(next)) return false
    if (isAlphabetNumeric(next) && isNumeric(next.text[0]) && ',.'.includes(this.char)) return false
    if (isEndCharacter(this.char)) return true
    if (isStartCharacter(this.char)) return false
    if ('<>='.includes(this.char)) return true
    return false
  }

  needPaddingBefore (prev: Node) {
    if (this.isFullSize()) return false
    if (isPunctuation(prev)) return false
    if (isAlphabetNumeric(prev) && isNumeric(prev.text.slice(-1)) && ',.'.includes(this.char)) return false
    if (isStartCharacter(this.char)) return true
    if (isEndCharacter(this.char)) return false
    if ('<>='.includes(this.char)) return true
    return false
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
    return isPunctuationCharacter(char)
  }
}
