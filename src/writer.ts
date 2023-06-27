import { createObjectCsvWriter } from 'csv-writer'
import chalk from 'chalk'
const { green } = chalk

export default async (dest: string, data: any[]) => {
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
