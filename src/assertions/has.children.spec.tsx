import Has, { HasChildrenProps } from '../components/Has'
import React from 'react'
import { printElement, printHas } from '../print'
import { predicate } from '../utils'
import { create, ReactTestInstance } from 'react-test-renderer'
import hasChildren from './has.children'
import Have from '../components/Have'
import { Dictionary, isString, keys, isObject } from 'lodash'

const T = true

type Tree = [string | Dictionary<any>, ...(Tree | string)[]]

type Prop = string | Dictionary<any>

function makeProps(from: Prop[]): HasChildrenProps {
  const props = {}
  for (const item of from) {
    if (isString(item)) {
      props[item] = true
    } else {
      const [key] = keys(item)
      props[key] = item[key]
    }
  }
  return props as HasChildrenProps
}

function makeTree(tree: Tree, index = -1): React.ReactElement {
  const elem = tree.shift()
  let name = ''
  const props = { key: index }
  if (isString(elem)) {
    name = elem
  }
  const children = tree.map((child, childIndex) => {
    if (isString(child)) {
      return child
    }
    // @ts-ignore
    return makeTree(child, childIndex)
  })
  const parent = React.createElement(name, props, children)
  return parent
}

describe('Has children', () => {
  interface Test {
    true: Tree
    false: Tree
    has: Prop[]
  }

  function makeTest(t: Test) {
    const props = makeProps(t.has)

    describe(`has ${printHas(props)}`, () => {
      it('should pass', () => {
        const { root } = create(makeTree(t.true))
        hasChildren(root, props)
      })

      it('should fail', () => {
        const { root } = create(makeTree(t.false))
        expect(predicate(() => hasChildren(root, props))).toBe(false)
      })
    })
  }

  describe('Children', () => {
    describe('Has children or not', () => {
      makeTest({
        has: ['children'],
        true: ['div', ['span']],
        false: ['div'],
      })
      makeTest({
        has: ['children'],
        true: ['div', 'hello'],
        false: ['div'],
      })
      makeTest({
        has: ['no', 'children'],
        true: ['div'],
        false: ['div', ['span']],
      })
    })

    describe('Has type', () => {
      makeTest({
        has: [{ children: 'span' }],
        true: ['div', ['span']],
        false: ['div', ['div']],
      })
      makeTest({
        has: ['children', { which: <Have type="span" /> }],
        true: ['div', ['span']],
        false: ['div', ['div']],
      })
    })

    describe('has length', () => {
      describe('Exactly', () => {
        makeTest({
          has: [{ exactly: 3 }, 'children'],
          true: ['div', ['span'], ['span'], ['span']],
          false: ['div', ['span'], ['span']],
        })

        makeTest({
          has: [{ exactly: 3 }, 'children', { which: <Have type="span" /> }],
          true: ['div', ['span'], ['span'], ['span']],
          false: ['div', ['span'], ['span']],
        })

        makeTest({
          has: [{ exactly: 3 }, { children: 'span' }],
          true: ['div', ['span'], ['span'], ['span']],
          false: ['div', ['span'], ['span'], ['div']],
        })

        makeTest({
          has: ['not', { exactly: 3 }, 'children'],
          true: ['div', ['span'], ['span']],
          false: ['div', ['span'], ['span'], ['span']],
        })

        makeTest({
          has: [
            'not',
            { exactly: 3 },
            'children',
            { which: <Have type="span" /> },
          ],
          true: ['div', ['span'], ['span'], ['div']],
          false: ['div', ['span'], ['span'], ['span']],
        })

        makeTest({
          has: ['not', { exactly: 3 }, { children: 'span' }],
          true: ['div', ['span'], ['span'], ['span'], ['span']],
          false: ['div', ['span'], ['span'], ['span']],
        })

        makeTest({
          has: [
            'not',
            { exactly: 3 },
            'children',
            { which: <Have type="span" /> },
          ],
          true: ['div', ['span'], ['span'], ['span'], ['span']],
          false: ['div', ['span'], ['span'], ['span']],
        })
      })

      describe('At least', () => {
        makeTest({
          has: ['at', { least: 2 }, 'children'],
          true: ['div', ['span'], ['span']],
          false: ['div', ['span']],
        })

        makeTest({
          has: ['at', { least: 2 }, { children: 'span' }],
          true: ['div', ['span'], ['span'], ['div']],
          false: ['div', ['span'], ['div']],
        })

        makeTest({
          has: [
            'at',
            { least: 2 },
            'children',
            { which: <Have type="span" /> },
          ],
          true: ['div', ['span'], ['span'], ['div']],
          false: ['div', ['span'], ['div']],
        })
      })

      describe('More', () => {
        makeTest({
          has: ['more', { than: 2 }, 'children'],
          true: ['div', ['span'], ['span'], ['span']],
          false: ['div', ['span'], ['span']],
        })

        makeTest({
          has: ['more', { than: 2 }, { children: 'span' }],
          true: ['div', ['span'], ['span'], ['span']],
          false: ['div', ['span'], ['span']],
        })

        makeTest({
          has: [
            'more',
            { than: 2 },
            'children',
            { which: <Have type="span" /> },
          ],
          true: ['div', ['span'], ['span'], ['span']],
          false: ['div', ['span'], ['span']],
        })
      })

      describe('No more', () => {
        makeTest({
          has: ['no', 'more', { than: 2 }, 'children'],
          true: ['div', ['span'], ['span']],
          false: ['div', ['span'], ['span'], ['span']],
        })

        makeTest({
          has: ['no', 'more', { than: 2 }, { children: 'span' }],
          true: ['div', ['span'], ['span']],
          false: ['div', ['span'], ['span'], ['span']],
        })

        makeTest({
          has: [
            'no',
            'more',
            { than: 2 },
            'children',
            { which: <Have type="span" /> },
          ],
          true: ['div', ['span'], ['span']],
          false: ['div', ['span'], ['span'], ['span']],
        })
      })

      describe('Between', () => {
        makeTest({
          has: [{ between: 2 }, { and: 4 }, 'children'],
          true: ['div', ['span'], ['span'], ['span'], ['span']],
          false: ['div', ['span']],
        })

        makeTest({
          has: [{ between: 2 }, { and: 4 }, { children: 'span' }],
          true: ['div', ['span'], ['span'], ['span'], ['span'], ['div']],
          false: ['div', ['span'], ['div']],
        })

        makeTest({
          has: [
            { between: 2 },
            { and: 4 },
            'children',
            { which: <Have type="span" /> },
          ],
          true: ['div', ['span'], ['span'], ['span'], ['span'], ['div']],
          false: ['div', ['span'], ['div']],
        })
      })
    })

    describe('Slice', () => {
      describe('First', () => {
        makeTest({
          has: [{ first: 2 }, 'children'],
          true: ['div', ['span'], ['span'], ['span']],
          false: ['div', ['span']],
        })

        makeTest({
          has: [{ first: 2 }, { children: 'span' }],
          true: ['div', ['span'], ['div'], ['span']],
          false: ['div', ['span']],
        })

        makeTest({
          has: [{ first: 2 }, 'children', { which: <Have type="span" /> }],
          true: ['div', ['span'], ['div'], ['span']],
          false: ['div', ['span']],
        })

        makeTest({
          has: [
            'not',
            { first: 2 },
            'children',
            { which: <Have type="span" /> },
          ],
          true: ['div', ['span'], ['div'], ['span']],
          false: ['div', ['span']],
        })
      })

      describe('Last', () => {
        makeTest({
          has: [{ last: 2 }, 'children'],
          true: ['div', ['span'], ['span'], ['span']],
          false: ['div', ['span']],
        })

        makeTest({
          has: [{ last: 2 }, { children: 'span' }],
          true: ['div', ['span'], ['div'], ['span']],
          false: ['div', ['span']],
        })

        makeTest({
          has: [{ last: 2 }, 'children', { which: <Have type="span" /> }],
          true: ['div', ['span'], ['div'], ['span']],
          false: ['div', ['span']],
        })
      })
    })
  })

  describe('Child', () => {
    describe('Existence', () => {
      makeTest({
        has: ['child'],
        true: ['div', ['span']],
        false: ['div'],
      })

      makeTest({
        has: ['no', 'child'],
        true: ['div'],
        false: ['div', ['span']],
      })
    })

    describe('Type', () => {
      makeTest({
        has: [{ child: 'span' }],
        true: ['div', ['span']],
        false: ['div', ['p']],
      })

      makeTest({
        has: ['child', { which: <Has type="span" /> }],
        true: ['div', ['span']],
        false: ['div', ['p']],
      })

      makeTest({
        has: ['no', { child: 'span' }],
        true: ['div', ['p']],
        false: ['div', ['span']],
      })

      makeTest({
        has: ['no', 'child', { which: <Has type="span" /> }],
        true: ['div', ['p']],
        false: ['div', ['span']],
      })
    })

    describe('Position', () => {
      describe('First', () => {
        makeTest({
          has: ['first', 'child'],
          true: ['div', ['p']],
          false: ['div'],
        })

        makeTest({
          has: ['no', 'first', 'child'],
          true: ['div'],
          false: ['div', ['p']],
        })

        makeTest({
          has: ['first', { child: 'p' }],
          true: ['div', ['p'], ['span']],
          false: ['div', ['span']],
        })
      })

      describe('Number', () => {
        makeTest({
          has: ['child', { number: 1 }],
          true: ['div', ['span']],
          false: ['div'],
        })

        makeTest({
          has: ['child', { number: 2 }],
          true: ['div', ['span'], ['p']],
          false: ['div', ['p']],
        })
      })
    })
  })

  const tests: Test[] = [
    // {
    //   elem: create(
    //     <div>
    //       <span />
    //     </div>
    //   ).root,
    //   props: { first: T, child: T },
    //   expected: true,
    // },
    // {
    //   elem: create(<div />).root,
    //   props: { first: T, child: T },
    //   expected: false,
    // },
    // {
    //   elem: create(<div />).root,
    //   props: { not: T, first: T, child: T },
    //   expected: true,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <span />
    //     </div>
    //   ).root,
    //   props: { not: T, first: T, child: T },
    //   expected: false,
    // },
    // {
    //   elem: create(<div />).root,
    //   props: { no: T, first: T, child: T },
    //   expected: true,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <span />
    //     </div>
    //   ).root,
    //   props: { no: T, first: T, child: T },
    //   expected: false,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <span />
    //     </div>
    //   ).root,
    //   props: { first: T, child: 'span' },
    //   expected: true,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <hr />
    //     </div>
    //   ).root,
    //   props: { first: T, child: 'span' },
    //   expected: false,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <hr />
    //     </div>
    //   ).root,
    //   props: { not: T, first: T, child: 'span' },
    //   expected: true,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <span />
    //     </div>
    //   ).root,
    //   props: { not: T, first: T, child: 'span' },
    //   expected: false,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <hr />
    //     </div>
    //   ).root,
    //   props: { no: T, first: T, child: 'span' },
    //   expected: true,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <span />
    //     </div>
    //   ).root,
    //   props: { no: T, first: T, child: 'span' },
    //   expected: false,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <span />
    //     </div>
    //   ).root,
    //   props: { last: T, child: T },
    //   expected: true,
    // },
    // {
    //   elem: create(<div />).root,
    //   props: { last: T, child: T },
    //   expected: false,
    // },
    // {
    //   elem: create(<div />).root,
    //   props: { not: T, last: T, child: T },
    //   expected: true,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <span />
    //     </div>
    //   ).root,
    //   props: { not: T, last: T, child: T },
    //   expected: false,
    // },
    // {
    //   elem: create(<div />).root,
    //   props: { no: T, last: T, child: T },
    //   expected: true,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <span />
    //     </div>
    //   ).root,
    //   props: { no: T, last: T, child: T },
    //   expected: false,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <hr />
    //       <span />
    //     </div>
    //   ).root,
    //   props: { last: T, child: 'span' },
    //   expected: true,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <hr />
    //     </div>
    //   ).root,
    //   props: { last: T, child: 'span' },
    //   expected: false,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <hr />
    //     </div>
    //   ).root,
    //   props: { not: T, last: T, child: 'span' },
    //   expected: true,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <span />
    //     </div>
    //   ).root,
    //   props: { not: T, last: T, child: 'span' },
    //   expected: false,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <hr />
    //     </div>
    //   ).root,
    //   props: { no: T, last: T, child: 'span' },
    //   expected: true,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <span />
    //     </div>
    //   ).root,
    //   props: { no: T, last: T, child: 'span' },
    //   expected: false,
    // },
    // {
    //   elem: create(
    //     <div>
    //       <span />
    //       <div />
    //       <span />
    //       <span />
    //       <span />
    //     </div>
    //   ).root,
    //   props: { all: T, children: T, except: 1, which: <Have type="span" /> },
    //   expected: false,
    // },
  ]
})
