import React from 'react'

import { HasProps } from './Has'
import { TestModifier } from '../types'

export type ToHaveProps =
& { have: boolean }
& HasProps

export type ToProps =
& (ToHaveProps)
& TestModifier

export default function To(_props: ToProps) {
  return <div />
}
