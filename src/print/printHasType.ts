import { compact, isString, isFunction } from 'lodash'

import { TypeIdentifier, UnitTypeIdentifier, TypeIdentifierIsFn } from '../types'
import { printHighlight, printLogicOperator, printType } from './common'
import { isReactElementComponentOf } from '../utils'
import { IsProps, Is } from '../components/Is'
import printIs from './printIs'

export default function printHasType(identifier: TypeIdentifier, not = false) {
  const bits: string[] = [
    not && printLogicOperator('not'),
    'to have type'
  ]
  if (isString(identifier) || isFunction(identifier)) {
    bits.push(
      'which is',
      isFunction(identifier) && 'component',
      printHighlight(printType(identifier))
    )
  } else if(isReactElementComponentOf(identifier, Is)) {
    const { props} = identifier as React.ReactElement<IsProps<UnitTypeIdentifier, TypeIdentifierIsFn>>
    bits.push(
      'which',
      printIs(props)
    )
  }
  return compact(bits).join(' ')
}
