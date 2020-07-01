import { IsProps } from './components/Is'
import { isString, isNumber, isBoolean, isObject, isArray, isDate, isError, isRegExp, isEmpty, isEqual } from 'lodash'

export function is<T>(
  value: any,
  props: IsProps<T>
) {
  if ('true' in props) {
    expect(value).toBe(props.not !== true)
  } else if ('false' in props) {
    expect(value).toBe(props.not === true)
  } else if ('null' in props) {
    if (props.not) {
      expect(value).not.toBe(null)
    } else {
      expect(value).toBe(null)
    }
  } else if ('defined' in props) {
    if (props.not) {
      expect(value).toBeUndefined()
    } else {
      expect(value).not.toBeUndefined()
    }
  } else if ('undefined' in props) {
    if (props.not) {
      expect(value).not.toBeUndefined()
    } else {
      expect(value).toBeUndefined()
    }
  } else if ('string' in props) {
    let isTrue = null
    if ('empty' in props) {
      isTrue = isString(value) && isEmpty(value)
    } else {
      isTrue = isString(value)
    }
    expect(isTrue).toBe(!props.not)
  } else if ('number' in props) {
    if (props.not) {
      expect(isNumber(value)).not.toBe(true)
    } else {
      expect(isNumber(value)).toBe(true)
    }
  } else if ('boolean' in props) {
    if (props.not) {
      expect(isBoolean(value)).not.toBe(true)
    } else {
      expect(isBoolean(value)).toBe(true)
    }
  } else if ('object' in props) {
    if (props.not) {
      expect(isObject(value)).not.toBe(true)
    } else {
      expect(isObject(value)).toBe(true)
    }
  } else if ('array' in props) {
    if (props.not) {
      expect(isArray(value)).not.toBe(true)
    } else {
      expect(isArray(value)).toBe(true)
    }
  } else if ('date' in props) {
    if (props.not) {
      expect(isDate(value)).not.toBe(true)
    } else {
      expect(isDate(value)).toBe(true)
    }
  } else if ('error' in props) {
    if (props.not) {
      expect(isError(value)).not.toBe(true)
    } else {
      expect(isError(value)).toBe(true)
    }
  } else if ('regular' in props && 'expression' in props) {
    if (props.not) {
      expect(isRegExp(value)).not.toBe(true)
    } else {
      expect(isRegExp(value)).toBe(true)
    }
  } else if ('exactly' in props) {
    expect(value).toEqual(props.exactly)
  } else if ('either' in props  && !('matching' in props)) {
    const tests: boolean[] = props.either.map(v => {
      try {
        expect(v).toEqual(value)
        return true
      } catch (error) {
        return false
      }
    })
    expect(tests.some(Boolean)).toBe(true)
  } else if ('neither' in props && !('matching' in props)) {
    const tests: boolean[] = props.neither.map(v => {
      try {
        expect(v).toEqual(value)
        return true
      } catch (error) {
        return false
      }
    })
    expect(tests.every(f => f === false)).toBe(true)
  } else if ('matching' in props) {
    if ('either' in props) {
      expect(
        props.either.some(r => r.test(value))
      ).toBe(true)
    } else if ('neither' in props) {
      expect(
        props.neither.every(r => !r.test(value))
      ).toBe(true)
    } else {
      expect(props.matching.test(value)).toBe(props.not !== true)
    }
  } else if ('greater' in props) {
    let isTrue = null
    if (isNumber(props.than)) {
      isTrue = value.length > props.than
    } else if ('equals' in props && isNumber(props.equals)) {
      isTrue = value.length >= props.than
    }
    expect(isTrue).toBe(!props.not)
  } else if ('lesser' in props) {
    let isTrue = null
    if (isNumber(props.than)) {
      isTrue = value.length < props.than
    } else if ('equals' in props && isNumber(props.equals)) {
      isTrue = value.length <= props.than
    }
    expect(isTrue).toBe(!props.not)
  } else if ('not' in props) {
    expect(value).not.toEqual(props.not)
  }
}
