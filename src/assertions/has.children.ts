import { isArray } from 'lodash'

import { ReactTestInstance } from 'react-test-renderer'
import { HasChildrenProps } from '../components/Has'
import DescribeReactError from '../DescribeReactError'
import { printElement, printHas } from '../print'
import {
  filterChildren,
  expectLength,
  filterByWhich,
  assertWhich,
} from '../utils/dom.utils'

export default function hasChildren(
  elem: ReactTestInstance | ReactTestInstance[],
  props: HasChildrenProps
) {
  if (isArray(elem)) {
    for (const v of elem) {
      hasChildren(v, props)
    }
    return
  }

  const isNot = 'not' in props || 'no' in props

  let passed = true
  let reason: Error | undefined

  try {
    const { children: _children } = elem

    if (!_children) {
      throw new DescribeReactError(
        `Expected ${printElement(elem)} to have children`
      )
    }

    let children = (isArray(_children)
      ? _children
      : [_children]) as ReactTestInstance[]

    children = filterChildren(props)(children)

    if ('which' in props) {
      assertWhich(children, props.which)
      children = filterByWhich(props.which)(children)
    }

    // console.log(children.map((c) => c.type))

    if ('exactly' in props && 'not' in props) {
      expectLength(children, 'not exactly', props.exactly)
    } else if ('exactly' in props) {
      expectLength(children, 'exactly', props.exactly)
    } else if ('least' in props) {
      expectLength(children, 'at least', props.least)
    } else if ('more' in props && 'no' in props) {
      expectLength(children, 'no more', props.than)
    } else if ('more' in props) {
      expectLength(children, 'more', props.than)
    } else if ('between' in props) {
      expectLength(children, 'between', props.between, props.and)
    } else if ('no' in props) {
      expectLength(children, 'has not', 0)
    } else {
      expectLength(children, 'has', 0)
    }
  } catch (error) {
    passed = false
    reason = error
  }

  try {
    expect(passed).toBe(true)
  } catch (error) {
    if (!isNot && reason) {
      throw reason
    }
    if (!reason) {
      reason = error
    }
    throw new DescribeReactError(
      `Expected ${printElement(elem)} to have ${printHas(props)}\n${reason}`
    )
  }
}
