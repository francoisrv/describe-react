import ReactTestRenderer from 'react-test-renderer'
import { TypeDescriber } from '../../types'
import IsOneOf from '../entities/IsOneOf'
import IsNotOneOf from '../entities/IsNotOneOf'
import IsNot from '../entities/IsNot'

export default function hasType(elem: ReactTestRenderer.ReactTestInstance, type: TypeDescriber) {
  if (type instanceof IsOneOf) {
    return type.values.map(type => hasType(elem, type)).some(Boolean)
  }
  if (type instanceof IsNotOneOf) {
    return type.values.map(type => hasType(elem, type)).every(a => a === false)
  }
  if (type instanceof IsNot) {
    return elem.type !== type.value
  }
  return elem.type === type
}