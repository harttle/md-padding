import { State } from './state'
import { NodeKind } from '../nodes/node-kind'

export const stateMasks = {
  [State.InlineCode]: ~NodeKind.Text,
  [State.BlockCode]: ~NodeKind.Text,
  [State.Emphasis]: ~NodeKind.Inline | NodeKind.Emphasis,
  [State.Strong]: ~NodeKind.Inline | NodeKind.Strong,
  [State.Strikethrough]: ~NodeKind.Inline | NodeKind.Strikethrough,
  [State.LinkText]: ~NodeKind.Inline | NodeKind.Link,
  [State.ReferingUrl]: ~NodeKind.Text,
  [State.ImageText]: ~NodeKind.Inline | NodeKind.Image,
  [State.ImageReferingUrl]: ~NodeKind.Text,
  [State.ReferenceLinkUrl]: ~NodeKind.Text,
  [State.HTMLTag]: ~NodeKind.Text,
  [State.ReferingID]: ~NodeKind.Text,
  [State.BlockCodeLang]: ~NodeKind.Text,
  [State.OrderedListItem]: NodeKind.Block,
  [State.UnorderedListItem]: NodeKind.Block,
  [State.Init]: NodeKind.None
}
