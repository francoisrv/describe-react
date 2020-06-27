import { IsProps } from "../components/Is";
import { isArray, includes, isFunction } from "lodash";
import DescribeReactError from "../DescribeReactError";
import { printGeneric, printProps } from "../print/common";
import stripColors from 'strip-color'
import { predicate } from "../utils";

export default function assertIs(
  props: IsProps<any, any>,
  fn: Function,
  args: any[]
) {
  if (isArray(props.of)) {
    const results: (string | null)[] = []
    const passed = props.of.map(v => {
      try {
        fn(v)
        results.push(null)
        return true
      } catch (error) {
        results.push(stripColors(error.message))
        return false
      }
    })
    if (props.not) {
      expect(passed.every(f => f === false)).toBe(true)
    } else {
      try {
        expect(passed.some(Boolean)).toBe(true)
      } catch (error) {
        throw new Error(`Expected at least one of to be true, instead received ${ JSON.stringify(results) }`)
      }
    }
  } else if (isFunction(props.true)) {
    const result = props.true(...args)
    expect(result).toBe(props.not ? false : true)
  } else if (isFunction(props.valid)) {
    if (props.not) {
      let failed = false
      try {
        props.valid(...args) 
      } catch (error) {
        failed = true
      }
      try {
        expect(failed).toBe(true)
      } catch (error) {
        throw new DescribeReactError(`Expected ${ printGeneric(props.valid) } to have returned true`)
      }
    } else {
      props.valid(...args) 
    }
  } else if (props.not) {
    expect(
      predicate(() => fn(props.not))
    ).toBe(false)
  }
}
