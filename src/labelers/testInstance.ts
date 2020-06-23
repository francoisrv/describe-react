import ReactTestRenderer from 'react-test-renderer'
import { printType, printProperties } from '../utils'
import { isEmpty } from 'lodash'

export default function labelTestInstance(elem: ReactTestRenderer.ReactTestInstance) {
  if (isEmpty(elem.props)) {
    return `<${ printType(elem.type) }>`
  }
  return `<${ printType(elem.type) } ${ printProperties(elem.props) }>`
}
