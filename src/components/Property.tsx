import React from "react"

export type PropertyNameProp = string | RegExp
export type PropertyValueProp = any
export type PropertyChild = (name: string, value: PropertyValueProp, props: any) => void

export type PropertyProps =
| { name: PropertyNameProp }
| { value: PropertyValueProp }
| { name: PropertyNameProp, value: PropertyValueProp }
| { children: PropertyChild }
| { name: PropertyNameProp, children: PropertyChild }

const Property: React.FC<PropertyProps> = props => {
  return <div />
}

export default Property
