import ReactTestRenderer from 'react-test-renderer'

export function getNumberWithOrdinal(n: number) {
  var s = ["th", "st", "nd", "rd"],
      v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function isReactTestRendererInstance(value: any) {
  return value._fiber
}

export function isReactElement(element: React.ReactElement<any>) {
  return (
    typeof element === 'object' &&
    'type' in element &&
    'key' in element &&
    '$$typeof' in element &&
    'ref' in element &&
    '_owner' in element &&
    '_store' in element
  )
}

export function isReactElementComponentOf(element: React.ReactElement<any>, component: React.ComponentType<any>) {
  return (
    isReactElement(element) &&
    element.type === component
  )
}

export function findAllNodes(elem: ReactTestRenderer.ReactTestInstance): ReactTestRenderer.ReactTestInstance[] {
  const nodes = elem.findAll(() => true, { deep: true })
  nodes.shift()
  return nodes
}

export function getText(elem: ReactTestRenderer.ReactTestInstance): string | null {
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

export function predicate(fn: Function) {
  try {
    fn()
    return true
  } catch (error) {
    // console.log(error)
    return false
  }
}
