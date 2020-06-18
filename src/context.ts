import React, { Context } from 'react'
import ReactTestRenderer from 'react-test-renderer'

interface ItSpec {
  label: string
  fn: () => Promise<void>
}

interface DescribeSpec {
  label: string
}

type BeforeAllSpec = () => Promise<void>

interface ContextInterface {
  elem: ReactTestRenderer.ReactTestRenderer | null
  describer: DescribeSpec | null
  its: ItSpec[]
  beforeAll: BeforeAllSpec[]
}

export const defaultContext = {
  elem: null,
  describer: null,
  its: [],
  beforeAll: []
}

export default React.createContext<ContextInterface>(defaultContext)
