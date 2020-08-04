import ReactTestRenderer from 'react-test-renderer'
import React from 'react'
import colors from 'colors'

import { ItProps, ContextInterface } from './types'
import Context, { ContextState } from './context'
import Render from './components/Render'

function makeDescriber(opt: ItProps, fn: typeof describe | typeof it = describe) {
  let describer = fn
  if (opt.skip) {
    describer = fn.skip
  } else if (opt.only) {
    describer = fn.only
  }
  return describer
}

export function convertToTests(ctx: ContextInterface) {
  if (!ctx.describer) {
    throw new Error('Missing Describe element')
  }
  makeDescriber(ctx.describer)(colors.bold(ctx.describer.label), () => {
    let index = 0
    for (const section of ctx.sections) {
      if (section.customLabel) {
        makeDescriber(section)(colors.underline(section.customLabel), () => {
          describe(section.label, () => {
            if (section.beforeAll) {
              beforeAll(section.beforeAll)
            }
            if (section.afterAll) {
              afterAll(section.afterAll)
            }
            for (const subSection of section.sections) {
              makeDescriber(subSection, it)(subSection.label, async () => {
                if (subSection.timeout) {
                  jest.setTimeout(subSection.timeout)
                }
                subSection.fn()
              })
            }
          })
        })
      } else {
        makeDescriber(section)(`~${ colors.gray.italic(index.toString()) } ${ section.label }`, () => {
          if (section.beforeAll) {
            beforeAll(section.beforeAll)
          }
          if (section.afterAll) {
            afterAll(section.afterAll)
          }
          for (const subSection of section.sections) {
            makeDescriber(subSection, it)(subSection.label, async () => {
              if (subSection.timeout) {
                jest.setTimeout(subSection.timeout)
              }
              subSection.fn()
            })
          }
        })
      }
      index++
    }
  })
}

export default function run(Tests: React.ComponentType<any>) {
  let value: ReactTestRenderer.ReactTestRenderer
  const context = {
    describer: null,
    sections: [],
    getTestRenderer: () => value,
    getRendered: () => value.root.findByType(Render).children[0],
    state: new ContextState({})
  }
  value = ReactTestRenderer.create(
    <Context.Provider value={ context }>
      <Tests />
    </Context.Provider>
  )
  convertToTests(context)
}
