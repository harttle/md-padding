export const enum NodeKind {
  // concrete constructs
  Blank = 1,
  Punctuation = 1 << 1,
  AlphabetNumeric = 1 << 2,
  UnicodeString = 1 << 3,
  BlockCode = 1 << 4,
  Document = 1 << 5,
  HTMLTag = 1 << 6,
  ReferenceLink = 1 << 7,
  ReferenceDefinition = 1 << 8,
  InlineLink = 1 << 9,
  OrderedListItem = 1 << 10,
  Quoted = 1 << 11,
  SquareQuoted = 1 << 12,
  Strikethrough = 1 << 13,
  Strong = 1 << 14,
  Emphasis = 1 << 15,
  InlineCode = 1 << 16,
  UnorderedListItem = 1 << 17,
  InlineImage = 1 << 18,
  ReferenceImage = 1 << 19,
  Raw = 1 << 20,
  Math = 1 << 21,

  // combinations
  All = -1,
  None = 0,
  Text = Blank | Punctuation | AlphabetNumeric | UnicodeString,
  NaturualConstructs = Quoted | SquareQuoted | Text,
  Code = InlineCode | BlockCode,
  Link = InlineLink | ReferenceLink,
  Image = InlineImage | ReferenceImage,
  Style = Strong | Emphasis | Strikethrough,
  Inline = NaturualConstructs | InlineCode | Link | Style | HTMLTag | InlineImage | ReferenceImage,
  Block = ~Inline,
}
