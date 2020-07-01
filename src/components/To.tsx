import { HasProps } from "./Has";

export type ToHaveProps =
& { have: boolean }
& HasProps

export type ToProps =
| ToHaveProps

export default function To(_props: ToProps) {
  return <div />
}
