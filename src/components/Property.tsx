import React from "react"

export type PropertyNameProp = string | RegExp
export type PropertyValueProp = any
export type PropertyAssertProp = (name: string, value: PropertyValueProp, props: any) => void

export type PropertyProps =
| { name: PropertyNameProp }
| { value: PropertyValueProp }
| { name: PropertyNameProp, value: PropertyValueProp }
| { name: PropertyNameProp, assert: PropertyAssertProp }

const Property: React.FC<PropertyProps> = props => {
  return <div />
}

export default Property
