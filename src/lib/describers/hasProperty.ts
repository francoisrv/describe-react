import ReactTestRenderer from 'react-test-renderer'
import { PropertyDescriber } from '../../types'
import IsNot from '../entities/IsNot'
import IsOneOf from '../entities/IsOneOf'
import IsNotOneOf from '../entities/IsNotOneOf'
import ExpectPropertyValue from '../entities/ExpectPropertyValue'
import labelTestInstance from '../labelers/testInstance'
import { printAny } from '../utils'

export default function hasProperty(
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
  } else if (property instanceof IsNot) {
    let fails = false
    try {
      hasProperty(elem, property.value)
    } catch (error) {
      fails = true
    }
    if (!fails) {
      if (typeof property.value === 'string') {
        throw new Error(`Expected element ${ labelTestInstance(elem) } *not* to have a property named "${ property.value }"`)
      }
      if (property.value instanceof RegExp) {
        throw new Error(`Expected element ${ labelTestInstance(elem) } *not* to have a property which name matches the regular expression ${ property.value }`)
      }
      if (property.value.name) {
        throw new Error(`Expected element ${ labelTestInstance(elem) } *not* to have a property which name is "${ property.value.name }" and which value equals ${ JSON.stringify(property.value.value) }`)
      }
    }
  } else if (property instanceof IsOneOf) {
    const matches: boolean[] = []
    for (const value of property.values) {
      let result = false
      try {
        hasProperty(elem, value)
        result = true
      } catch (error) {
        result = false
      }
      matches.push(result)
    }
    const ok = matches.some(Boolean)
    if (!ok) {
      throw new Error(`Expected element ${ labelTestInstance(elem) } to have a property which: \n - ${ property.values.map(v => {
        if (typeof v === 'string') {
          return `is named "${ v }"`
        }
        if (v instanceof RegExp) {
          return `has a name which matches the regular expression ${ v }`
        }
        if (v.name) {
          if (typeof v.name === 'string') {
            return `is named "${ v.name }" and has value ${ JSON.stringify(v.value) }`
          }
          return `has a name which matches the regular expression ${ v.name } and has value ${ JSON.stringify(v.value) }`
        }
        return JSON.stringify(v)
      }).join('\n - OR\n - ') }`)
    }
  } else if (property instanceof IsNotOneOf) {
    const matches: boolean[] = []
    for (const value of property.values) {
      let result = false
      try {
        hasProperty(elem, value)
        result = true
      } catch (error) {
        result = false
      }
      matches.push(result)
    }
    const ok = matches.every(c => c === false)
    if (!ok) {
      throw new Error(`Expected element ${ labelTestInstance(elem) } *not* to have a property which either ${ property.values.map(v => {
        if (typeof v === 'string') {
          return `is named "${ v }"`
        }
        if (v instanceof RegExp) {
          return `has a name which matches the regular expression ${ v }`
        }
        return JSON.stringify(v)
      }).join(' or ') }`)
    }
  } else {
    const { name, value } = property

    if (name) {
      hasProperty(elem, name)
    
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
