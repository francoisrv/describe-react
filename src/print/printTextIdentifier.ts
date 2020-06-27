import { TextIdentifier } from "../types";
import { isReactElementComponentOf } from "../utils";
import { Is } from "../components/Is";
import { isBoolean, isString, isRegExp } from "lodash";
import printIs from "./printIs";
import { printHighlight, printLogicOperator } from "./common";

export default function printTextIdentifier(text: TextIdentifier, not = false) {
  if (isString(text)) {
    return text
  }
  if (isRegExp(text)) {
    return text.toString()
  }
  if (isBoolean(text)) {
    return ''
  }
  if (isReactElementComponentOf(text, Is)) {
    return printIs(
      text.props,
      s => printHighlight(printTextIdentifier(s)),
      printLogicOperator(not ? ' nor ' : ' or ')
    )
  }
}
