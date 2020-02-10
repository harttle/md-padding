#!/usr/bin/env node
import { padMarkdown } from '../index'
import { readFileSync, writeFileSync } from 'fs'
import * as yargs from 'yargs'

yargs
  .usage('$0 [OPTION]... <FILE>')
  .option('in-place', {
    alias: 'i',
    type: 'boolean',
    description: 'edit file in place'
  })
  .alias('help', 'h')
  .example('stdout', 'mdp README.md')
  .example('in-place', 'mdp -i README.md')
  .example('pipe', 'cat README.md | mdp')
  .check(argv => {
    if (argv._.length === 0 && argv.i) {
      throw new Error('File not specified, cannot edit in place')
    }
    return true
  })

const inputFile = yargs.argv._[0] || 0 // default to STDIN
const input = readFileSync(inputFile, 'utf-8')
const output = padMarkdown(input)

if (yargs.argv.i) {
  writeFileSync(inputFile, output)
} else {
  process.stdout.write(output)
}
