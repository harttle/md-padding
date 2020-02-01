/**
 * By default all nodes are allowd to nest within another,
 * each node defines a list (a bitstring we call `mask`)
 * of disallowd desendant types.
 *
 * Assume the `mask` do not distinguish direct or indirect
 * child, so it's resonable to maintain a total mask
 * combining all ancestors' masks.
 */
export class Mask {
  mask = 0
  private counts = Array(32).fill(0)

  add (bitstring: number) {
    for (let i = 0, bit = 1; i < 32; i++, bit <<= 1) {
      if (bitstring & bit) {
        this.counts[i]++
        this.mask |= bit
      }
    }
  }

  remove (bitstring: number) {
    for (let i = 0, bit = 1; i < 32; i++, bit <<= 1) {
      if (bitstring & bit) {
        this.counts[i]--
        if (this.counts[i] === 0) {
          this.mask &= ~bit
        }
      }
    }
  }
}
