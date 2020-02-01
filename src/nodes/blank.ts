import { NodeKind } from './node-kind'
import { isBlank } from '../utils/char'
import { Node } from './node'

export class Blank implements Node {
  children: Node[] = []
  char: string
  kind = NodeKind.Blank

  constructor (char: string) {
    this.char = char
  }

  toMarkdown () {
    return this.char
  }

  static is (char: any): char is ' ' | '\t' | '\r' | '\n' {
    if (typeof char !== 'string') return false
    return isBlank(char)
  }
}
