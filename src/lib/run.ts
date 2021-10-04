import { log, measure } from './performance'

const { year, compiler }: {year: string, compiler: string} = JSON.parse(
  process.env.CONFIG ?? '{"year":2015}'
)
const day = process.env.DAY ?? 'day1'

import(process.cwd() + `/src/${year}/${day}.${compiler}`)
  .then(
    (
      { part1, part2, input = true }:
      {part1: Function, part2: Function, input: boolean}
    ) => {
      // const data = input
      //   ? JSON.parse(process.env.INPUT ?? '[]') // ??
      //   : JSON.parse(process.env.TEST ?? '[]')
      const data = JSON.parse(process.env.DATA ?? '[]')

      // === Execution ===
      const result1 = measure(part1, data)
      const result2 = measure(part2, data)

      // === Results ===
      // let spaceDiff = ('' + result1.time).length - ('' + result2.time).length
      log('Part One', result1)
      log('Part Two', result2)
    }
  ).catch(e => {
    console.error(e)
  })
