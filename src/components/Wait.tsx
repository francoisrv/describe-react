import * as React from 'react'
import Context from '../context'

interface WaitProps {
  milliseconds?: number
  seconds?: number
}

export default function Wait(props: React.PropsWithChildren<WaitProps>) {
  let ms = 0
  let label = 'Wait'
  if ('milliseconds' in props) {
    ms = props.milliseconds
    label += ` ${ props.milliseconds } milliseconds`
  } else if ('seconds' in props) {
    ms = props.seconds * 1000
    label += ` ${ props.seconds } seconds`
  }
  return (
    <Context.Consumer>
      { value => {
        value.its.push({
          label,
          fn: async () => {
            await new Promise(resolve => setTimeout(resolve, ms))
          }
        })
        return <div />
      } }
    </Context.Consumer>
  )
}
