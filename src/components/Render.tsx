import * as React from 'react'
import Context from '../context'

export default function Render(props: React.PropsWithChildren<{}>)  {
  return (
    <Context.Consumer>
      { () => {
        return (
          <>
            { props.children }
          </>
        )
      } }
    </Context.Consumer>
  )
}