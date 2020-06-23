import ReactTestRenderer from 'react-test-renderer'

export default function findAllNodes(elem: ReactTestRenderer.ReactTestInstance): ReactTestRenderer.ReactTestInstance[] {
  const nodes = elem.findAll(() => true, { deep: true })
  nodes.shift()
  return nodes
}
