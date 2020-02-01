import { isWordBoundary } from '../../src/utils/char'

describe('isWordBoundary', () => {
  it('should return true for "*"', () => {
    expect(isWordBoundary('*')).toBeTruthy()
  })
  it('should return true for " "', () => {
    expect(isWordBoundary(' ')).toBeTruthy()
  })
  it('should return true for undefined', () => {
    expect(isWordBoundary(undefined)).toBeTruthy()
  })
})
