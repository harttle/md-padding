import { Blank } from '../nodes/blank'
import { Node } from '../nodes/node'
import { isBlank, isRaw, isDocument, isPunctuation, isCJK, isLatin } from '../nodes/type-guards'

export function padBetweenNodes (tokens: Node[]): Node[] {
  if (tokens.length < 2) return tokens

  const padded: Node[] = [tokens[0]]
  for (let i = 1; i < tokens.length; i++) {
    if (needPadding(tokens[i - 1], tokens[i], tokens[i - 2], tokens[i + 1])) {
      padded.push(new Blank(' '))
    }
    padded.push(tokens[i])
  }
  return padded
}

function needPadding (lhs: Node, rhs: Node, prev?: Node, next?: Node) {
  if (isBlank(lhs) || isBlank(rhs)) return false
  if (isRaw(lhs) || isRaw(rhs)) return false
  if (isDocument(lhs) || isDocument(rhs)) return false

  if (isPunctuation(lhs)) return lhs.needPaddingAfter(rhs, prev)
  if (isPunctuation(rhs)) return rhs.needPaddingBefore(lhs, next)
  if (isCJK(lhs)) return !isCJK(rhs)
  if (isLatin(lhs)) return !isLatin(rhs)

  // By default, add space between different constructs
  return true
}
