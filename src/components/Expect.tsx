import React from 'react'
import { omit } from 'lodash'
import colors from 'colors'
import Context from '../context'
import { SubSection, ElementExpectations, ItProps, UnitTypeIdentifier } from '../types'
import printHasType from '../print/printHasType'
import printHasText from '../print/printHasText'
import printSelector, { PrintSelectorProps } from '../print/printSelector'

interface ExpectAnatomy {
  label: string
  sections: SubSection[]
}

interface ExpectProps
  extends
    ElementExpectations,
    PrintSelectorProps
{
  label?: string
  skip?: boolean
  timeout?: number
}

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
