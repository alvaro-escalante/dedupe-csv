#!/usr/bin/env node

import csv from 'csv-parser'
import { createObjectCsvWriter } from 'csv-writer'
import { createReadStream } from 'fs'
import { resolve } from 'path'
import chalk from 'chalk'
const { cyan, yellow, green } = chalk

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

export const Deduper = () => {
  const column = process.argv[2] // Get the column from the command line argument
  const file = process.argv[3] // Get the file from the command line argument
  const opt = process.argv[4] // Options first
  let counter = new Map()
  let json = []
  const unique = new Map()
  const firstEntry = opt !== 'last'

  console.log(cyan('Working...'))

  const filePath = resolve(process.cwd(), file) // Resolve the absolute file path

  createReadStream(filePath)
    .pipe(csv())
    .on('error', (error) => console.log(error))
    .on('data', (entry) => {
      // Check the value is not duplicated
      if (!unique.has(entry[column])) {
        unique.set(entry[column], entry) // Add the first instance of each unique name
        counter.set(entry[column], 0) // Initialize the counter for each unique name
      } else {
        const count = counter.get(entry[column])
        counter.set(entry[column], count + 1) // Increment the counter for each duplicate
        if (!firstEntry) {
          unique.set(entry[column], entry) // Update with the last instance if firstEntry is false
        }
      }
    })
    .on('end', async () => {
      if (counter.size) {
        json = [...unique.values()]
        const plural = counter.size > 1 ? 's' : ''
        console.log(yellow.bold(`${counter.size} duplicate${plural} found`))
        await writeCSV(`${file.split('.csv')[0]}_dedupped.csv`, json)
      } else {
        console.log(green.bold('No duplicates found'))
      }
    })
}

Deduper()
