import chalk from 'chalk'
import validations from './validations'

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
        validations('label', label)
      }
    }
  }

  return options
}
