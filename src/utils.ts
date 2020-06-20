import { ReactElement, ElementType } from "react";
import ElementDescriber, { ElementDescriberProps } from "./Element";

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