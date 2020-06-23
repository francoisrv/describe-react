import ReactTestRenderer from 'react-test-renderer'
import React from 'react'
import { ItProps, ContextInterface } from './types'
import Context from './context'

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
  makeDescriber(ctx.describer)(ctx.describer.label, () => {
    for (const section of ctx.sections) {
      makeDescriber(section)(section.label, () => {
        for (const subSection of section.sections) {
          makeDescriber(subSection, it)(subSection.label, async () => subSection.fn())
        }
      })
    }
  })
}

export default function run(Tests: React.ComponentType<any>) {
  const context = {
    describer: null,
    sections: [],
    getSource: () => {
      throw new Error('You are using master template')
    }
  }
  ReactTestRenderer.create(
    <Context.Provider value={ context }>
      <Tests />
    </Context.Provider>
  )
  console.log({context})
  // @ts-ignore
  convertToTests({
    describer: {
      label: 'Hello',
    },
    sections: [
      {
        label: 'Cool',
        sections: [
          {
            label: 'Messi',
            fn() {
              console.log('hey')
            }
          }
        ]
      }
    ]
  })
}
