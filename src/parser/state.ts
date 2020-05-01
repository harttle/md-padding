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
  BlockCode,          // ```cpp\n
  OrderedListItem,    // 1.<space>
  UnorderedListItem,  // *<space>

  // natural language syntax
  Quoted,             // " in natural language
  Init,               // init state
}
