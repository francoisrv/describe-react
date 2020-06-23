import ReactTestRenderer from 'react-test-renderer'
import labelTestInstance from '../../labelers/testInstance'
import { PropertyDescriber } from '../../types'
import { printAny } from '../../utils'
import ExpectPropertyValue from '../../entities/ExpectPropertyValue'

export default function expectElementToHaveProperty(
  elem: ReactTestRenderer.ReactTestInstance,
  property: PropertyDescriber
) {
  if (typeof property === 'string') {
    try {
      expect(elem.props).toHaveProperty(property)
    } catch (error) {
      throw new Error(`Expected element ${ labelTestInstance(elem) } to have a property named "${ property }"`)
    }
  } else if (property instanceof RegExp) {
    const hasProperty = Object
      .keys(elem.props)
      .map(prop => property.test(prop))
      .some(Boolean)
    if (!hasProperty) {
      throw new Error(`Expected element ${ labelTestInstance(elem) } to have a property which name matches the regular expression ${ property }`)
    }
  } else {
    const { name, value } = property

    if (name) {
      expectElementToHaveProperty(elem, name)
    
      if (typeof name === 'string') {
        if (value instanceof ExpectPropertyValue) {
          if (!value.fn(elem.props[name], elem.props)) {
            throw new Error(`Expected element ${ labelTestInstance(elem) } to have a property which name is "${ name }" and which value returns true when applied to ${ printAny(value.fn) }`)
          }
        } else {
          try {
            expect(elem.props).toHaveProperty(name, value)
          } catch (error) {
            throw new Error(`Expected element ${ labelTestInstance(elem) } to have a property which name is "${ name }" and which value equals ${ JSON.stringify(value, null, 2) }`)
          }
        }
      } else if (name instanceof RegExp) {
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
        if (!matches.some(Boolean)) {
          if (value instanceof ExpectPropertyValue) {
            throw new Error(`Expected element ${ labelTestInstance(elem) } to have a property which name matches the regular expression ${ name } and which value returns true when applied to ${ printAny(value.fn) }`)
          }
          throw new Error(`Expected element ${ labelTestInstance(elem) } to have a property which name matches the regular expression ${ name } and which value equals ${ JSON.stringify(value, null, 2) }`)
        }
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
      if (!matches.some(Boolean)) {
        if (value instanceof ExpectPropertyValue) {
          throw new Error(`Expected element ${ labelTestInstance(elem) } to have a property which value returns true when applied to ${ printAny(value.fn) }`)
        }
        throw new Error(`Expected element ${ labelTestInstance(elem) } to have a property which value equals ${ JSON.stringify(value, null, 2) }`)
      }
    }
  }
}