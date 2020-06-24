import { UnitTypeIdentifier } from './types'

export default function printType(type: UnitTypeIdentifier) {
  if (typeof type === 'string') {
    return type
  }
  if (type.name) {
    return type.name
  }
}
