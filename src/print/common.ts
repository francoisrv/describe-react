import colors from 'colors'
import Assert from '../entities/Assert'
import IsTrue from '../entities/IsTrue'

export function printType(type: string | React.ComponentType<any>) {
  if (typeof type === 'string') {
    return type
  }
  if (type.name) {
    return type.name
  }
  return type.toString()
}

export function printLogicOperator(str: string) {
  return colors.italic(str)
}

export function printHighlight(str: string) {
  return colors.bold.underline(str)
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

export function printIsTrue(assertion: IsTrue<any>) {
  if (assertion.label) {
    return assertion.label
  }
  if (assertion.fn.name) {
    return assertion.fn.name
  }
  return assertion.fn.toString()
}


export function printOrNor(not = false) {
  return not ? 'nor' : 'or'
}