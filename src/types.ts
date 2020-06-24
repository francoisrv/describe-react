import ReactTestRenderer from 'react-test-renderer'
import One, { OneProps } from './components/One'
import Assert from './entities/Assert'

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
