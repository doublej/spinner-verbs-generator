#!/usr/bin/env bun
import { current, install, list, reset, show } from './commands.js'
import { generatePrompt } from './prompt.js'

const USAGE = `Usage: spinner-verbs <command>

Commands:
  list              Show available verb sets
  show <name>       Show contents of a verb set
  install <name>    Apply a verb set to Claude Code
  current           Show currently installed spinner verbs
  reset             Remove spinner verbs (restore defaults)
  prompt <subject>  Generate a prompt for creating a new verb set`

const [command, ...args] = process.argv.slice(2)

function requireArg(cmd: string): string {
  if (!args[0]) {
    console.error(`Usage: spinner-verbs ${cmd}`)
    process.exit(1)
  }
  return args[0]
}

async function main(): Promise<void> {
  switch (command) {
    case 'list':
      return list()
    case 'show':
      return show(requireArg('show <name>'))
    case 'install':
      return install(requireArg('install <name>'))
    case 'current':
      return current()
    case 'reset':
      return reset()
    case 'prompt':
      requireArg('prompt <subject>')
      return generatePrompt(args.join(' '))
    default:
      console.log(USAGE)
      process.exit(command ? 1 : 0)
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
