import colors from 'colors'

import { UnitTypeIdentifier, TextIdentifier, TypeIdentifier, PropertyIdentifier } from './types'
import Assert from './entities/Assert'
import { isReactElementComponentOf } from './utils'
import One from './components/One'
import Property from './components/Property'

export function printType(type: UnitTypeIdentifier) {
  if (typeof type === 'string') {
    return type
  }
  if (type.name) {
    return type.name
  }
}

export function printAssertion(assertion: Assert<any>) {
  if (assertion.label) {
    return assertion.label
  }
  if (assertion.assert.name) {
    return assertion.assert.name
  }
  return assertion.assert.toString()
}

export function printOrNor(not = false) {
  return not ? 'nor' : 'or'
}

export function printHasText(identifier: TextIdentifier, not = false) {
  const bits: string[] = []
  if (typeof identifier === 'string') {
    bits.push(
      'which equals',
      colors.bold.underline(identifier.toString())
    )
  } else if (identifier instanceof RegExp) {
    bits.push(`which matches ${ colors.bold.underline(identifier.toString()) }`)
  } else if (identifier instanceof Assert) {
    bits.push(`which statisfies assertion ${ colors.bold.underline(printAssertion(identifier)) }`)
  } else if(isReactElementComponentOf(identifier, One)) {
    const ofs = identifier.props.of.map(p => printHasText(p, not).replace(/^which /, ''))
    bits.push(
      'which',
      ofs.join(colors.italic(` ${ printOrNor(not)} `))
    )
  }
  return bits.join(' ')
}

export function printHasType(identifier: TypeIdentifier, not = false) {
  const bits: string[] = []
  if (typeof identifier === 'string') {
    bits.push(
      'which is',
      `< ${ colors.bold.underline(identifier.toString()) } >`
    )
  } else if (typeof identifier === 'function') {
    if (identifier.name) {
      bits.push(
        'which is component',
        `< ${ colors.bold.underline(identifier.name) } >`
      )
    } else {
      bits.push(
        'which is component',
        `< ${ colors.bold.underline(identifier.toString()) } >`
      )
    }
  } else if (identifier instanceof Assert) {
    bits.push(`which statisfies assertion ${ colors.bold.underline(printAssertion(identifier)) }`)
  } else if(isReactElementComponentOf(identifier, One)) {
    const ofs = identifier.props.of.map(p => printHasType(p, not).replace(/^which /, ''))
    bits.push(
      'which',
      ofs.join(colors.italic(` ${ printOrNor(not)} `))
    )
  }
  return bits.join(' ')
}

export function printHasProperty(identifier: PropertyIdentifier, not = false) {
  const bits: string[] = []
  if (typeof identifier === 'string') {
    bits.push(
      'which has name',
      `< ${ colors.bold.underline(identifier.toString()) } >`
    )
  } else if (identifier instanceof RegExp) {
    bits.push(
      'which name matches',
      `< ${ colors.bold.underline(identifier.toString()) } >`
    )
  } else if (identifier instanceof Assert) {
    bits.push(`which statisfies assertion ${ colors.bold.underline(printAssertion(identifier)) }`)
  } else if(isReactElementComponentOf(identifier, One)) {
    const ofs = identifier.props.of.map(p => printHasProperty(p, not).replace(/^which /, ''))
    bits.push(
      'which',
      ofs.join(colors.italic(` ${ printOrNor(not)} `))
    )
  } else if (isReactElementComponentOf(identifier, Property)) {
    const chunks: string[] = []
    if ('name' in identifier.props) {
      chunks.push(printHasProperty(identifier.props.name).replace(/^which /, ''))
    }
    if ('value' in identifier.props) {
      chunks.push([
        'has value',
        colors.bold.underline(JSON.stringify(identifier.props.value))
      ].join(' '))
    }
    if ('children' in identifier.props && typeof identifier.props.children === 'function') {
      if ('name' in identifier.props) {
        bits.push(
          printHasProperty(identifier.props.name),
          colors.italic('and'),
          'is expected to statisfy the assertion'
        )
      } else {
        bits.push('which is expected to statisfy the assertion')
      }
      if (identifier.props.children.name) {
        bits.push(colors.bold.underline(identifier.props.children.name
          ))
      } else {
        bits.push(colors.bold.underline(JSON.stringify(identifier.props.children)))
      }
    } else {
      bits.push('which', chunks.join(colors.italic(' and ')))
    }
  }
  return bits.join(' ')
}
