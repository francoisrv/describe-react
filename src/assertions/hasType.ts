import ReactTestRender from 'react-test-renderer'
import { TypeIdentifier, UnitTypeIdentifier, TypeIdentifierIsFn } from '../types'
import { printElement, printType, printHighlight } from '../print/common'
import printHasType from '../print/printHasType'
import DescribeReactError from '../DescribeReactError'
import { isReactElementComponentOf } from '../utils'
import { Is, IsProps } from '../components/Is'
import { isString, isFunction } from 'lodash'

export default function hasType(
  elem: ReactTestRender.ReactTestInstance,
  type: TypeIdentifier
) {
  try {
    if (typeof type === 'string' || typeof type === 'function') {
      expect(elem).toHaveProperty('type', type)
    }  else if(isReactElementComponentOf(type, Is)) {
      const { props} = type as React.ReactElement<IsProps<UnitTypeIdentifier, TypeIdentifierIsFn>>
      if (props.not && (isString(props.not) || isFunction(props.not))) {
        expect(elem).not.toHaveProperty('type', props.not)
      } else if (props.of) {
        const passed = props.of.map(v => {
          try {
            expect(elem).toHaveProperty('type', v)
            return true
          } catch (error) {
            return false
          }
        })
        if (props.not) {
          expect(passed.every(f => f === false)).toBe(true)
        } else {
          expect(passed.some(Boolean)).toBe(true)
        }
      } else if (typeof props.true === 'function') {
        const result = props.true(elem.type, elem)
        expect(result).toBe(props.not ? false : true)
      } else if (typeof props.valid === 'function') {
        if (props.not) {
          let failed = false
          try {
            props.valid(elem.type, elem)   
          } catch (error) {
            failed = true
          }
          expect(failed).toBe(true)
        } else {
          props.valid(elem.type, elem) 
        }
      } else {
        throw new DescribeReactError(`Could not parse type identifier ${ printElement(type) }`)
      }
    }
  } catch (error) {
    const message = `Expected element ${ printElement(elem) } ${ printHasType(type) }`
    if (error instanceof DescribeReactError) {
      throw new DescribeReactError(`${ message }\n\n${ error }`)
    }
    throw new DescribeReactError(message)
  }
}