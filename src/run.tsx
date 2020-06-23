import * as React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import ReactContext, { defaultContext } from './context'
import { ItProps } from './types'

function makeDescriber(opt: ItProps, fn: typeof describe | typeof it = describe) {
  let describer = fn
  if (opt.skip) {
    describer = describe.skip
  } else if (opt.only) {
    describer = describe.only
  }
  return describer
}

export default function run(Type: React.ComponentType<any>) {
  let source: ReactTestRenderer.ReactTestRenderer

  const context = { ...defaultContext, its: [], getSource: () => source }
  ReactTestRenderer.act(() => {
    source = ReactTestRenderer.create(
      <ReactContext.Provider value={ context }>
        <Type />
      </ReactContext.Provider>
    )
  })
  if (!context.describer) {
    throw new Error('Missing describer')
  }
  const describer = makeDescriber(context.describer)
  describer(context.describer.label, () => {
    for (const itSection of context.sections) {
      const sectionDescriber = makeDescriber(context.describer)
      sectionDescriber(itSection.label, () => {
        for (const sub of itSection.subs) {
          const itDescriber = makeDescriber(sub, it)
          itDescriber(sub.label, sub.fn)
        }
      })
    }
  })
}
