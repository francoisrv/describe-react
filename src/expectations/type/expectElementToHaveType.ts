import ReactTestRenderer from 'react-test-renderer'
import { TypeDescriber } from '../../../types'
import labelTestInstance from '../../labelers/testInstance'
import { printAny } from '../../utils'

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
