import ReactTestRenderer from 'react-test-renderer'
import { TextDescriber } from '../../types'
import { getText } from '../utils'
import labelTestInstance from '../labelers/testInstance'
import { isEmpty } from 'lodash'

export type ExpectElementTextLabel =
| 'toHaveText'
| 'notToHaveText'
| 'toHaveOneOfTheseTexts'
| 'notToHaveOneOfTheseTexts'

export default function expectElementText(
  elem: ReactTestRenderer.ReactTestInstance,
  label: 'toHaveText',
  text: TextDescriber
): void

export default function expectElementText(
  elem: ReactTestRenderer.ReactTestInstance,
  label: 'notToHaveText',
  text: TextDescriber
): void

export default function expectElementText(
  elem: ReactTestRenderer.ReactTestInstance,
  label: 'toHaveOneOfTheseTexts',
  text: TextDescriber[]
): void

export default function expectElementText(
  elem: ReactTestRenderer.ReactTestInstance,
  label: 'notToHaveOneOfTheseTexts',
  text: TextDescriber[]
): void

export default function expectElementText(
  elem: ReactTestRenderer.ReactTestInstance,
  label: ExpectElementTextLabel,
  text: TextDescriber | TextDescriber[]
) {
  const textNode = getText(elem)
  switch (label) {

    case 'toHaveText': {
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
    } break

    case 'notToHaveText': {
      // let fails = false
      // try {
      //   expectElementText(elem, 'toHaveText', text)
      // }
    } break

  }
}
