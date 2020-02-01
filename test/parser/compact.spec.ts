import { compactArray, compactTree } from '../../src/transformers/compact'
import { NodeKind } from '../../src/nodes/node-kind'
import { AlphabetNumeric } from '../../src/nodes/alphabet-numeric'
import { InlineLink } from '../../src/nodes/inline-link'

describe('compactArray()', () => {
  it('should compact successive text nodes', () => {
    const tokens = [new AlphabetNumeric('foo'), new AlphabetNumeric('bar')]
    compactArray(tokens)
    expect(tokens).toHaveLength(1)
    expect(tokens[0]).toMatchObject({
      text: 'foobar',
      kind: NodeKind.AlphabetNumeric
    })
  })
})

describe('compactTree()', () => {
  it('should compact text nodes in children', () => {
    const link = new InlineLink(
      [new AlphabetNumeric('foo'), new AlphabetNumeric('bar')],
      'http'
    )
    compactTree(link)
    expect(link.children).toHaveLength(1)
    expect(link.children[0]).toMatchObject({
      kind: NodeKind.AlphabetNumeric,
      text: 'foobar'
    })
  })
})
