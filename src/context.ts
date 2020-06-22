import React from 'react'
import { ContextInterface } from './types'

export const defaultContext: ContextInterface = {
  elem: null,
  describer: null,
  its: [],
  beforeAll: [],
  state: {},
  getSource: () => {
    throw new Error('You are using master template')
  }
}

export default React.createContext<ContextInterface>(defaultContext)
