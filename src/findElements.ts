import { PrintSelectorProps } from './print/printSelector'
import ReactTestRender from 'react-test-renderer'
import { TypeIdentifier } from './types'
import hasType from './assertions/hasType'

interface FindElementProps {
  type?: TypeIdentifier
}

function predicate(fn: Function) {
  try {
    fn()
    return true
  } catch (error) {
    return false
  }
}

export default function findElements(
  props: FindElementProps,
  elements: ReactTestRender.ReactTestInstance[]
): ReactTestRender.ReactTestInstance[] {
  let found: ReactTestRender.ReactTestInstance[] = [...elements]
  for (const prop in props) {
    switch (props) {
      case 'type': {
        found = found.filter(
          node => predicate(() => hasType(node, props.type))
        )
      } break
    }
  }
  return found
}