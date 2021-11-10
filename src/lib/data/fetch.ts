import fetch from 'node-fetch'
import { dirname, resolve } from 'path'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'

export default async (): Promise<string[]> => {
  const { year }: {year: string} = JSON.parse(process.env.CONFIG ?? '{"year":2015}')
  const matchExp = (process.env.DAY ?? 'day1').match(/\d+/)
  const day: string = (matchExp !== null ? matchExp[0] : '1')

  const text = await load(year, day)
  return text.trim().split(/\r?\n/)
}

async function load (year: string, day: string): Promise<string> {
  const filePath = resolve(process.cwd(), `./data/${year}/day${day}.txt`)

  if (existsSync(filePath)) {
    return await readFile(filePath, 'utf8')
  } else {
    const { session }: { session: string } = JSON.parse(process.env.CONFIG ?? '')
    const content = await loadFromRemote(year, day, session)
    await mkdir(dirname(filePath), { recursive: true })
    await writeFile(filePath, content, 'utf8')
    return content
  }
}

async function loadFromRemote (year: string, day: string, session: string): Promise<string> {
  const response = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: {
        cookie: `session=${session}`
      }
    }
  )

  if (response.ok) {
    return await response.text()
  }
  throw new Error(`Couldn't fetch data from https://adventofcode.com/${year}`)
}
