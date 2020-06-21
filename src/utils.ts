import { ReactElement, ElementType } from "react";
import ElementDescriber, { ElementDescriberProps } from "./Element";
import { isEqual, Dictionary } from 'lodash'
import ReactTestRenderer from 'react-test-renderer'

export interface Describer {
  type?: string | React.ComponentType<any>
  parent?: string | React.ComponentType<any> | React.ReactElement<ElementDescriberProps>
  props?: string | string[] | { [name: string]: any }
  text?: string | RegExp
}

export interface SingleDescriber extends Describer {
  at?: number
  last?: true
}

type SelectedElement = ReactTestRenderer.ReactTestInstance | string

type ExpectPropertyFn = (value: any, props: Dictionary<any>) => boolean

export class ExpectProperty {
  fn: ExpectPropertyFn

  constructor(fn: ExpectPropertyFn | RegExp) {
    if (fn instanceof RegExp) {
      this.fn = value => fn.test(value)
    } else {
      this.fn = fn
    }
  }
}

export function findElement(
  describer: SingleDescriber,
  elements: ReactTestRenderer.ReactTestInstance  
): SelectedElement | null {
  const elems = findElements(describer, elements)
  if (describer.last) {
    return elems.pop()
  }
  if (describer.at) {
    return elems[describer.at]
  }
  return elems[0]
}

export function findElements(
  describer: Describer,
  instance: ReactTestRenderer.ReactTestInstance
): SelectedElement[] {
  let picked: SelectedElement[] = [...instance.children]
  for (const filter in describer) {
    if (filter === 'type') {
      picked = instance.findAllByType(describer.type as ElementType<any>)
    } else if (filter === 'props') {
      picked = instance.findAllByProps(describer.props)
    } else if (filter === 'parent') {
      if (typeof describer.parent === 'object' && describer.parent.type === ElementDescriber) {
        picked = [findElement(describer.parent.props, instance)]
      } else {
        const matches = instance.findAllByType(describer.parent as ElementType<any>)
        picked = []
        for (const match of matches) {
          picked.push(...match.children)
        }
      }
    } else if (filter === 'text') {
      picked = findNodesWithText(describer.text, picked, true)
    }
  }
  return picked
}

export function findNodesWithText(text: string | RegExp, elems: SelectedElement[], deep = false) {
  const isMatching = (txt: string) => {
    if (typeof text === 'string') {
      return text === txt
    }
    return text.test(txt)
  }
  const found: SelectedElement[] = []
  for (const elem of elems) {
    if (typeof elem === 'string') {
      if (isMatching(elem)) {
        found.push(elem)
      }
    } else {
      const nodeText = getText(elem)
      if (isMatching(nodeText)) {
        found.push(elem)
      }
      if (deep) {
        const nested = findNodesWithText(
          text,
          elem.children.filter(c => typeof c !== 'string'),
          true
        )
        found.push(...nested)
      }
    }
  }
  return found
}

export function getText(elem: SelectedElement): string | null {
  if (typeof elem === 'string') {
    return null
  }
  if (!elem.children.length) {
    return null
  }
  const textNodes: string[] = elem.children.filter(c => typeof c === 'string')
  if (!textNodes.length) {
    return null
  }
  return textNodes.join(' ')
}

export type PropertyEvaluater =
| string
| (string | RegExp)[]
| { [name: string]: any }
| RegExp

export function hasProperty(elem: ReactTestRenderer.ReactTestInstance, property: PropertyEvaluater) {
  if (property instanceof RegExp) {
    for (const prop in elem.props) {
      if (property.test(prop)) {
        return true
      }
    }
    return false
  }
  if (typeof property === 'string') {
    return (property in elem.props)
  }
  if (Array.isArray(property)) {
    const matches: boolean[] = []
    for (const prop of property) {
      if (typeof prop === 'string') {
        matches.push(prop in elem.props)
      } else {
        matches.push(hasProperty(elem, prop))
      }
    }
    return matches.every(Boolean)
  }
  const matches: boolean[] = []
  for (const prop in property) {
    if (!(prop in elem.props)) {
      matches.push(false)
    } else if (property[prop] instanceof ExpectProperty) {
      matches.push(property[prop].fn(elem.props[prop], elem.props))
    } else {
      matches.push(isEqual(elem.props[prop], property[prop]))
    }
  }
  return matches.every(Boolean)
}