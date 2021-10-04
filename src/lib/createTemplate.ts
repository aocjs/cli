import { constants } from 'fs'
import { mkdir, access, copyFile } from 'fs/promises'
import { resolve } from 'path'

const { F_OK } = constants

export default async (): Promise<void> => {
  const { year, compiler }: {year: string, compiler: string} = JSON.parse(
    process.env.CONFIG ?? '{"year":2015,"compiler":"js"}'
  )
  const day = process.env.DAY ?? 'day1'

  await mkdir(`./src/${year}`, { recursive: true })

  try {
    await access(`./src/${year}/${day}.${compiler}`, F_OK)
  } catch (error) {
    await copyFile(
      resolve(__dirname, `../../../templates/index.${compiler}`),
      `./src/${year}/${day}.${compiler}`
    )
  }
}
