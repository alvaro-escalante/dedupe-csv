#!/usr/bin/env node
import csv from 'csv-parser'
import { createObjectCsvWriter } from 'csv-writer'
import { createReadStream } from 'fs'
import { resolve } from 'path'
import chalk from 'chalk'
const { cyan, yellow, green, red } = chalk

const writeCSV = async (dest: string, data: any[]) => {
  // Create CSV writer and take the headers from first row
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

const readFile = async (filePath: string, file: string, header: string, keep: string) => {
  let json = []
  let counter = 0
  const unique = new Map()
  const first = keep === 'first'

  if (!['first', 'last'].includes(keep)) {
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
      const key = header ? entry[header] : JSON.stringify(entry)

      if (!unique.has(key)) {
        unique.set(key, entry)
        if (first) json.push(entry)
      } else {
        if (!first) unique.set(key, entry)
        counter++
      }
    })
    .on('end', async () => {
      if (!Object.keys(json[0]).includes(header)) {
        console.log(
          red.bold(`${header}`),
          'header does not exists on',
          green(`${file}`),
          'file'
        )
        process.exit()
      }
      if (!first) json = [...unique.values()]
      if (counter > 0) {
        const plural = counter > 1 ? 's' : ''
        console.log(yellow.bold(`${counter} duplicate${plural} found`))
        await writeCSV(`${file.split('.csv')[0]}_deduped.csv`, json)
      } else {
        console.log(green.bold('No duplicates found'))
      }
    })
}

export const Deduper = async () => {
  console.log(cyan('Working...'))

  const file = process.argv[2] // Get the file from the command line argument
  const header = process.argv[3] // Get the column from the command line argument
  const keep = process.argv[4] ?? 'first' // Options first

  const filePath = resolve(process.cwd(), file) // Resolve the absolute file path

  await readFile(filePath, file, header, keep)
}

Deduper()
