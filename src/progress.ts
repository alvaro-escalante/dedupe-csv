import { SingleBar, Presets } from 'cli-progress'
import chalk from 'chalk'
const { cyan } = chalk

export default (total: number) => {
  const bar = new SingleBar(
    {
      format: `Progress |${cyan(
        '{bar}'
      )}| {percentage}% | Time: {duration}s | {value}/${total}`,
      clearOnComplete: true,
      barCompleteChar: '\u2588',
      barIncompleteChar: '.',
      hideCursor: false
    },
    Presets.shades_classic
  )

  return bar
}
