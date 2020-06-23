import ReactTestRenderer from 'react-test-renderer'
import { PropertiesDescriber } from '../../types'
import { isEmpty } from 'lodash'
import labelTestInstance from '../labelers/testInstance'
import expectElementProperty from './expectElementProperty'

export default function expectElementProperties(
  elem: ReactTestRenderer.ReactTestInstance,
  describer: PropertiesDescriber
) {
  if (describer === true) {
    try {
      expect(isEmpty(elem.props)).toBe(false)
    } catch (error) {
      throw new Error(`Expected element ${ labelTestInstance(elem) } to have at least one property`)
    }
  }
  if (describer === false) {
    try {
      expect(isEmpty(elem.props)).toBe(true)
    } catch (error) {
      throw new Error(`Expected element ${ labelTestInstance(elem) } *not* to have any property`)
    }
  }
  if (Array.isArray(describer)) {
    for (const item of describer) {
      if ('name' in item) {
        expectElementProperty(elem, item.name)
      }
      if ('value' in item) {
        expectElementProperty(elem, item)
      }
    }
  }
}