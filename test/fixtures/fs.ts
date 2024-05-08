import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'fs'
import path from 'path'
import { tmpdir } from 'os'

export const TEST_DIR = path.join(tmpdir(), 'md-padding-test')

interface Files {
  [filename: string]: string
}

// Function to create files with contents
export function createFiles (files: Files, directory = TEST_DIR) {
  mkdirSync(directory, { recursive: true })
  for (const [filename, content] of Object.entries(files)) {
    const filepath = path.join(directory, filename)
    writeFileSync(filepath, content)
  }
}

export function getContent (file: string, directory = TEST_DIR) {
  const filepath = path.join(directory, file)
  return readFileSync(filepath, 'utf8')
}
export function clean (directory = TEST_DIR) {
  rmSync(directory, { recursive: true, force: true })
}
