import { NormalizedPadMarkdownOptions } from '../transformers/pad-markdown-options'

export function preprocessIgnores (str: string, options: NormalizedPadMarkdownOptions) {
  const lengths = new Map()
  for (const word of options.ignoreWords) {
    let index = -1
    let begin = 0
    while ((index = str.indexOf(word, begin)) !== -1) {
      const len = lengths.get(index) ?? 0
      lengths.set(index, Math.max(len, word.length))
      begin = index + word.length
    }
  }
  for (const pattern of options.ignorePatterns) {
    let match: RegExpMatchArray | null = null
    while ((match = pattern.exec(str)) !== null) {
      const len = lengths.get(match.index) ?? 0
      lengths.set(match.index, Math.max(len, match[0].length))
    }
  }
  return lengths
}
