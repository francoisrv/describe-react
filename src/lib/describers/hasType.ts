import ReactTestRenderer from 'react-test-renderer'
import { TypeDescriber } from '../../types'
import IsOneOf from '../entities/IsOneOf'
import IsNotOneOf from '../entities/IsNotOneOf'
import IsNot from '../entities/IsNot'
import { printType, printAny } from '../utils'
import labelTestInstance from '../labelers/testInstance'

export default function hasType(elem: ReactTestRenderer.ReactTestInstance, type: TypeDescriber) {
  if (type instanceof IsOneOf) {
    const matches: boolean[] = type.values.map(value => {
      try {
        hasType(elem, value)
        return true
      } catch (error) {
        return false
      }
    })
    if (!matches.some(Boolean)) {
      throw new Error(`Expected ${ labelTestInstance(elem) } to have type which is one of ${ type.values.map(printType).join(', ') }`)
    }
  } else if (type instanceof IsNotOneOf) {
    const matches: boolean[] = type.values.map(value => {
      try {
        hasType(elem, value)
        return false
      } catch (error) {
        return true
      }
    })
    if (!matches.every(c => c === true)) {
      throw new Error(`Expected ${ labelTestInstance(elem) } *not* to have type which is one of ${ type.values.map(printType).join(', ') }`)
    }
  } else if (type instanceof IsNot) {
    try {
      expect(elem.type).not.toEqual(type.value)
    } catch (error) {
      throw new Error(`Expected ${ labelTestInstance(elem) } *not* to have type ${ printAny(type) }`)
    }
  } else {
    try {
      expect(elem.type).toEqual(type)
    } catch (error) {
      throw new Error(`Expected ${ labelTestInstance(elem) } to have type ${ printAny(type) }`)
    }
  }
}
