import { isEqual } from 'lodash'
import ReactTestRenderer from 'react-test-renderer'

import { SingleDescriber, SelectedElement, ElementsObjectDescriber, ExpectPropertyFn, PropsDescriber, TypeDescriber } from './types'









export class PropsOneOf {
  private readonly args: PropsDescriber[] = []
  constructor(...args: PropsDescriber[]) {
    this.args = args
  }
  find(elem: ReactTestRenderer.ReactTestInstance) {
    const matches: boolean[] = []
    for (const arg of this.args) {
      matches.push(hasProperty(elem, arg))
    }
    return matches.some(Boolean)
  }
}

export function getNumberWithOrdinal(n: number) {
  var s = ["th", "st", "nd", "rd"],
      v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function findElement(
  describer: SingleDescriber,
  instance: ReactTestRenderer.ReactTestInstance  
): SelectedElement | null {
  const elems = findElements(describer, instance)
  if (describer.last) {
    return elems.pop() || null
  }
  if (describer.at) {
    return elems[describer.at] || null
  }
  return elems[0] || null
}

export function findElements(
  describer: ElementsObjectDescriber,
  instance: ReactTestRenderer.ReactTestInstance
): SelectedElement[] {
  let found = getAllNodes(instance)
  for (const filter in describer) {
    if (filter === 'type') {
      found = found.filter(n => hasType(n, describer.type))
    } else if (filter === 'props') {
      found = found.filter(n => hasProperty(n, describer.props))
    }
  }
  return found
  // let picked: SelectedElement[] = [...instance.children]
  // for (const filter in describer) {
  //   if (filter === 'type') {
  //     picked = instance.findAllByType(describer.type as ElementType<any>)
  //   } else if (filter === 'props') {
  //     const all = instance.findAll(() => true, { deep: true })
  //     picked = all.filter(e => hasProperty(e, describer.props))
  //   } else if (filter === 'parent') {
  //     if (typeof describer.parent === 'object' && describer.parent.type === ElementDescriber) {
  //       picked = [findElement(describer.parent.props, instance)]
  //     } else {
  //       const matches = instance.findAllByType(describer.parent as ElementType<any>)
  //       picked = []
  //       for (const match of matches) {
  //         picked.push(...match.children)
  //       }
  //     }
  //   } else if (filter === 'text') {
  //     picked = findNodesWithText(describer.text, picked, true)
  //   }
  // }
  // return picked
}

export function getAllNodes(elem: ReactTestRenderer.ReactTestInstance): ReactTestRenderer.ReactTestInstance[] {
  const nodes = elem.findAll(() => true, { deep: true })
  nodes.shift()
  return nodes
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
  const textNodes: string[] = elem.children.filter(c => typeof c === 'string') as string[]
  if (!textNodes.length) {
    return null
  }
  return textNodes.join(' ')
}

export function hasProperty(elem: ReactTestRenderer.ReactTestInstance, property: PropsDescriber) {
  if (property instanceof PropsOneOf) {
    return property.find(elem)
  }
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



export function selectElements() {

}