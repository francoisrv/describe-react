import * as React from 'react'
import ReactContext from './context'

interface RunProps {
  function: Function
  label?: string
}

export default function RunProps(props: RunProps) {
  return (
    <ReactContext.Consumer>
      { value => {
        value.its.push({
          label: props.label || 'Run function',
          fn: async () => {
            await props.function()
          }
        })
        return <div />
      } }
    </ReactContext.Consumer>
  )
}