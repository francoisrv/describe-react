import * as React from 'react'
import ReactContext from './context'
import ReactTestRenderer from 'react-test-renderer'

interface ExpectProps {
  at?: number
  element?: string
  elements?: string
  first?: boolean
  last?: boolean
  toHaveLength?: number | boolean
  toHaveText?: string
  toHaveType?: string
}

export default function Expect(props: React.PropsWithChildren<ExpectProps>)  {
  return (
    <ReactContext.Consumer>
      { value => {
        let label = 'Expect'
        if (props.element) {
          label += ` element <${ props.element }>`
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
        value.its.push({
          label,
          fn: async () => {
            if (!value.elem) {
              throw new Error('Missing element')
            }
            const testInstance = value.elem.root
            if (props.element) {
              let elem: ReactTestRenderer.ReactTestInstance
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
              if ('toHaveText' in props) {
                const text = elem.children.join('')
                expect(text).toEqual(props.toHaveText)
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
