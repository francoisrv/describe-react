import { TypeIdentifier, Of, UnitTypeIdentifier } from '../types'
import { printHighlight, printLogicOperator, printOrNor } from './common'
import { isReactElementComponentOf } from '../utils'
import One, { OneProps } from '../components/One'
import { compact } from 'lodash'

export default function printHasType(identifier: TypeIdentifier, not = false) {
  const bits: string[] = [
    not && printLogicOperator('not'),
    'to have type'
  ]
  if (typeof identifier === 'string') {
    bits.push(
      'which is',
      `< ${ printHighlight(identifier.toString()) } >`
    )
  } else if (typeof identifier === 'function') {
    if (identifier.name) {
      bits.push(
        'which is component',
        `< ${ printHighlight(identifier.name) } >`
      )
    } else {
      bits.push(
        'which is component',
        `< ${ printHighlight(identifier.toString()) } >`
      )
    }
  } else if(isReactElementComponentOf(identifier, One)) {
    const { props} = identifier as React.ReactElement<OneProps<Of<UnitTypeIdentifier>>>
    const ofs = identifier.props.of.map(p => printHasType(p, not).replace(/^which /, ''))
    bits.push(
      'which',
      ofs.join(printLogicOperator(` ${ printOrNor(not)} `))
    )
  }
  return compact(bits).join(' ')
}