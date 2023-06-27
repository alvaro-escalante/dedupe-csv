import { execSync } from 'child_process'
import path from 'path'
import { readFileSync, unlinkSync } from 'fs'

// Function that executes the file as form the command line
const runCommadLine = (file?: string, cat: string = '', opt: string = '') => {
  const filePath = file ? path.join(__dirname, file) : null

  try {
    const consoleOutput = execSync(
      `node ./lib/index.js file="${filePath}" ${cat ? `column="${cat}"` : ''} ${
        opt ? `keep="${opt}"` : ''
      }`,
      {
        encoding: 'utf-8' // Capture the output as a string
      }
    ).trim()

    return consoleOutput

    // Add assertions to test the generated CSV file content
  } catch (error) {
    // Handle any error that occurred during script execution
    console.log(error)
    return ''
  }
}

// Helper function to conduct the test
const executeTest = (params: [string, string?, string?], output: string) => {
  let fileContent = ''
  const filePath = `__tests__/${params[0].replace('.csv', '')}_deduped.csv`

  beforeAll(() => {
    runCommadLine(...params)
    fileContent = readFileSync(filePath, 'utf-8')
  })

  afterAll(() => unlinkSync(filePath))

  it('Checks the output CSV file content', () => expect(fileContent).toEqual(output))
}

describe('Check the content of the files', () => {
  describe('Dedupe duplicates by brand catergory', () => {
    executeTest(['data-simple.csv', 'brand'], 'brand,style,rating\nYum,cup,1\n')
  })

  describe('Dedupe duplicates by style catergory', () => {
    executeTest(
      ['data-category.csv', 'style'],
      'brand,style,rating\nYum,cup,1\nYum,pack,2\n'
    )
  })

  describe('Dedupe duplicates by style catergory keep last', () => {
    executeTest(
      ['data-category.csv', 'style', 'last'],
      'brand,style,rating\nFoo,cup,1\nFoo,pack,2\n'
    )
  })

  describe('Dedupe duplicates by style catergory keep last', () => {
    executeTest(
      ['data-category.csv', 'style', 'last'],
      `brand,style,rating\nFoo,cup,1\nFoo,pack,2\n`
    )
  })

  describe('Dedupe duplicates by default if there duplicated lines', () => {
    executeTest(['data-equal.csv', 'style', 'last'], `brand,style,rating\nYum,cup,1\n`)
  })

  describe('Dedupe duplicates with multiple parameters', () => {
    executeTest(
      ['data-multiple.csv', 'brand,style'],
      `brand,style,rating\nYum,cup,1\nFoo,cup,1\nFoo,pack,3\n`
    )
  })
})

describe('Check error on wrong colmuns', () => {
  test('Error with bran not beeing a valid column', () => {
    const output = runCommadLine('data-simple.csv', 'bran')
    expect(output).toMatch(/The bran column not be found on the|Working\.\.\.|.*\d.*/)
    expect(output).toContain('')
  })

  test('Error with order argunment `last` not beeing a valid parameter', () => {
    const output = runCommadLine('data-simple.csv', 'brand', 'notlast')
    expect(output).toMatch(
      /notlast Is not a valid option, please use only \'first\' \'last\' as options|Working\.\.\.|.*\d.*/
    )
  })
})
