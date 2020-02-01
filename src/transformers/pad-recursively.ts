import { Node } from '../nodes/node'
import { padBetweenNodes } from './pad-between-nodes'

export function padRecursively (node: Node) {
  for (const child of node.children) {
    padRecursively(child)
  }
  node.children = padBetweenNodes(node.children)
}
