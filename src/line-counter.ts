import { readFile } from 'fs/promises'

export default async (file: string) => {
  try {
    const data = await readFile(file)
    const content = data.toString()

    // Remove empty lines from the content
    const nonEmptyContent = content.replace(/^\s*[\r\n]|[\r\n]\s*$/g, '')

    // Split the non-empty content into lines
    const lines = nonEmptyContent.split('\n')

    // Exclude the header line from the line count
    const lineCount = lines.length > 0 ? lines.length - 2 : 0

    return lineCount
  } catch (err) {
    console.error(err)
  }
}
