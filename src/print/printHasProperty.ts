import { compact, isString, isBoolean, isRegExp, isObject, first, Dictionary } from 'lodash'

import { PropertyIdentifier, UnitPropertyIdentifier, PropertyIdentifierIsFn } from '../types'
import { printHighlight, printLogicOperator, printType, printGeneric } from './common'
import { isReactElementComponentOf } from '../utils'
import { IsProps, Is } from '../components/Is'
import printIs from './printIs'

function printPropertyObject(object: Dictionary<any>) {
  return Object
    .keys(object)
    .map(
      key => {
        let str = `with name ${ printHighlight(key) } which value `
        if (isReactElementComponentOf(object[key], Is)) {
          str += printGeneric(object[key])
        } else {
          str += `equals ${ printHighlight(printGeneric(object[key])) }`
        }
        return str
      }
    )
    .join(printLogicOperator(' and '))
}

export default function printHasProperty(identifier: PropertyIdentifier, not = false) {
  const bits: string[] = [
    not && printLogicOperator('not'),
    'to have'
  ]
  if (isBoolean(identifier)) {
    bits.push('properties')
  } else if (isString(identifier)) {
    bits.push(
      'property',
      'with name',
      printHighlight(identifier)
    )
  } else if (isRegExp(identifier)) {
    bits.push(
      'property',
      'with name matching',
      printHighlight(identifier.toString())
    )
  } else if (isObject(identifier)) {
    if (Object.keys(identifier).length === 1) {
      bits.push(
        'property',
        printPropertyObject(identifier)
      )
    } else {
      bits.push(
        'some properties',
        printPropertyObject(identifier)
      )
    }
  } else if (isReactElementComponentOf(identifier, Is)) {
    const { props} = identifier as React.ReactElement<IsProps<UnitPropertyIdentifier, PropertyIdentifierIsFn>>
    bits.push(
      'which',
      printIs(props)
    )
  }
  return compact(bits).join(' ')
}
