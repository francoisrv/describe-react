import { ExpectElementProps, ExpectElementsProps } from "./components/Expect"
import ReactTestRenderer from 'react-test-renderer'
import { isEqual, last, omit, includes, map, isString, has, isArray } from "lodash"
import { getText } from "./utils"

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
    if ('which' in props){
      if ('type' in props.which.props) {
        if (found) {
          if ('not' in props.which.props) {
            if ('of' in props.which.props) {
              if (!props.which.props.of.map(type => type !== found.type).every(Boolean)) {
                found = undefined
              }
            } else if (found.type === props.which.props.not) {
              found = undefined
            }
          } else if ('of' in props.which.props) {
            if (!props.which.props.of.map(type => type === found.type).some(Boolean)) {
              found = undefined
            }
          } else if (found.type !== props.which.props.type) {
            found = undefined
          }
        }
      } else if ('text' in props.which.props) {
        const { props: whichProps } = props.which
        const text = found ? getText(found) : undefined

        if (isEqual(whichProps, { text: true })) {
          if (!text) {
            found = undefined
          }
        } else if (isEqual(whichProps, { no: true, text: true })) {
          if (text) {
            found = undefined
          }
        } else if (isEqual(whichProps, { text: whichProps.text })) {
          if (text !== whichProps.text) {
            found = undefined
          }
        } else if (
          'matches' in whichProps &&
          whichProps.matches instanceof RegExp &&
          isEqual(whichProps, {
            text: true,
            which: true,
            matches: whichProps.matches
          })
        ) {
          if (!whichProps.matches.test(text)) {
            found = undefined
          }
        } else if (
          'not' in whichProps &&
          isEqual(whichProps, {
            text: true,
            which: true,
            is: true,
            not: whichProps.not
          })
        ) {
          if (whichProps.not === text) {
            found = undefined
          }
        } else if (
          'match' in whichProps &&
          whichProps.match instanceof RegExp &&
          isEqual(whichProps, {
            text: true,
            which: true,
            does: true,
            not: true,
            match: whichProps.match
          })
        ) {
          if (whichProps.match.test(text)) {
            found = undefined
          }
        } else if (
          ('of' in whichProps) &&
          isEqual(whichProps, {
            text: true,
            which: true,
            is: true,
            one: true,
            of: whichProps.of
          })
        ) {
          if (!includes((whichProps.of as string[]), text)) {
            found = undefined
          }
        } else if (
          ('of' in whichProps) &&
          isEqual(whichProps, {
            text: true,
            which: true,
            matches: true,
            one: true,
            of: whichProps.of
          })
        ) {
          if (!(whichProps.of as RegExp[]).some(t => t.test(text))) {
            found = undefined
          }
        } else if (
          ('of' in whichProps) &&
          isEqual(whichProps, {
            text: true,
            which: true,
            is: true,
            not: true,
            one: true,
            of: whichProps.of
          })
        ) {
          if (includes((whichProps.of as string[]), text)) {
            found = undefined
          }
        } else if (
          ('of' in whichProps) &&
          isEqual(whichProps, {
            text: true,
            which: true,
            does: true,
            not: true,
            match: true,
            one: true,
            of: whichProps.of
          })
        ) {
          if ((whichProps.of as RegExp[]).some(t => t.test(text))) {
            found = undefined
          }
        }

        // if (has(whichProps, 'which')) {
        //   if (has(whichProps, 'is')) {
        //     if (has(whichProps, 'not')) {

        //     }
        //   }
        // }
        // if (found) {
        //   if ('matches' in props.which.props) {
        //     if (props.which.props.matches instanceof RegExp && !props.which.props.matches.test(getText(found))) {
        //       found = undefined
        //     } else if ('of' in props.which.props) {
        //       const text = getText(found)
        //       const matches = map(props.which.props.of, r => r.test(text))
        //       if (!matches.some(Boolean)) {
        //         found = undefined
        //       }
        //     }
        //   } else if ('match' in props.which.props) {
        //     if (props.which.props.match instanceof RegExp) {
        //       if (props.which.props.match.test(getText(found))) {
        //         found = undefined
        //       }
        //     } else if ('of' in props.which.props) {
        //       const text = getText(found)
        //       const matches = map(props.which.props.of, r => !r.test(text))
        //       if (!matches.every(Boolean)) {
        //         found = undefined
        //       }
        //     }
        //   } else if ('of' in props.which.props && 'is' in props.which.props) {
        //     const included = includes(props.which.props.of, getText(found))
        //     if ('not' in props.which.props) {
        //       if (included) {
        //         found = undefined
        //       }
        //     } else {
        //       if (!included) {
        //         found = undefined
        //       }
        //     }
        //   } else if ('not' in props.which.props && 'is' in props.which.props && !('of' in props.which.props)) {
        //     if (getText(found) === props.which.props.not) {
        //       found = undefined
        //     }
        //   } else if (getText(found) !== props.which.props.text) {
        //     found = undefined
        //   }
        // }
      }
    }
    return found
  }
  if ('elements' in props) {
    let found = [...(prepickElements(root, props) as ReactTestRenderer.ReactTestInstance[])]
    return found
  }
}
