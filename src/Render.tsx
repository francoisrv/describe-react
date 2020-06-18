import * as React from 'react'
import ReactContext from './context'
import ReactTestRenderer from 'react-test-renderer'

export default function Render(props: React.PropsWithChildren<{}>)  {
  return (
    <ReactContext.Consumer>
      { value => {
        value.beforeAll.push(async () => {
          ReactTestRenderer.act(() => {
            value.elem = ReactTestRenderer.create(
              <>
                { props.children }
              </>
            )
          })
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