import { UnitTypeIdentifier } from "../types";

export interface TypeProps {
  is?: UnitTypeIdentifier,
  isNot?: UnitTypeIdentifier,
  isOneOf?: UnitTypeIdentifier[]
  isNotOneOf?: UnitTypeIdentifier[]
}

export default function Type(props: TypeProps) {
  return <div />
}
