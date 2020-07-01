import colors from 'colors'
import { Dictionary, isEmpty, isObject, truncate, isFunction, isString, isRegExp, isDate, isError, omit, isArray, isUndefined, isBoolean } from 'lodash'
import ReactTestRender from 'react-test-renderer'
import { isReactElement, isReactElementComponentOf } from '../utils'
import { Is } from '../components/Is'
import printIs from './printIs'

export const TRUNCATE = 100

export function printType(type: string | React.ComponentType<any>) {
  return printGeneric(type)
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
    } else if (object[key] === true) {
      props.push(`${ key }`)
    } else if (isFunction(object[key])) {
      props.push(`${ key }={ ${ printType(object[key]) } }`)
    } else if (
      typeof object[key] === 'object' &&
      'key' in object[key] &&
      'ref' in object[key] &&
      'props' in object[key] &&
      '_owner' in object[key] &&
      '_store' in object[key]
    ) {
      props.push(`${ key }={ <${ object[key].type.name } ${ printProps(object[key].props) } /> }`)
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
    return truncate(`[${ g.map(printGeneric).join(', ') }]`, { length: TRUNCATE })
  }
  if (isObject(g)){
    if (isReactElementComponentOf(g as React.ReactElement<any>, Is)) {
      return printIs((g as React.ReactElement<any>).props)
    }
    if (isReactElement(g as React.ReactElement<any>)) {
      return truncate(printElement(g), { length: TRUNCATE })
    }
    let str = '{ '
    for (const key in g) {
      str += `${ colors.underline(key) }: ${ printGeneric(g[key]) }, `
    }
    str = str.replace(/, $/, '')
    str += ' }'
    return truncate(str, { length: TRUNCATE })
  }
  return truncate(JSON.stringify(g), { length: TRUNCATE })
}
