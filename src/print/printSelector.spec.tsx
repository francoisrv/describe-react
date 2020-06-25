import printSelector, { PrintSelectorProps } from "./printSelector"
import { Dictionary } from "lodash"
import { printHighlight, printType, printProps } from "./common"
import Describe from "../components/Describe"
import One from "../components/One"
import React from "react"
import Type from "../components/Type"

interface Test {
  props: PrintSelectorProps,
  result: string
}

function describeTest(t: Test) {
  describe(`<Expect ${ printProps(t.props) } />`, () => {
    it(`Expect ${ t.result }`, () => {
      expect(printSelector(t.props)).toEqual(t.result)
    })
  })
}

describe('Print expect', () => {
  describe('Root element', () => {
    const tests: Test[] = [
      {
        props: { element: true },
        result: 'root element'
      },
      {
        props: { root: true, element: true },
        result: 'root element'
      }
    ]
    for (const t of tests) {
      describeTest(t)
    }
  })

  describe('Child', () => {
    describe('Child position', () => {
      const tests: Test[] = [
        {
          props: { child: true },
          result: 'first child'
        },
        {
          props: { first: true, child: true },
          result: 'first child'
        },
        {
          props: { last: true, child: true },
          result: 'last child'
        },
        {
          props: { only: true, child: true },
          result: 'only child'
        },
        {
          props: { any: true, child: true },
          result: 'any child'
        },
        {
          props: { child: true, at: 5 },
          result: '6th child'
        },
      ]
      for (const t of tests) {
        describeTest(t)
      }
    })
    describe('Child identifier', () => {
      const tests: Test[] = [
        {
          props: { only: true, child: 'div' },
          result: 'only child with type div'
        },
        {
          props: { child: Describe },
          result: 'first child with type Describe'
        },
      ]
      for (const t of tests) {
        describeTest(t)
      }
    })

    describe('Child of', () => {
      const tests: Test[] = [
        {
          props: { child: true, of: 'div' },
          result: 'first child of parent element div'
        },
      ]
      for (const t of tests) {
        describeTest(t)
      }
    })
  })
})
