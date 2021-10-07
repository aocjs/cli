import fetch from 'node-fetch'

export default async (): Promise<string[]> => {
  const { year, session }: {year: string, session: string} = JSON.parse(
    process.env.CONFIG ?? '{"year":2015}'
  )
  const matchExp = (process.env.DAY ?? 'day1').match(/\d+/)
  const day: string = (matchExp !== null ? matchExp[0] : '1')

  const response = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: {
        cookie: `session=${session}`
      }
    }
  )

  if (response.ok) {
    const text: string = await response.text()

    return text.split(/\r?\n/)
  }
  throw new Error(`Couldn't fetch data from https://adventofcode.com/${year}`)
}
