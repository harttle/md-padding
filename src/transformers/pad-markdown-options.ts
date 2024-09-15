export interface PadMarkdownOptions {
  ignoreWords?: string[]
  ignorePatterns?: string[];
}

export interface NormalizedPadMarkdownOptions {
  ignoreWords: Set<string>;
  ignorePatterns: RegExp[];
}

export function normalize (options: PadMarkdownOptions = {}): NormalizedPadMarkdownOptions {
  return {
    ignoreWords: new Set(options.ignoreWords),
    ignorePatterns: (options.ignorePatterns || []).map(pattern => new RegExp(pattern, 'g'))
  }
}
