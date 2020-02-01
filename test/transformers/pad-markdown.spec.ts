import { padMarkdown } from '../../src/transformers/pad-markdown'

describe('padding()', () => {
  describe('code fences', () => {
    it('should pad between code fence', () => {
      expect(padMarkdown('file`/foo.txt`not exists'))
        .toEqual('file `/foo.txt` not exists')
    })
    it('should ignore padded code fence', () => {
      expect(padMarkdown('file `/foo.txt` not exists'))
        .toEqual('file `/foo.txt` not exists')
    })
  })

  describe('mixed languages', () => {
    it('should pad between zh_CN and en_US', () => {
      expect(padMarkdown('我是Yang先生'))
        .toEqual('我是 Yang 先生')
    })
    it('should ignore paded zh_CN/en_US border', () => {
      expect(padMarkdown('我是 Yang 先生'))
        .toEqual('我是 Yang 先生')
    })
    it('should pad between zh_CN and numbers', () => {
      expect(padMarkdown('X11就很好'))
        .toEqual('X11 就很好')
    })
  })

  describe('emphasis, strong, strikethrough', () => {
    it('should maintain space between text and emphasis', () => {
      expect(padMarkdown('what should be _emphasised_ is'))
        .toEqual('what should be _emphasised_ is')
    })
    it('should add space between text and strong', () => {
      expect(padMarkdown('this is**important**.'))
        .toEqual('this is **important**.')
    })
    it('should add space between text and strikethrough', () => {
      expect(padMarkdown("I can't do~~this~~anymore."))
        .toEqual("I can't do ~~this~~ anymore.")
    })
  })

  describe('links', () => {
    it('should padd between footnote links', () => {
      expect(padMarkdown('refer to[foo][bar]please'))
        .toEqual('refer to [foo][bar] please')
    })
    it('should padd between inline links', () => {
      expect(padMarkdown('refer to[foo](http://foo)please'))
        .toEqual('refer to [foo](http://foo) please')
    })
    it('should padd between bare links', () => {
      expect(padMarkdown('refer to<http://foo>please'))
        .toEqual('refer to <http://foo> please')
    })
    it('should not padd in link urls', () => {
      expect(padMarkdown('[foo](http://example.com?foo=**bar**)'))
        .toEqual('[foo](http://example.com?foo=**bar**)')
    })
    it('should pad strong inside link text', () => {
      expect(padMarkdown('refer to [this is**important**](http://example.com)'))
        .toEqual('refer to [this is **important**](http://example.com)')
    })
  })

  describe('punctuations', () => {
    it('should not pad on full-width punctuations', () => {
      expect(padMarkdown('a，b""。c'))
        .toEqual('a，b ""。c')
    })
    it('should not pad on punctuations', () => {
      expect(padMarkdown('refer to <http://foo>,'))
        .toEqual('refer to <http://foo>,')
    })
    it('should not pad on single quote', () => {
      expect(padMarkdown("dont't you leave me alone"))
        .toEqual("dont't you leave me alone")
    })
    it('should not pad around "_"', () => {
      expect(padMarkdown('a_single_word')).toEqual('a_single_word')
    })
    it('should not pad before "？"', () => {
      expect(padMarkdown("what's this？")).toEqual("what's this？")
      expect(padMarkdown('X11？')).toEqual('X11？')
    })
    it('should not pad before "！"', () => {
      expect(padMarkdown('see here！')).toEqual('see here！')
      expect(padMarkdown('X11！')).toEqual('X11！')
    })
    it('should not pad before "；"', () => {
      expect(padMarkdown('item1；')).toEqual('item1；')
      expect(padMarkdown('`code`；')).toEqual('`code`；')
    })
    it('should pad around >', () => {
      expect(padMarkdown('a>b')).toEqual('a > b')
    })
    it('should pad around <', () => {
      expect(padMarkdown('a<b')).toEqual('a < b')
    })
    it('should pad around =', () => {
      expect(padMarkdown('a=b')).toEqual('a = b')
    })
  })
})
