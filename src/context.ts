import React, { Context } from 'react'
import ReactTestRenderer from 'react-test-renderer'

interface ItSpec {
  label: string
  fn: () => Promise<void>
}

interface DescribeSpec {
  label: string
  skip?: boolean
  only?: boolean
}

type BeforeAllSpec = () => Promise<void>

export interface ContextInterface {
  elem: ReactTestRenderer.ReactTestRenderer | null
  describer: DescribeSpec | null
  its: ItSpec[]
  beforeAll: BeforeAllSpec[]
  state: { [name: string]: any }
}

export const defaultContext = {
  elem: null,
  describer: null,
  its: [],
  beforeAll: [],
  state: {}
}

export default React.createContext<ContextInterface>(defaultContext)
