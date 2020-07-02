import { ReactTestInstance } from 'react-test-renderer'
import { toPairs, isString, isEqual, isArray, isEmpty, filter } from 'lodash'

import DescribeReactError from '../DescribeReactError'
import which from './which'

import { HasPropsProps } from '../components/Has'
import { predicate } from '../utils'
import { printElement, printProps } from '../print'

export default function hasProperties(elem: ReactTestInstance | ReactTestInstance[], props: HasPropsProps) {
  if (isArray(elem)) {
    for (const v of elem) {
      hasProperties(v, props)
    }
    return
  }

  const isNot = ('not' in props || 'no' in props)

  if (isEqual(props, { properties: true })) {
    try {
      expect(isEmpty(elem.props)).toBe(false)
    } catch (error) {
      throw new DescribeReactError(`Expected ${ printElement(elem) } to have properties`)
    }
  } else if (
    isEqual(props, { no: true, property: true }) ||
    isEqual(props, { no: true, properties: true }) ||
    isEqual(props, { not: true, property: true }) ||
    isEqual(props, { not: true, properties: true })
  ) {
    try {
      expect(isEmpty(elem.props)).toBe(true)
    } catch (error) {
      throw new DescribeReactError(`Expected ${ printElement(elem) } NOT to have properties`)
    }
  } else {
    let properties = toPairs(elem.props || {})
      .map(([name, value]) => ({ name, value }))
    
    if ('property' in props && isString(props.property)) {
      properties = filter(properties, { name: props.property })
    }

    if ('which' in props) {
      properties = properties.filter(
        property => predicate(() => which(property.value, props.which))
      )
    }

    try {
      expect(properties.length > 0).toBe(!isNot)
    } catch (error) {
      throw new DescribeReactError(`Expected ${ printElement(elem) } to ${ isNot ? 'not ' : ''}have ${ printProps(props) }`)
    }
  }
}
