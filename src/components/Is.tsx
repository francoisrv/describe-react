import React from 'react'

export type IsEquality<T> =
| { exactly: T }
| { either: T[] }
| { neither: T[] }
| { not: T }

export type IsTypeProps =
| { true: boolean }
| { false: boolean }
| { null: boolean }
| { defined: boolean }
| { undefined: boolean }
| { a?: boolean, string: boolean }
| { an?: boolean, empty: boolean, string: boolean }
| { a?: boolean, number: boolean }
| { a?: boolean, boolean: boolean }
| { an?: boolean, object: boolean }
| { an?: boolean, array: boolean }
| { a?: boolean, date: boolean }
| { an?: boolean, error: boolean }
| { a?: boolean, regular: boolean, expression: boolean }

export type IsSpecialProps =
| { matching: RegExp }
| { matching: boolean, either: RegExp[] }
| { matching: boolean, neither: RegExp[] }
| { greater: boolean, than: number }
| { greater: boolean, than: boolean, or: boolean, equals: number }
| { not: boolean, greater: boolean, than: boolean, nor: boolean, equals: number }
| { lesser: boolean, than: number }
| { lesser: boolean, than: boolean, or: boolean, equals: number }
| { empty: boolean }

export type IsProps<T> =
& ( { not?: true } | { no?: true } )
& (
  | IsEquality<T>
  | IsTypeProps
  | IsSpecialProps
)

export default function Is<T>(_props: IsProps<T>) {
  return <div />
}
