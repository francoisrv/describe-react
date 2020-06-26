import colors from 'colors'
import { Dictionary, isEmpty } from 'lodash'
import ReactTestRender from 'react-test-renderer'

export function printType(type: string | React.ComponentType<any>) {
  if (typeof type === 'string') {
    return type
  }
  if (type.name) {
    return type.name
  }
  return type.toString()
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
    if (typeof object[key] === 'string') {
      props.push(`${ key }="${ object[key] }"`)
    } else if (object[key] === true) {
      props.push(`${ key }`)
    } else if (typeof object[key] === 'function') {
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
    } else if (typeof object[key] === 'object') {
      props.push(`${ key }={ ${ JSON.stringify(object[key]) } }`)
    } else {
      props.push(`${ key }={ ${ object[key] } }`)
    }
  }
  return props.join(' ')
}

export function printElement(elem: ReactTestRender.ReactTestInstance | React.ReactElement<any>) {
  return `<${ printHighlight(printType(elem.type)) }${ isEmpty(elem.props) ? '' : ' ' }${ printProps(elem.props) } />`
}
