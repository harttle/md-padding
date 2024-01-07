export enum State {
  // markdown syntax
  LinkText,           // [
  ReferingUrl,        // [xx](
  ReferingID,         // [xx][
  ReferenceLinkUrl,   // [xx]:
  ImageText,          // ![
  ImageReferingUrl,   // ![xx](
  ImageReferingID,    // ![xx][
  ImageAttributes,    // ![xx]{
  HTMLTag,            // <
  Emphasis,           // *
  Strong,             // **
  Strikethrough,      // ~~
  InlineCode,         // `
  BlockCodeLang,      // ```
  Math,               // $, $$
  BlockCodeBody,      // ```cpp\n
  OrderedListItem,    // 1.<space>
  UnorderedListItem,  // *<space>
  BlockquoteItem,     // >

  // natural language syntax
  Quoted,             // " in natural language
  Init,               // init state
}
