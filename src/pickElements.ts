import { ExpectElementProps, ExpectElementsProps } from "./components/Expect"
import ReactTestRenderer from 'react-test-renderer'
import { isEqual, last, omit } from "lodash"
import { isReactElementComponentOf, predicate } from "./utils"
import Has from "./components/Has"
import has from "./has"

export function prepickElements(
  root: ReactTestRenderer.ReactTestInstance,
  props: ExpectElementProps | ExpectElementsProps
) {
  const propsWithoutWhich = omit(props, ['which'])
  
  function isProps(expected: ExpectElementProps | ExpectElementsProps) {
    return isEqual(propsWithoutWhich, expected)
  }

  function findAll() {
    return root.findAll(() => true, { deep: true })
  }

  if ('element' in propsWithoutWhich) {
    if (
      isProps({ element: true }) ||
      ('root' in propsWithoutWhich && isProps({ root: true, element: true })) ||
      ('single' in propsWithoutWhich && isProps({ single: true, element: true })) ||
      ('only' in propsWithoutWhich && isProps({ only: true, element: true })) ||
      ('first' in propsWithoutWhich && isProps({ first: true, element: true }))
    ) {
      return root
    } else if (isProps({ last: true, element: true })) {
      return last(findAll())
    } else if ('number' in propsWithoutWhich && isProps({ element: true, number: propsWithoutWhich.number })) {
      return findAll()[propsWithoutWhich.number - 1]
    } else if ('at' in propsWithoutWhich && isProps({ element: true, at: propsWithoutWhich.at })) {
      return findAll()[propsWithoutWhich.at]
    }

    return undefined
  } else if ('elements' in propsWithoutWhich) {
    if (
      isProps({ elements: true }) ||
      isProps({ elements: true, all: true }) ||
      isProps({ elements: true, some: true }) ||
      'least' in propsWithoutWhich && isProps({ elements: true, at: true, least: propsWithoutWhich.least }) ||
      'than' in propsWithoutWhich && isProps({ elements: true, no: true, more: true, than: propsWithoutWhich.than }) ||
      'and' in propsWithoutWhich && isProps({ elements: true, between: propsWithoutWhich.between, and: propsWithoutWhich.and })
    ) {
      return findAll()
    } else if ('first' in propsWithoutWhich && isProps({ elements: true, first: propsWithoutWhich.first })) {
      return findAll().slice(0, propsWithoutWhich.first)
    } else if ('last' in propsWithoutWhich && isProps({ elements: true, last: propsWithoutWhich.last })) {
      return findAll().slice(0, propsWithoutWhich.last)
    }
    return findAll()
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
