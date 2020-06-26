import { IsProps } from '../components/Is'
import { printType, printHighlight } from './common'

const defaultUnion = ', '

export default function printIs<T, F extends (...args: any[]) => any>(props: IsProps<T, F>, formatter?: ((t: any) => string), union?: string) {
  if (props.anything) {
    return 'is anything'
  }
  if (props.true === true) {
    return 'is true'
  }
  if (props.false) {
    return 'is false'
  }
  if (props.null) {
    if (props.not) {
      return 'is not null'
    }
    return 'is null'
  }
  if (props.undefined) {
    if (props.not) {
      return 'is not undefined'
    }
    return 'is undefined'
  }
  if (props.string) {
    if (props.not) {
      return 'is not a string'
    }
    return 'is a string'
  }
  if (props.number) {
    if (props.not) {
      return 'is not a number'
    }
    return 'is a number'
  }
  if (props.boolean) {
    if (props.not) {
      return 'is not a boolean'
    }
    return 'is a boolean'
  }
  if (props.object) {
    if (props.not) {
      return 'is not an object'
    }
    return 'is an object'
  }
  if (props.array) {
    if (props.not) {
      return 'is not an array'
    }
    return 'is an array'
  }
  if (props.date) {
    if (props.not) {
      return 'is not a date'
    }
    return 'is a date'
  }
  if (props.error) {
    if (props.not) {
      return 'is not an error'
    }
    return 'is an error'
  }
  if (props.regular && props.expression) {
    if (props.not) {
      return 'is not a regular expression'
    }
    return 'is a regular expression'
  }
  if ('exactly' in props) {
    return `is exactly ${ JSON.stringify(props.exactly) }`
  }
  if (props.of) {
    const items = formatter ? props.of.map(formatter) : props.of.map(o => JSON.stringify(o))
    const value = items.join(union || defaultUnion)
    if (props.not) {
      return `is not one of ${ value }`
    }
    return `is one of ${ value }`
  }
  if (typeof props.true === 'function') {
    return `returns ${ props.not ? 'not ' : ''}true to the function ${ printHighlight(printType(props.true)) }`
  }
  if (props.valid) {
    return `satisfies ${ props.not ? 'not ' : ''}assertion ${ printType(props.valid) }`
  }
  if ('not' in props) {
    const value = formatter ? formatter(props.not) : JSON.stringify(props.not)
    return `is not ${ value }`
  }
}
