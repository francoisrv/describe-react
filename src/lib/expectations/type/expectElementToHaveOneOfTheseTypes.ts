import ReactTestRenderer from 'react-test-renderer'
import { TypeDescriber } from '../../../types'
import expectElementToHaveType from './expectElementToHaveType'
import labelTestInstance from '../../labelers/testInstance'
import { printAny } from '../../utils'

export default function expectElementToHaveOneOfTheseTypes(
  elem: ReactTestRenderer.ReactTestInstance,
  types: TypeDescriber[]
) {
  const matches: boolean[] = []
  for (const type of types) {
    let passed = true
    try {
      expectElementToHaveType(elem, type)
    } catch (error) {
      passed = false
    }
    matches.push(passed)
  }
  if (!matches.some(Boolean)) {
    throw new Error(`Expected ${ labelTestInstance(elem) } to have one of these types: ${ types.map(printAny).join(', ') }`)
  }
}
