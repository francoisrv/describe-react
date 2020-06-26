import ReactTestRender from 'react-test-renderer'
import findElements from './findElements'

describe('Find elements', () => {
  it('Find elements by type', () => {
    const elements = findElements(
      { type: 'div' },
      ReactTestRender.create(
        <section>
          <div />
          <div />
          <div />
        </section>
      ).root.children
    )
  })
})