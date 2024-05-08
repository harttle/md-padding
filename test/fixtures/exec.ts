import { execSync } from 'child_process'
import path from 'path'
import { TEST_DIR } from './fs'

export function runCMD (cmd: string, directory = TEST_DIR) {
  const exe = path.resolve(__dirname, '../../dist/bin/md-padding.js')
  const result = execSync(cmd.replace(/{mdp}/g, exe), {
    cwd: directory
  })
  return {
    ...result,
    output: result.toString()
  }
}
