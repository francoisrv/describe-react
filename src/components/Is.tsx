import React from 'react'

export interface IsProps<T, F extends (...args: any[]) => any> {
  a?:             true
  an?:            true
  anything?:      true
  array?:         true
  boolean?:       true
  date?:          true
  equal?:         true
  error?:         true
  exactly?:       T
  expression?:    true
  false?:         true
  greater?:       true
  lesser?:        true
  not?:           true | T
  null?:          true
  number?:        true
  object?:        true
  of?:            T[]
  one?:           true
  or?:            true
  regular?:       true
  string?:        true
  than?:          true | number | Date
  to?:            any
  true?:          true | ((...args: Parameters<F>) => boolean)
  undefined?:     true
  valid?:         ((...args: Parameters<F>) => void)
}

export function Is<T, F extends (...args: any[]) => any>(props: IsProps<T, F>) {
  return <div />
}
