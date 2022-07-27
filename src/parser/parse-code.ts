import { Raw } from '../nodes/raw'
import { Document } from '../nodes/document'

type documentParser = (content: string) => Document

const parsers = {
  cpp: cpp,
  'c++': cpp,
  c: cpp,
  java: cpp,
  javascript: cpp,
  js: cpp,
  csharp: cpp,
  'c#': cpp,
  typescript: cpp,
  ts: cpp,
  go: cpp,
  sql: sql,
  bash: bash,
  shell: bash,
  sh: bash,
  python: bash,
  py: bash,
  ruby: bash
}

export function parseCode (code: string, lang: string, parseMarkdown: documentParser) {
  const parser = parsers[lang]
  if (!parser) {
    return [new Raw(code)]
  }
  return [...parser(code, parseMarkdown)]
}

function * cpp (code: string, parseMarkdown: documentParser) {
  let i = 0; let prevI = 0
  const N = code.length
  while (i < N) {
    const c2 = code.substr(i, 2)
    if (c2 === '//') {
      const j = code.indexOf('\n', i)
      const end = j === -1 ? N : j
      if (i + 2 > prevI) {
        yield new Raw(code.slice(prevI, i + 2))
      }
      yield parseMarkdown(code.slice(i + 2, end))
      prevI = i = end
    } else if (c2 === '/*') {
      const j = code.indexOf('*/', i)
      const end = j === -1 ? N : j
      if (i + 2 > prevI) {
        yield new Raw(code.slice(prevI, i + 2))
      }
      yield parseMarkdown(code.slice(i + 2, end))
      prevI = i = end
    } else {
      i++
    }
  }
  if (prevI < N) {
    yield new Raw(code.slice(prevI, N))
  }
}

function * sql (code: string, parseMarkdown: documentParser) {
  let i = 0; let prevI = 0
  const N = code.length
  while (i < N) {
    const c2 = code.substr(i, 2)
    if (c2 === '--') {
      const j = code.indexOf('\n', i)
      const end = j === -1 ? N : j
      if (i + 2 > prevI) {
        yield new Raw(code.slice(prevI, i + 2))
      }
      yield parseMarkdown(code.slice(i + 2, end))
      prevI = i = end
    } else if (c2 === '/*') {
      const j = code.indexOf('*/', i)
      const end = j === -1 ? N : j
      if (i + 2 > prevI) {
        yield new Raw(code.slice(prevI, i + 2))
      }
      yield parseMarkdown(code.slice(i + 2, end))
      prevI = i = end
    } else {
      i++
    }
  }
  if (prevI < N) {
    yield new Raw(code.slice(prevI, N))
  }
}

function * bash (code: string, parseMarkdown: documentParser) {
  let i = 0; let prevI = 0
  const N = code.length
  while (i < N) {
    const c1 = code[i]
    if (c1 === '#') {
      const j = code.indexOf('\n', i)
      const end = j === -1 ? N : j
      if (i > prevI) {
        yield new Raw(code.slice(prevI, i + 2))
      }
      yield parseMarkdown(code.slice(i + 2, end))
      prevI = i = end
    } else {
      i++
    }
  }
  if (prevI < N) {
    yield new Raw(code.slice(prevI, N))
  }
}
