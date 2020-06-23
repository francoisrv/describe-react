import ReactTestRenderer from 'react-test-renderer'
import { Dictionary } from 'lodash'

export interface ItProps {
  skip?: boolean
  only?: boolean
  label?: string
  timeout?: number
}

export interface ElementExpectations {
  toHaveType?: TypeDescriber
  notToHaveType?: TypeDescriber
  toHaveOneOfTheseTypes?: TypeDescriber[]
  notToHaveOneOfTheseTypes?: TypeDescriber[]

  toHaveText?: TextDescriber
  notToHaveText?: TextDescriber
  toHaveOneOfTheseTexts?: TextDescriber[]
  notToHaveOneOfTheseTexts?: TextDescriber[]

  toHaveProperty?: PropertyDescriber
  notToHaveProperty?: PropertyDescriber
  toHaveOneOfTheseProperties?: PropertyDescriber[]
  notToHaveOneOfTheseProperties?: PropertyDescriber[]
}

export type AdvancedDescriber<T> = {
  equals: T
  equalsNot: T
  equalsOneOf: T[]
  equalsNotOneOf: T[]
  assert(): void
}

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

export type ElementsDescriber = AdvancedDescriber<BasicElementsDescriber>

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

export type PropertyDescriber =
| string
| RegExp
| {
  name?: string | RegExp
  value: any
}

export type ExpectPropertyValueFn = (v: any, props: Dictionary<any>) => boolean


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

export interface SectionSpec {
  label: string
  only?: boolean
  skip?: boolean
  subs: Array<ItProps & {
    label: string
    fn: () => void | Promise<void>
  }>
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
  sections: SectionSpec[]
  state: { [name: string]: any }
  getSource: () => ReactTestRenderer.ReactTestRenderer
}
