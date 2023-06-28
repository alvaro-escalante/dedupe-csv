import { createReadStream } from 'fs'
import readline from 'readline'

export default async (file: string) => {
  let lineCount: number = 0

  const readStream = createReadStream(file)
  const lines = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  })

  for await (const _ of lines) lineCount++
  return lineCount
}
