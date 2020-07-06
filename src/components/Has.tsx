import React from "react";
import Is, { IsProps } from "./Is";
import { TypeIdentifier, TextIdentifier, SingleOrMany, Which } from "../types";
import { Dictionary } from "lodash";

export type HasTypeProps =
| { not?: boolean, type: string | React.ComponentType<any> }
| {
  not?: boolean
  type: boolean
  which:
  | React.ReactElement<IsProps<TypeIdentifier>, typeof Is>
}

export type HasTextProps =
& ( { not?: true } | { no?: true } )
& { text: string | true }
& { which?: Which<TextIdentifier> }

export type HasLengthProps =
| { not?: boolean, length: number }
| {
  length: boolean,
  which?: Which<TextIdentifier>
}

export type HasPropsProps =
| (
  & ({ not?: true } | { no?: true })
  & { properties: true }
)
| (
  & ({ not?: true } | { no?: true })
  & { exact?: true, properties: Dictionary<any> }
)
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

type NotProps = { not?: true } | { no?: true }
interface ChildrenProps { children: true | TypeIdentifier }
interface ChildProps { child: true | TypeIdentifier }

type ManyChildrenProps =
& ChildrenProps
& NotProps
& { which?: Which<TypeIdentifier> }
& (
  | {}
  | { exactly: number }
  | { at: true, least: number }
  | { more: true, than: number }
  | { between: number, and: number }
  | { first: number }
  | { last: number }
)

type SingleChildProps =
& ChildProps
& NotProps
& { which?: Which<TypeIdentifier> }
& (
  | {}
  | { first: true }
  | { last: true }
)

export type HasChildrenProps =
| ManyChildrenProps
| SingleChildProps

export type HasParentProps =
| { not?: boolean, no?: boolean, parent: true }
| { not?: boolean, no?: boolean, parent: string | React.ComponentType<any> }

interface SiblingsProps { siblings: true | TypeIdentifier }
interface SiblingProps { sibling: true | TypeIdentifier }

type ManySiblingsProps =
& SiblingsProps
& NotProps
& { which?: Which<TypeIdentifier> }
& (
  | {}
  | { exactly: number }
  | { at: true, least: number }
  | { more: true, than: number }
  | { between: number, and: number }
)

type SingleSiblingdProps =
& SiblingProps
& NotProps
& { which?: Which<TypeIdentifier> }
& (
  | {}
  | { first: true }
  | { last: true }
)

export type HasSiblingsProps =
| ManySiblingsProps
| SingleSiblingdProps

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
