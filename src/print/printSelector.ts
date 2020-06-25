import { getNumberWithOrdinal, isReactElementComponentOf } from '../utils'
import printHasType from './printHasType'
import { ChildSelector } from '../types'
import { printType } from './common'
import Type from '../components/Type'

export interface PrintSelectorProps {
  any?:           boolean
  at?:            number
  child?:         ChildSelector
  children?:      true
  element?:       true
  every?:         true
  first?:         true
  last?:          true
  of?:            amy
  only?:          true
  range?:         [number, number]
  root?:          true
  some?:          true
}

export default function printSelector(props: PrintSelectorProps) {
  const bits: string[] = []

  if (props.element === true) {
    bits.push('root element')
  } else if ('child' in props) {
    if (props.child) {
      if (props.last) {
        bits.push('last')
      } else if (props.only) {
        bits.push('only')
      } else if (props.any) {
        bits.push('any')
      } else if('at' in props) {
        bits.push(getNumberWithOrdinal(props.at + 1))
      } else {
        bits.push('first')
      }
      bits.push('child')
      if (
        typeof props.child === 'string' ||
        typeof props.child === 'function'
      ) {
        bits.push(`with type ${ printType(props.child) }`)
      } else if (typeof props.child === 'boolean') {

      } else if (isReactElementComponentOf(props.child, Type)) {
        if (props.child.props.is) {
          bits.push(`with type ${ printType(props.child.props.is) }`)
        } else if (props.child.props.isNot) {
          bits.push(`not with type ${ printType(props.child.props.isNot) }`)
        } else if (props.child.props.isOneOf) {
          bits.push(`with type which is one of ${ props.child.props.isOneOf.map(printType).join(' or ') }`)
        } else if (props.child.props.isNotOneOf) {
          bits.push(`with type which is not ${ props.child.props.isNotOneOf.map(printType).join(' nor ') }`)
        }
      }

      if (props.of) {
        bits.push('of parent element div')
      }
    }
  }

  return bits.join(' ')
}
