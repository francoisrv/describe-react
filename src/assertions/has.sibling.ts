import { ReactTestInstance } from "react-test-renderer";
import { HasSiblingsProps } from "../components/Has";
import { isArray, isString, isBoolean } from "lodash";

function getIndex(elem: any) {
  return elem._fiber.index
}

export default function hasSibling(
  elem: ReactTestInstance | ReactTestInstance[],
  props: HasSiblingsProps
) {
  if (isArray(elem)) {
    for (const v of elem) {
      hasSibling(v, props)
    }
    return
  }

  const isNot = ('not' in props) || ('no' in props)

  const { parent } = elem

  let children: ReactTestInstance[] = (parent.children as ReactTestInstance[]).filter(
    child => !isString(child) && getIndex(child) !== getIndex(elem)
  )

  if ('siblings' in props) {
    if (!isBoolean(props.siblings)) {
      children = children.filter(child => child.type === props.siblings)
    }
  }

  let passed = true
  let reason: Error | undefined

  try {
    expect(children.length > 0).toBe(true)
  } catch (error) {
    passed = false
    reason = error
  }

  try {
    expect(passed).toBe(!isNot)
  } catch (error) {
    throw reason
  }
}
