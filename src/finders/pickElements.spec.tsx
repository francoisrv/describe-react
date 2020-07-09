import ReactTestRenderer, { ReactTestInstance } from 'react-test-renderer'
import React from 'react'
import pickElements from './pickElements'
import Has, { HasProps } from '../components/Has'
import { isUndefined } from 'lodash'
import { ExpectElementProps, ExpectElementsProps } from '../components/Expect'
import { printProps } from '../print'
import Is from '../components/Is'
import { predicate, getText } from '../utils'


function isType(e: any, t: any) {
  expect(e).toHaveProperty('type', t)
}

function hasId(e: any, c: any) {
  expect(e.props).toHaveProperty('id', c)
}

function hasText(e: any, t: any) {
  expect(getText(e)).toEqual(t)
}

function hasLength(e: any, l: any) {
  expect(e).toHaveLength(l)
}

function forEachElement(E: any[], ...fns: ((e: ReactTestInstance, i: number) => any)[]) {
  let i = 0
  for (const e of E) {
    for (const fn of fns) {
      fn(e, i)
    }
    i++
  }
}

interface Test {
  props: ExpectElementProps | ExpectElementsProps
  elem: React.ReactElement<any>
  fail?: React.ReactElement<any>
  verify: (e: ReactTestInstance | ReactTestInstance[]) => any
}

function makeTest(t: Test) {
  describe(printProps(t.props), () => {
    it('should work', () => {
      const { root } = ReactTestRenderer.create(t.elem)
      const picked = pickElements(root, t.props)
      t.verify(picked)
    })
    if (t.fail) {
      it('should fail', () => {
        const { root } = ReactTestRenderer.create(t.fail)
        const picked = pickElements(root, t.props)
        expect(predicate(() => t.verify(picked))).toBe(false)
      })
    }
  })
}

const ROOT = { root: true }
const ALL = { all: true }
const SOME = { some: true }
const MORE = { more: true }
const NO = { no: true }
const ELEMENT = (t?: any) => ({ element: isUndefined(t) ? true : t })
const ELEMENTS = (t?: any) => ({ elements: isUndefined(t) ? true : t })
const FIRST = (t?: any) => ({ first: isUndefined(t) ? true : t })
const LAST = (t?: any) => ({ last: isUndefined(t) ? true : t })
const NUMBER = (n: number) => ({ number: n })
const AT = (n: number | true = true ) => ({ at: n })
const EXACTLY = (n: number) => ({ exactly: n })
const THAN = (n: number) => ({ than: n })
const LEAST = (n: number) => ({ least: n })
const WHICH = (w: any) => ({ which: w })
const TYPE = (w: any) => ({ type: w })
const HAS = (p: HasProps) => <Has {...p} />
const PROP = (k: string, v?: any) => {
  const obj: any = { property: k }
  if (v) {
    obj.which = <Is exactly={ v } />
  }
  return obj
}

