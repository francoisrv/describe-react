import { ExpectElementProps, ExpectElementsProps } from "./components/Expect"
import ReactTestRenderer from 'react-test-renderer'
import { isEqual, last, omit, first, isArray, isNumber } from "lodash"
import { isReactElementComponentOf, predicate } from "./utils"
import Has, { HasProps } from "./components/Has"
import has from "./has"
import Is, { IsProps } from "./components/Is"
import { is } from "./is"

type WhichElement =
| React.ReactElement<IsProps<any>>
| React.ReactElement<HasProps>

function which(value: any, element: WhichElement) {
  if (isReactElementComponentOf(element, Is)) {
    is(value, element.props)
  } else if (isReactElementComponentOf(element, Has)) {
    has(value, element.props)
  }
}

export function prepickElements(
  root: ReactTestRenderer.ReactTestInstance,
  props: ExpectElementProps | ExpectElementsProps
) {
  const cleanProps = omit(props, [
    'children',
    '_label',
    '_skip',
    '_only',
    '_timeout'
  ])

  function hasExactProps(expected: ExpectElementProps | ExpectElementsProps) {
    return isEqual(cleanProps, expected)
  }

  function findAll() {
    return root.findAll(() => true, { deep: true })
  }

  let found = [...findAll()]

  if ('element' in cleanProps) {
    let single: ReactTestRenderer.ReactTestInstance | undefined

    if (hasExactProps({ root: true, element: true })) {
      single = found[0]
    } else if ('which' in cleanProps) {
      const whiches = isArray(cleanProps.which) ? cleanProps.which : [cleanProps.which]
      for (const w of whiches) {
        found = found.filter(elem => predicate(() => which(elem, w)))
      }
    }
    
    if (!single) {
      if ('first' in props) {
        single = found[0]
      } else if ('last' in props) {
        single = last(found)
      } else if ('number' in props) {
        single = found[props.number - 1]
      } else if ('at' in props && isNumber(props.at)) {
        single = found[props.at]
      } else {
        single = found[0]
      }
    }

    return single
  } else if ('elements' in cleanProps) {
    if ('which' in props) {

    }

    return found
  }
}

export default function pickElements(
  root: ReactTestRenderer.ReactTestInstance,
  props: ExpectElementProps | ExpectElementsProps
) {
  if ('element' in props) {
    let found = prepickElements(root, props) as ReactTestRenderer.ReactTestInstance
    if ('which' in props) {
      const whiches = [props.which]
      for (const which of whiches) {
        if (isReactElementComponentOf(which, Has)) {
          if (!predicate(() => has(found, which.props))) {
            found = undefined
          }
        }
      }
    }
    return found
  }
  if ('elements' in props) {
    let found = [...(prepickElements(root, props) as ReactTestRenderer.ReactTestInstance[])]
    return found
  }
}
