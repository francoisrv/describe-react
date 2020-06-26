import ReactTestRender from 'react-test-renderer'
import { TypeIdentifier } from '../types'
import { printElement, printType, printHighlight } from '../print/common'
import printHasType from '../print/printHasType'
import DescribeReactError from '../DescribeReactError'

export default function hasType(
  elem: ReactTestRender.ReactTestInstance,
  type: TypeIdentifier
) {
  try {
    expect(elem).toHaveProperty('type', type)
  } catch (error) {
    throw new DescribeReactError(`Expected element ${ printElement(elem) } ${ printHasType(type) }\nYet element\'s type is ${ printHighlight(printType(elem.type))}`)
  }
}