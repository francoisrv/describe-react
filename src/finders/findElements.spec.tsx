import ReactTestRenderer from 'react-test-renderer'
import React from 'react'
import findElements, { FindElementsDescriber } from './findElements'
import labelType from '../labelers/type'
import { getNumberWithOrdinal } from '../utils'

function Bar() {
  return <span />
}

function Foo() {
  return <Bar />
}

interface Spec {
  type: TypeDescriber
}

function findElementsSpec(
  label: string,
  describer: FindElementsDescriber,
  context: React.ReactElement<any>,
  length: number,
  specs: Spec[]
) {
  describe(label, () => {
    let elem: ReactTestRenderer.ReactTestInstance
    let found: SelectedElement[] = []
    beforeAll(() => {
      elem = ReactTestRenderer.create(context).root
      found = findElements(describer, elem)
    })
    it(`should have found ${ length } element(s)`, () => {
      expect(found).toHaveLength(length)
    })
    specs.forEach((spec, index) => {
      describe(`${ getNumberWithOrdinal(index + 1) } element`, () => {
        if (spec.type) {
          it(labelType(spec.type), () => {
            if (typeof found[index] === 'string') {
              throw new Error('Expected element, instead got text')
            }
            expect(spec.type).toEqual((found[index] as ReactTestRenderer.ReactTestInstance).type)
          })
        }
      })
    })
  })
}

describe('Find elements', () => {
  describe('General', () => {
    findElementsSpec(
      'Return all elements',
      {},
      (
        <table>
          <tbody>
            <tr>
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      ),
      5,
      []
    )
  })

  describe('Find by type', () => {
    describe('has type', () => {
      findElementsSpec(
        'has string type',
        { hasType: 'span' },
        (
          <div>
            <span>
              <span />
            </span>
          </div>
        ),
        2,
        [{ type: 'span' }, { type: 'span' }]
      )
    
      findElementsSpec(
        'has component type',
        { hasType: Foo },
        (
          <div>
            <Foo />
            <div>
              <Foo />
            </div>
          </div>
        ),
        2,
        [{ type: Foo }, { type: Foo }]
      )
    })

    describe('has one of these types', () => {
      findElementsSpec(
        'has one of these string types',
        { hasOneOfTheseTypes: ['input', 'section'] },
        (
          <div>
            <section>
              <input />
            </section>
          </div>
        ),
        2,
        [{ type: 'section' }, { type: 'input' }]
      )
    
      findElementsSpec(
        'has one of these component types',
        { hasOneOfTheseTypes: [Foo, Bar] },
        (
          <div>
            <Bar />
            <Foo />
          </div>
        ),
        3,
        [{ type: Bar }, { type: Foo }, { type: Bar }]
      )

      findElementsSpec(
        'has one of these string or component types',
        { hasOneOfTheseTypes: [Bar, 'section'] },
        (
          <div>
            <section>
              <Bar />
            </section>
          </div>
        ),
        2,
        [{ type: 'section' }, { type: Bar }]
      )
    })

    describe('has not type', () => {
      findElementsSpec(
        'has not string type',
        { hasNotType: 'table' },
        (
          <div>
            <section>
              <div />
            </section>
          </div>
        ),
        2,
        [{ type: 'section' }, { type: 'div' }]
      )

      findElementsSpec(
        'has not component type',
        { hasNotType: Foo },
        (
          <div>
            <section>
              <Bar />
            </section>
            <Foo />
          </div>
        ),
        5,
        [{ type: 'section' }, { type: Bar }, { type: 'span' }, { type: Bar }, { type: 'span' }]
      )
    })

    describe('has not one of these types', () => {
      findElementsSpec(
        'has not one of these string types',
        { hasNotOneOfTheseTypes: ['table', 'section', 'div'] },
        (
          <div>
            <section>
              <div />
              <span />
            </section>
          </div>
        ),
        1,
        [{ type: 'span' }]
      )
    })
  })
})
