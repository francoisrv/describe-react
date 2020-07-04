import React from "react";
import Is, { IsProps } from "./Is";
import { TypeIdentifier, TextIdentifier, SingleOrMany, Which } from "../types";

export type HasTypeProps =
| { not?: boolean, type: string | React.ComponentType<any> }
| {
  not?: boolean
  type: boolean
  which:
  | React.ReactElement<IsProps<TypeIdentifier>, typeof Is>
}

export type HasTextProps =
| { not?: boolean, text: string }
| { not: boolean, text: boolean }
| { no?: boolean, text: string }
| { no: boolean, text: boolean }
| {
  text: boolean,
  which?: Which<TextIdentifier>
}

export type HasLengthProps =
| { not?: boolean, length: number }
| {
  length: boolean,
  which?: Which<TextIdentifier>
}

export type HasPropsProps =
| { not?: boolean, no?: boolean, properties: true }
| {
    property: string | boolean
    which?: Which<TextIdentifier>
  }

export type HasStateProps =
| {
  not?: boolean
  no?: boolean
  state: string | true
  which?: Which<TextIdentifier>
}

export type HasChildrenProps =
| { not?: boolean, no?: boolean, children: true }
| {
  not?: boolean
  only?: boolean
  exactly?: number
  at?: true, least?: number
  more?: true, than?: number
  between?: number, and?: number
  child: true
  which?: Which<TextIdentifier>
}

export type HasParentProps =
| { not?: boolean, no?: boolean, parent: true }
| { not?: boolean, no?: boolean, parent: string | React.ComponentType<any> }

export type HasSiblingsProps =
| { not?: boolean, no?: boolean, siblings: true }

export type HasProps =
| HasTypeProps
| HasTextProps
| HasLengthProps
| HasPropsProps
| HasStateProps
| HasChildrenProps
| HasParentProps
| HasSiblingsProps

export default function Has(props: HasProps) {
  return <div />
}
