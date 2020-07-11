import ReactTestRenderer from 'react-test-renderer'
import { isEqual, last, omit, first, isArray, isNumber, isString, isFunction } from 'lodash'

import { ExpectElementProps, ExpectElementsProps } from '../components/Expect'
import { isReactElementComponentOf, predicate } from '../utils'
import Has, { HasProps } from '../components/Has'
import has from '../assertions/has'
import Is, { IsProps } from '../components/Is'
import is from '../assertions/is'
import which from '../assertions/which'

type WhichElement =
| React.ReactElement<IsProps<any>>
| React.ReactElement<HasProps>


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
    } else {
      if (isString(cleanProps.element) || isFunction(cleanProps.element)) {
        found = found.filter(elem => predicate(() => has(elem, { type: cleanProps.element as string })))
      }

      if ('which' in cleanProps) {
        const whiches = isArray(cleanProps.which) ? cleanProps.which : [cleanProps.which]
        for (const w of whiches) {
          found = found.filter(elem => predicate(() => which(elem, w)))
        }
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

    if (isString(cleanProps.elements) || isFunction(cleanProps.elements)) {
      found = found.filter(elem => elem.type === cleanProps.elements)
    }

    if ('which' in cleanProps) {
      found = found.filter(e => predicate(() => which(e, cleanProps.which)))
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
        if (isReactElementComponentOf(which as React.ReactElement<any>, Has)) {
          if (!predicate(() => has(found, (which as React.ReactElement<any>).props))) {
            found = undefined
          }
        }
      }
    }
    return found
  }
  if ('elements' in props) {
    let found = [...(prepickElements(root, props) as ReactTestRenderer.ReactTestInstance[])]
    
    if (isString(props.elements) || isFunction(props.elements)) {
      found = found.filter(elem => predicate(() => has(elem, { type: props.elements as string })))
    }

    if ('first' in props) {
      found = found.slice(0, props.first)
    } else if ('last' in props) {
      found = found.slice(found.length - props.last)
    } else if ('exactly' in props) {
      if (found.length !== props.exactly) {
        found = []
      }
    } else if ('least' in props) {
      if (found.length < props.least) {
        found = []
      }
    } else if ('than' in props) {
      if ('no' in props) {
        if (found.length > props.than) {
          found = []
        }
      } else {
        if (found.length < (props as any).than) {
          found = []
        }
      }
    } else if ('between' in props) {
      const isBetween = props.between <= found.length && props.and >= found.length
      if ('not' in props) {
        if (isBetween) {
          found = []
        }
      } else {
        if (!isBetween) {
          found = []
        }
      }
    }
    
    return found
  }
}
