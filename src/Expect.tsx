import * as React from 'react'
import ReactContext from './context'
import ReactTestRenderer from 'react-test-renderer'

interface ExpectProps {
  at?: number
  element?: string | React.ComponentType<any> | true
  elements?: string
  first?: boolean
  last?: boolean
  toHaveLength?: number | boolean
  toHaveProperty?: string
  toHaveText?: string
  toHaveType?: string
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
        } else if (typeof props.at === 'number') {
          label += ` ${ getNumberWithOrdinal(props.at + 1) }`
        }
        if (props.element) {
          if (typeof props.element === 'string') {
            label += ` element <${ props.element }>`
          } else if (props.element === true) {
            label += ' root element'
          } else if (props.element.name) {
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
          label += ` to be ${ props.toHaveType }`
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
            if (!value.elem) {
              throw new Error('Missing element')
            }
            const testInstance = value.elem.root
            if (props.element) {
              let elem: ReactTestRenderer.ReactTestInstance
              if (props.element === true) {
                elem = testInstance
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
