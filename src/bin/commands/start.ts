import { Argv } from 'yargs'

export const command = 'start <day>'

export const desc = 'Executes given day'

export function builder (yargs: Argv): any {
  return yargs.positional('day', {
    type: 'string'
  })
}

export function handler (argv: object): void {
  // TODO: start
  console.log('🎈')
}
