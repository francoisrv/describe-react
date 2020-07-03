import React from 'react'

import Context from '../context'

export interface RunProps {
  function: Function
  _label?: string
  _skip?: boolean
  _only?: boolean
  _timeout?: number
}

export default function Run(props: RunProps) {
  return (
    <Context.Consumer>
      { ctx => {
        ctx.sections.push({
          label: 'Run',
          skip: !!props._skip,
          only: !!props._only,
          timeout: props._timeout,
          customLabel: props._label,
          sections: [
            {
              label: 'function',
              fn: async () => {

              }
            }
          ]
        })
        return <div />
      } }
    </Context.Consumer>
  )
}
