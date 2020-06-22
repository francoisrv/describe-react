import ReactTestRenderer from 'react-test-renderer'
import { PropertyDescriber } from '../../types'
import IsNot from '../entities/IsNot'
import IsOneOf from '../entities/IsOneOf'
import IsNotOneOf from '../entities/IsNotOneOf'
import ExpectPropertyValue from '../entities/ExpectPropertyValue'

export default function hasProperty(
  elem: ReactTestRenderer.ReactTestInstance,
  property: PropertyDescriber
) {
  if (typeof property === 'string') {
    return property in elem.props
  }
  
  if (property instanceof RegExp) {
    return Object
      .keys(elem.props)
      .map(prop => property.test(prop))
      .some(Boolean)
  }
  
  if (property instanceof IsNot) {
    return Object
      .keys(elem.props)
      .map(prop => {
        if (typeof property.value === 'string') {
          return property.value === prop
        }
        if (property.value instanceof RegExp) {
          return property.value.test(prop)
        }
        return false
      })
      .every(c => c === false)
  }
  
  if (property instanceof IsOneOf) {
    const matches: boolean[] = []
    for (const value of property.values) {
      matches.push(hasProperty(elem, value))
    }
    return matches.some(Boolean)
  }
  
  if (property instanceof IsNotOneOf) {
    const matches: boolean[] = []
    for (const value of property.values) {
      matches.push(hasProperty(elem, value))
    }
    return matches.every(c => c === false)
  }
  
  const { name, value } = property

  if (name) {
    if (!hasProperty(elem, name)) {
      return false
    }
  
    if (typeof name === 'string') {
      if (value instanceof ExpectPropertyValue) {
        return value.fn(elem.props[name], elem.props)
      }
      return elem.props[name] === value
    }
  
    if (name instanceof RegExp) {
      const values: any[] = []
      for (const prop in elem.props) {
        if (name.test(prop)) {
          values.push(elem.props[prop])
        }
      }
      const matches = values.map(v => {
        if (value instanceof ExpectPropertyValue) {
          return value.fn(v, elem.props)
        }
        return v === value
      })
      return matches.some(Boolean)
    }
  } else {
    const values: any[] = []
    for (const prop in elem.props) {
      values.push(elem.props[prop])
    }
    const matches = values.map(v => {
      if (value instanceof ExpectPropertyValue) {
        return value.fn(v, elem.props)
      }
      return v === value
    })
    return matches.some(Boolean)
  }

  return false
}