import { ReactTestRenderer, ReactTestInstance } from 'react-test-renderer'
import Is, { IsProps } from './components/Is'
import Has, { HasProps } from './components/Has'
import { ContextState } from './context'

// ////////////////////////////////////////////////////////////
// COMMON
// ////////////////////////////////////////////////////////////

export type SingleOrMany<T> = T | T[]

// ////////////////////////////////////////////////////////////
// TESTS
// ////////////////////////////////////////////////////////////

export interface ItProps {
  skip?: boolean
  only?: boolean
  label: string
  timeout?: number
}

export interface SubSection extends ItProps {
  fn: Function
}

export interface Section extends ItProps {
  customLabel?: string
  sections: SubSection[]
  beforeAll?: (cb: any) => any
  afterAll?: (cb: any) => any
}

export interface ContextInterface {
  describer: ItProps | null
  sections: Section[]
  getTestRenderer: () => ReactTestRenderer
  getRendered: () => ReactTestInstance | string | undefined
  state: ContextState
}

export interface TestModifier {
  _label?: string
  _skip?: boolean
  _only?: boolean
  _timeout?: number
}

// ////////////////////////////////////////////////////////////
// IDENTIFIERS
// ////////////////////////////////////////////////////////////

// TYPE IDENTIFIER
// ////////////////////////////////////////////////////////////

export type TypeIdentifier = string | React.ComponentType<any>

// TEXT IDENTIFIER
// ////////////////////////////////////////////////////////////

export type TextIdentifier = string

export type SingleWhich<T> =
  | React.ReactElement<IsProps<T>, typeof Is>
  | React.ReactElement<HasProps, typeof Has>

export type Which<T> = SingleWhich<T> | SingleWhich<T>[]

export type NodeFilter = (nodes: ReactTestInstance[]) => ReactTestInstance[]

export type NodeFilterFP<A extends any[] = any[]> = (...args: A) => NodeFilter

export type LengthIdentifier =
  | 'has'
  | 'has not'
  | 'exactly'
  | 'not exactly'
  | 'at least'
  | 'more'
  | 'no more'
  | 'between'
