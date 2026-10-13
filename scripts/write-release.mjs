import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
let commit = process.env.COMMIT_REF
if (!commit) commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
writeFileSync('dist/release.json', JSON.stringify({ commit, builtAt: new Date().toISOString(), prototype: true }) + '\n')
