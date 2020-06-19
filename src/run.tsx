import * as React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import ReactContext, { defaultContext } from './context'

export default function run(Type: React.ComponentType<any>) {
  const context = { ...defaultContext, its: [] }
  ReactTestRenderer.act(() => {
    ReactTestRenderer.create(
      <ReactContext.Provider value={ context }>
        <Type />
      </ReactContext.Provider>
    )
  })
  if (!context.describer) {
    throw new Error('Missing describer')
  }
  describe(context.describer.label, () => {
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
