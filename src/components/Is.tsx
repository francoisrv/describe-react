import React from 'react'

export type IsEquality<T> =
| { exactly: T }
| { not: T }
| { either: T[] }
| { neither: T[] }

export type IsTypeProps =
| { anything: boolean }
| { not?: boolean, true: boolean }
| { not?: boolean, false: boolean }
| { not?: boolean, null: boolean }
| { not?: boolean, defined: boolean }
| { not?: boolean, undefined: boolean }
| { not?: boolean, a: boolean, string: boolean }
| { not?: boolean, an: boolean, empty: boolean, string: boolean }
| { not?: boolean, a: boolean, number: boolean }
| { not?: boolean, a: boolean, boolean: boolean }
| { not?: boolean, an: boolean, object: boolean }
| { not?: boolean, an: boolean, array: boolean }
| { not?: boolean, a: boolean, date: boolean }
| { not?: boolean, an: boolean, error: boolean }
| { not?: boolean, a: boolean, regular: boolean, expression: boolean }

export type IsSpecialProps =
| { not?: boolean, matching: RegExp }
| { matching: boolean, either: RegExp[] }
| { matching: boolean, neither: RegExp[] }
| { not?: boolean, greater: boolean, than: number }
| { not?: boolean, greater: boolean, than: boolean, or: boolean, equals: number }
| { not?: boolean, lesser: boolean, than: number }
| { not?: boolean, lesser: boolean, than: boolean, or: boolean, equals: number }
| { not?: boolean, empty: boolean }

export type IsProps<T> =
| IsEquality<T>
| IsTypeProps
| IsSpecialProps

export default function Is<T>(_props: IsProps<T>) {
  return <div />
}
