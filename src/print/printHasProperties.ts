import { PropertiesIdentifier, UnitPropertiesIdentifier, PropertiesIdentifierIsFn } from "../types";
import { printLogicOperator } from "./common";
import { compact, isString, isRegExp, isObject } from "lodash";
import printHasProperty from "./printHasProperty";
import { isReactElementComponentOf, getNumberWithOrdinal } from "../utils";
import { Is, IsProps } from "../components/Is";
import printIs from "./printIs";

export type ExtraProperties = 'exact'

export default function printHasProperties(
  identifier: PropertiesIdentifier,
  not = false,
  extra: null | ExtraProperties = null
) {
  const bits: string[] = [
    not && printLogicOperator('not'),
    'to have'
  ]
  if (Array.isArray(identifier)) {
    if (extra === 'exact') {
      if (identifier.length === 1) {
        bits.push(
          'exactly one property',
          identifier
          .map(f => {
            if (isString(f) || isRegExp(f) || isObject(f)) {
              return printHasProperty(f)
                .replace(/^to have property /, '')
            }
          })
          .filter(Boolean)
          .join(printLogicOperator(' and '))
        )
      } else {
        bits.push(
          `exactly ${ identifier.length } properties,`,
          identifier
          .map((f, i) => {
            if (isString(f) || isRegExp(f) || isObject(f)) {
              return printHasProperty(f)
                .replace(/^to have property /, `the ${ getNumberWithOrdinal(i + 1) } one `)
            }
          })
          .filter(Boolean)
          .join(printLogicOperator(', '))
        )
      }
    } else {
      bits.push(
        identifier
          .map(f => {
            if (isString(f) || isRegExp(f) || isObject(f)) {
              return printHasProperty(f)
                .replace(/^to have /, 'a ')
            }
          })
          .filter(Boolean)
          .join(printLogicOperator(' and '))
      )
    }
  } else if (isReactElementComponentOf(identifier, Is)) {
    const { props} = identifier as React.ReactElement<IsProps<UnitPropertiesIdentifier, PropertiesIdentifierIsFn>>
    bits.push(
      extra === 'exact' && 'exact',
      'properties which',
      printIs(props).replace(/^is /, 'are ')
    )
  }
  return compact(bits).join(' ')
}
