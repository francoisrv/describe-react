import Has, { HasProps } from "./components/Has";
import { isReactElementComponentOf, getText, isReactElement, isReactTestRendererInstance } from "./utils";
import Is from "./components/Is";
import { is } from "./is";
import { isArray, isString, isEmpty, isRegExp, isBoolean } from "lodash";
import DescribeReactError from "./DescribeReactError";
import { printGeneric, printElement, printProps } from "./print/common";

export default function has(
  value: any,
  props: HasProps
): void {
  if ('type' in props) {
    if (isArray(value)) {
      for (const v of value) {
        has(v, props)
      }
      return
    }
    if (!isReactTestRendererInstance(value)) {
      throw new DescribeReactError(`Expected value to examine type from to be a React element\nReceived: `)
    }
    if ('which' in props) {
      const whiches = isArray(props.which) ? props.which : [props.which]
      for (const which of whiches) {
        if (isReactElementComponentOf(which, Is)) {
          is(value.type, which.props)
        }
      }
    } else {
      try {
        expect(value).toHaveProperty('type', props.type)
      } catch (error) {
        throw new DescribeReactError(`Expected ${ printElement(value) } to have ${ printProps(props) }`)
      }
    }
  } else if ('text' in props) {
    const text = getText(value)
    if ('which' in props) {
      const whiches = isArray(props.which) ? props.which : [props.which]
      for (const which of whiches) {
        if (isReactElementComponentOf(which, Is)) {
          is(text, which.props)
        }
      }
    } else if ('not' in props && isBoolean(props.text)) {
      expect(isEmpty(text)).toBe(true)
    } else if (isString(props.text)) {
      expect(text).toEqual(props.text)
    } else if (isRegExp(props.text)) {
      expect(props.text.test(text)).toBe(true)
    } else if ('not' in props) {
      if (isString(props.not)) {
        expect(text).not.toEqual(props.text)
      }
    }
  } else if ('length' in props) {
    if ('not' in props) {
      expect(value).not.toHaveLength(props.length)
    } else if ('which' in props) {
      const whiches = isArray(props.which) ? props.which : [props.which]
      for (const which of whiches) {
        if (isReactElementComponentOf(which, Is)) {
          is(value.length, which.props)
        }
      }
    } else {
      expect(value).toHaveLength(props.length as number)
    }
  } else if ('property' in props) {
    if (isArray(value)) {
      for (const v of value) {
        has(v, props)
      }
      return
    }
    if (isString(props.property)) {
      if (!(props.property in value.props)) {
        throw new DescribeReactError(`Expected element ${ printElement(value) } to have a property called ${ props.property }`)
      }
      if ('which' in props) {
        const whiches = isArray(props.which) ? props.which : [props.which]
        for (const which of whiches) {
          if (isReactElementComponentOf(which, Is)) {
            is(value.props[props.property], which.props)
          }
        }
      }
    }
  }
}
