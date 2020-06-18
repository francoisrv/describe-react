import * as React from 'react'
import ReactContext from './context'

export default function Describe(props: React.PropsWithChildren<{ label: string }>) {
  return (
    <ReactContext.Consumer>
      { value => {
        if (value.describer) {
          throw new Error('There is already a describer')
        }
        value.describer = {
          label: props.label
        }
        return (
          <>
            { props.children }
          </>
        )
      } }
    </ReactContext.Consumer>
  )
}