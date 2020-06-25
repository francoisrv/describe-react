import ReactTestRenderer from 'react-test-renderer'
import One, { OneProps } from './components/One'
import Assert from './entities/Assert'
import Property, { PropertyProps } from './components/Property'
import State, { StateProps } from './components/State'
import IsTrue from './entities/IsTrue'

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
// IDENTIFIERS
// ////////////////////////////////////////////////////////////

export type Of<T> = 
| T
| Assert<T>

export type Idenitifier<T> =
| Of<T>
| React.ReactElement<OneProps<T | Assert<T>>, typeof One>

// TYPE IDENTIFIER
// ////////////////////////////////////////////////////////////

export type UnitTypeIdentifier =
| string
| React.ComponentType<any>

export type TypeIdentifier =
| UnitTypeIdentifier
| React.ReactElement<OneProps<UnitTypeIdentifier>, typeof One>

// TEXT IDENTIFIER
// ////////////////////////////////////////////////////////////

export type UnitTextIdentifier =
| string
| RegExp
| IsTrue<string>
| Assert<string>

export type TextIdentifier =
| UnitTextIdentifier
| boolean
| React.ReactElement<OneProps<UnitTextIdentifier>, typeof One>

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
