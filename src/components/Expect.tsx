import * as React from 'react'
import ReactContext from './context'
import ReactTestRenderer from 'react-test-renderer'
import ElementDescriber from './Element'
import Render from './Render'
import expectElement from '../lib/expectations/expectElement'
import { ElementsDescriber, ElementExpectations } from '../types'

interface ExpectElementsProps {
  elements: ElementsDescriber
  some?: boolean
  all?: boolean
  first?: number
  last?: number
  odd?: boolean
  even?: boolean
  range?: [number, number]
}

interface ExpectElementProps {
  element: any
  first?: boolean
  last?: boolean
  at?: number
  root?: boolean
}


export type ExpectProps = 
| (ExpectElementProps & ElementExpectations)

export default function Expect(props: React.PropsWithChildren<ExpectProps>)  {
  return (
    <ReactContext.Consumer>
      { value => {
        const label = 'Expect'
        value.its.push({
          label,
          fn: async () => {
            const source = value.getSource()
            const testInstance = source.root.findByType(Render).children[0] as ReactTestRenderer.ReactTestInstance
            let element: ReactTestRenderer.ReactTestInstance | null = null

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
              
            } else if (props.element) {
              // @ts-ignore
              const elems = testInstance.findAllByType(props.element)
            }

            if (element) {
              for (const prop in props) {
                if (expectElement[prop]) {
                  expectElement[prop](element, props[prop])
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
