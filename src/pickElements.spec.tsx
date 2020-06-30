import ReactTestRenderer from 'react-test-renderer'
import React from 'react'
import pickElements from './pickElements'
import Has from './components/Has'

describe('Pick elements', () => {
  describe('Prepick', () => {
    it('element', () => {
      const { root } = ReactTestRenderer.create(
        <div />
      )
      const props = { element: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'div')
    })
    it('root element', () => {
      const { root } = ReactTestRenderer.create(
        <div />
      )
      const props = { root: true, element: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'div')
    })
    it('first element', () => {
      const { root } = ReactTestRenderer.create(
        <div />
      )
      const props = { first: true, element: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'div')
    })
    it('only element', () => {
      const { root } = ReactTestRenderer.create(
        <div />
      )
      const props = { only: true, element: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'div')
    })
    it('single element', () => {
      const { root } = ReactTestRenderer.create(
        <div />
      )
      const props = { single: true, element: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'div')
    })
    it('last element', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <h1 />
          <h2 />
          <h3 />
        </div>
      )
      const props = { last: true, element: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'h3')
    })
    it('element number', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <h1 />
          <h2 />
          <h3 />
        </div>
      )
      const props = { element: true, number: 2 }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'h1')
    })
    it('element at', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <h1 />
          <h2 />
          <h3 />
        </div>
      )
      const props = { element: true, at: 2 }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'h2')
    })
    it('elements', () => {
      const { root } = ReactTestRenderer.create(
        <table>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </table>
      )
      const props = { elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(5)
    })
    it('all elements', () => {
      const { root } = ReactTestRenderer.create(
        <table>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </table>
      )
      const props = { all: true, elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(5)
    })
    it('some elements', () => {
      const { root } = ReactTestRenderer.create(
        <table>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </table>
      )
      const props = { some: true, elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(5)
    })
    it('first', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <div />
          <div />
          <span />
        </div>
      )
      const props = { first: 3, elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(3)
    })
    it('last', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <div />
          <div />
          <span />
        </div>
      )
      const props = { last: 2, elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(2)
    })
    it('at least', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <div />
          <div />
          <span />
          <span />
          <span />
        </div>
      )
      const props = { at: true, least: 2, elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(6)
    })
    it('no more than', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <div />
          <div />
          <span />
          <span />
          <span />
        </div>
      )
      const props = { no: true, more:true, than: 2, elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(6)
    })
    it('between', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <div />
          <div />
          <span />
          <span />
          <span />
        </div>
      )
      const props = { between: 2, and: 5, elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(6)
    })
  })
  describe('Pick', () => {
    describe('element', () => {
      describe('Type', () => {
        describe('Passing', () => {
          it('element which={ <Has type="div" /> }', () => {
            const { root } = ReactTestRenderer.create(
              <div />
            )
            const props = { element: true, which: <Has type="div" /> }
            const picked = pickElements(root, props)
            expect(picked).toHaveProperty('type', 'div')
          })
          it('element which={ <Has type which is not="span" /> }', () => {
            const { root } = ReactTestRenderer.create(
              <div />
            )
            const props = { element: true, which: <Has type which is not="span" /> }
            const picked = pickElements(root, props)
            expect(picked).toHaveProperty('type', 'div')
          })
          it('element which={ <Has type which is one of={[ "span", "div" ]} /> }', () => {
            const { root } = ReactTestRenderer.create(
              <div />
            )
            const props = { element: true, which: <Has type which is one of={[  'span', 'div' ]} /> }
            const picked = pickElements(root, props)
            expect(picked).toHaveProperty('type', 'div')
          })
          it('element which={ <Has type which is not one of={[ "span", "section" ]} /> }', () => {
            const { root } = ReactTestRenderer.create(
              <div />
            )
            const props = { element: true, which: <Has type which is not one of={[ 'span', 'section' ]} /> }
            const picked = pickElements(root, props)
            expect(picked).toHaveProperty('type', 'div')
          })
        })
        describe('Failing', () => {
          it('element which={ <Has type="span" /> }', () => {
            const { root } = ReactTestRenderer.create(
              <div />
            )
            const props = { element: true, which: <Has type="span" /> }
            const picked = pickElements(root, props)
            expect(picked).toBeUndefined()
          })
          it('element which={ <Has type which is not="div" /> }', () => {
            const { root } = ReactTestRenderer.create(
              <div />
            )
            const props = { element: true, which: <Has type which is not="div" /> }
            const picked = pickElements(root, props)
            expect(picked).toBeUndefined()
          })
        })
      })
    })
    it('root element', () => {
      const { root } = ReactTestRenderer.create(
        <div />
      )
      const props = { root: true, element: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'div')
    })
    it('first element', () => {
      const { root } = ReactTestRenderer.create(
        <div />
      )
      const props = { first: true, element: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'div')
    })
    it('only element', () => {
      const { root } = ReactTestRenderer.create(
        <div />
      )
      const props = { only: true, element: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'div')
    })
    it('single element', () => {
      const { root } = ReactTestRenderer.create(
        <div />
      )
      const props = { single: true, element: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'div')
    })
    it('last element', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <h1 />
          <h2 />
          <h3 />
        </div>
      )
      const props = { last: true, element: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'h3')
    })
    it('element number', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <h1 />
          <h2 />
          <h3 />
        </div>
      )
      const props = { element: true, number: 2 }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'h1')
    })
    it('element at', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <h1 />
          <h2 />
          <h3 />
        </div>
      )
      const props = { element: true, at: 2 }
      const picked = pickElements(root, props)
      expect(picked).toHaveProperty('type', 'h2')
    })
    it('elements', () => {
      const { root } = ReactTestRenderer.create(
        <table>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </table>
      )
      const props = { elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(5)
    })
    it('all elements', () => {
      const { root } = ReactTestRenderer.create(
        <table>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </table>
      )
      const props = { all: true, elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(5)
    })
    it('some elements', () => {
      const { root } = ReactTestRenderer.create(
        <table>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </table>
      )
      const props = { some: true, elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(5)
    })
    it('first', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <div />
          <div />
          <span />
        </div>
      )
      const props = { first: 3, elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(3)
    })
    it('last', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <div />
          <div />
          <span />
        </div>
      )
      const props = { last: 2, elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(2)
    })
    it('at least', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <div />
          <div />
          <span />
          <span />
          <span />
        </div>
      )
      const props = { at: true, least: 2, elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(6)
    })
    it('no more than', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <div />
          <div />
          <span />
          <span />
          <span />
        </div>
      )
      const props = { no: true, more:true, than: 2, elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(6)
    })
    it('between', () => {
      const { root } = ReactTestRenderer.create(
        <div>
          <div />
          <div />
          <span />
          <span />
          <span />
        </div>
      )
      const props = { between: 2, and: 5, elements: true }
      const picked = pickElements(root, props)
      expect(picked).toHaveLength(6)
    })
  })
})
