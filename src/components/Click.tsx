import * as React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import Render from './Render'
import Context from '../context'

interface ClickProps {
  element: string
  first?: boolean
  last?: boolean
  at?: number
}

export default function Click(props: ClickProps) {
  return (
    <Context.Consumer>
      { value => {
        const label = `Click element <${ props.element }>`
        value.its.push({
          label,
          fn: async () => {
            const source = value.getSource()
            const testInstance = source.root.findByType(Render).children[0] as ReactTestRenderer.ReactTestInstance
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
            ReactTestRenderer.act(() => {
              elem.props.onClick()
            })
          }
        })
        return <div />
      } }
    </Context.Consumer>
  )
}