import * as React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import ElementDescriber, { ElementDescriberProps } from './Element'
import Render from './Render'
import { ItProps, ElementExpectations } from '../types'
import Context from '../context'
import findElement from '../finders/findElement'
import expectElement from '../expectations/expectElement'
import Property, { PropertyProps, makePropertyLabel } from './Property'
import { includes, startCase } from 'lodash'

interface ExpectElementProps {
  element: true | React.ReactElement<ElementDescriberProps>
  first?: boolean
  last?: boolean
  at?: number
  root?: boolean
}

type ExpectExpectationsOverwriter =
| 'toHaveProperty'

interface ExpectExpectations extends Omit<ElementExpectations, ExpectExpectationsOverwriter> {
  toHaveProperty:
  | ElementExpectations['toHaveProperty']
  | React.ReactElement<PropertyProps>
}

export type ExpectProps = 
& ExpectElementProps
& ExpectExpectations
& ItProps

function makeExpectLabel(props: ExpectProps) {
  const bits: string[] = ['Expect']
  if ('element' in props) {
    if (props.root) {
      bits.push('root')
    }
    bits.push('element')
  }
  const expectations: string[] = []
  for (const prop in props) {
    if (includes(['element', 'root'], prop)) {
      continue
    }
    const expectation: string[] = [
      startCase(prop).toLowerCase()
        .replace(/^not /, '*not* ')
        .replace(/to have property/, 'to have a property')
    ]
    switch (prop) {

      case 'toHaveText': {
        if (typeof props.toHaveText === 'string') {
          expectation.push(JSON.stringify(props.toHaveText))
        } else if (props.toHaveText instanceof RegExp) {
          expectation.push('which matches regular expression', props.toHaveText.toString())
        }
      } break

      case 'toHaveProperty': {
        if (typeof props.toHaveProperty === 'object' && ('type' in props.toHaveProperty) && props.toHaveProperty.type === Property) {
          expectation.push(makePropertyLabel(props.toHaveProperty.props))
        }
      } break

      case 'notToHaveProperty': {
        if (typeof props.notToHaveProperty === 'string') {
          expectation.push('which name is', JSON.stringify(props.notToHaveProperty))
        }
      } break

    }
    expectations.push(`< ${ expectation.join(' ') } >`)
  }
  bits.push(expectations.join(' AND '))
  return bits.join(' ')
}

export default function Expect(props: React.PropsWithChildren<ExpectProps>)  {
  return (
    <Context.Consumer>
      { value => {
        const label = makeExpectLabel(props)
        value.its.push({
          only: !!props.only,
          skip: !!props.skip,
          timeout: props.timeout,
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
