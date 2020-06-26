import { TextIdentifier, UnitTextIdentifier, TextIdentifierIsFn } from '../types'
import { printHighlight, printLogicOperator, printOrNor } from './common'
import { isReactElementComponentOf } from '../utils'
import One, { OneProps } from '../components/One'
import { compact } from 'lodash'
import { Is, IsProps } from '../components/Is'
import printIs from './printIs'

export default function printHasText(identifier: TextIdentifier, not = false) {
  const bits: string[] = [
    not && identifier !== false && printLogicOperator('not'),
    !not && identifier === false && printLogicOperator('not'),
    'to have text'
  ]
  if (typeof identifier === 'boolean') {
    //
  
  } else if (typeof identifier === 'string') {
    bits.push(
      'which equals',
      printHighlight(identifier.toString())
    )
  
  } else if (identifier instanceof RegExp) {
    bits.push(`which matches ${ printHighlight(identifier.toString()) }`)
  
  } else if(isReactElementComponentOf(identifier, Is)) {
    const { props} = identifier as React.ReactElement<IsProps<UnitTextIdentifier, TextIdentifierIsFn>>
    bits.push(
      'which',
      printIs(
        props,
        printHighlight,
        printLogicOperator(props.not ? ' nor ' : ' or ')
      )
    )
  }
  return compact(bits).join(' ')
}