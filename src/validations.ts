import chalk from 'chalk'
const { red, yellow, green } = chalk

export default async (error: string, item?: string, file?: string) => {
  let message: string

  if (error === 'no-file') {
    message = `${red(
      `No CSV path included`
    )} please specify a valid path to a csv file by adding ${yellow(
      `file='name_of_file.csv'`
    )}`
  }

  if (error === 'incorrent-file') {
    message = `${red(`CSV file not found`)} please make sure the file ${red(
      item
    )} is on the path indicated`
  }

  if (error === 'label') {
    message = red(`${item} is not a valid option`)
  }

  if (error === 'keep') {
    message = `${red.bold(item)} Is not a valid option, please use only ${green(
      'first'
    )} or ${green('last')} as options`
  }

  if (error === 'headers') {
    message = `The ${red.bold(item)} column not be found on the ${green(file)} file`
  }
  console.log(message)
  process.exit()
}
