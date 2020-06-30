import React from 'react'
import { omit } from 'lodash'
import colors from 'colors'
import Context from '../context'
import { SubSection, ElementExpectations, ItProps, UnitTypeIdentifier, TestModifier } from '../types'
import printHasType from '../print/printHasType'
import printHasText from '../print/printHasText'
import printSelector, { PrintSelectorProps } from '../print/printSelector'
import { HasProps } from './Has'

interface ExpectAnatomy {
  label: string
  sections: SubSection[]
}

type WhichProps =
| React.ReactElement<HasProps>

export type ExpectElementProps =
| { element: boolean } & { which?: WhichProps }
| { root: boolean, element: boolean }
| { single: boolean, element: boolean }
| { first: boolean, element: boolean }
| { last: boolean, element: boolean }
| { only: boolean, element: boolean }
| { element: boolean, number: number }
| { element: boolean, at: number }


export type ExpectElementsProps =
| { elements: boolean }
| { all: boolean, elements: boolean }
| { some: boolean, elements: boolean }
| { first: number, elements: boolean }
| { last: number, elements: boolean }
| { at: boolean, least: number, elements: boolean }
| { no: boolean, more: boolean, than: number, elements: boolean }
| { elements: boolean, between: number, and: number }

export type ElemProps =
& TestModifier
& (ExpectElementProps | ExpectElementProps)

function makeExpectAnatomy(props: ExpectProps): ExpectAnatomy {
  const sections: SubSection[] = []
  const describeLabel = printSelector(props)
  const nextProps = omit(props, [
    'element',
    'children',
    'root',
    'first',
    'last',
    'at',
    'some',
    'range',
    'label',
    'only',
    'skip',
    'timeout',
    'child'
  ])

  for (const prop in nextProps) {
    let testLabel = ''

    const identifier = nextProps[prop]

    switch (prop) {

      default: {
        throw new Error(`Unknown assertion: ${ prop }`)
      } 

      case 'toHaveType':
      case 'notToHaveType': {
        testLabel = printHasType(identifier, prop === 'notToHaveType')
      } break

      case 'toHaveText':
      case 'notToHaveText': {
        testLabel = printHasText(identifier, prop === 'notToHaveText')
      } break

      // case 'toHaveProperty':
      // case 'notToHaveProperty': {
      //   if (Array.isArray(identifier)) {
      //     label = label.replace(/property/, 'properties')
      //   }
      //   label += ` ${ printHasProperty(identifier, prop === 'notToHaveProperty') }`
      // } break

      // case 'toHaveProperties':
      // case 'notToHaveProperties': {
      //   label += ` ${ printHasProperties(identifier, prop === 'notToHaveProperties') }`
      // } break

      // case 'toHaveState':
      // case 'notToHaveState': {
      //   label += ` ${ printHasState(identifier, prop === 'notToHaveState') }`
      // } break

    }

    sections.push({
      label: testLabel,
      fn: () => {
        
      }
    })
  }

  return {
    label: describeLabel,
    sections
  }
}

const Expect: React.FC<ExpectProps> = props => {
  return (
    <Context.Consumer>
      { ctx => {
        const { label, sections } = makeExpectAnatomy(props)
        ctx.sections.push({
          label: `Expect ${ label }`,
          sections,
          skip: !!props.skip,
          only: !!props.only,
          timeout: props.timeout,
          customLabel: props.label
        })
        return <div />
      } }
    </Context.Consumer>
  )
}

export default Expect
