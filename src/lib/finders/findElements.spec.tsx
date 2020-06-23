import ReactTestRenderer from 'react-test-renderer'
import React from 'react'
import { TypeDescriber, ElementsObjectDescriber, SelectedElement, utils, isOneOf, isNot, isNotOneOf } from '../..'
import findElements from './findElements'
import labelType from '../labelers/type'

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
      <span className="foo">Hello</span>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li><Foo /></li>
        <li>
          <table>
            <tbody>
              <tr>
                <td className="foo">A</td>
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

function findElementsSpec(
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
      found = findElements(describer, elem)
    })
    it(`should have found ${ length } element(s)`, () => {
      expect(found).toHaveLength(length)
    })
    specs.forEach((spec, index) => {
      describe(`${ utils.getNumberWithOrdinal(index + 1) } element`, () => {
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
      21,
      []
    )
  })

  describe('Find by type', () => {
    findElementsSpec(
      'Find elements by type string',
      { type: 'span' },
      2,
      [{ type: 'span' }, { type: 'span' }]
    )
  
    findElementsSpec(
      'Find elements by type component',
      { type: Foo },
      1,
      [{ type: Foo }]
    )
  
    findElementsSpec(
      'Find elements by type range string',
      { type: isOneOf('input', 'section') },
      2,
      [{ type: 'section' }, { type: 'input' }]
    )
  
    findElementsSpec(
      'Find elements by type range string',
      { type: isOneOf('input', 'section') },
      2,
      [{ type: 'section' }, { type: 'input' }]
    )
  
    findElementsSpec(
      'Find elements by type range component',
      { type: isOneOf(Foo, Bar) },
      2,
      [{ type: Foo }, { type: Bar }]
    )
  
    findElementsSpec(
      'Find elements by type exclusion',
      { type: isNot(Foo) },
      20,
      []
    )

    findElementsSpec(
      'Find elements by type range exclusion',
      { type: isNotOneOf(Foo, Bar) },
      19,
      []
    )
  })

  describe('Find by property', () => {
    findElementsSpec(
      'Find elements by property name',
      { property: { name: 'className', value: 'foo' } },
      2,
      []
    )
  })

  describe('Find by text', () => {
    findElementsSpec(
      'Find elements by property name',
      { text: 'Hello' },
      1,
      []
    )
  })
})