import React from 'react'

export type StateNameProp = string | RegExp
export type StateValueProp = any
export type StateAssertProp = (name: string, value: StateValueProp, props: any) => void

export type StateProps =
| { name: StateNameProp }
| { value: StateValueProp }
| { name: StateNameProp, value: StateValueProp }
| { name: StateNameProp, assert: StateAssertProp }

const State: React.FC<StateProps> = props => <div />

export default State
