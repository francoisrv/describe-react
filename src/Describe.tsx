import * as React from 'react'
import ReactContext from './context'

interface DescribeProps {
  label: string
  skip?: boolean
  only?: boolean
}

export default function Describe(props: React.PropsWithChildren<DescribeProps>) {
  return (
    <ReactContext.Consumer>
      { value => {
        if (value.describer) {
          throw new Error('There is already a describer')
        }
        value.describer = {
          label: props.label,
          only: Boolean(props.only),
          skip: Boolean(props.skip),
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
