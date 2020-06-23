import ReactTestRenderer from 'react-test-renderer'

export interface ItProps {
  skip?: boolean
  only?: boolean
  label: string
  timeout?: number
}

export interface ContextInterface {
  describer: ItProps | null
  sections: (ItProps & { sections: (ItProps & { fn: Function })[] })[]
  getSource: () => ReactTestRenderer.ReactTestRenderer
}
