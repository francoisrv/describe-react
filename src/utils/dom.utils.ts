import {
  NodeFilterFP,
  TypeIdentifier,
  NodeFilter,
  LengthIdentifier,
  Which,
} from '../types'
import { compact, first, last, isString, isNumber, isBoolean } from 'lodash'
import DescribeReactError from '../DescribeReactError'
import { HasChildrenProps, SingleChildProps } from '../components/Has'
import { isReactTestRendererInstance, predicate } from '../utils'
import { ReactTestInstance } from 'react-test-renderer'
import which from '../assertions/which'

export const pickFirstChild: NodeFilterFP = () => (nodes) =>
  compact([first(nodes)])

export const pickFirstChildren: NodeFilterFP<[number]> = (limit) => (nodes) => {
  const children = nodes.slice(0, limit)
  if (children.length < limit) {
    throw new DescribeReactError(
      `Expected parent element to have at least ${limit} children, but only ${children.length} children were found`
    )
  }
  return children
}

export const pickLastChild: NodeFilterFP = () => (nodes) =>
  compact([last(nodes)])

export const pickLastChildren: NodeFilterFP<[number]> = (limit) => (nodes) => {
  const children = nodes.slice(nodes.length - limit)
  if (children.length < limit) {
    throw new DescribeReactError(
      `Expected parent element to have at least ${limit} children, but only ${children.length} children found`
    )
  }
  return children
}

export const selectChildren: NodeFilterFP<[TypeIdentifier]> = (type) => (
  nodes
) => nodes.filter((child) => !isString(child) && child.type === type)

export const filterTestInstances: NodeFilterFP = () => (nodes) =>
  nodes.filter(isReactTestRendererInstance) as ReactTestInstance[]

export const pickAllChildrenExcept: NodeFilterFP = (except: number) => (
  nodes
) => nodes.filter((_node, index) => index !== except)

export const pickChildByNumber: NodeFilterFP = (number: number) => (nodes) =>
  compact([nodes[number - 1]])

export const filterChildren: NodeFilterFP<[HasChildrenProps]> = (props) => (
  nodes
) => {
  const filters: NodeFilter[] = [
    // filterTestInstances()
  ]

  let type: undefined | TypeIdentifier

  if ('child' in props && !isBoolean(props.child)) {
    type = props.child
  } else if ('children' in props && !isBoolean(props.children)) {
    type = props.children
  }

  if (type) {
    filters.push(selectChildren(type))
  }

  if ('first' in props) {
    if (isNumber(props.first)) {
      filters.push(pickFirstChildren(props.first))
    } else if (isBoolean(props.first)) {
      filters.push(pickFirstChild())
    }
  } else if ('last' in props) {
    if (isNumber(props.last)) {
      filters.push(pickLastChildren(props.last))
    } else if (isBoolean(props.last)) {
      filters.push(pickLastChild())
    }
  } else if ('except' in props) {
    filters.push(pickAllChildrenExcept(props.except))
  } else if ('number' in props) {
    // @ts-ignore
    filters.push(pickChildByNumber((props as SingleChildProps).number))
  }

  let children = [...nodes]

  for (const filter of filters) {
    children = filter(children)
  }

  return children
}

export const filterByWhich: NodeFilterFP<[Which<any>]> = (whichProps) => (
  nodes
) => nodes.filter((node) => predicate(() => which(node, whichProps)))

export function assertWhich(
  nodes: ReactTestInstance[],
  whichProps: Which<any>
) {
  for (const node of nodes) {
    which(node, whichProps)
  }
}

export function expectLength(
  nodes: ReactTestInstance[],
  identifier: LengthIdentifier,
  number: number,
  other?: number
) {
  switch (identifier) {
    case 'has':
      {
        if (nodes.length === 0) {
          throw new DescribeReactError(
            `Expected node list to have length which is greater than 0, but instead length is ${nodes.length}`
          )
        }
      }
      break

    case 'has not':
      {
        if (nodes.length !== 0) {
          throw new DescribeReactError(
            `Expected node list to have length which is 0, but instead length is ${nodes.length}`
          )
        }
      }
      break

    case 'exactly':
      {
        if (nodes.length !== number) {
          throw new DescribeReactError(
            `Expected node list to have length which is exactly ${number}, but instead length is ${nodes.length}`
          )
        }
      }
      break

    case 'not exactly':
      {
        if (nodes.length === number) {
          throw new DescribeReactError(
            `Expected node list to have length which is not exactly ${number}, but instead length is ${nodes.length}`
          )
        }
      }
      break

    case 'at least':
      {
        if (nodes.length < number) {
          throw new DescribeReactError(
            `Expected node list to have length which is at least ${number}, but instead length is ${nodes.length}`
          )
        }
      }
      break

    case 'more':
      {
        if (nodes.length <= number) {
          throw new DescribeReactError(
            `Expected node list to have length which is more than ${number}, but instead length is ${nodes.length}`
          )
        }
      }
      break

    case 'no more':
      {
        if (nodes.length > number) {
          throw new DescribeReactError(
            `Expected node list to have length which is no more than ${number}, but instead length is ${nodes.length}`
          )
        }
      }
      break

    case 'between':
      {
        if (nodes.length < number || nodes.length > other) {
          throw new DescribeReactError(
            `Expected node list to have length which is between ${number} and ${other}, but instead length is ${nodes.length}`
          )
        }
      }
      break
  }
}
