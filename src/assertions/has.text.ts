import { ReactTestInstance } from 'react-test-renderer'
import { isArray, isBoolean, isEmpty, isString } from 'lodash'

import { HasTextProps } from '../components/Has'
import { getText, isReactElementComponentOf, predicate } from '../utils'
import Is from '../components/Is'
import is from './is'
import DescribeReactError from '../DescribeReactError'
import { printElement, printProps } from '../print'

export default function hasText(
  elem: ReactTestInstance | ReactTestInstance[],
  props: HasTextProps
) {
  if (isArray(elem)) {
    for (const v of elem) {
      hasText(v, props)
    }
    return
  }
  
  const text = getText(elem)
  const isNot = ('not' in props) || ('no' in props)

  const passed = predicate(() => {
    if ('which' in props) {
      const whiches = isArray(props.which) ? props.which : [props.which]
      for (const which of whiches) {
        if (isReactElementComponentOf(which, Is)) {
          is(text, which.props)
        }
      }
    } else if (isString(props.text)) {
      expect(text).toEqual(props.text)
    } else if (isBoolean(props.text)) {
      expect(isEmpty(text)).toBe(false)
    }
  })

  try {
    expect(passed).toBe(!isNot)
  } catch (error) {
    throw new DescribeReactError(`Expected ${ printElement(elem) }${ isNot? ' not' : '' } to have ${ printProps(props) }`)
  }
  
}
