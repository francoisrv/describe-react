import { HasParentProps } from "../components/Has";
import { ReactTestInstance } from "react-test-renderer";
import { isArray, keys, isString, isBoolean, isFunction } from "lodash";
import { predicate } from "../utils";

export default function hasParent(
  elem: ReactTestInstance | ReactTestInstance[],
  props: HasParentProps
) {
  if (isArray(elem)) {
    for (const v of elem) {
      hasParent(v, props)
    }
    return
  }

  const isNot = ('not' in props) || ('no' in props)

  const { parent } = elem

  let passed = true
  let reason: Error | undefined

  try {
    expect(parent).not.toBe(null)
    if (isString(props.parent) || isFunction(props.parent)) {
      expect(parent).toHaveProperty('type', props.parent)
    }
  } catch (error) {
    passed = false
    reason = error
  }

  try {
    expect(passed).toBe(!isNot)
  } catch (error) {
    throw reason
  }
}