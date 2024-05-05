#!/usr/bin/env node
import { padMarkdown } from '../index'
import { readFileSync, writeFileSync } from 'fs'
import * as yargs from 'yargs'

type FileList = (string | number)[]

yargs
  .usage('$0 [OPTION]... <FILE>')
  .option('in-place', {
    alias: 'i',
    type: 'boolean',
    description: 'edit file in place'
  })
  .option('ignore-words', {
    alias: 'I',
    type: 'array',
    description: 'ignore padding within/before/after these words',
    coerce: (arr) => arr.map((item: any) => String(item))
  })
  .option('file', {
    alias: 'f',
    type: 'array',
    description: 'to specify file list, used with -I',
    coerce: (arr) => arr.map((item: any) => String(item))
  })
  .alias('help', 'h')
  .example('stdout', 'mdp README.md')
  .example('in-place', 'mdp -i README.md')
  .example('pipe', 'cat README.md | mdp')

const file = yargs.argv.file as (undefined | string[])
const inputFiles: FileList = file || yargs.argv._
if (inputFiles.length === 0 && yargs.argv.i) {
  console.error('File not specified, cannot edit in place')
  process.exit(1)
}
if (!inputFiles.length) inputFiles.push(0)  // defaults to STDIN

for (const inputFile of inputFiles) {
  const input = readFileSync(inputFile, 'utf-8')
  const output = padMarkdown(input, {
    ignoreWords: yargs.argv.ignoreWords as (undefined | string[])
  })

  if (yargs.argv.i) {
    writeFileSync(inputFile, output)
  } else {
    process.stdout.write(output)
  }
}
