import { printGeneric, printType, printLabel, printProps, printIs, printSelector } from './print'
import Is, { IsProps } from './components/Is'
import Describe from './components/Describe'
import React from 'react'
import { ExpectElementProps, ExpectElementsProps } from './components/Expect'

describe('Common printers', () => {
  describe('Print generic', () => {
    it('should print number', () => {
      expect(printGeneric(24)).toEqual('24')
    })
    it('should print number in array', () => {
      expect(printGeneric([24])).toEqual('[ 24 ]')
    })
    it('should print named function', () => {
      expect(printGeneric(encodeURIComponent))
      .toEqual('encodeURIComponent')
    })
  })

  describe('Print type', () => {
    it('should print string', () => {
      expect(printType('div')).toEqual('div')
    })
    it('should print function', () => {
      expect(printType(Is)).toEqual('Is')
    })
  })

  describe('Print label', () => {
    interface PrintLabelTest {
      props: any
      label: string
    }

    function makeTest(t: PrintLabelTest) {
      it(`${ printGeneric(t.props) } >> ${ t.label }`, () => {
        expect(printLabel(t.props)).toEqual(t.label)
      })
    }

    const tests: PrintLabelTest[] = [
      {
        props: { element: true },
        label: 'element'
      },
      {
        props: { root: true, element: true },
        label: 'root element'
      },
      {
        props: {element: 'span' },
        label: 'element span'
      },
      {
        props: {element: Describe },
        label: 'element Describe'
      },
      {
        props: { element: true, which: <Is exactly="span" /> },
        label: 'element which is exactly "span"'
      },
    ]

    for (const t of tests) {
      makeTest(t)
    }
  })

  describe('Print is', () => {
    interface IsTest<T> {
      props: IsProps<T>
      printed: string
    }

    function makeTest<T>(t: IsTest<T>) {
      it(`${ printProps(t.props) } >> ${ t.printed }`, () => {
        expect(printIs<T>(t.props)).toEqual(t.printed)
      })
    }

    describe('Equality', () => {
      describe('Exactly', () => {
        makeTest<undefined>({
          props: { exactly: undefined },
          printed: 'exactly undefined'
        })
        makeTest<null>({
          props: { exactly: null },
          printed: 'exactly null'
        })
        makeTest<boolean>({
          props: { exactly: true },
          printed: 'exactly true'
        })
        makeTest<boolean>({
          props: { exactly: false },
          printed: 'exactly false'
        })
        makeTest<string>({
          props: { exactly: 'hello' },
          printed: 'exactly "hello"'
        })
        makeTest<number>({
          props: { exactly: 123 },
          printed: 'exactly 123'
        })
        makeTest<object>({
          props: { exactly: { a: 'b' } },
          printed: 'exactly { a: "b" }'
        })
        function fn() {}
        makeTest<Function>({
          props: { exactly: fn },
          printed: 'exactly fn'
        })
        makeTest<React.ReactElement<any>>({
          props: { exactly: <div id="foo" tabIndex={2} /> },
          printed: 'exactly <div id="foo" tabIndex={ 2 } />'
        })
        const date = new Date()
        makeTest<Date>({
          props: { exactly: date },
          printed: `exactly ${ date.toString() }`
        })
        makeTest<RegExp>({
          props: { exactly: /abc/ },
          printed: 'exactly /abc/'
        })
        makeTest<Error>({
          props: { exactly: new Error('foo') },
          printed: 'exactly Error: foo'
        })
        makeTest<any[]>({
          props: { exactly: [1, 'abc'] },
          printed: 'exactly [ 1, "abc" ]'
        })
      })
    })
  })

  describe('Print selectors', () => {
    interface SelectorTest {
      props: ExpectElementProps | ExpectElementsProps
      string: string
    }

    function makeTest(t: SelectorTest) {
      it(t.string, () => {
        expect(printSelector(t.props)).toEqual(t.string)
      })
    }

    const tests: SelectorTest[] = [
      {
        props: { element: true },
        string: 'element'
      },
      {
        props: { element: 'span' },
        string: 'element span'
      },
      {
        props: { element: Describe },
        string: 'element Describe'
      },
      {
        props: { root: true, element: true },
        string: 'root element'
      },
      {
        props: { first: true, element: true },
        string: 'first element'
      },
      {
        props: { last: true, element: true },
        string: 'last element'
      },
      {
        props: { element: true, number: 2 },
        string: 'element number 2'
      },
      {
        props: { element: true, at: 2 },
        string: 'element number 3'
      },
      {
        props: { elements: true },
        string: 'elements'
      },
      {
        props: { exactly: 5, elements: true },
        string: 'exactly 5 elements'
      },
      {
        props: { less: true, than: 5, elements: true },
        string: 'less than 5 elements'
      },
      {
        props: { at: true, least: 5, elements: true },
        string: 'at least 5 elements'
      },
      {
        props: { more: true, than: 5, elements: true },
        string: 'more than 5 elements'
      },
      {
        props: { no: true, more: true, than: 5, elements: true },
        string: 'no more than 5 elements'
      },
      {
        props: { between: 5, and: 10, elements: true },
        string: 'between 5 and 10 elements'
      },
      {
        props: { first: 10, elements: true },
        string: 'first 10 elements'
      },
      {
        props: { last: 10, elements: true },
        string: 'last 10 elements'
      },
    ]

    for (const t of tests) {
      makeTest(t)
    }
  })
})
