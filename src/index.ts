#!/usr/bin/env node
import LineCounter from './line-counter'
import { resolve } from 'path'
import ProcessFile from './process-file'
import chalk from 'chalk'
import Options from './options'
const { green } = chalk

export const Deduper = async () => {
  console.log('Working...')
  const { file, column, keep } = Options()

  const total = await LineCounter(file)

  if (file === '') {
    const filename = green(`file='name_of_file.csv'`)
    console.log(`No CSV included, please specify a csv file by using ${filename}`)
    process.exit()
  }

  const filePath = resolve(process.cwd(), file) // Resolve the absolute file path

  await ProcessFile(total, filePath, file, column, keep)
}

Deduper()
