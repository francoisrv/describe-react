import { isString, isNumber, isBoolean, isObject, isArray, isDate, isError, isRegExp, isEmpty, Dictionary, isEqual } from 'lodash'

import { IsProps } from '../components/Is'

export default function is<T>(
  value: any,
  props: IsProps<T>
) {

  function check(cond: boolean) {
    expect(cond).toBe(!props.not)
  }

  function checkEquals(v: any) {
    check(value === v)
  }

  function checkType(t: any) {
    check(typeof value === t)
  }

  switch (true) {
    case ('array' in props): check(isArray(value)); break
    case ('boolean' in props): checkType('boolean'); break
    case ('date' in props): check(isDate(value)); break
    case ('empty' in props): check(isEmpty(value)); break
    case ('error' in props): check(isError(value)); break
    case ('exactly' in props): check(isEqual(value, props.exactly)); break
    case ('false' in props): checkEquals(false); break
    case ('function' in props): checkType('function'); break
    case ('null' in props): checkEquals(null); break
    case ('number' in props): checkType('number'); break
    case ('object' in props): checkType('object'); break
    case ('regular' in props && 'expression' in props): check(isRegExp(value)); break
    case ('string' in props): checkType('string'); break
    case ('true' in props): checkEquals(true); break
    case ('undefined' in props): checkType('undefined'); break

    default: {
      if ('either' in props  && !('matching' in props)) {
    
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
          check(props.either.some(r => r.test(value)))
        } else if ('neither' in props) {
          check(props.neither.every(r => !r.test(value)))
        } else {
          check(props.matching.test(value))
        }
      
      } else if ('greater' in props) {
        
        let isTrue = null
        if (isNumber(props.than)) {
          isTrue = value > props.than
        } else if ('equals' in props && isNumber(props.equals)) {
          isTrue = value >= props.equals
        }
        check(isTrue)
      
      } else if ('lesser' in props) {
        
        let isTrue = null
        if (isNumber(props.than)) {
          isTrue = value < props.than
        } else if ('equals' in props && isNumber(props.equals)) {
          isTrue = value <= props.equals
        }
        check(isTrue)
      
      } else if ('not' in props) {
        
        expect(value).not.toEqual(props.not)
      
      }
    } break
  }
}
