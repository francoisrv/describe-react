import { ReactTestInstance } from "react-test-renderer";
import { HasChildrenProps } from "../components/Has";
import { predicate } from "../utils";
import { isEqual, isArray } from "lodash";
import DescribeReactError from "../DescribeReactError";
import { printElement, printProps } from "../print";

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

  const isNot = ('not' in props) || ('no' in props)

  let passed = true
  let reason: Error | undefined

  try {
    const { children: _children } = elem.props

    if (!_children) {
      throw new DescribeReactError(`Expected ${ printElement(elem) } to have children`)
    }

    const children = isArray(_children) ? _children : [_children]

    if ('exactly' in props) {
      try {
        expect(children).toHaveLength(props.exactly)
      } catch (error) {
        throw new DescribeReactError(`Expect ${ printElement(elem) } to have exactly ${ props.exactly } children. Got ${ children.length }`)
      }
    } else if ('least' in props) {
      try {
        expect(children.length >= props.least).toBe(true)
      } catch (error) {
        throw new DescribeReactError(`Expect ${ printElement(elem) } to have at least ${ props.least } children. Got ${ children.length }`)
      }
    } else if ('more' in props) {
      try {
        expect(children.length > props.than).toBe(true)
      } catch (error) {
        throw new DescribeReactError(`Expect ${ printElement(elem) } to have at more than ${ props.least } children. Got ${ children.length }`)
      }
    } else if ('between' in props) {
      try {
        expect(children.length >= props.between && children.length <= props.and).toBe(true)
      } catch (error) {
        throw new DescribeReactError(`Expect ${ printElement(elem) } to have at between ${ props.between } and ${ props.and } children. Got ${ children.length }`)
      }
    }
  } catch (error) {
    passed = false
    reason = error
  }

  try {
    expect(passed).toBe(!isNot)
  } catch (error) {
    if (!isNot && reason) {
      throw reason
    }
    throw new DescribeReactError(`Expected ${ printElement(elem) } to ${ printProps(props) }\n${ reason }`)
  }
}
