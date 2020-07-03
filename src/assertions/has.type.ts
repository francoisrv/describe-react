import { isArray } from 'lodash'

import DescribeReactError from '../DescribeReactError'
import Is from '../components/Is'

import { HasTypeProps } from '../components/Has'
import is from './is'
import { isReactTestRendererInstance, isReactElementComponentOf, predicate, isReactElement } from '../utils'
import { printElement, printProps } from '../print'
import { ReactTestInstance } from 'react-test-renderer'

export default function hasType(
  elem: ReactTestInstance,
  props: HasTypeProps
) {
  if (isArray(elem)) {
    for (const v of elem) {
      hasType(v, props)
    }
    return
  }
  if (!isReactTestRendererInstance(elem)) {
    throw new DescribeReactError(`Expected elem to examine type from to be a React element\nReceived: `)
  }

  const isNot = ('not' in props)

  const passed = predicate(() => {
    if ('which' in props) {
      const whiches = isArray(props.which) ? props.which : [props.which]
      for (const which of whiches) {
        if (isReactElementComponentOf(which, Is)) {
          is(elem.type, which.props)
        }
      }
    } else {
      expect(elem).toHaveProperty('type', props.type)
    }
  })

  try {
    expect(passed).toBe(!isNot)
  } catch (error) {
    throw new DescribeReactError(`Expected ${ printElement(elem) }${ isNot? ' not' : '' } to have ${ printProps(props) }`)
  }
}
