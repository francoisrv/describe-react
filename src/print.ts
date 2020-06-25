import colors from 'colors'

import { UnitTypeIdentifier, TextIdentifier, TypeIdentifier, PropertyIdentifier, PropertiesIdentifier, Of, UnitPropertyIdentifier, StateIdentifier } from './types'
import Assert from './entities/Assert'
import { isReactElementComponentOf } from './utils'
import One, { OneProps } from './components/One'
import Property, { PropertyProps } from './components/Property'







export function printHasProperty(identifier: PropertyIdentifier, not = false) {
  const bits: string[] = []
  if (typeof identifier === 'string') {
    bits.push(
      'which has name',
      `< ${ printHighlight(identifier.toString()) } >`
    )
  } else if (identifier instanceof RegExp) {
    bits.push(
      'which name matches',
      `< ${ printHighlight(identifier.toString()) } >`
    )
  } else if (identifier instanceof Assert) {
    bits.push(`which statisfies assertion ${ printHighlight(printAssertion(identifier)) }`)
  } else if(isReactElementComponentOf(identifier, One)) {
    const ofs = (identifier as React.ReactElement<OneProps<Of<UnitPropertyIdentifier>>>).props.of
      .map(p => printHasProperty(p, not).replace(/^which /, ''))
    bits.push(
      'which',
      ofs.join(printLogicOperator(` ${ printOrNor(not)} `))
    )
  } else if (isReactElementComponentOf(identifier, Property)) {
    const chunks: string[] = []
    if ('name' in identifier.props) {
      chunks.push(printHasProperty(identifier.props.name).replace(/^which /, ''))
    }
    if ('value' in identifier.props) {
      chunks.push([
        'has value',
        printHighlight(JSON.stringify(identifier.props.value))
      ].join(' '))
    }
    if ('assert' in identifier.props) {
      chunks.push('which is expected to statisfy the assertion')
      if (identifier.props.assert.name) {
        chunks.push(printHighlight(identifier.props.assert.name
          ))
      } else {
        chunks.push(printHighlight(JSON.stringify(identifier.props.assert)))
      }
    }
    bits.push('which', chunks.join(printLogicOperator(' and ')))
  } else if (Array.isArray(identifier) && identifier.length) {
    bits.push(
      'which',
      identifier
        .map(i => `at least one ${ printHasProperty(i, not).replace(/^which /, '') }`)
        .join(printLogicOperator(' and '))
    )
  }
  return bits.join(' ')
}

export function printHasProperties(identifier: PropertiesIdentifier, not = false) {
  const bits: string[] = []
  if (Array.isArray(identifier)) {
    const chunks = identifier.map(i => {
      if (typeof i === 'string') {
        return `at least one is named "${ printHighlight(i) }"`
      }
      if (i instanceof RegExp) {
        return `at least one matches ${ printHighlight(i.toString()) }`
      }
      if(isReactElementComponentOf(i, One)) {
        const ofs = (i as React.ReactElement<OneProps<Of<any>>>).props.of
          .map(p => printHasProperty(p, not).replace(/^which /, ''))
        return `(at least one ${ ofs.join(printLogicOperator(` ${ printOrNor(not)} `)) })`
      }
      if (isReactElementComponentOf(i, Property)) {
        const chunks: string[] = []
        const { props} = i as React.ReactElement<PropertyProps>
        if ('name' in props) {
          chunks.push(printHasProperty(props.name).replace(/^which /, ''))
        }
        if ('value' in props) {
          chunks.push([
            'has value',
            printHighlight(JSON.stringify(props.value))
          ].join(' '))
        }
        if ('assert' in props) {
          chunks.push('is expected to statisfy the assertion')
          if (props.assert.name) {
            chunks.push(printHighlight(props.assert.name
              ))
          } else {
            chunks.push(printHighlight(JSON.stringify(props.assert)))
          }
        }
        return `at least one ${ chunks.join(printLogicOperator(' and ')) }`
      }
    })
    bits.push('which', chunks.join(printLogicOperator(' and ')))
  } else if (identifier instanceof Assert) {
    bits.push(
      'which satisfy assertion',
      printHighlight(printAssertion(identifier))
    )
  } else if (isReactElementComponentOf(identifier, Property)) {
    const chunks: string[] = []
    const { props} = identifier as React.ReactElement<PropertyProps>
    if ('name' in props) {
      chunks.push(printHasProperty(props.name).replace(/^which /, ''))
    }
    if ('value' in props) {
      chunks.push([
        'has value',
        printHighlight(JSON.stringify(props.value))
      ].join(' '))
    }
    if ('assert' in props) {
      chunks.push('is expected to statisfy the assertion')
      if (props.assert.name) {
        chunks.push(printHighlight(props.assert.name
          ))
      } else {
        chunks.push(printHighlight(JSON.stringify(props.assert)))
      }
    }
    bits.push('which', chunks.join(printLogicOperator(' and ')))
  }
  return bits.join(' ')
}

export function printHasState(identifier: StateIdentifier, not = false) {
  const bits: string[] = []
  if (typeof identifier === 'string') {
    bits.push(
      'with a key named',
      `"${ printHighlight(identifier) }"`
    )
  }
  if (identifier instanceof RegExp) {
    bits.push(
      'with a key whose name matches',
      printHighlight(identifier.toString())
    )
  }
  return bits.join(' ')
}
