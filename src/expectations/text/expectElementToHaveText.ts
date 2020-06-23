import ReactTestRenderer from 'react-test-renderer'
import labelTestInstance from '../../labelers/testInstance'
import { printAny, getText } from '../../utils'
import { TextDescriber } from '../../types'
import { isEqual } from 'lodash'

export default function expectElementToHaveText(
  elem: ReactTestRenderer.ReactTestInstance,
  text: TextDescriber
) {
  const textNode = getText(elem)
  if (text === true) {
    if (!textNode) {
      throw new Error(`Expected ${ labelTestInstance(elem) } to have some text but none was found`)
    }
  } else if (text === false) {
    if (!textNode) {
      throw new Error(`Expected ${ labelTestInstance(elem) } *NOT* to have any text but instead it has the following text: ${ textNode }`)
    }
  } else if (typeof text === 'string') {
    if (!isEqual(text, textNode)) {
      throw new Error(`Expected ${ labelTestInstance(elem) } to have exact text\n\nExpected: "${ text }"\n\nReceived: "${ textNode }"`)
    }
  } else if (text instanceof RegExp) {
    if (!text.test(textNode)) {
      throw new Error(`Expected ${ labelTestInstance(elem) } to match regular expression\n\nRegular expression: "${ text }"\n\nReceived: "${ textNode }"`)
    }
  }
}