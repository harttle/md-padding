export interface PadMarkdownOptions {
  ignoreWords?: string[]
}

export interface NormalizedPadMarkdownOptions {
  ignoreWords: Set<string>
}

export function normalize (options: PadMarkdownOptions = {}): NormalizedPadMarkdownOptions {
  return {
    ignoreWords: new Set(options.ignoreWords)
  }
}
