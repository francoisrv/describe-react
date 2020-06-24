import React from 'react'
import { startCase, omit } from 'lodash'
import colors from 'colors'
import Context from '../context'
import { SubSection, ElementExpectations, ItProps } from '../types'
import printType from '../print'
import { getNumberWithOrdinal, isReactElementComponentOf } from '../utils'
import AssertType from '../entities/AssertType'
import One from './One'

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
    const identifier = nextProps[prop]

    switch (prop) {

      default: {
        throw new Error(`Unknown assertion: ${ prop }`)
      } 

      case 'toHaveType':
      case 'notToHaveType': {
        label = ''
        if (prop === 'notToHaveType') {
          label += colors.italic('not ')
        }
        label += 'to have type'
        if (identifier instanceof AssertType) {
          if (identifier.label) {
            label += ` which satisfies assertion "${ colors.bold.underline(identifier.label) }"`
          } else {
            label += ` which satisfies assertion ${ colors.bold.underline(identifier.assert.name || identifier.assert.toString()) }`
          }
        } else if(isReactElementComponentOf(identifier, One)) {
          label += ' which either '
          label += identifier.props.of
            .map((t: string | React.ComponentType<any>) => {
              if (typeof t === 'string' || typeof t === 'function') {
                return `is <${ colors.bold.underline(printType(t)) }>`
              }
              if (typeof t === 'function') {
                return 
              }
              return ''
            })
            .join(colors.italic(' or '))
        } else {
          label += ` <${ colors.bold.underline(printType(identifier)) }>`
        }
      } break

      case 'toIncludeType':
      case 'notToIncludeType': {
        label = ''
        if (prop === 'notToIncludeType') {
          label += colors.italic('not ')
        }
        label += `to have type ${ identifier.map(n => `<${ colors.bold.underline(printType(n)) }>`).join(colors.italic(` ${ prop === 'notToIncludeType' ? 'n' : '' }or `) ) }`
      } break

      case 'toHaveText':
      case 'notToHaveText': {
        if (typeof identifier === 'string') {
          label += ` "${ colors.bold.underline(identifier.toString()) }"`
        } else if (identifier instanceof RegExp) {
          label += ` which matches ${ colors.bold.underline(identifier.toString()) }`
        }
      } break

      case 'toIncludeText':
      case 'notToIncludeText': {
        label = ''
        if (prop === 'notToIncludeText') {
          label += colors.italic('not ')
        }
        label += 'to have text which'
        const inbits: string[] = []
        for (const item of identifier) {
          if (typeof item === 'string') {
            inbits.push(`equals "${ colors.bold.underline(item) }"`)
          } else if (item instanceof RegExp) {
            inbits.push(`matches ${ colors.bold.underline(item.toString()) }`)
          }
        }
        label += ` ${ inbits.join(colors.italic(` ${ prop === 'notToIncludeText' ? 'n' : '' }or `) ) }`
      } break

      case 'toHaveProperty':
      case 'notToHaveProperty': {
        if (typeof identifier === 'string') {
          label += ` named "${ colors.bold.underline(identifier.toString()) }"`
        } else if (identifier instanceof RegExp) {
          label += ` which name matches ${ colors.bold.underline(identifier.toString()) }`
          // @ts-ignore
        } else if (typeof identifier === 'object'){
          if ('name' in identifier) {
            if (typeof identifier.name === 'string') {
              label += ` which name is "${ colors.bold.underline(identifier.name.toString()) }"`
            } else if (identifier.name instanceof RegExp) {
              label += ` which name matches ${ colors.bold.underline(identifier.name.toString()) }`
              // @ts-ignore
            }
            if ('value' in identifier) {
              label += colors.italic(' and')
            }
          }
          if ('value' in identifier) {
            label += ' which value'
          }
        }
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
