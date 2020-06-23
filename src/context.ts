import React from 'react'
import { ContextInterface } from './types'

export const defaultContext: ContextInterface = {
  elem: null,
  describer: null,
  sections: [],
  state: {},
  getSource: () => {
    throw new Error('You are using master template')
  }
}

const Context = React.createContext<ContextInterface>(defaultContext)

export default Context
