import React from "react";
import Is, { IsProps } from "./Is";
import { UnitTypeIdentifier, UnitTextIdentifier } from "../types";

export type HasTypeProps =
| { type: string | React.ComponentType<any> }
| {
  type: boolean,
  which:
  | React.ReactElement<IsProps<UnitTypeIdentifier>, typeof Is>
}

export type HasTextProps =
| { text: string }
| { not: boolean, text: boolean }
| {
  text: boolean,
  which?:
  | React.ReactElement<IsProps<UnitTextIdentifier>, typeof Is>
}

export type HasLengthProps =
| { not?: boolean, length: number }
| {
  length: boolean,
  which?:
  | React.ReactElement<IsProps<UnitTextIdentifier>, typeof Is>
}

export type HasProps =
| HasTypeProps
| HasTextProps
| HasLengthProps

export default function Has(props: HasProps) {
  return <div />
}
