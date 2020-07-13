import colors from 'colors'
import { Dictionary, isEmpty, isObject, truncate, isFunction, isString, isRegExp, isDate, isError, omit, isArray, isUndefined, isBoolean, isNull, isNumber, isEqual, keys } from 'lodash'
import ReactTestRender from 'react-test-renderer'

import { isReactElement, isReactTestRendererInstance, isReactElementComponentOf } from './utils'
import Is, { IsProps } from './components/Is'
import { ExpectElementProps, ExpectElementsProps } from './components/Expect'
import { Which } from './types'
import Has, { HasProps } from './components/Has'

export const TRUNCATE = 100

export function printType(type: string | React.ComponentType<any>) {
  return isString(type) ? type : printGeneric(type)
}

export function printLogicOperator(str: string) {
  return colors.italic(str)
}

export function printHighlight(str: string) {
  return colors.bold.underline(str)
}

export function printOrNor(not = false) {
  return not ? 'nor' : 'or'
}

export function printProps(object: Dictionary<any>) {
  const props: string[] = []
  for (const key in object) {
    if (key === 'children') {
      if (isBoolean(object.children)) {
        props.push(key)
      }
      continue
    } else if (isString(object[key])) {
      props.push(`${ key }="${ object[key] }"`)
    } else if (isError(object[key])) {
      props.push(`${ key }={ ${ object[key].toString() } }`)
    } else if (isFunction(object[key])) {
      props.push(`${ key }={ ${ printType(object[key]) } }`)
    } else if (isNull(object[key])) {
      props.push(`${ key }={ null }`)
    } else if (isBoolean(object[key])) {
      props.push(`${ key }={ ${ object[key] } }`)
    } else if (isReactElement(object[key])) {
      props.push(`${ key }={ ${ printElement(object[key]) } }`)
    } else if (isRegExp(object[key])) {
      props.push(`${ key }={ ${ object[key].toString() } }`)
    } else if (isArray(object[key])) {
      props.push(`${ key }={ ${ printGeneric(object[key]) } }`)
    } else if (isObject(object[key])) {
      props.push(`${ key }={ ${ JSON.stringify(object[key]) } }`)
    } else {
      props.push(`${ key }={ ${ object[key] } }`)
    }
  }
  return props.join(' ')
}

export function printElement(elem: ReactTestRender.ReactTestInstance | React.ReactElement<any>) {
  return `<${ printType(elem.type) }${ isEmpty(omit(elem.props, ['children'])) ? '' : ' ' }${ printProps(elem.props) } />`
}

export function printGeneric(g: any) {
  if (isUndefined(g)) {
    return 'undefined'
  }
  if (isNull(g)) {
    return 'null'
  }
  if (isString(g)) {
    return truncate(`"${g}"`, { length: TRUNCATE })
  }
  if (isFunction(g)) {
    if (g.name) {
      return g.name
    }
    return truncate(g.toString(), { length: TRUNCATE })
  }
  if (isRegExp(g) || isDate(g) || isError(g)) {
    return truncate(g.toString(), { length: TRUNCATE })
  }
  if (isArray(g)) {
    return truncate(`[ ${ g.map(printGeneric).join(', ') } ]`, { length: TRUNCATE })
  }
  if (isReactElement(g) || isReactTestRendererInstance(g)) {
    return printElement(g)
  }
  if (isObject(g)){
    let str = '{ '
    for (const key in g) {
      str += `${ key }: ${ printGeneric(g[key]) }, `
    }
    str = str.replace(/, $/, '')
    str += ' }'
    return truncate(str, { length: TRUNCATE })
  }
  return truncate(JSON.stringify(g), { length: TRUNCATE })
}

export function printLabel(props: Dictionary<any>) {
  const bits: string[] = []
  for (const prop in props) {
    bits.push(prop)
    switch (prop) {
      case 'element': {
        if (isString(props.element)) {
          bits.push(props.element)
        } else if (isFunction(props.element)) {
          bits.push(printGeneric(props.element))
        }
      } break

      case 'which': {
        if (isReactElementComponentOf(props.which, Is)) {
          bits.push('is')
        }
        bits.push(printLabel(props.which.props))
      } break

      case 'exactly': {
        bits.push(printGeneric(props.exactly))
      } break
    }
  }
  return bits.join(' ')
}

export function printIs<T>(props: IsProps<T>) {
  if ('exactly' in props) {
    return `exactly ${ printGeneric(props.exactly) }`
  }
  if ('not' in props) {
    if (isEqual(keys(props), ['not'])) {
      return `not ${ printGeneric(props.not) }`
    }
  }
  if ('string' in props) {
    let str = 'a string'
    if ('not' in props) {
      str = `not ${ str }`
    }
    return str
  }
  if ('number' in props) {
    let str = 'a number'
    if ('not' in props) {
      str = `not ${ str }`
    }
    return str
  }
  if ('boolean' in props) {
    let str = 'a boolean'
    if ('not' in props) {
      str = `not ${ str }`
    }
    return str
  }
  if ('array' in props) {
    let str = 'an array'
    if ('not' in props) {
      str = `not ${ str }`
    }
    return str
  }
  if ('object' in props) {
    let str = 'an object'
    if ('not' in props) {
      str = `not ${ str }`
    }
    return str
  }
  if ('error' in props) {
    let str = 'an error'
    if ('not' in props) {
      str = `not ${ str }`
    }
    return str
  }
  if ('regular' in props) {
    let str = 'a regular expression'
    if ('not' in props) {
      str = `not ${ str }`
    }
    return str
  }
}

export function printHas(props: HasProps) {
  if ('type' in props) {
    // @ts-ignore
    return `${ ('not' in props) ? 'not ' : '' }type ${ printType(props.type) }`
  }
  if ('text' in props) {
    if (isBoolean(props.text)) {
      let str = 'text'
      if ('not' in props || 'no' in props) {
        str = `no ${ str }`
      }
      return str
    }
    return `${ ('not' in props) ? 'not ' : '' }text ${ printGeneric(props.text) }`
  }
}

export function printWhich<T>(which: Which<T>): string {
  if (isArray(which)) {
    return which.map(printWhich).join(' and ')
  }
  if (isReactElementComponentOf(which, Is)) {
    return `is ${ printIs(which.props as IsProps<T>) }`
  }
  if (isReactElementComponentOf(which, Has)) {
    return `has ${ printHas(which.props as HasProps) }`
  }
}

export function printSelector(props: ExpectElementProps | ExpectElementsProps) {
  const bits: string[] = []
  for (const prop in props) {
    switch (prop) {
      case 'element':
      case 'elements': {
        bits.push(prop)
        // @ts-ignore
        if (!isBoolean(props[prop])) {
          // @ts-ignore
          bits.push(printType(props[prop]))
        }
      } break

      case 'root':
      case 'less':
      case 'more':
      case 'no':
      case 'not': {
        bits.push(prop)
      } break

      case 'number':
      case 'exactly':
      case 'than':
      case 'least':
      case 'between':
      case 'and': {
        bits.push(prop, props[prop])
      } break

      case 'first':
      case 'last': {
        if (isBoolean(props[prop])) {
          bits.push(prop)
        } else {
          bits.push(prop, props[prop])
        }
      } break

      case 'at': {
        if (isNumber(props[prop])) {
          bits.push('number', props[prop] + 1)
        } else {
          bits.push(prop)
        }
      } break

      case 'which': {
        bits.push('which', printWhich<any>(props[prop]))
      } break
    }
  }
  return bits.join(' ')
}
