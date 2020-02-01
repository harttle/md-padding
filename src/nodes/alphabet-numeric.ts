import { NodeKind } from './node-kind'
import { Node } from './node'
import { isAlphabet, isNumeric } from '../utils/char'

export class AlphabetNumeric implements Node {
  readonly children: Node[] = []
  readonly text: string
  readonly kind = NodeKind.AlphabetNumeric
  private static cache = new Map<string, AlphabetNumeric>()

  private constructor (char: string) {
    this.text = char
  }

  toMarkdown () {
    return this.text
  }

  static is (char: any): char is string {
    if (typeof char !== 'string') return false
    return isAlphabet(char) || isNumeric(char)
  }

  static create (char: string): AlphabetNumeric {
    if (char.length > 1) return new AlphabetNumeric(char)

    // create a flyweight ascii character
    if (!AlphabetNumeric.cache.has(char)) {
      AlphabetNumeric.cache.set(char, new AlphabetNumeric(char))
    }
    return AlphabetNumeric.cache.get(char)!
  }
}
