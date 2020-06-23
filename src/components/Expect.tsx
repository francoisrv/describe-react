import * as React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import ElementDescriber, { ElementDescriberProps } from './Element'
import Render from './Render'
import { ItProps, ElementExpectations } from '../types'
import Context from '../context'
import findElement from '../finders/findElement'
import expectElement from '../expectations/expectElement'

interface ExpectElementProps {
  element: true | React.ReactElement<ElementDescriberProps>
  first?: boolean
  last?: boolean
  at?: number
  root?: boolean
}


export type ExpectProps = 
& ExpectElementProps
& ElementExpectations
& ItProps


export default function Expect(props: React.PropsWithChildren<ExpectProps>)  {
  return (
    <Context.Consumer>
      { value => {
        const label = 'Expect'
        value.its.push({
          label,
          fn: async () => {
            const source = value.getSource()
            const testInstance = source.root.findByType(Render).children[0] as ReactTestRenderer.ReactTestInstance
            let element: ReactTestRenderer.ReactTestInstance | null = null

            if ('element' in props) {
              if (props.element === true) {
                element = testInstance
              } else if (typeof props.element === 'object' && 'type' in props.element && props.element.type === ElementDescriber) {
                const found = findElement(props.element.props, testInstance)
                if (typeof found !== 'string') {
                  element = found
                }
              }

              if (element) {
                for (const prop in props) {
                  if (expectElement[prop]) {
                    expectElement[prop](element, props[prop])
                  }
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
    </Context.Consumer>
  )
}
