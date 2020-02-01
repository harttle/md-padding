import { Blank } from '../nodes/blank'
import { Node } from '../nodes/node'
import { isUnicodeString, isAlphabetNumeric, isBlank, isPunctuation } from '../nodes/type-guards'

export function padBetweenNodes (tokens: Node[]): Node[] {
  if (tokens.length < 2) return tokens

  const padded: Node[] = [tokens[0]]
  for (let i = 1; i < tokens.length; i++) {
    if (needPadding(tokens[i - 1], tokens[i])) {
      padded.push(new Blank(' '))
    }
    padded.push(tokens[i])
  }
  return padded
}

function needPadding (lhs: Node, rhs: Node) {
  if (isBlank(lhs) || isBlank(rhs)) return false

  if (isPunctuation(lhs)) {
    if (lhs.needPaddingAfter()) return !isPunctuation(rhs)
    if (lhs.isFullSize()) return false
    return false
  }
  if (isPunctuation(rhs)) {
    if (rhs.needPaddingBefore()) return !isPunctuation(lhs)
    if (rhs.isFullSize()) return false
    return false
  }
  if (isAlphabetNumeric(lhs)) {
    return !isPunctuation(rhs) && !isAlphabetNumeric(rhs)
  }
  if (isUnicodeString(lhs)) {
    return !isPunctuation(rhs) && !isUnicodeString(rhs)
  }
  return true
}
