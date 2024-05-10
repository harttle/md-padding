import { clean, createFiles, getContent } from './fixtures/fs'
import { runCMD } from './fixtures/exec'

describe('cli', () => {
  afterEach(() => {
    clean()
  })
  it('mdp a.md', () => {
    createFiles({
      'a.md': 'this is*important*'
    })
    const result = runCMD('{mdp} a.md')
    expect(result.output).toEqual('this is *important*')
    expect(getContent('a.md')).toEqual('this is*important*')
  })
  it('mdp -i a.md', () => {
    createFiles({
      'a.md': 'this is*important*'
    })
    const result = runCMD('{mdp} -i a.md')
    expect(result.output).toEqual('')
    expect(getContent('a.md')).toEqual('this is *important*')
  })
  it('ls | mdp -i --read-files', () => {
    createFiles({
      'a.md': 'this is*important*',
      'b.md': '要用小拇指按p键'
    })
    const result = runCMD('ls | {mdp} -i --read-files')
    expect(result.output).toEqual('')
    expect(getContent('a.md')).toEqual('this is *important*')
    expect(getContent('b.md')).toEqual('要用小拇指按 p 键')
  })
  it('mdp -i --ignore-words="-" ":" -f a.md', () => {
    createFiles({
      'a.md': '1:2::2:1'
    })
    const result = runCMD("{mdp} -i --ignore-words='-' ':' -f a.md")
    expect(result.output).toEqual('')
    expect(getContent('a.md')).toEqual('1:2::2:1')
  })
  it('mdp -i --ignore-words="-" ":" "<" -f a.md', () => {
    createFiles({ 'a.md': '1:2::2:1 a<b' })
    const result = runCMD("{mdp} --ignore-words='-' ':' '<' -f a.md -i")
    expect(result.output).toEqual('')
    expect(getContent('a.md')).toEqual('1:2::2:1 a<b')
  })
})