const tests: Test[] = [
  {
    props: { ...ELEMENT() },
    elem: <div />,
    verify: e => isType(e, 'div'),
    fail: <span><div /></span>
  },
  {
    props: { ...ROOT, ...ELEMENT() },
    elem: <div />,
    verify: e => isType(e, 'div'),
    fail: <span><div /></span>
  },
  {
    props: { ...FIRST(), ...ELEMENT() },
    elem: <div />,
    verify: e => isType(e, 'div'),
    fail: <span><div /></span>
  },
  {
    props: { ...FIRST(), ...ELEMENT(), ...WHICH(HAS(TYPE('span'))) },
    elem: <div><span>abc</span><span>def</span></div>,
    verify: e => hasText(e, 'abc'),
    fail: <div><span>def</span><span>abc</span></div>
  },
  {
    props: { ...FIRST(), ...ELEMENT('span') },
    elem: <div><span id="s1" /></div>,
    verify: e => hasId(e, 's1'),
    fail: <span id="s2"><div id="s1" /></span>
  },
  {
    props: { ...FIRST(), ...ELEMENT('span'), ...WHICH(HAS(PROP('id'))) },
    elem: <div><span>abc</span><span id="s1">def</span></div>,
    verify: e => hasText(e, 'def'),
    fail: <div><span>abc</span><span id="s1">ghu</span></div>
  },
  {
    props: { ...LAST(), ...ELEMENT() },
    elem: <div><span /></div>,
    verify: e => isType(e, 'span'),
    fail: <span><div /></span>
  },
  {
    props: { ...LAST(), ...ELEMENT('span') },
    elem: <div><span /><span>abc</span><hr /></div>,
    verify: e => hasText(e, 'abc'),
    fail: <span><div /></span>
  },
  {
    props: { ...ELEMENT(), ...NUMBER(2) },
    elem: <div><span /></div>,
    verify: e => isType(e, 'span'),
    fail: <span><div /></span>
  },
  {
    props: { ...ELEMENT(), ...AT(1) },
    elem: <div><span /></div>,
    verify: e => isType(e, 'span'),
    fail: <span><div /></span>
  },

  {
    props: { ...ELEMENTS() },
    elem: <div><div /></div>,
    verify: E => forEachElement(
      E as any[],
      e => isType(e, 'div')
    ),
    fail: <span><div /></span>
  },
  {
    props: { ...ELEMENTS('span') },
    elem: <div><span /><span /></div>,
    verify: e => hasLength(e, 2),
    fail: <span><div /></span>
  },
  {
    props: { ...ALL, ...ELEMENTS() },
    elem: <div><div /></div>,
    verify: E => forEachElement(
      E as any[],
      e => isType(e, 'div')
    ),
    fail: <span><div /></span>
  },
  {
    props: { ...ALL, ...ELEMENTS('span') },
    elem: <div><span /><span /></div>,
    verify: e => hasLength(e, 2),
    fail: <span><div /></span>
  },
  {
    props: { ...SOME, ...ELEMENTS() },
    elem: <div><span /><hr /><span /></div>,
    verify: e => hasLength(e, 4),
  },
  {
    props: { ...SOME, ...ELEMENTS('span') },
    elem: <div><span /><span /></div>,
    verify: e => hasLength(e, 2),
    fail: <ul><li /></ul>
  },
  {
    props: { ...SOME, ...ELEMENTS('span') },
    elem: <div><div /><div /></div>,
    verify: e => hasLength(e, 0),
  },
  {
    props: { ...FIRST(2), ...ELEMENTS() },
    elem: <div><span /><table /><section /></div>,
    verify: e => hasLength(e, 2),
    fail: <div />
  },
  {
    props: { ...FIRST(2), ...ELEMENTS('span') },
    elem: <div><span /><span /><span /></div>,
    verify: e => hasLength(e, 2),
    fail: <div><span /></div>
  },
  {
    props: { ...LAST(2), ...ELEMENTS() },
    elem: <div><span /><table /><section /></div>,
    verify: e => hasLength(e, 2),
    fail: <div />
  },
  {
    props: { ...LAST(2), ...ELEMENTS('span') },
    elem: <div><span /><span /><span /></div>,
    verify: e => hasLength(e, 2),
    fail: <ul><li /><li /></ul>
  },
  {
    props: { ...EXACTLY(3), ...ELEMENTS() },
    elem: <div><span /><span /></div>,
    verify: e => hasLength(e, 3),
    fail: <ul><li /><li /><li /></ul>
  },
  {
    props: { ...EXACTLY(2), ...ELEMENTS('span') },
    elem: <div><span /><span /></div>,
    verify: e => hasLength(e, 2),
    fail: <div><span /><span /><span /></div>
  },
  {
    props: { ...AT(), ...LEAST(3), ...ELEMENTS() },
    elem: <div><span /><span /></div>,
    verify: e => hasLength(e, 3),
    fail: <ul><li /></ul>
  },
  {
    props: { ...MORE, ...THAN(3), ...ELEMENTS() },
    elem: <div><span /><span /><span /></div>,
    verify: e => hasLength(e, 4),
    fail: <ul><li /><li /></ul>
  },
  {
    props: { ...NO, ...MORE, ...THAN(3), ...ELEMENTS() },
    elem: <div><span /><span /></div>,
    verify: e => hasLength(e, 3),
    fail: <ul><li /><li /><li /></ul>
  },
  {
    props: { ...MORE, ...THAN(3), ...ELEMENTS('span') },
    elem: <div><span /><span /><span /><span /></div>,
    verify: e => hasLength(e, 4),
    fail: <div><span /><span /><span /><div /></div>
  },
  {
    props: { ...NO, ...MORE, ...THAN(3), ...ELEMENTS('span') },
    elem: <div><span /><span /></div>,
    verify: e => hasLength(e, 2),
    fail: <ul><span /><span /><span /><span /></ul>
  },
]

describe('Pick elements', () => {
  tests.forEach((test, index) => {
    describe(`#${ index }`, () => {
      makeTest(test)
    })
  })
})
