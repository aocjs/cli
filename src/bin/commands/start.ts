import { Argv } from 'yargs'
import { resolve } from 'path'
import { createTemplate } from '../../lib'
import fetch from '../../lib/data/fetch'
import nodemon = require('nodemon')

export const command = 'start <day>'

export const desc = 'Executes given day'

export function builder (yargs: Argv): any {
  return yargs.positional('day', {
    type: 'string'
  })
}

export function handler (argv: {day: string}): void {
  /**
   * TODO:
   * - validate argv.day as /day[0-9]+/i
   * - save argv.day as /[0-9]+/ in process.env
   * - create file if not exists
   * - fetch data from server (just fetch)
   * - execute nodemon
   */

  process.env.DAY = argv.day
  const { compiler } = JSON.parse(process.env.CONFIG ?? '')

  createTemplate()
    .then(() => {
      fetch()
        .then((res) => {
          process.env.DATA = JSON.stringify(res)

          // === Execution ===
          const { exec, ext } =
            compiler === 'js'
              ? {
                exec: 'node',
                ext: 'js,mjs,txt'
              }
              : {
                exec: 'ts-node',
                ext: 'ts,txt'
              }

          nodemon({
            // script: 'node_modules/@aocjs/cli/dist/src/lib/run.js',
            script: resolve(__dirname, '../../lib/run.js'),
            watch: ['data', 'src'],
            exec,
            ext
          }).on('start', () => {
            console.log(' ')
          }).on('restart', () => {
            console.clear()
          })
        })
        .catch((e) => console.log(e))
    })
    .catch((e) => console.log(e))
}
