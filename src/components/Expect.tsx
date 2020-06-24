import React from 'react'
import { startCase, omit } from 'lodash'
import colors from 'colors'
import Context from '../context'
import { SubSection, ElementExpectations, ItProps, Of, UnitTypeIdentifier } from '../types'
import { printType, printHasText, printHasType, printHasProperty, printHasProperties, printHasState } from '../print'
import { getNumberWithOrdinal, isReactElementComponentOf } from '../utils'
import AssertType from '../entities/Assert'
import One from './One'
import Assert from '../entities/Assert'

interface ExpectAnatomy {
  label: string
  sections: SubSection[]
}

interface ExpectProps extends ElementExpectations, Omit<ItProps, 'label'> {
  element?: true
  root?: true
  first?: true
  last?: true
  at?: number
  elements?: true
  some?: true
  range?: [number, number]
  label?: string
}

function makeExpectAnatomy(props: ExpectProps): ExpectAnatomy {
  const bits: string[] = []
  const sections: SubSection[] = []
  const nextProps = omit(props, [
    'element',
    'elements',
    'root',
    'first',
    'last',
    'at',
    'some',
    'range',
    'label',
    'only',
    'skip',
    'timeout'
  ])

  if (props.element === true) {
    if (props.root) {
    } else if (props.first) {
      bits.push('first')
    } else if (props.last) {
      bits.push('last')
    } else if (props.at) {
      bits.push(getNumberWithOrdinal(props.at + 1))
    } else {
      bits.push('root')
    }
    bits.push('element')
  } else if ('elements' in props) {
    if (props.some) {
      bits.push('some')
    }
    bits.push('elements')
    if (props.range) {
      bits.push(`from ${ props.range[0] } to ${ props.range[1] }`)
    }
  }

  for (const prop in nextProps) {
    let label = startCase(prop).toLowerCase()
      .replace(/^not /, colors.italic('not '))
    const identifier = nextProps[prop]

    switch (prop) {

      default: {
        throw new Error(`Unknown assertion: ${ prop }`)
      } 

      case 'toHaveType':
      case 'notToHaveType': {
        label += ` ${  printHasType(identifier, prop === 'notToHaveType') }`
      } break

      case 'toHaveText':
      case 'notToHaveText': {
        label += ` ${ printHasText(identifier, prop === 'notToHaveText') }`
      } break

      case 'toHaveProperty':
      case 'notToHaveProperty': {
        if (Array.isArray(identifier)) {
          label = label.replace(/property/, 'properties')
        }
        label += ` ${ printHasProperty(identifier, prop === 'notToHaveProperty') }`
      } break

      case 'toHaveProperties':
      case 'notToHaveProperties': {
        label += ` ${ printHasProperties(identifier, prop === 'notToHaveProperties') }`
      } break

      case 'toHaveState':
      case 'notToHaveState': {
        label += ` ${ printHasState(identifier, prop === 'notToHaveState') }`
      } break

    }

    sections.push({
      label,
      fn: () => {}
    })
  }

  return {
    label: bits.join(' '),
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
