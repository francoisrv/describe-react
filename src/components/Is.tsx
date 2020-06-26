import React from 'react'

export interface IsProps<T, F extends (...args: any[]) => any> {
  a?:             true
  an?:            true
  anything?:      true
  array?:         true
  boolean?:       true
  date?:          true
  error?:         true
  exactly?:       T
  expression?:    true
  false?:         true
  not?:           true | T
  null?:          true
  number?:        true
  object?:        true
  of?:            T[]
  one?:           true
  regular?:       true
  string?:        true
  true?:          true | ((...args: Parameters<F>) => boolean)
  undefined?:     true
  valid?:         ((...args: Parameters<F>) => boolean)
}

export function Is<T, F extends (...args: any[]) => any>(props: IsProps<T, F>) {
  return <div />
}
