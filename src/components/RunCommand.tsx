import * as React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import Context from '../context'
import { ContextInterface } from '../types'

interface RunProps {
  function: (context: ContextInterface) => Promise<void>
  label?: string
}

export default function RunProps(props: RunProps) {
  return (
    <Context.Consumer>
      { value => {
        value.its.push({
          label: props.label || 'Run function',
          fn: async () => {
            await ReactTestRenderer.act(async () => {
              await props.function(value)
            })
          }
        })
        return <div />
      } }
    </Context.Consumer>
  )
}
