import ReactTestRenderer from 'react-test-renderer'
import AssertType from './entities/AssertType'
import OneOf from './entities/OneOf'
import { OneProps } from './components/One'

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

export type Idenitifier<T> =
| T
| T[]

export type UnitTypeIdentifier =
| string
| React.ComponentType<any>

export type TypeIdentifier = 
| UnitTypeIdentifier
| AssertType
| OneOf<UnitTypeIdentifier>
// | React.ReactElement<OneProps<UnitTypeIdentifier| OneOf<UnitTypeIdentifier>>>
| React.ReactElement<{ foo: true }>

export type TextIdentifier = string | RegExp

export interface PropertyObjectIdentifier {
  name?: string | RegExp
  value?: any
}

export type PropertyIdentifier =
| string
| RegExp
| PropertyObjectIdentifier

export interface ElementExpectations {

  toHaveType?: TypeIdentifier
  notToHaveType?: TypeIdentifier

  toHaveText?: TextIdentifier
  notToHaveText?: TextIdentifier

  toHaveProperty?: PropertyIdentifier
  notToHaveProperty?: PropertyIdentifier

}
