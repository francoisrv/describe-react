import * as React from 'react'
import ReactContext from './context'
import ReactTestRenderer from 'react-test-renderer'

interface ClickProps {
  element: string
  first?: boolean
  last?: boolean
  at?: number
}

export default function Click(props: ClickProps) {
  return (
    <ReactContext.Consumer>
      { value => {
        const label = `Click element <${ props.element }>`
        value.its.push({
          label,
          fn: async () => {
            if (!value.elem) {
              throw new Error('Missing element')
            }
            const testInstance = value.elem.root
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
    </ReactContext.Consumer>
  )
}