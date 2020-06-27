import ReactTestRender from 'react-test-renderer'
import { TypeIdentifier, UnitTypeIdentifier, TypeIdentifierIsFn } from '../types'
import { printElement } from '../print/common'
import printHasType from '../print/printHasType'
import DescribeReactError from '../DescribeReactError'
import { isReactElementComponentOf } from '../utils'
import { Is, IsProps } from '../components/Is'
import { isString, isFunction } from 'lodash'
import assertIs from './assertIs'

export default function hasType(
  elem: ReactTestRender.ReactTestInstance,
  type: TypeIdentifier
) {
  try {
    if (typeof type === 'string' || typeof type === 'function') {
      expect(elem).toHaveProperty('type', type)
    }  else if (isReactElementComponentOf(type, Is)) {
      assertIs(
        type.props,
        (t: TypeIdentifier) => hasType(elem, t),
        [elem.type, elem]
      )
    }
  } catch (error) {
    const message = `Expected element ${ printElement(elem) } ${ printHasType(type) }`
    if (error instanceof DescribeReactError) {
      throw new DescribeReactError(`${ message }\n\n${ error }`)
    }
    throw new DescribeReactError(message)
  }
}
