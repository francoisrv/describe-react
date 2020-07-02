import { ReactTestRenderer, ReactTestInstance } from 'react-test-renderer'

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
  beforeAll?: Function
  afterAll?: Function
}

export interface ContextInterface {
  describer: ItProps | null
  sections: Section[]
  getTestRenderer: () => ReactTestRenderer
  getRendered: () => ReactTestInstance | string | undefined
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
