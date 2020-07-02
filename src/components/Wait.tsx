import { ExpectElementProps, ExpectElementsProps } from "./Expect";

export type WaitProps =
| ( { seconds: number } | { milliseconds: number } )
| ( { for: true } & ( ExpectElementProps | ExpectElementsProps ) )
