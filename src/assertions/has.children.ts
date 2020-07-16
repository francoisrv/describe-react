import { ReactTestInstance } from "react-test-renderer";
import { HasChildrenProps } from "../components/Has";
import { predicate } from "../utils";
import { isArray, isString, isFunction, isNumber, isBoolean, first, compact, last } from "lodash";
import DescribeReactError from "../DescribeReactError";
import { printElement, printProps } from "../print";
import which from "./which";

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
    const { children: _children } = elem

    if (!_children) {
      throw new DescribeReactError(`Expected ${ printElement(elem) } to have children`)
    }

    let children = isArray(_children) ? _children : [_children]

    if (
      'children' in props && (
        isString(props.children) || isFunction(props.children)
      )
    ) {
      children = children.filter(child => !isString(child) && child.type === props.children)
    } else if (
      'child' in props && (
        isString(props.child) || isFunction(props.child)
      )
    ) {
      children = children.filter(child => !isString(child) && child.type === props.child)
    }

    if ('which' in props) {
      children = children.filter(child => predicate(() => which(child, props.which)))
    }

    if ('first' in props) {
      if (isNumber(props.first)) {
        children = children.slice(0, props.first)
        if (children.length < props.first) {
          throw new DescribeReactError(`Expected ${ printElement(elem) } to have at least ${ props.first } children, but only ${ children.length } children found`)
        }
      } else if (isBoolean(props.first)) {
        children = compact([first(children)])
      }
    } else if ('last' in props) {
      if (isNumber(props.last)) {
        children = children.slice(children.length - props.last)
        if (children.length < props.last) {
          throw new DescribeReactError(`Expected ${ printElement(elem) } to have at least ${ props.last } children, but only ${ children.length } children found`)
        }
      } else if (isBoolean(props.last)) {
        children = compact([last(children)])
      }
    }

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
        throw new DescribeReactError(`Expect ${ printElement(elem) } to have at more than ${ props.than } children. Got ${ children.length }`)
      }
    } else if ('between' in props) {
      try {
        expect(children.length >= props.between && children.length <= props.and).toBe(true)
      } catch (error) {
        throw new DescribeReactError(`Expect ${ printElement(elem) } to have at between ${ props.between } and ${ props.and } children. Got ${ children.length }`)
      }
    } else if ('first' in props) {
      if (isNumber(props.first)) {
        expect(children.length >= props.first).toBe(true)
      } else if (isBoolean(props.first)) {
        try {
          expect(children.length >= 1).toBe(true)
        } catch (error) {
          throw new DescribeReactError(`Expected ${ printElement(elem) } to have a first child, but it has no children`)
        }
      }
    } else if ('last' in props) {
      if (isNumber(props.last)) {
        expect(children.length >= props.last).toBe(true)
      } else if (isBoolean(props.last)) {
        expect(children.length >= 1).toBe(true)
      }
    } else {
      expect(children.length > 0).toBe(true)
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
