import { Node } from '../nodes/node'

export function preOrder (root: Node, visitor: (node: Node) => void) {
  visitor(root)
  for (const child of root.children) {
    preOrder(child, visitor)
  }
}
