import { Node } from '../nodes/node'
import { UnicodeString } from '../nodes/unicode-string'
import { AlphabetNumeric } from '../nodes/alphabet-numeric'
import { isCJK, isUnicodeString, isAlphabetNumeric } from '../nodes/type-guards'
import { preOrder } from '../utils/dfs'
import { CJK } from '../nodes/cjk'

export function compactTree<T extends Node> (root: T): T {
  preOrder(root, node => compactArray(node.children))
  return root
}

export function compactArray (tokens: Node[]) {
  let i = 0
  for (let j = 0; j < tokens.length; j++) {
    const curr = tokens[j]
    if (i - 1 >= 0) {
      const prev = tokens[i - 1]
      if (isUnicodeString(curr) && isUnicodeString(prev)) {
        tokens[i - 1] = new UnicodeString(prev.text + curr.text)
        continue
      }
      if (isAlphabetNumeric(curr) && isAlphabetNumeric(prev)) {
        tokens[i - 1] = AlphabetNumeric.create(prev.text + curr.text)
        continue
      }
      if (isCJK(curr) && isCJK(prev)) {
        tokens[i - 1] = CJK.create(prev.text + curr.text)
        continue
      }
    }
    tokens[i++] = curr
  }
  while (tokens.length > i) tokens.pop()
}
