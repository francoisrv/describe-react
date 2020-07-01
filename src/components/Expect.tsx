import React from 'react'
import { omit, isArray, isString } from 'lodash'
import Context from '../context'
import { SubSection, TestModifier, SingleOrMany } from '../types'
import { HasProps } from './Has'
import { printProps, printType } from '../print/common'
import { isReactElementComponentOf } from '../utils'
import To from './To'
import pickElements, { prepickElements } from '../pickElements'
import DescribeReactError from '../DescribeReactError'
import has from '../has'


type WhichProps =
| React.ReactElement<HasProps>

type ElementWhich = SingleOrMany<
  | React.ReactElement<HasProps>
>

export type ExpectElementProps =
| { element: boolean, which?: ElementWhich }
| { root: boolean, element: boolean }
| { single: boolean, element: boolean, which?: ElementWhich }
| { first: boolean, element: boolean, which?: ElementWhich }
| { last: boolean, element: boolean, which?: ElementWhich }
| { only: boolean, element: boolean, which?: ElementWhich }
| { element: boolean, number: number, which?: ElementWhich }
| { element: boolean, at: number, which?: ElementWhich }


export type ExpectElementsProps =
| { elements: boolean }
| { exactly: number, elements: boolean }
| { all: boolean, elements: boolean }
| { some: boolean, elements: boolean }
| { first: number, elements: boolean }
| { last: number, elements: boolean }
| { at: boolean, least: number, elements: boolean }
| { no: boolean, more: boolean, than: number, elements: boolean }
| { elements: boolean, between: number, and: number }

export type ExpectProps =
& TestModifier
& (ExpectElementProps | ExpectElementsProps)

const Expect: React.FC<ExpectProps> = props => {
  return (
    <Context.Consumer>
      { ctx => {
        const children = isArray(props.children) ? props.children : [props.children]
        ctx.sections.push({
          label: `Expect ${ printProps(omit(props, ['children', '_skip', '_only', '_label', '_timeout'])) }`,
          skip: !!props._skip,
          only: !!props._only,
          timeout: props._timeout,
          customLabel: props._label,
          sections: children.map(child => {
            const elem = child as React.ReactElement<any>
            return {
              label: `${ printType(elem.type) } ${ printProps(elem.props) }`,
              fn: () => {
                const root = ctx.getRendered()
                if (!root || isString(root)) {
                  throw new DescribeReactError('Nothing was rendered')
                }
                const found = pickElements(root, props)
                if (isReactElementComponentOf(elem, To)) {
                  if ('have' in elem.props) {
                    const haveProps = omit(elem.props, ['have'])
                    has(found, haveProps)
                  }
                }
              }
            }
          })
        })
        return <div />
      } }
    </Context.Consumer>
  )
}

export default Expect
