import { HasProps } from "./components/Has";
import hasProperties from "./has.properties";
import hasType from "./has.type";
import hasLength from "./has.length";
import { isString } from "lodash";
import hasText from "./has.text";

export default function has(
  value: any,
  props: HasProps
): void {
  if ('type' in props) {
    hasType(value, props)
  } else if ('text' in props) {
    hasText(value, props)
  } else if ('property' in props) {
    hasProperties(value, props)
  } else if ('length' in props) {
    if (isString(value)) {
      hasLength(value.length, props)
    }
  }
}
