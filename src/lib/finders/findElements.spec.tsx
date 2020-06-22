import ReactTestRenderer from 'react-test-renderer'
import React from 'react'
import { utils, SelectedElement, ElementsObjectDescriber, isNot, isOneOf, isNotOneOf } from '.'
import { TypeDescriber } from './types'
import { labelToHaveType } from './labelers'

function Bar() {
  return (
    <div></div>
  )
}

function Foo() {
  return (
    <div><Bar /></div>
  )
}

function Context() {
  return (
    <div>
      <span>Hello</span>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li><Foo /></li>
        <li>
          <table>
            <tbody>
              <tr>
                <td>A</td>
                <td>B</td>
                <td>C</td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <section>
        <input />
        <span>Goodbye</span>
      </section>
    </div>
  )
}

interface Spec {
  type: TypeDescriber
}

function findElements(
  label: string,
  describer: ElementsObjectDescriber,
  length: number,
  specs: Spec[]
) {
  describe(label, () => {
    let elem: ReactTestRenderer.ReactTestInstance
    let found: SelectedElement[] = []
    beforeAll(() => {
      elem = ReactTestRenderer.create(<Context />).root
      found = utils.findElements(describer, elem)
    })
    it(`should have found ${ length } element(s)`, () => {
      expect(found).toHaveLength(length)
    })
    specs.forEach((spec, index) => {
      describe(`${ utils.getNumberWithOrdinal(index + 1) } element`, () => {
        if (spec.type) {
          it(labelToHaveType(spec.type), () => {
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
    findElements(
      'Return all elements',
      {},
      21,
      []
    )
  })

  describe('Find by type', () => {
    findElements(
      'Find elements by type string',
      { type: 'span' },
      2,
      [{ type: 'span' }, { type: 'span' }]
    )
  
    findElements(
      'Find elements by type component',
      { type: Foo },
      1,
      [{ type: Foo }]
    )
  
    findElements(
      'Find elements by type range string',
      { type: isOneOf('input', 'section') },
      2,
      [{ type: 'section' }, { type: 'input' }]
    )
  
    findElements(
      'Find elements by type range string',
      { type: isOneOf('input', 'section') },
      2,
      [{ type: 'section' }, { type: 'input' }]
    )
  
    findElements(
      'Find elements by type range component',
      { type: isOneOf(Foo, Bar) },
      2,
      [{ type: Foo }, { type: Bar }]
    )
  
    findElements(
      'Find elements by type exclusion',
      { type: isNot(Foo) },
      20,
      []
    )

    findElements(
      'Find elements by type range exclusion',
      { type: isNotOneOf(Foo, Bar) },
      19,
      []
    )
  })

  // describe('Find by property', () => {
  //   findElements(
  //     'Find elements by property name',
  //     {}
  //   )
  // })
})