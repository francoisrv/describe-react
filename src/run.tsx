import * as React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import ReactContext, { defaultContext } from './context'

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
  let describer = describe
  if (context.describer.skip) {
    describer = describe.skip
  } else if (context.describer.only) {
    describer = describe.only
  }
  describer(context.describer.label, () => {
    beforeAll(async () => {
      for (const fn of context.beforeAll) {
        await fn()
      }
    })
    for (const itSection of context.its) {
      it(itSection.label, itSection.fn)
    }
  })
}
