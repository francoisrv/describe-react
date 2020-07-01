import React from 'react'
import Context from '../context'

export interface DescribeProps {
  label: string
  only?: boolean
  skip?: boolean
}

const Describe: React.FC<React.PropsWithChildren<DescribeProps>> = props => {
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
