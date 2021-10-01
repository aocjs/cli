import { Argv } from 'yargs'

export const command = 'start <day>'

export const desc = 'Executes given day'

export function builder (yargs: Argv): any {
  return yargs.positional('day', {
    type: 'string'
  })
}

export function handler (argv: object): void {
  /**
   * TODO:
   * - validate argv.day as /day[0-9]+/i
   * - save argv.day as /[0-9]+/ in process.env
   * - create file if not exists
   * - fetch data from server (just fetch)
   * - execute nodemon
   */

  console.log('🎈', argv, JSON.parse(process.env.CONFIG ?? ''))
}
