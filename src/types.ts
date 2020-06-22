import ReactTestRenderer from 'react-test-renderer'
import { Dictionary } from 'lodash'
import IsOneOf from './lib/entities/IsOneOf'
import IsNot from './lib/entities/IsNot'
import IsNotOneOf from './lib/entities/IsNotOneOf'

/**
 * Object that describe a selector for all elements
 */
export interface    ElementsObjectDescriber {
  type?:            TypeDescriber
  parent?:          ParentDescriber
  props?:           PropsDescriber
  text?:            TextDescriber
}

/**
 * Object that describe a selector for a single element
 */
export interface    SingleDescriber extends ElementsObjectDescriber {
  at?:              number
  last?:            true
}

/**
 * Props to describe a selector for all elements
 */

export type ElementsDescriber =
| string
| React.ComponentType<any>
| true
| React.ReactElement<ElementDescriberProps>

/**
 * Object returned by ReactTestRender findAll methods
 */
export type SelectedElement =
| ReactTestRenderer.ReactTestInstance
| string

/**
 * Function to be passed to a property selector
 */
export type ExpectPropertyFn = (value: any, props: Dictionary<any>) => boolean

export type BasicTypeDescriber =
| string
| React.ComponentType<any>

/**
 * Type describer
 */
export type TypeDescriber =
| BasicTypeDescriber
| IsOneOf<BasicTypeDescriber>
| IsNot<BasicTypeDescriber>
| IsNotOneOf<BasicTypeDescriber>

/**
 * Parent describer
 */
export type ParentDescriber =
| string
| React.ComponentType<any>
| SingleDescriber

export type BasicPropertyDescriber =
| string
| RegExp
| {
  name?: string | RegExp
  value: any
}

export type ExpectPropertyValueFn = (v: any, props: Dictionary<any>) => boolean

/**
 * Props describer
 */
export type PropertyDescriber =
| BasicPropertyDescriber
| IsOneOf<BasicPropertyDescriber>
| IsNot<BasicPropertyDescriber>
| IsNotOneOf<BasicPropertyDescriber>

/**
 * Text describer
 */
export type TextDescriber = string | RegExp

/**
 * Length describer
 */
export type LengthDescriber =
| number
| boolean

export interface ItSpec {
  label: string
  fn: () => Promise<void>
}

export interface DescribeSpec {
  label: string
  skip?: boolean
  only?: boolean
}

export type BeforeAllSpec = () => Promise<void>

export interface ContextInterface {
  elem: ReactTestRenderer.ReactTestRenderer | null
  describer: DescribeSpec | null
  its: ItSpec[]
  beforeAll: BeforeAllSpec[]
  state: { [name: string]: any }
  getSource: () => ReactTestRenderer.ReactTestRenderer
}