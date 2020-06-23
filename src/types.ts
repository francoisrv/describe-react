import ReactTestRenderer from 'react-test-renderer'
import { Dictionary } from 'lodash'
import IsOneOf from './lib/entities/IsOneOf'
import IsNot from './lib/entities/IsNot'
import IsNotOneOf from './lib/entities/IsNotOneOf'

export type AdvancedDescriber<T> =
| T
| IsOneOf<T>
| IsNot<T>
| IsNotOneOf<T>

export interface    ElementsObjectDescriber {
  type?:            TypeDescriber
  parent?:          SingleDescriber
  property?:        PropertyDescriber
  text?:            TextDescriber
}

export type BasicElementsDescriber =
| string
| React.ComponentType<any>
| true
| ElementsObjectDescriber

export type ElemensDescriber = AdvancedDescriber<BasicElementsDescriber>

/**
 * Object that describe a selector for a single element
 */
export interface    SingleDescriber extends ElementsObjectDescriber {
  at?:              number
  last?:            true
}

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

export type TypeDescriber =
| string
| React.ComponentType<any>

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

export type BasicPropertiesDescriber =
| Array<
  | {
    name: string | RegExp
    value: any
  }
  | {
    value: any
  }
  | {
    name: string | RegExp
  }
  >
| boolean

export type PropertiesDescriber =
| BasicPropertiesDescriber
| IsOneOf<BasicPropertiesDescriber>
| IsNot<BasicPropertiesDescriber>
| IsNotOneOf<BasicPropertiesDescriber>

/**
 * Text describer
 */
export type TextDescriber = string | RegExp | boolean

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
