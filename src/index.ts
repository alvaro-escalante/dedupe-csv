#!/usr/bin/env node
import LineCounter from './line-counter'
import { resolve } from 'path'
import ProcessFile from './process-file'
import Options from './options'
import chalk from 'chalk'
const { cyan } = chalk
import validation from './validations'

export const Deduper = async () => {
  console.log(cyan('Working...'))
  const { file, column, keep } = Options()
  let total: number

  // Count number of lines if file accessible
  try {
    total = await LineCounter(file)
  } catch (error) {
    if (file === '') validation('no-file')
    else validation('incorrent-file', file)
  }

  // Resolve the absolute file path
  const filePath = resolve(process.cwd(), file)

  await ProcessFile(total, filePath, file, column, keep)
}

Deduper()
