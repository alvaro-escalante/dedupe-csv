import csv from 'csv-parser'
import { createReadStream } from 'fs'
import Writer from './writer'
import Progress from './progress'
import chalk from 'chalk'
import validations from './validations'
const { cyan, yellow, green, red } = chalk
let progressCount: number = 0

export default async (
  total: number,
  filePath: string,
  file: string,
  column: string,
  keep: string
) => {
  let json: string[] = []
  let counter: number = 0
  const unique = new Map()
  const first = keep === 'first'
  const headers = column ? column.split(',').map((item) => item.trim()) : null
  const isHeader: boolean = headers !== null
  let firstRound: boolean = true

  const bar = Progress(total)

  if (!['first', 'last'].includes(keep) && typeof keep !== 'undefined') {
    validations('keep', keep)
  }

  createReadStream(filePath)
    .pipe(csv())
    .on('data', (obj) => {
      // Check the columns do exists
      if (firstRound) {
        if (isHeader) {
          const dataHeaders = Object.keys(obj).map((item) => item.trim())

          for (const header of headers) {
            if (!dataHeaders.includes(header)) {
              validations('headers', header, file)
            }
          }
        }
        firstRound = false
        console.clear()
        bar.start(total, 0)
      }

      bar.update(progressCount++)

      if (Object.keys(obj).length === 0) return

      let key: string

      if (!isHeader) {
        key = JSON.stringify(obj)
      } else if (headers.length > 1) {
        key = headers.map((col) => obj[col]).join(',')
      } else {
        key = obj[headers[0]]
      }

      if (unique.has(key)) {
        counter++
        if (!first) {
          const existingEntry = unique.get(key)
          const existingValue = existingEntry[column]
          const newValue = obj[column]
          if (existingValue <= newValue) unique.set(key, obj)
        }
      } else {
        unique.set(key, obj)
        if (first) json.push(obj)
      }
    })
    // Test the
    .on('end', async () => {
      bar.stop()
      if (!first) json = [...unique.values()]
      if (counter > 0) {
        const plural = counter > 1 ? 's' : ''
        console.log(
          yellow.bold(`${counter} duplicate${plural}`),
          `found out of ${total} rows`
        )
        console.log(cyan('Writing...'))
        await Writer(`${file.split('.csv')[0]}_deduped.csv`, json)
      } else {
        console.log(green.bold('No duplicates found'))
      }
    })
}
