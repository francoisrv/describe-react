import ReactTestRenderer from 'react-test-renderer'
import { PropertiesDescriber } from '../../types'
import { isEmpty } from 'lodash'

export default function hasProperties(
  elem: ReactTestRenderer.ReactTestInstance,
  describer: PropertiesDescriber
) {
  if (describer === true) {
    return !isEmpty(elem.props)
  }
  if (describer === false) {
    return isEmpty(elem.props)
  }
  if (Array.isArray(describer)) {
    if (!describer.length) {
      return true
    }
  }
  return false
}
