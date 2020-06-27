import ReactTestRender from 'react-test-renderer'
import { TypeIdentifier } from './types'
import hasType from './assertions/hasType'
import { predicate } from './utils'

export interface FindElementProps {
  type?: TypeIdentifier
}

export default function findElements(
  props: FindElementProps,
  elements: ReactTestRender.ReactTestInstance[]
): ReactTestRender.ReactTestInstance[] {
  let found: ReactTestRender.ReactTestInstance[] = [...elements]
  for (const prop in props) {
    switch (prop) {
      case 'type': {
        found = found.filter(
          node => predicate(() => hasType(node, props.type))
        )
      } break
    }
  }
  return found
}
