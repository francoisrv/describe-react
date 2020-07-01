import { ExpectElementProps, ExpectElementsProps } from "./components/Expect"
import ReactTestRenderer from 'react-test-renderer'
import { isEqual, last, omit, first } from "lodash"
import { isReactElementComponentOf, predicate } from "./utils"
import Has from "./components/Has"
import has from "./has"

export function prepickElements(
  root: ReactTestRenderer.ReactTestInstance,
  props: ExpectElementProps | ExpectElementsProps
) {
  const propsWithoutWhich = omit(props, [
    'which',
    'children',
    '_label',
    '_skip',
    '_only',
    '_timeout'
  ])

  function hasExactProps(expected: ExpectElementProps | ExpectElementsProps) {
    return isEqual(propsWithoutWhich, expected)
  }

  function findAll() {
    return root.findAll(() => true, { deep: true })
  }

  if ('element' in propsWithoutWhich) {
    if (
      hasExactProps({ element: true }) ||
      hasExactProps({ root: true, element: true }) ||
      hasExactProps({ only: true, element: true }) ||
      hasExactProps({ first: true, element: true })
    ) {
      return root
    } else if (hasExactProps({ last: true, element: true })) {
      const all = findAll()
      return last(findAll())
    } else if ('number' in propsWithoutWhich && hasExactProps({ element: true, number: propsWithoutWhich.number })) {
      return findAll()[propsWithoutWhich.number - 1]
    } else if ('at' in propsWithoutWhich && hasExactProps({ element: true, at: propsWithoutWhich.at })) {
      return findAll()[propsWithoutWhich.at]
    } else {
      return root
    }

    return undefined
  } else if ('elements' in propsWithoutWhich) {
    if (
      hasExactProps({ elements: true }) ||
      hasExactProps({ elements: true, all: true }) ||
      hasExactProps({ elements: true, some: true }) ||
      'least' in propsWithoutWhich && hasExactProps({ elements: true, at: true, least: propsWithoutWhich.least }) ||
      'than' in propsWithoutWhich && hasExactProps({ elements: true, no: true, more: true, than: propsWithoutWhich.than }) ||
      'and' in propsWithoutWhich && hasExactProps({ elements: true, between: propsWithoutWhich.between, and: propsWithoutWhich.and })
    ) {
      return findAll()
    } else if ('first' in propsWithoutWhich && hasExactProps({ elements: true, first: propsWithoutWhich.first })) {
      return findAll().slice(0, propsWithoutWhich.first)
    } else if ('last' in propsWithoutWhich && hasExactProps({ elements: true, last: propsWithoutWhich.last })) {
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
