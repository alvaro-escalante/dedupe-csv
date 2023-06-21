import { execSync } from 'child_process'
import fs from 'fs'

const runTest = (file: string, cat: string = '', opt: string = '') => {
  try {
    execSync(`ts-node ./src/index.ts '__tests__/${file}' '${cat}' ${opt}`, {
      stdio: 'inherit'
    })
    // Add assertions to test the generated CSV file content
  } catch (error) {
    // Handle any error that occurred during script execution
    console.error('Something went wrong')
  }
}

describe('Dedupe duplicates by brand catergory', () => {
  it('Dedupe data-simple.csv', () => runTest('data-simple.csv', 'brand'))

  test('Checks the output CSV file content', () => {
    const expectedContent = `brand,style,rating\nYum,cup,1\n`
    const filePath = '__tests__/data-simple_deduped.csv'

    const fileContent = fs.readFileSync(filePath, 'utf-8')

    expect(fileContent).toEqual(expectedContent)

    // Delete the file
    fs.unlinkSync(filePath)
  })
})

describe('Dedupe duplicates by style catergory', () => {
  it('Dedupe data-category.csv', () => runTest('data-category.csv', 'style'))

  test('Checks the output CSV file content', () => {
    const expectedContent = `brand,style,rating\nYum,cup,1\nYum,pack,2\n`
    const filePath = '__tests__/data-category_deduped.csv'
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    expect(fileContent).toEqual(expectedContent)

    // Delete the file
    fs.unlinkSync(filePath)
  })
})

describe('Dedupe duplicates by style catergory keep last', () => {
  it('Dedupe data-category.csv', () => runTest('data-category.csv', 'style', 'last'))

  test('Checks the output CSV file content', () => {
    const expectedContent = `brand,style,rating\nFoo,cup,1\nFoo,pack,2\n`
    const filePath = '__tests__/data-category_deduped.csv'
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    expect(fileContent).toEqual(expectedContent)

    // Delete the file
    fs.unlinkSync(filePath)
  })
})

describe('Dedupe duplicates by default if there duplicated lines', () => {
  it('Dedupe data-equal.csv', () => runTest('data-equal.csv'))

  test('Checks the output CSV file content', () => {
    const expectedContent = `brand,style,rating\nYum,cup,1\n`
    const filePath = '__tests__/data-equal_deduped.csv'
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    expect(fileContent).toEqual(expectedContent)

    // Delete the file
    fs.unlinkSync(filePath)
  })
})
