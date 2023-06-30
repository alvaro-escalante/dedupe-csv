import { createWriteStream } from 'fs'
import chalk from 'chalk'
const { green } = chalk

export default async (dest: string, data: any[]) => {
  // Create the header line from the keys of the first row
  const headers = Object.keys(data[0]).join(',')

  // Write to file
  try {
    const writeStream = createWriteStream(dest)
    writeStream.write(`${headers}\n`) // Write the header line

    for (const row of data) {
      const line = Object.values(row)
        .map((value) => {
          // Enclose values with quotes if they contain commas
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`
          }
          return value
        })
        .join(',')

      writeStream.write(`${line}\n`)
    }

    writeStream.end() // Close the write stream

    console.log(green(`${dest}`), 'created successfully')
  } catch (error) {
    throw new Error(error)
  }
}
