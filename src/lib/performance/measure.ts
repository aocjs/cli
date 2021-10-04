/**
 * @property {number|string} solution
 * @property {number} time Execution time in ms.
 */
export class Stats {
  public solution: number | string = 'none'
  public time: number = -1
  public rss: number = -1

  public constructor (init?: Partial<Stats>) {
    Object.assign(this, init)
  }
}

const decimalPrecision = 2
const decimalReduction = 6
const decimalsTruncated = decimalReduction - decimalPrecision

export default (part: Function, data: string[]): Stats => {
  const tStart = process.hrtime.bigint()

  const solution = part(data)

  const tEnd = process.hrtime.bigint()

  return new Stats({
    solution,
    time:
      Number((tEnd - tStart) / BigInt(Math.pow(10, decimalsTruncated))) /
      Math.pow(10, decimalPrecision)
  })
}
