import { HasStateProps } from "../components/Has";
import { isArray, isString, keys } from "lodash";
import { ReactTestInstance } from "react-test-renderer";
import { predicate } from "../utils";
import DescribeReactError from "../DescribeReactError";
import { printElement } from "../print";
import which from "./which";

export default function hasState(
  elem: ReactTestInstance,
  props: HasStateProps
) {
  if (isArray(elem)) {
    for (const v of elem) {
      hasState(v, props)
    }
    return
  }

  const isNot = ('not' in props) || ('no' in props)

  const passed = predicate(() => {
    if (!elem.instance) {
      throw new DescribeReactError(`Expected ${ printElement(elem) } to have an instance`)
    }
    
    if (!elem.instance.state) {
      throw new DescribeReactError(`Expected ${ printElement(elem) } to have a state`)
    }

    if (isString(props.state)) {
      expect(elem.instance.state).toHaveProperty(props.state)
      if ('which' in props) {
        which(elem.instance.state[props.state], props.which)
      }
    } else if ('which' in props) {
      const tests = keys(elem.instance.state).map(
        key => predicate(() => which(elem.instance.state[key], props.which))
      )
      expect(tests.some(Boolean)).toBe(true)
    }
  })

  expect(passed).toBe(!isNot)
}
