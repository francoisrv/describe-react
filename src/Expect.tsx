import * as React from 'react'
import ReactContext from './context'
import ReactTestRenderer from 'react-test-renderer'
import ElementDescriber, { ElementDescriberProps } from './Element'
import Render from './Render';
import { findElement } from './utils';

type ChildElement<C, P = any> = { type: C }

interface ExpectProps {
  at?: number
  element?: string | React.ComponentType<any> | true | React.ReactElement<ElementDescriberProps>
  elements?: string
  first?: boolean
  last?: boolean
  notToHaveType?:  string | React.ComponentType<any>
  root?: true
  toHaveLength?: number | boolean
  toHaveProperty?: string
  toHaveText?: string
  toHaveType?:  string | React.ComponentType<any>
  whichEquals?: any
}

function getNumberWithOrdinal(n: number) {
  var s = ["th", "st", "nd", "rd"],
      v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function Expect(props: React.PropsWithChildren<ExpectProps>)  {
  return (
    <ReactContext.Consumer>
      { value => {
        let label = 'Expect'
        if (props.first) {
          label += ' first'
        } else if (props.last) {
          label += ' last'
        }  else if (props.root) {
          label += ' root'
        } else if (typeof props.at === 'number') {
          label += ` ${ getNumberWithOrdinal(props.at + 1) }`
        }
        if (props.element) {
          if (typeof props.element === 'string') {
            label += ` element <${ props.element }>`
          } else if (props.element === true) {
            label += ' root element'
          } else if (typeof props.element === 'function' && props.element.name) {
            label += ` element <${ props.element.name }>`
          }
        } else if (props.elements) {
          label += ` elements <${ props.elements }>`
        }
        if ('toHaveText' in props) {
          label += ` to have text "${ props.toHaveText }"`
        }
        if (props.toHaveLength) {
          label += ` to have ${ props.toHaveLength } item(s)`
        }
        if (props.toHaveType) {
          if (typeof props.toHaveType === 'string') {
            label += ` to be a <${ props.toHaveType }>`
          } else {
            label += ` to be a <${ props.toHaveType.name }>`
          }
        }
        if (props.notToHaveType) {
          label += ` not to be a <${ props.notToHaveType }>`
        }
        if (props.toHaveProperty) {
          label += ` to have property ${ props.toHaveProperty }`
        }
        if ('whichEquals' in props) {
          label += ` which equals ${ JSON.stringify(props.whichEquals) }`
        }
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
                expect(elem.props).toHaveProperty(props.toHaveProperty)
                if ('whichEquals' in props) {
                  expect(elem.props).toHaveProperty(props.toHaveProperty, props.whichEquals)
                }
              }
              if (props.toHaveType) {
                expect(elem.type).toEqual(props.toHaveType)
              }
              if (props.notToHaveType) {
                expect(elem.type).not.toEqual(props.notToHaveType)
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
