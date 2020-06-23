import { ElemensDescriber, SelectedElement } from '../../types'
import ReactTestRenderer from 'react-test-renderer'
import findAllNodes from './findAllNodes'
import hasType from '../describers/hasType'
import hasProperty from '../describers/hasProperty'
import hasText from '../describers/hasText'
import IsOneOf from '../entities/IsOneOf'
import IsNot from '../entities/IsNot'
import IsNotOneOf from '../entities/IsNotOneOf'
import { isEqual } from 'lodash'

export default function findElements(
  describer: ElemensDescriber,
  instance: ReactTestRenderer.ReactTestInstance
): SelectedElement[] {
  let found = findAllNodes(instance)
  if (typeof describer === 'string' || typeof describer === 'function') {
    found = found.filter(n => {
      try {
        hasType(n, describer)
        return true
      } catch (error) {
        return false
      }
    })
  } else if (describer === true) {
    found = found
  } else if (describer instanceof IsOneOf) {

  } else if (describer instanceof IsNot) {
    const reverse = findElements(describer.value, instance)
    found = found.filter(n => {
      let f = false
      for (const i of reverse) {
        if (isEqual(n, i)) {
          f = true
          break
        }
      }
      return f === true
    })
  } else if (describer instanceof IsNotOneOf) {
    
  } else if (typeof describer === 'object') {
    for (const filter in describer) {
      if (filter === 'type') {
        found = found.filter(n => {
          try {
            hasType(n, describer.type)
            return true
          } catch (error) {
            return false
          }
        })
      } else if (filter === 'property') {
        found = found.filter(n => {
          try {
            hasProperty(n, describer.property)
            return true
          } catch (error) {
            return false
          }
        })
      } else if (filter === 'text') {
        found = found.filter(n => {
          try {
            hasText(n, describer.text)
            return true
          } catch (error) {
            return false
          }
        })
      }
    }
  }
  return found
}