import React from 'react'
import { omit, isArray, isString, isUndefined, map, isNumber } from 'lodash'
import ReactTestRenderer from 'react-test-renderer'

import Context from '../context'
import { TestModifier, SingleOrMany } from '../types'
import { HasProps } from './Has'
import { printProps, printType } from '../print'
import { isReactElementComponentOf } from '../utils'
import To from './To'
import pickElements from '../finders/pickElements'
import DescribeReactError from '../DescribeReactError'
import has from '../assertions/has'

type ElementWhich = SingleOrMany<
  | React.ReactElement<HasProps>
>

export type ExpectElementProps =
| { element: boolean, which?: ElementWhich }
| { root: boolean, element: boolean }
| { single: boolean, element: boolean, which?: ElementWhich }
| { first: boolean, element: boolean, which?: ElementWhich }
| { last: boolean, element: boolean, which?: ElementWhich }
| { only: boolean, element: boolean, which?: ElementWhich }
| { element: boolean, number: number, which?: ElementWhich }
| { element: boolean, at: number, which?: ElementWhich }


export type ExpectElementsProps =
| { elements: boolean }
| { exactly: number, elements: boolean }
| { all: boolean, elements: boolean }
| { some: boolean, elements: boolean }
| { first: number, elements: boolean }
| { last: number, elements: boolean }
| { at: boolean, least: number, elements: boolean }
| { no: boolean, more: boolean, than: number, elements: boolean }
| { elements: boolean, between: number, and: number }

export type ExpectProps =
& TestModifier
& (ExpectElementProps | ExpectElementsProps)

interface TestError {
  label: string
  passed: boolean
  node: ReactTestRenderer.ReactTestInstance
}

const Expect: React.FC<ExpectProps> = props => {
  return (
    <Context.Consumer>
      { ctx => {
        const children = isArray(props.children) ? props.children : [props.children]
        const describeLabel = `Expect ${ printProps(omit(props, ['children', '_skip', '_only', '_label', '_timeout'])) }`
        const tests: TestError[] = []
        ctx.sections.push({
          label: describeLabel,
          skip: !!props._skip,
          only: !!props._only,
          timeout: props._timeout,
          customLabel: props._label,
          afterAll: () => {
            if (tests.length) {
              if ('some' in props) {
                if (!(map(tests, 'passed').some(Boolean))) {
                  throw new DescribeReactError(`Expected some elements to meet expectations`)
                }
              } else if ('first' in props && isNumber(props.first)) {
                const firstTests = tests.slice(0, props.first as number)
                if (!(map(firstTests, 'passed').every(Boolean))) {
                  throw new DescribeReactError(`Expected first ${ props.first } elements to meet expectations`)
                }
              } else if ('last' in props && isNumber(props.last)) {
                const lastTests = tests.slice(props.last as number)
                if (!(map(lastTests, 'passed').every(Boolean))) {
                  throw new DescribeReactError(`Expected last ${ props.last } elements to meet expectations`)
                }
              } else if ('least' in props && isNumber(props.least)) {
                const leastTests = map(tests, 'passed')
                if (leastTests.length < props.least) {
                  throw new DescribeReactError(`Expected at least ${ props.least } elements to meet expectations, instead got ${ leastTests.length }`)
                }
              } else if ('than' in props && isNumber(props.than)) {
                const thanTests = map(tests, 'passed')
                if (thanTests.length > props.than) {
                  throw new DescribeReactError(`Expected no more than ${ props.than } elements to meet expectations, instead got ${ thanTests.length }`)
                }
              } else if ('exactly' in props && isNumber(props.exactly)) {
                const exactlyTests = map(tests, 'passed')
                if (exactlyTests.length !== props.exactly) {
                  throw new DescribeReactError(`Expected to have exactly ${ props.exactly } elements to meet expectations, instead got ${ exactlyTests.length }`)
                }
              } else if ('between' in props && isNumber(props.between) && 'and' in props && isNumber(props.and)) {
                const betweenTests = map(tests, 'passed')
                if (betweenTests.length < props.between || betweenTests.length >  props.and) {
                  throw new DescribeReactError(`Expected to have between ${ props.between } and ${ props.and } elements to meet expectations, instead got ${ betweenTests.length }`)
                }
              }
            }
          },
          sections: children.map(child => {
            const elem = child as React.ReactElement<any>
            const label = `${ printType(elem.type) } ${ printProps(elem.props) }`
            return {
              label,
              fn: () => {
                const root = ctx.getRendered()
                if (!root || isString(root)) {
                  throw new DescribeReactError('Nothing was rendered')
                }
                const found = pickElements(root, props)
                if (isReactElementComponentOf(elem, To)) {
                  if ('have' in elem.props) {
                    const haveProps = omit(elem.props, ['have'])
                    if (isArray(found)) {
                      for (const node of found) {
                        let error: Error | undefined
                        try {
                          has(node, haveProps as HasProps)
                        } catch (err) {
                          error = err
                        }
                        if (error) {
                          if (
                            ('some' in props) ||
                            ('first' in props && isNumber(props.first)) ||
                            ('last' in props && isNumber(props.last)) ||
                            ('least' in props && isNumber(props.least)) ||
                            ('than' in props && isNumber(props.than)) ||
                            ('exactly' in props && isNumber(props.exactly)) ||
                            ('between' in props && isNumber(props.between) && 'and' in props && isNumber(props.and))
                          ) {
                            tests.push({ label, passed: isUndefined(error), node })
                          } else {
                            throw error
                          }
                        }
                      }
                    } else {
                      has(found, haveProps as HasProps)
                    }
                  }
                }
              }
            }
          })
        })
        return <div />
      } }
    </Context.Consumer>
  )
}

export default Expect
