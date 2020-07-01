import React from 'react'
import { ContextInterface } from './types'

export const defaultContext: ContextInterface = {
  describer: null,
  sections: [],
  getTestRenderer: () => {
    throw new Error('You are using master template')
  },
  getRendered: () => {
    throw new Error('You are using master template')
  }
}

const Context = React.createContext<ContextInterface>(defaultContext)

export default Context
