import ReactTestRenderer from 'react-test-renderer'
import { TypeDescriber } from '../../types'
import { printType, printAny } from '../utils'
import labelTestInstance from '../labelers/testInstance'

export type ExpectElementTypeLabel =
| 'toHaveType'
| 'notToHaveType'
| 'toHaveOneOfTheseTypes'
| 'notToHaveOneOfTheseTypes'

export default function expectElementType(
  elem: ReactTestRenderer.ReactTestInstance,
  label: 'toHaveType',
  type: TypeDescriber
): void

export default function expectElementType(
  elem: ReactTestRenderer.ReactTestInstance,
  label: 'notToHaveType',
  type: TypeDescriber
): void

export default function expectElementType(
  elem: ReactTestRenderer.ReactTestInstance,
  label: 'toHaveOneOfTheseTypes',
  type: TypeDescriber[]
): void

export default function expectElementType(
  elem: ReactTestRenderer.ReactTestInstance,
  label: 'notToHaveOneOfTheseTypes',
  type: TypeDescriber[]
): void

export default function expectElementType(
  elem: ReactTestRenderer.ReactTestInstance,
  label: ExpectElementTypeLabel,
  type: TypeDescriber | TypeDescriber[]
) {
  if (label === 'toHaveOneOfTheseTypes' && Array.isArray(type)) {
    const matches: boolean[] = type.map(value => {
      try {
        expectElementType(elem, 'toHaveType', value)
        return true
      } catch (error) {
        return false
      }
    })
    if (!matches.some(Boolean)) {
      throw new Error(`Expected ${ labelTestInstance(elem) } to have type which is one of ${ type.map(printType).join(', ') }`)
    }
  } else if (label === 'notToHaveOneOfTheseTypes' && Array.isArray(type)) {
    const matches: boolean[] = type.map(value => {
      try {
        expectElementType(elem, 'notToHaveType', value)
        return true
      } catch (error) {
        return false
      }
    })
    if (!matches.every(Boolean)) {
      throw new Error(`Expected ${ labelTestInstance(elem) } *not* to have type which is one of ${ type.map(printType).join(', ') }`)
    }
  } else if (label === 'notToHaveType') {
    try {
      expect(elem.type).not.toEqual(type)
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
