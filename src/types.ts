import ReactTestRenderer from 'react-test-renderer'
import One, { OneProps } from './components/One'
import Property, { PropertyProps } from './components/Property'
import State, { StateProps } from './components/State'
import Element, { ElementProps } from './components/Element'
import { IsProps, Is } from './components/Is'
import { is } from './is'

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
}

export interface ContextInterface {
  describer: ItProps | null
  sections: Section[]
  getSource: () => ReactTestRenderer.ReactTestRenderer
}

// ////////////////////////////////////////////////////////////
// SELECTORS
// ////////////////////////////////////////////////////////////

export type UnitChildSelector =
| boolean
| string
| React.ComponentType<any>
| React.ReactElement<ElementProps, typeof Element>

export type ChildSelector =
| UnitChildSelector

// ////////////////////////////////////////////////////////////
// IDENTIFIERS
// ////////////////////////////////////////////////////////////

// TYPE IDENTIFIER
// ////////////////////////////////////////////////////////////

export type UnitTypeIdentifier =
| string
| React.ComponentType<any>

export type TypeIdentifierIsFn =
(t: UnitTypeIdentifier) => void

export type TypeIdentifier =
| UnitTypeIdentifier
| React.ReactElement<IsProps<UnitTypeIdentifier, TypeIdentifierIsFn>, typeof Is>

// TEXT IDENTIFIER
// ////////////////////////////////////////////////////////////

export type UnitTextIdentifier =
| string
| RegExp

export type TextIdentifierIsFn =
(t: UnitTextIdentifier) => void

export type TextIdentifier =
| UnitTextIdentifier
| boolean
| React.ReactElement<IsProps<UnitTextIdentifier, TextIdentifierIsFn>, typeof Is>

// PROPERTY IDENTIFIER
// ////////////////////////////////////////////////////////////

export type UnitPropertyIdentifier =
| string
| RegExp
| React.ReactElement<PropertyProps, typeof Property>

export type PropertyIdentifier = 
| Idenitifier<UnitPropertyIdentifier>
| Array<Idenitifier<UnitPropertyIdentifier>>

export type UnitPropertiesIdentifier = Array<
  | string
  | RegExp
  | React.ReactElement<OneProps<string | RegExp>, typeof One>
  | React.ReactElement<PropertyProps, typeof Property>
>

export type PropertiesIdentifier = 
| UnitPropertiesIdentifier
| Assert<UnitPropertiesIdentifier>

export type UnitStateIdentifier =
| string
| RegExp
| React.ReactElement<StateProps, typeof State>
| Assert<UnitStateIdentifier>

export type StateIdentifier =
| UnitStateIdentifier

export interface ElementExpectations {
  notToBeOnlyChild?: boolean
  notToHaveChild?: TypeIdentifier
  notToHaveDirectParent?: any
  notToHaveExactProperties?: Array<Idenitifier<UnitPropertyIdentifier>>
  notToHaveParent?: any
  notToHaveProperties?: Array<Idenitifier<UnitPropertyIdentifier>>
  notToHaveProperty?: PropertyIdentifier
  notToHaveState?: StateIdentifier
  notToHaveText?: TextIdentifier
  notToHaveType?: TypeIdentifier
  toBeOnlyChild?: boolean
  toHaveChild?: TypeIdentifier
  toHaveDirectParent?: any
  toHaveExactProperties?: Array<Idenitifier<UnitPropertyIdentifier>>
  toHaveParent?: any
  toHaveProperties?: Array<Idenitifier<UnitPropertyIdentifier>>
  toHaveProperty?: PropertyIdentifier
  toHaveState?: StateIdentifier
  toHaveText?: TextIdentifier
  toHaveType?: TypeIdentifier
  toHaveSibling?: any
  toHaveSiblings?: any
}
