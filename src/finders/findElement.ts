import ReactTestRenderer from 'react-test-renderer'
import findElements, { FindElementsDescriber } from './findElements'

export default function findElement(
  describer: FindElementsDescriber,
  instance: ReactTestRenderer.ReactTestInstance
) {
  const elements = findElements(describer, instance)
  return elements[0]
}