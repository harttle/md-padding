import { parse } from '../parser/parse'
import { padRecursively } from './pad-recursively'

export function padMarkdown (input: string) {
  const doc = parse(input)
  padRecursively(doc)
  return doc.toMarkdown()
}
