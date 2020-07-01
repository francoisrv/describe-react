import ReactTestRenderer from 'react-test-renderer'
import React from 'react'
import colors from 'colors'
import { ItProps, ContextInterface } from './types'
import Context from './context'
import Render from './components/Render'

function makeDescriber(opt: ItProps, fn: typeof describe | typeof it = describe) {
  let describer = fn
  if (opt.skip) {
    describer = describe.skip
  } else if (opt.only) {
    describer = describe.only
  }
  return describer
}

export function convertToTests(ctx: ContextInterface) {
  if (!ctx.describer) {
    throw new Error('Missing Describe element')
  }
  makeDescriber(ctx.describer)(colors.bold(ctx.describer.label), () => {
    for (const section of ctx.sections) {
      if (section.customLabel) {
        makeDescriber(section)(colors.underline(section.customLabel), () => {
          describe(section.label, () => {
            for (const subSection of section.sections) {
              makeDescriber(subSection, it)(subSection.label, async () => subSection.fn())
            }
          })
        })
      } else {
        makeDescriber(section)(section.label, () => {
          for (const subSection of section.sections) {
            makeDescriber(subSection, it)(subSection.label, async () => subSection.fn())
          }
        })
      }
    }
  })
}

export default function run(Tests: React.ComponentType<any>) {
  let value: ReactTestRenderer.ReactTestRenderer
  const context = {
    describer: null,
    sections: [],
    getTestRenderer: () => value,
    getRendered: () => value.root.findByType(Render).children[0]
  }
  value = ReactTestRenderer.create(
    <Context.Provider value={ context }>
      <Tests />
    </Context.Provider>
  )
  // console.log({context})
  // @ts-ignore
  convertToTests(context)
}
