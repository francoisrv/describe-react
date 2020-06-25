import { TextIdentifier, Of, UnitTextIdentifier } from '../types'
import { printHighlight, printAssertion, printLogicOperator, printOrNor, printIsTrue } from './common'
import Assert from '../entities/Assert'
import { isReactElementComponentOf } from '../utils'
import One, { OneProps } from '../components/One'
import { compact } from 'lodash'
import { type } from 'os'
import IsTrue from '../entities/IsTrue'

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
  
  } else if (identifier instanceof Assert) {
    bits.push(`which statisfies assertion ${ printHighlight(printAssertion(identifier)) }`)
  
  } else if (identifier instanceof IsTrue) {
    bits.push(`which returns true to ${ printHighlight(printIsTrue(identifier)) }`)  
  
  } else if(isReactElementComponentOf(identifier, One)) {
    const { props} = identifier as React.ReactElement<OneProps<Of<UnitTextIdentifier>>>
    const ofs = props.of.map(p => printHasText(p, not).replace(/^which /, ''))
    bits.push(
      'which',
      ofs.join(printLogicOperator(` ${ printOrNor(not)} `))
    )
  }
  return compact(bits).join(' ')
}