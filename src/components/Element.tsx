import { TypeIdentifier, PropertyIdentifier, StateIdentifier } from "../types";
import React from "react";

export interface ElementProps {
  type: TypeIdentifier
  property: PropertyIdentifier
  state: StateIdentifier
}

export default function Element(props: ElementProps)  {
  return (
    <div />
  )
}
