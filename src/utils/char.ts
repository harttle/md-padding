// * General Punctuation: https://en.wikipedia.org/wiki/General_Punctuation
// * Supplemental Punctuation: https://en.wikipedia.org/wiki/Supplemental_Punctuation
// * ASCII Punctuations
const rPunctuation = /^[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~]$/

// These Punctuations generally should not be padded,
// and not neccessarily included by rPunctuation
// Unfortunately it's not well defined in Unicode,
// see https://en.wikipedia.org/wiki/Chinese_punctuation for reference
const rFullwidthPunctuation = /^[、，：。？！；：【】（）「」﹁﹂『』《》〈〉“”‘’﹏…—～‧]$/

export function isPunctuationCharacter (char: any) {
  if (typeof char !== 'string') return false

  if (rPunctuation.exec(char)) return true
  if (isFullwidthPunctuation(char)) return true
  return false
}
export function isNumeric (char: string) {
  return char >= '0' && char <= '9'
}

export function isCJK (char: any) {
  // Common CJK characters
  if (char >= '\u4E00' && char <= '\u9FFF') return true
  // Rare CJK characters
  if (char >= '\u3400' && char <= '\u4DBF') return true
  // Compatibility Ideographs
  if (char >= '\uF900' && char <= '\uFAFF') return true
  return false
}

export function isFullwidthPunctuation (char) {
  return !!rFullwidthPunctuation.exec(char)
}

export function isBlank (char: string): boolean {
  // full list see https://en.wikipedia.org/wiki/Whitespace_character#cite_note-11
  return !!/^\s$/.exec(char)
}

export function isInlineBlank (char: string): boolean {
  return char === ' ' || char === '\t'
}

export function isAlphabet (char) {
  return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')
}

export function isWordBoundary (char) {
  return char === undefined || isBlank(char) || isPunctuationCharacter(char)
}

export function isEndCharacter (char) {
  // single quote may not be end character: `what's this`
  // dot may not be end character: `harttle.land`
  return ',;:"!'.includes(char)
}

export function isStartCharacter (char) {
  // single quote may be not end character: `what's this`
  return '"'.includes(char)
}
