import ReactTestRenderer from 'react-test-renderer'
import labelTestInstance from '../../labelers/testInstance'
import { printAny } from '../../utils'
import { TypeDescriber } from '../../types'

export default function expectElementToHaveType(
  elem: ReactTestRenderer.ReactTestInstance,
  type: TypeDescriber
) {
  try {
    expect(elem.type).toEqual(type)
  } catch (error) {
    throw new Error(`Expected ${ labelTestInstance(elem) } to have type ${ printAny(type) }`)
  }
}
