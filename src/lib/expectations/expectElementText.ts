import ReactTestRenderer from 'react-test-renderer'
import { TextDescriber } from '../../types'
import { getText } from '../utils'
import labelTestInstance from '../labelers/testInstance'
import { isEmpty } from 'lodash'

export default function expectElementText(
  elem: ReactTestRenderer.ReactTestInstance,
  text: TextDescriber
) {
  const textNode = getText(elem)
  if (typeof text === 'string') {
    try {
      expect(textNode).toEqual(text)
    } catch (error) {
      throw new Error(`Expect element ${ labelTestInstance(elem) } to have text\n\nReceived: ${ textNode }\n\nExpected: ${ text }`)
    }
  } else if (text === true) {
    try {
      expect(isEmpty(textNode)).not.toBe(true)
    } catch (error) {
      throw new Error(`Expect element ${ labelTestInstance(elem) } to have text, instead received no text`)
    }
  } else if (text === false) {
    try {
      expect(isEmpty(textNode)).toBe(true)
    } catch (error) {
      throw new Error(`Expect element ${ labelTestInstance(elem) } *not* to have text, instead received "${ textNode }"`)
    }
  } else if (text instanceof RegExp) {
    try {
      expect(text.test(textNode)).toBe(true)
    } catch (error) {
      throw new Error(`Expect element ${ labelTestInstance(elem) } to have text which matches the regular expression ${ text }, instead received "${ textNode }"`)
    }
  }
}
