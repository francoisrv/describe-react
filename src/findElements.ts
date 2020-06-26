import { PrintSelectorProps } from './print/printSelector'
import ReactTestRender from 'react-test-renderer'
import { TypeIdentifier } from './types'

interface FindElementProps {
  type?: TypeIdentifier
}

export default function findElements(
  props: FindElementProps,
  elements: ReactTestRender.ReactTestInstance[]
): ReactTestRender.ReactTestInstance[] {
  let found: ReactTestRender.ReactTestInstance[] = [...elements]
  for (const prop in props) {
    switch (props) {
      case 'type': {
        // found = 
      } break
    }
  }
  return found
}