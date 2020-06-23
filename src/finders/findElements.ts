import ReactTestRenderer from 'react-test-renderer'
import findAllNodes from './findAllNodes'
import expectElementToHaveType from '../expectations/type/expectElementToHaveType'
import expectElementToHaveOneOfTheseTypes from '../expectations/type/expectElementToHaveOneOfTheseTypes'
import expectElementNotToHaveType from '../expectations/type/expectElementNotToHaveType'
import expectElementNotToHaveOneOfTheseTypes from '../expectations/type/expectElementNotToHaveOneOfTheseTypes'
import { ElementExpectations, SelectedElement } from '../types'

export interface FindElementsDescriber {
  hasType?: ElementExpectations['toHaveType']
  hasOneOfTheseTypes?: ElementExpectations['toHaveOneOfTheseTypes']
  hasNotOneOfTheseTypes?: ElementExpectations['notToHaveOneOfTheseTypes']
  hasNotType?: ElementExpectations['notToHaveType']
}

export default function findElements(
  describer: FindElementsDescriber,
  instance: ReactTestRenderer.ReactTestInstance
): SelectedElement[] {
  let found = findAllNodes(instance)
  
  function filterFound(predicate: (n: ReactTestRenderer.ReactTestInstance) => void) {
    found = found.filter(n => {
      try {
        predicate(n)
        return true
      } catch (error) {
        return false
      }
    })
  }
  
  for (const filter in describer) {
    switch (filter) {
      
      case 'hasType': {
        filterFound(n => expectElementToHaveType(n, describer.hasType))
      } break

      case 'hasOneOfTheseTypes': {
        filterFound(n => expectElementToHaveOneOfTheseTypes(n, describer.hasOneOfTheseTypes))
      } break

      case 'hasNotType': {
        filterFound(n => expectElementNotToHaveType(n, describer.hasNotType))
      } break

      case 'hasNotOneOfTheseTypes': {
        filterFound(n => expectElementNotToHaveOneOfTheseTypes(n, describer.hasNotOneOfTheseTypes))
      } break

    }
  return found
}
