import { PropsDescriber, TypeDescriber } from './types'
import { ExpectProperty, getNumberWithOrdinal } from './utils'
import { ExpectProps } from './Expect'

export function labelToHaveType(type: TypeDescriber, not = false) {
  const id = not ? 'not ' : ''
  const typeName = typeof type === 'string' ? type : type.name
  let label = `${ id } to be a <${ typeName }>`
  return label
}

export function makeExpectPropertyLabel(describer: PropsDescriber, not = false) {
  let label = ''
  if (typeof describer === 'string') {
    label += `${ not ? 'not ' : '' }to have a property named "${ describer }"`
  } else if (describer instanceof RegExp) {
    label += `${ not ? 'not ' : '' }to have a property which name matches regular expression "${ describer }"`
  } else if (Array.isArray(describer)) {
    const conds: string[] = []
    for (const item of describer) {
      if (typeof item === 'string') {
        conds.push(`${ not ? 'not ' : '' }to have a property named "${ item }"`)
      } else if (item instanceof RegExp) {
        conds.push(`${ not ? 'not ' : '' }to have a property which name matches regular expression "${ item }"`)
      }
    }
    label += `${ conds.join(' and ')}`
  } else if (typeof describer === 'object') {
    const conds: string[] = []
    for (const prop in describer) {
      if (describer[prop] instanceof ExpectProperty) {
        if (describer[prop].fn.name) {
          conds.push(`${ not ? 'not ' : '' }to have a property named "${ prop }" which returns true to the function ${ describer[prop].fn.name }`)
        } else {
          conds.push(`${ not ? 'not ' : '' }to have a property named "${ prop }" which returns true to the ${ describer[prop].fn }`)
        }
      } else {
        conds.push(`${ not ? 'not ' : '' }to have a property named "${ prop }" which equals ${ JSON.stringify(describer[prop]) }`)
      }
    }
    label += `${ conds.join(' and ')}`
  }
  return label
}

export function makeExpectLabel(props: React.PropsWithChildren<ExpectProps>) {
  let label = 'Expect'
  if (props.first) {
    label += ' first'
  } else if (props.last) {
    label += ' last'
  }  else if (props.root) {
    label += ' root'
  } else if (typeof props.at === 'number') {
    label += ` ${ getNumberWithOrdinal(props.at + 1) }`
  }
  if (props.element) {
    if (typeof props.element === 'string') {
      label += ` element <${ props.element }>`
    } else if (props.element === true) {
      label += ' root element'
    } else if (typeof props.element === 'function' && props.element.name) {
      label += ` element <${ props.element.name }>`
    }
  } else if (props.elements) {
    label += ` elements <${ props.elements }>`
  }
  if ('toHaveText' in props) {
    label += ` to have text "${ props.toHaveText }"`
  }
  if (props.toHaveLength) {
    label += ` to have ${ props.toHaveLength } item(s)`
  }
  if (props.toHaveType) {
    if (typeof props.toHaveType === 'string') {
      label += ` to be a <${ props.toHaveType }>`
    } else {
      label += ` to be a <${ props.toHaveType.name }>`
    }
  }
  if (props.notToHaveType) {
    label += ` not to be a <${ props.notToHaveType }>`
  }
  if (props.toHaveProperty) {
    label += ` ${ makeExpectPropertyLabel(props.toHaveProperty) }`
  }
  if (props.notToHaveProperty) {
    label += ` ${ makeExpectPropertyLabel(props.notToHaveProperty, true) }`
  }
  return label
}