import { IsProps } from '../components/Is'
import { printType, printHighlight, printLogicOperator, printGeneric } from './common'
import { isArray, isFunction, compact } from 'lodash'

export default function printIs<T, F extends (...args: any[]) => any>(props: IsProps<T, F>) {
  const bits: string[] = ['is']
  for (const prop in props) {
    switch (prop) {
      case 'regular':
      case 'string':
      case 'number':
      case 'boolean':
      case 'date': {
        if (!props.a) {
          bits.push('a')
        }
      } break
      case 'array':
      case 'object':
      case 'error': {
        if (!props.an) {
          bits.push('an')
        }
      } break
    }
    
    if (prop === 'true' && isFunction(props[prop])) {
      if (props.not) {
        bits[0] = 'does not return true to the function'
        bits[1] = ''
      } else {
        bits[0] = 'returns true to the function'
      }
    } else if (prop === 'valid' && isFunction(props[prop])) {
      if (props.not) {
        bits[0] = 'does not satisfy the assertion'
        bits[1] = ''
      } else {
        bits[0] = 'satisfies the assertion'
      }
    } else {
      bits.push(prop)
    }
    
    if (isArray(props[prop])) {
      bits.push(
        props[prop]
          .map(p => printHighlight(printGeneric(p)))
          .join(printLogicOperator(props.not ? ' nor ' : ' or '))
      )
    } else if (props[prop] !== true) {
      bits.push(printHighlight(printGeneric(props[prop])))
    }
  }
  return compact(bits).join(' ')
}
