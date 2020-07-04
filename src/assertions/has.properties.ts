import { ReactTestInstance } from 'react-test-renderer'
import { toPairs, isString, isEqual, isArray, isEmpty, filter, isObject, find } from 'lodash'

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

  const passed = predicate(() => {
    if ('properties' in props) {
      if (props.properties === true) {
        expect(isEmpty(elem.props)).toBe(false)
      } else if (isObject(props.properties)) {
        if ('exact' in props) {
          expect(elem.props).toEqual(props.properties)
        } else {
          for (const key in props.properties) {
            expect(elem.props).toHaveProperty(key, props.properties[key])
          }
        }
      }
    } else if ('property' in props) {
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

      expect(properties.length > 0).toBe(true)
    }
  })

  expect(passed).toBe(!isNot)
}
