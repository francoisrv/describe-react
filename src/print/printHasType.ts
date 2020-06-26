import { compact } from 'lodash'

import { TypeIdentifier, UnitTypeIdentifier, TypeIdentifierIsFn } from '../types'
import { printHighlight, printLogicOperator, printOrNor, printType } from './common'
import { isReactElementComponentOf } from '../utils'
import { IsProps, Is } from '../components/Is'
import printIs from './printIs'

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
  } else if(isReactElementComponentOf(identifier, Is)) {
    const { props} = identifier as React.ReactElement<IsProps<UnitTypeIdentifier, TypeIdentifierIsFn>>
    bits.push(
      'which',
      printIs(
        props,
        f => `< ${ printHighlight(printType(f)) } >`,
        printLogicOperator(props.not ? ' nor ' : ' or ')
      )
    )
  }
  return compact(bits).join(' ')
}