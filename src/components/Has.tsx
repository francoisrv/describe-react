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
  of?:
   (string | React.ComponentType<any>)[]
}

export type HasTextProps =
| { text: string | boolean }
| {
  no: boolean
  text: boolean
}
| {
  text: boolean
  which: boolean
  is: boolean
  not: string
}
| {
  text: boolean
  which: boolean
  is: boolean
  not?: boolean
  one?: boolean
  of?:
   (string)[]
}
| {
    text: boolean
    which: boolean
    matches: RegExp
  }
| {
    text: boolean
    which: boolean
    does: boolean
    not: boolean
    match: RegExp
  }
| {
    text: boolean
    which: boolean
    matches: boolean
    one: boolean
    of: RegExp[]
  }
| {
    text: boolean
    which: boolean
    does: boolean
    not: boolean
    match: boolean
    one: boolean
    of: RegExp[]
  }

export type HasProps =
| HasTypeProps
| HasTextProps

export default function Has(props: HasProps) {
  return <div />
}
