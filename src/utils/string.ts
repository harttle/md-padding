export function matchSubstring (code: string, begin: number, pattern: string) {
  return code.substr(begin, pattern.length) === pattern
}
