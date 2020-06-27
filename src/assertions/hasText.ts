import ReactTestRender from 'react-test-renderer'
import { TextIdentifier } from '../types';
import { printElement } from '../print/common';
import printHasText from '../print/printHasText';
import DescribeReactError from '../DescribeReactError';
import { isString, isBoolean, isEmpty, isRegExp } from 'lodash';
import { getText, isReactElementComponentOf } from '../utils';
import { Is } from '../components/Is';
import assertIs from './assertIs';

export default function hasText(
  elem: ReactTestRender.ReactTestInstance,
  text: TextIdentifier
) {
  try {
    const value = getText(elem)
    if (isBoolean(text)) {
      expect(isEmpty(value)).not.toBe(text)
    } else if (isString(text)) {
      expect(value).toEqual(text)
    } else if (isRegExp(text)) {
      expect(value).toMatch(text)
    } else if(isReactElementComponentOf(text, Is)) {
      assertIs(
        text.props,
        (txt: TextIdentifier) => hasText(elem, txt),
        [value, elem]
      )
    }
  } catch (error) {
    const message = `Expected element ${ printElement(elem) } ${ printHasText(text) }`
    throw new DescribeReactError(`${ message }\n\n${ error }`)
  }
}
