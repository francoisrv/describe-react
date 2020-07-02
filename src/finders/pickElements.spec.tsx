import ReactTestRenderer from 'react-test-renderer'
import React from 'react'
import pickElements from './pickElements'
import Has from '../components/Has'
import { Dictionary } from 'lodash'
import { ExpectElementProps, ExpectElementsProps } from '../components/Expect'
import { printProps } from '../print'
import Is from '../components/Is'

type Fn = 
| undefined
| ReactTestRenderer.ReactTestInstance
| ReactTestRenderer.ReactTestInstance[]

function makeTest(
  elem: React.ReactElement<any>,
  props: ExpectElementProps | ExpectElementsProps,
  fn: (picked: Fn) => any
) {
  it(printProps(props), () => {
    const { root } = ReactTestRenderer.create(elem)
    const picked = pickElements(root, props)
    fn(picked)
  })
}

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
          makeTest(
            <div />,
            {
              element: true,
              which: <Has type="div" />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )
          
          makeTest(
            <div />,
            {
              element: true,
              which: <Has type which={ <Is not="span" /> } />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div />,
            {
              element: true,
              which: <Has type which={ <Is either={[ 'span', 'div' ]} /> } />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div />,
            {
              element: true,
              which: <Has type which={ <Is neither={[ 'span', 'table' ]} /> } />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )
        })
        describe('Failing', () => {
          makeTest(
            <div />,
            {
              element: true,
              which: <Has type="span" />
            },
            picked => expect(picked).toBeUndefined()
          )
          
          makeTest(
            <div />,
            {
              element: true,
              which: <Has type which={ <Is not="div" /> } />
            },
            picked => expect(picked).toBeUndefined()
          )

          makeTest(
            <div />,
            {
              element: true,
              which: <Has type which={ <Is either={[ 'span', 'section' ]} /> } />
            },
            picked => expect(picked).toBeUndefined()
          )

          makeTest(
            <div />,
            {
              element: true,
              which: <Has type which={ <Is neither={[ 'span', 'div' ]} /> } />
            },
            picked => expect(picked).toBeUndefined()
          )
        })
      })
      describe('Text', () => {
        describe('Passing', () => {
          makeTest(
            <div>abc</div>,
            {
              element: true,
              which: <Has text />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div />,
            {
              element: true,
              which: <Has not text />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div>abc</div>,
            {
              element: true,
              which: <Has text="abc" />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div />,
            {
              element: true,
              which: <Has text which={ <Is not="abc" /> } />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div>abc</div>,
            {
              element: true,
              which: <Has text which={ <Is matching={ /abc/ } /> } />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div>abc</div>,
            {
              element: true,
              which: <Has text which={ <Is not matching={ /def/ } /> } />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div>abc</div>,
            {
              element: true,
              which: <Has text which={ <Is matching either={[ /def/, /abc/ ]} /> } />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div>abc</div>,
            {
              element: true,
              which: <Has text which={ <Is matching neither={[ /def/, /ghi/ ]} /> } />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div>abc</div>,
            {
              element: true,
              which: <Has text which={ <Is either={[ 'abc', 'def' ]} /> } />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div>abc</div>,
            {
              element: true,
              which: <Has text which={ <Is neither={[ 'def', 'ghi' ]} /> } />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div>{''}</div>,
            {
              element: true,
              which: <Has text which={ <Is an empty string /> } />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div>abc</div>,
            {
              element: true,
              which: <Has text which={ <Is not an empty string /> } />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div>abc</div>,
            {
              element: true,
              which: <Has text which={ <Has length={3} /> } />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div>abc</div>,
            {
              element: true,
              which: <Has text which={ <Has not length={5} /> } />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div>abc</div>,
            {
              element: true,
              which: <Has
                text which={
                  <Has length which={ <Is greater than={2} /> } />
                }
              />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div>abc</div>,
            {
              element: true,
              which: <Has
                text which={
                  <Has length which={ <Is not greater than={5} /> } />
                }
              />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )

          makeTest(
            <div>abc</div>,
            {
              element: true,
              which: <Has
                text which={
                  <Has length which={ <Is greater than or equals={3} /> } />
                }
              />
            },
            picked => expect(picked).toHaveProperty('type', 'div')
          )
        })
        describe('Failing', () => {
          makeTest(
            <div />,
            {
              element: true,
              which: <Has type="span" />
            },
            picked => expect(picked).toBeUndefined()
          )
          
          makeTest(
            <div />,
            {
              element: true,
              which: <Has type which={ <Is not="div" /> } />
            },
            picked => expect(picked).toBeUndefined()
          )

          makeTest(
            <div />,
            {
              element: true,
              which: <Has type which={ <Is either={[ 'span', 'section' ]} /> } />
            },
            picked => expect(picked).toBeUndefined()
          )

          makeTest(
            <div />,
            {
              element: true,
              which: <Has type which={ <Is neither={[ 'span', 'div' ]} /> } />
            },
            picked => expect(picked).toBeUndefined()
          )
        })
      })
    })
  })
})
