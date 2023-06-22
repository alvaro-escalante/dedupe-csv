import chalk from 'chalk'
const { red } = chalk

export default () => {
  const options = {
    file: '',
    column: '',
    keep: 'first'
  }

  for (const [index, argv] of process.argv.entries()) {
    if (index > 1) {
      const [label, value] = argv.split('=')
      if (Object.keys(options).includes(label)) {
        options[label] = value
      } else {
        console.log(red(`${label} is not a valid option`))
        process.exit()
      }
    }
  }

  return options
}
