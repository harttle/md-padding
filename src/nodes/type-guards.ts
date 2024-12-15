import { InlineCode } from './inline-code'
import { MathNode } from './math'
import { ReferenceLink } from './reference-link'
import { Punctuation } from './punctuation'
import { UnicodeString } from './unicode-string'
import { BlockCode } from './block-code'
import { Document } from './document'
import { AlphabetNumeric } from './alphabet-numeric'
import { NodeKind } from './node-kind'
import { Node } from './node'
import { Blank } from './blank'
import { CJK } from './cjk'
import { Quoted } from './quoted'

export function isDocument (node: Node): node is Document {
  return node.kind === NodeKind.Document
}

export function isAlphabetNumeric (node: Node): node is AlphabetNumeric {
  return node.kind === NodeKind.AlphabetNumeric
}

export function isCJK (node: Node): node is CJK {
  return node.kind === NodeKind.CJK
}

export function isPunctuation (node: Node): node is Punctuation {
  return node.kind === NodeKind.Punctuation
}

export function isQuoted (node: Node): node is Quoted {
  return node.kind === NodeKind.Quoted
}

export function isBlank (node: Node): node is Blank {
  return node.kind === NodeKind.Blank
}

export function isRaw (node: Node): node is Blank {
  return node.kind === NodeKind.Raw
}

export function isUnicodeString (node: Node): node is UnicodeString {
  return node.kind === NodeKind.UnicodeString
}

export function isLatin (node: Node) {
  return isUnicodeString(node) || isAlphabetNumeric(node)
}

export function isMath (node: Node): node is MathNode {
  return node.kind === NodeKind.Math
}

export function isInlineCode (node: Node): node is InlineCode {
  return node.kind === NodeKind.InlineCode
}

export function isReferenceLink (node: Node): node is ReferenceLink {
  return node.kind === NodeKind.ReferenceLink
}

export function isBlockCode (node: Node): node is BlockCode {
  return node.kind === NodeKind.BlockCode
}
