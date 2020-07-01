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
  getTestRenderer: () => ReactTestRenderer.ReactTestRenderer
  getRendered: () => ReactTestRenderer.ReactTestInstance | string | undefined
}

export interface TestModifier {
  _label?: string
  _skip?: boolean
  _only?: boolean
  _timeout?: number
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

export type TypeIdentifier =
| UnitTypeIdentifier
| React.ReactElement<IsProps<UnitTypeIdentifier>, typeof Is>

// TEXT IDENTIFIER
// ////////////////////////////////////////////////////////////

export type UnitTextIdentifier =
| string
| RegExp

export type TextIdentifier =
| UnitTextIdentifier
| boolean
| React.ReactElement<IsProps<UnitTextIdentifier>, typeof Is>

// PROPERTY IDENTIFIER
// ////////////////////////////////////////////////////////////

export type UnitPropertyIdentifier =
| string
| RegExp
| PropertyObjectIdentifier

export type PropertyObjectIdentifier = {
  [name: string]: any
}

export type PropertyIdentifier = 
| UnitPropertyIdentifier
| boolean
| React.ReactElement<IsProps<UnitPropertyIdentifier>, typeof Is>

// PROPERTIES IDENTIFIER
// ////////////////////////////////////////////////////////////

export type UnitPropertiesIdentifier = Array<
  | string
  | RegExp
  | PropertyObjectIdentifier
  | React.ReactElement<IsProps<UnitPropertyIdentifier>, typeof Is>
>

export type PropertiesIdentifier = 
| UnitPropertiesIdentifier
| React.ReactElement<IsProps<UnitPropertyIdentifier>, typeof Is>

// STATE IDENTIFIER
// ////////////////////////////////////////////////////////////

export type UnitStateIdentifier =
| string
| RegExp
| React.ReactElement<StateProps, typeof State>
| Assert<UnitStateIdentifier>

export type StateIdentifier =
| UnitStateIdentifier

export interface ElementExpectations {
  to?: true
  be?: true
  a?: boolean | UnitTypeIdentifier
  an?: boolean | UnitTypeIdentifier
  not?: any
  NOT?: any
  have?: any
  type?: UnitTypeIdentifier | boolean
  which?: boolean
  is?: boolean | UnitTypeIdentifier
}
