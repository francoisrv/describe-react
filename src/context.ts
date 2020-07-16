import React from 'react'
import { ContextInterface } from './types'
import { Dictionary, get, set } from 'lodash'

export class ContextState {
  constructor(
    private readonly state: Dictionary<any>
  ) {}

  get(path: string) {
    return get(this.state, path)
  }

  set(path: string, value: any) {
    return set(this.state, path, value)
  }
}


export const defaultContext: ContextInterface = {
  describer: null,
  sections: [],
  state: new ContextState({}),
  getTestRenderer: () => {
    throw new Error('You are using master template')
  },
  getRendered: () => {
    throw new Error('You are using master template')
  }
}

const Context = React.createContext<ContextInterface>(defaultContext)

export default Context
