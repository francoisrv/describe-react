import { TypeIdentifier, PropertyIdentifier, StateIdentifier } from "../types";

export interface ElementProps {
  type: TypeIdentifier
  property: PropertyIdentifier
  state: StateIdentifier
  parent: string
  
}
