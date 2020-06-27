import { printHighlight, printLogicOperator, printGeneric } from "./common"
import { Dictionary } from "lodash"
import ReactTestRender from 'react-test-renderer'
import React from "react"
import { Is } from "../components/Is"
import { PropertiesIdentifier } from "../types"
import printHasProperties, { ExtraProperties } from "./printHasProperties"
import colors from 'colors'
import stripColors from 'strip-color'

type Print =
| string
| { highlight: string }
| { operator: string }

interface Test {
  [expectation: string]: {
    [label: string]: PropertiesIdentifier
  }
}

function isDivIfNoChild(type: string, elem: ReactTestRender.ReactTestInstance) {
  return elem.children.length === 0 && type === 'div'
}

const tests: Test[] = [
  {
    toHaveProperties: {
      'to have a property with name Foo': ['Foo'],
      'to have a property with name matching /foo/': [/foo/],
      'to have a property with name enabled which value equals true': [{ enabled: true }],
      'to have a property with name enabled which value is true': [{ enabled: <Is true /> }],
      'to have properties which are equal to { type: \"number\", value: 0 }': <Is equal to={{ type: 'number', value: 0 }} />
    },
    notToHaveProperties: {
      'not to have a property with name foo': ['foo'],
      'not to have a property with name matching /foo/': [/foo/],
      'not to have a property with name enabled which value equals true': [{ enabled: true }],
      'not to have a property with name enabled which value is true': [{ enabled: <Is true /> }],
      'not to have properties which are equal to { type: \"number\", value: 0 }': <Is equal to={{ type: 'number', value: 0 }} />
    },
    toHaveExactProperties: {
      'to have exactly one property with name Foo': ['Foo'],
      'to have exactly 2 properties, the 1st one with name Foo, the 2nd one with name bar': ['Foo', 'bar'],
      'to have exactly one property with name matching /foo/': [/foo/],
      'to have exactly one property with name enabled which value equals true': [{ enabled: true }],
      'to have exactly one property with name enabled which value is true': [{ enabled: <Is true /> }],
      'to have exact properties which are equal to { type: \"number\", value: 0 }': <Is equal to={{ type: 'number', value: 0 }} />
    },
    notToHaveExactProperties: {
      'not to have exactly one property with name Foo': ['Foo'],
      'not to have exactly 2 properties, the 1st one with name Foo, the 2nd one with name bar': ['Foo', 'bar'],
      'not to have exactly one property with name matching /foo/': [/foo/],
      'not to have exactly one property with name enabled which value equals true': [{ enabled: true }],
      'not to have exactly one property with name enabled which value is true': [{ enabled: <Is true /> }],
      'not to have exact properties which are equal to { type: \"number\", value: 0 }': <Is equal to={{ type: 'number', value: 0 }} />
    },
  }
]

describe('Print To Have Properties', () => {
  for (const spec of tests) {
    for (const section in spec) {
      describe(section, () => {
        for (const item in spec[section]) {
          describe(printGeneric(spec[section][item]), () => {
            it(item, () => {
              const args: any[] = [spec[section][item]]
              if (section === 'notToHaveProperties' || section === 'notToHaveExactProperties') {
                args.push(true)
              } else {
                args.push(false)
              }
              if (section === 'toHaveExactProperties' || section === 'notToHaveExactProperties') {
                args.push('exact')
              }
              // @ts-ignore
              expect(stripColors(printHasProperties(...args)))
              .toEqual(item)
            })
          })
        }
      })
    }
  }
})
