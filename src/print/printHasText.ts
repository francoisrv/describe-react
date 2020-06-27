import { TextIdentifier, UnitTextIdentifier, TextIdentifierIsFn } from '../types'
import { printHighlight, printLogicOperator, printOrNor } from './common'
import { isReactElementComponentOf } from '../utils'
import One, { OneProps } from '../components/One'
import { compact, isBoolean, isString, isRegExp } from 'lodash'
import { Is, IsProps } from '../components/Is'
import printIs from './printIs'
import printTextIdentifier from './printTextIdentifier'

export default function printHasText(identifier: TextIdentifier, not = false) {
  const bits: string[] = [
    not && identifier !== false && printLogicOperator('not'),
    !not && identifier === false && printLogicOperator('not'),
    'to have text'
  ]
  const text = printTextIdentifier(identifier, not)
  if (isBoolean(identifier)) {
    bits.push()
  } else if (isString(identifier)) {
    bits.push('which equals', printHighlight(text))
  
  } else if (identifier instanceof RegExp) {
    bits.push('which matches', printHighlight(text))
  
  } else if(isReactElementComponentOf(identifier, Is)) {
    bits.push('which', text)
  }
  return compact(bits).join(' ')
}
