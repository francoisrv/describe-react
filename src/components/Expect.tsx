import * as React from 'react'
import ReactContext from './context'
import ReactTestRenderer from 'react-test-renderer'
import ElementDescriber from './Element'
import Render from './Render'
import { findElement, hasProperty, hasType } from './utils'
import { ElementsDescriber, TypeDescriber, TextDescriber, LengthDescriber, PropsDescriber } from './types'
import { makeExpectLabel } from './labelers'

export interface ExpectProps {
  at?:                  number
  element?:             ElementsDescriber
  elements?:            ElementsDescriber
  first?:               boolean
  last?:                boolean
  notToHaveProperty?:   PropsDescriber
  notToHaveType?:       TypeDescriber
  root?:                true
  toHaveLength?:        LengthDescriber
  toHaveProperty?:      PropsDescriber
  toHaveText?:          TextDescriber
  toHaveType?:          TypeDescriber
}

export default function Expect(props: React.PropsWithChildren<ExpectProps>)  {
  return (
    <ReactContext.Consumer>
      { value => {
        const label = makeExpectLabel(props)
        value.its.push({
          label,
          fn: async () => {
            const source = value.getSource()
            const testInstance = source.root.findByType(Render).children[0] as ReactTestRenderer.ReactTestInstance
            if (props.element) {
              let elem: ReactTestRenderer.ReactTestInstance
              if (props.element === true) {
                elem = testInstance
              } else if (typeof props.element === 'object' && 'type' in props.element && props.element.type === ElementDescriber) {
                elem = findElement(props.element.props, testInstance)
              } else {
                // @ts-ignore
                const elems = testInstance.findAllByType(props.element)
                if (props.first || props.at === 0) {
                  elem = elems.shift()
                } else if (props.last) {
                  elem = elems.pop()
                } else if (typeof props.at === 'number') {
                  elem = elems[props.at]
                } else {
                  elem = elems.shift()
                }
              }
              
              if ('toHaveText' in props) {
                const text = elem.children.join('')
                expect(text).toEqual(props.toHaveText)
              }
              if (props.toHaveProperty) {
                expect(hasProperty(elem, props.toHaveProperty)).toBe(true)
              }
              if (props.notToHaveProperty) {
                expect(hasProperty(elem, props.notToHaveProperty)).toBe(false)
              }
              if (props.toHaveType) {
                hasType(elem, props.toHaveType)
              }
              if (props.notToHaveType) {
                hasType(elem, props.notToHaveType, true)
              }
            } else if (props.element) {
              // @ts-ignore
              const elems = testInstance.findAllByType(props.element)
              if ('toHaveLength' in props) {
                if (props.toHaveLength === true) {
                  expect(elems.length > 0).toBe(true)
                } else if (props.toHaveLength === false) {
                  expect(elems.length > 0).toBe(false)
                } else {
                  expect(elems).toHaveLength(props.toHaveLength)
                }
              }
            }
          }
        })
        return (
          <>
            { props.children }
          </>
        )
      } }
    </ReactContext.Consumer>
  )
}
