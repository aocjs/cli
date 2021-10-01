#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { start } from './commands'
import { getConfig } from '../lib'
import { name, version } from '../../package.json'

// eslint-disable-next-line no-void
void yargs(hideBin(process.argv))
  .command(start)
  .middleware(() => {
    process.env.CONFIG = JSON.stringify(getConfig())
  })
  .scriptName(name)
  .version(version)
  .help().argv
