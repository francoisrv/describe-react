import React from 'react'
import Context from '../context'
import { ItProps } from '../types'

const Describe: React.FC<React.PropsWithChildren<ItProps>> = props => {
  return (
    <Context.Consumer>
      { ctx => {
        if (ctx.describer) {
          throw new Error('There is already a Describe component')
        }
        ctx.describer = {
          label: props.label,
          skip: !!props.skip,
          only: !!props.only
        }
        return (
          <>
            { props.children }
          </>
        )
      } }
    </Context.Consumer>
  )
}

export default Describe
