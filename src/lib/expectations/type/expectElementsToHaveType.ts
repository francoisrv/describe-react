import ReactTestRenderer from 'react-test-renderer'
import { TypeDescriber } from '../../../types'
import labelTestInstance from '../../labelers/testInstance'
import { printAny } from '../../utils'
import expectElementToHaveType from './expectElementToHaveType'

export default function expectElementsToHaveType(
  elems: ReactTestRenderer.ReactTestInstance[],
  type: TypeDescriber
) {
  try {
    for (const elem of elems) {
      expectElementToHaveType(elem, type)
    }
  } catch (error) {
    throw new Error(`Expected \nElements: ${ elems.map(labelTestInstance).join(', ') } to all have type ${ printAny(type) }`)
  }
}
