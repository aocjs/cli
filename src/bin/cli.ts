#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { start } from './commands'
import { name, version } from '../../package.json'

// eslint-disable-next-line no-void
void yargs(hideBin(process.argv))
  .command(start)
  .scriptName(name)
  .version(version)
  .help().argv

/**
 * TODO:
 * - commands modules -> easy yargs testing
 * - use middleware on config read OR use .config? (.aocrc .aoc.json)
 */
