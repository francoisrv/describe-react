import ReactTestRenderer from 'react-test-renderer'
import One, { OneProps } from './components/One'
import Assert from './entities/Assert'
import Property, { PropertyProps } from './components/Property'
import State, { StateProps } from './components/State'

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

export type UnitTypeIdentifier =
| string
| React.ComponentType<any>

export type TypeIdentifier = Idenitifier<UnitTypeIdentifier>

export type UnitTextIdentifier = string | RegExp

export type TextIdentifier = Idenitifier<UnitTextIdentifier>

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

  toHaveType?: TypeIdentifier
  notToHaveType?: TypeIdentifier

  toHaveText?: TextIdentifier
  notToHaveText?: TextIdentifier

  toHaveProperty?: PropertyIdentifier
  notToHaveProperty?: PropertyIdentifier

  toHaveProperties?: Array<Idenitifier<UnitPropertyIdentifier>>
  notToHaveProperties?: Array<Idenitifier<UnitPropertyIdentifier>>

  toHaveExactProperties?: Array<Idenitifier<UnitPropertyIdentifier>>
  notToHaveExactProperties?: Array<Idenitifier<UnitPropertyIdentifier>>

  toHaveState?: StateIdentifier
  notToHaveState?: StateIdentifier

  toHaveChild?: TypeIdentifier
  notToHaveChild?: TypeIdentifier

  toBeOnlyChild?: boolean
  notToBeOnlyChild?: boolean

  toHaveParent?: any
  notToHaveParent?: any

  toHaveDirectParent?: any
  notToHaveDirectParent?: any

}
