#!/usr/bin/env node
import csv from 'csv-parser'
import { createReadStream } from 'fs'
import { resolve } from 'path'
import chalk from 'chalk'
const { cyan, yellow, green, red } = chalk
import Options from './options'

import { createObjectCsvWriter } from 'csv-writer'

const Writer = async (dest: string, data: any[]) => {
  // Create CSV writer and take the headers from the first row
  const csvWriter = createObjectCsvWriter({
    path: dest,
    header: Object.keys(data[0]).map((fieldName) => ({
      id: fieldName,
      title: fieldName
    }))
  })

  // Write to file
  try {
    await csvWriter.writeRecords(data)
    console.log(green(`${dest} created successfully`))
  } catch (error) {
    throw new Error(error)
  }
}

const readFile = async (filePath: string, file: string, column: string, keep: string) => {
  let json: string[] = []
  let counter: number = 0
  const unique = new Map()
  const first = keep === 'first'
  let isHeader: boolean = true

  const headers = column ? column.split(',') : null

  if (!['first', 'last'].includes(keep) && typeof keep !== 'undefined') {
    console.log(
      red.bold(`${keep}`),
      'Is not a valid option, please use only',
      green(`'first' 'last'`),
      'as options'
    )
    process.exit()
  }

  createReadStream(filePath)
    .pipe(csv())
    .on('error', (error) => console.log(error))
    .on('data', (entry) => {
      if (Object.keys(entry).length === 0) return

      let key: string

      if (headers === null) {
        isHeader = false
        key = JSON.stringify(entry)
      } else if (headers.length > 1) {
        key = headers.map((col) => entry[col]).join(',')
      } else {
        key = entry[headers[0]]
      }

      if (unique.has(key)) {
        counter++
        if (!first) {
          const existingEntry = unique.get(key)
          const existingValue = existingEntry[column]
          const newValue = entry[column]
          if (existingValue <= newValue) unique.set(key, entry)
        }
      } else {
        unique.set(key, entry)
        if (first) json.push(entry)
      }
    })
    // Test the
    .on('end', async () => {
      if (json.length && isHeader) {
        for (const header of headers) {
          if (!Object.keys(json[0]).includes(header)) {
            console.log(
              red.bold(`${column}`),
              'column does not exists on the',
              green(`${file}`),
              'file'
            )
            process.exit()
          }
        }
      }

      if (!first) json = [...unique.values()]
      if (counter > 0) {
        const plural = counter > 1 ? 's' : ''
        console.log(yellow.bold(`${counter} duplicate${plural} found`))
        await Writer(`${file.split('.csv')[0]}_deduped.csv`, json)
      } else {
        console.log(green.bold('No duplicates found'))
      }
    })
}

export const Deduper = async () => {
  console.log(cyan('Working...'))

  const { file, column, keep } = Options()

  const filePath = resolve(process.cwd(), file) // Resolve the absolute file path

  await readFile(filePath, file, column, keep)
}

Deduper()
