import { parse } from '../parser/parse'
import { normalize, PadMarkdownOptions } from './pad-markdown-options'
import { padRecursively } from './pad-recursively'

export function padMarkdown (input: string, options?: PadMarkdownOptions) {
  const opts = normalize(options)
  const doc = parse(input, opts)
  padRecursively(doc)
  return doc.toMarkdown()
}
