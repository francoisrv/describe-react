import ReactTestRenderer from 'react-test-renderer'
import React from 'react'
import { TypeDescriber, ElementsObjectDescriber, SelectedElement } from '../..'
import findElements from './findElements'
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
  describer: ElementsObjectDescriber,
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
    findElementsSpec(
      'Find elements by type string',
      { type: { equals: 'span' } },
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
      'Find elements by type component',
      { type: Foo },
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
  
  //   findElementsSpec(
  //     'Find elements by type range string',
  //     { type: isOneOf('input', 'section') },
  //     2,
  //     [{ type: 'section' }, { type: 'input' }]
  //   )
  
  //   findElementsSpec(
  //     'Find elements by type range string',
  //     { type: isOneOf('input', 'section') },
  //     2,
  //     [{ type: 'section' }, { type: 'input' }]
  //   )
  
  //   findElementsSpec(
  //     'Find elements by type range component',
  //     { type: isOneOf(Foo, Bar) },
  //     2,
  //     [{ type: Foo }, { type: Bar }]
  //   )
  
  //   findElementsSpec(
  //     'Find elements by type exclusion',
  //     { type: isNot(Foo) },
  //     20,
  //     []
  //   )

  //   findElementsSpec(
  //     'Find elements by type range exclusion',
  //     { type: isNotOneOf(Foo, Bar) },
  //     19,
  //     []
  //   )
  })

  // describe('Find by property', () => {
  //   findElementsSpec(
  //     'Find elements by property name',
  //     { property: { name: 'className', value: 'foo' } },
  //     2,
  //     []
  //   )
  // })

  // describe('Find by text', () => {
  //   findElementsSpec(
  //     'Find elements by property name',
  //     { text: 'Hello' },
  //     1,
  //     []
  //   )
  // })
})
