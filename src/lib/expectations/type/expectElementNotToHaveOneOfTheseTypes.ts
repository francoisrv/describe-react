import ReactTestRenderer from 'react-test-renderer'
import { TypeDescriber } from '../../../types'
import expectElementNotToHaveType from './expectElementNotToHaveType'
import labelTestInstance from '../../labelers/testInstance'
import { printAny } from '../../utils'

export default function expectElementNotToHaveOneOfTheseTypes(
  elem: ReactTestRenderer.ReactTestInstance,
  types: TypeDescriber[]
) {
  const matches: boolean[] = []
  for (const type of types) {
    let passed = true
    try {
      expectElementNotToHaveType(elem, type)
    } catch (error) {
      passed = false
    }
    matches.push(passed)
  }
  if (!matches.some(Boolean)) {
    throw new Error(`Expected ${ labelTestInstance(elem) } *NOT* to have one of these types: ${ types.map(printAny).join(', ') }`)
  }
}
