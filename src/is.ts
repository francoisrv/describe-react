import { IsProps } from './components/Is'
import { isString, isNumber, isBoolean, isObject, isArray, isDate, isError, isRegExp } from 'lodash'

export function is<T, F extends (...args: any[]) => any>(
  value: any,
  props: IsProps<T, F>
) {
  if (props.anything) {
    
  } else if (props.true === true) {
    expect(value).toBe(true)
  } else if (props.false) {
    expect(value).toBe(false)
  } else if (props.null) {
    if (props.not) {
      expect(value).not.toBe(null)
    } else {
      expect(value).toBe(null)
    }
  } else if (props.undefined) {
    if (props.not) {
      expect(value).not.toBeUndefined()
    } else {
      expect(value).toBeUndefined()
    }
  } else if (props.string) {
    if (props.not) {
      expect(isString(value)).not.toBe(true)
    } else {
      expect(isString(value)).toBe(true)
    }
  } else if (props.number) {
    if (props.not) {
      expect(isNumber(value)).not.toBe(true)
    } else {
      expect(isNumber(value)).toBe(true)
    }
  } else if (props.boolean) {
    if (props.not) {
      expect(isBoolean(value)).not.toBe(true)
    } else {
      expect(isBoolean(value)).toBe(true)
    }
  } else if (props.object) {
    if (props.not) {
      expect(isObject(value)).not.toBe(true)
    } else {
      expect(isObject(value)).toBe(true)
    }
  } else if (props.array) {
    if (props.not) {
      expect(isArray(value)).not.toBe(true)
    } else {
      expect(isArray(value)).toBe(true)
    }
  } else if (props.date) {
    if (props.not) {
      expect(isDate(value)).not.toBe(true)
    } else {
      expect(isDate(value)).toBe(true)
    }
  } else if (props.error) {
    if (props.not) {
      expect(isError(value)).not.toBe(true)
    } else {
      expect(isError(value)).toBe(true)
    }
  } else if (props.regular && props.expression) {
    if (props.not) {
      expect(isRegExp(value)).not.toBe(true)
    } else {
      expect(isRegExp(value)).toBe(true)
    }
  } else if ('exactly' in props) {
    expect(value).toEqual(props.exactly)
  } else if (props.of) {
    const tests: boolean[] = props.of.map(v => {
      try {
        expect(v).toEqual(value)
        return true
      } catch (error) {
        return false
      }
    })
    if (props.not) {
      expect(tests.every(f => f === false)).toBe(true)
    } else {
      expect(tests.some(Boolean)).toBe(true)
    }
  } else if (typeof props.true === 'function') {
    if (props.not) {
      expect(props.true(value)).toBe(false)
    } else {
      expect(props.true(value)).toBe(true)
    }
  } else if (props.valid) {
    let failed = false
    try {
      props.valid(value)
    } catch (error) {
      failed = true
    }
    if (props.not) {
      expect(failed).toBe(true)
    } else {
      expect(failed).toBe(false)
    }
  } else if ('not' in props) {
    expect(value).not.toEqual(props.not)
  }
}
