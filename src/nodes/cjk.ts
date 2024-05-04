import { NodeKind } from './node-kind'
import { Node } from './node'
import { isCJK } from '../utils/char'

export class CJK implements Node {
  readonly children: Node[] = []
  readonly text: string
  readonly kind = NodeKind.CJK
  private static cache = new Map<string, CJK>()

  private constructor (char: string) {
    this.text = char
  }

  toMarkdown () {
    return this.text
  }

  static is (char: any): char is string {
    if (typeof char !== 'string') return false
    return isCJK(char)
  }

  static create (char: string): CJK {
    if (char.length > 1) return new CJK(char)

    // create a flyweight ascii character
    if (!CJK.cache.has(char)) {
      CJK.cache.set(char, new CJK(char))
    }
    return CJK.cache.get(char)!
  }
}
