import React from "react";

export type HasTypeProps =
| { type: string | React.ComponentType<any> }
| {
  type: boolean,
  which: boolean,
  is: boolean,
  not: string | React.ComponentType<any>
}
| {
  type: boolean,
  which: boolean,
  is: boolean,
  not?: boolean
  one?: boolean
  of?: (string | React.ComponentType<any>)[]
}

export type HasProps =
| HasTypeProps

export default function Has(props: HasProps) {
  return <div />
}
