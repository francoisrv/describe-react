import ReactTestRenderer from 'react-test-renderer'
import { TypeDescriber } from '../../../types'
import expectElementToHaveType from './expectElementToHaveType'
import labelTestInstance from '../../labelers/testInstance'
import { printAny } from '../../utils'

export default function expectElementNotToHaveType(
  elem: ReactTestRenderer.ReactTestInstance,
  type: TypeDescriber
) {
  let fails = false
  try {
    expectElementToHaveType(elem, type)
  } catch (error) {
    fails = true
  }
  if (!fails) {
    throw new Error(`Expected ${ labelTestInstance(elem) } *NOT* to have type ${ printAny(type) }`)
  }
}
