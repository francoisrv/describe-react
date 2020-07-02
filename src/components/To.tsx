import { HasProps } from "./Has";
import React from "react";

export type ToHaveProps =
& { have: boolean }
& HasProps

export type ToProps =
| ToHaveProps

export default function To(_props: ToProps) {
  return <div />
}
