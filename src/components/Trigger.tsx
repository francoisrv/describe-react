import { ExpectElementProps } from "./Expect";
import Context from "../context";
import React from 'react'
import { upperFirst, isString, isArray, first } from "lodash";
import DescribeReactError from "../DescribeReactError";
import pickElements from "../finders/pickElements";
import { act } from "react-test-renderer";

export type TriggerProps =
& { event: string, data?: any }
& ( { to: true } & ExpectElementProps )
& {
  _label?: string
  _skip?: boolean
  _only?: boolean
  _timeout?: number
}

export default function Trigger(props: TriggerProps) {
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
                const root = ctx.getRendered()
                if (!root || isString(root)) {
                  throw new DescribeReactError('Nothing was rendered')
                }
                const found = pickElements(root, props)
                if (!found)  {
                  throw new Error('Element not found')
                }
                const elem = isArray(found) ? first(found) : found
                act(() => {
                  const method = `on${ upperFirst(props.event) }`
                  if (!(method in elem.props)) {
                    throw new Error(`Elem has no handler for event: ${ props.event }`)
                  }
                  if (props.data) {
                    elem.props[method](props.data)
                  } else {
                    elem.props[method]()
                  }
                })
              }
            }
          ]
        })
        return <div />
      } }
    </Context.Consumer>
  )
}