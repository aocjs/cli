import { Argv } from 'yargs'
import { createTemplate } from '../../lib'
import fetch from '../../lib/data/fetch'

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

  createTemplate()
    .then(() => {
      console.log('🎈🎇')

      fetch()
        .then((res) => {
          console.log(res.slice(0, 120))
          process.env.DATA = JSON.stringify(res)
        })
        .catch((e) => console.log(e))
    })
    .catch((e) => console.log(e))

  console.log('🎈', argv, JSON.parse(process.env.CONFIG ?? ''))
}
