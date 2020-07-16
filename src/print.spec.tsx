import { printGeneric, printType, printLabel, printProps, printIs, printSelector, printWhich, printHas } from './print'
import Is, { IsProps } from './components/Is'
import Describe from './components/Describe'
import React from 'react'
import { ExpectElementProps, ExpectElementsProps } from './components/Expect'
import { Has, Have } from '.'

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

      describe('Not', () => {
        makeTest<undefined>({
          props: { not: undefined },
          printed: 'not undefined'
        })
        makeTest<null>({
          props: { not: null },
          printed: 'not null'
        })
        makeTest<boolean>({
          props: { not: true },
          printed: 'not true'
        })
        makeTest<boolean>({
          props: { not: false },
          printed: 'not false'
        })
        makeTest<string>({
          props: { not: 'hello' },
          printed: 'not "hello"'
        })
        makeTest<number>({
          props: { not: 123 },
          printed: 'not 123'
        })
        makeTest<object>({
          props: { not: { a: 'b' } },
          printed: 'not { a: "b" }'
        })
        function fn() {}
        makeTest<Function>({
          props: { not: fn },
          printed: 'not fn'
        })
        makeTest<React.ReactElement<any>>({
          props: { not: <div id="foo" tabIndex={2} /> },
          printed: 'not <div id="foo" tabIndex={ 2 } />'
        })
        const date = new Date()
        makeTest<Date>({
          props: { not: date },
          printed: `not ${ date.toString() }`
        })
        makeTest<RegExp>({
          props: { not: /abc/ },
          printed: 'not /abc/'
        })
        makeTest<Error>({
          props: { not: new Error('foo') },
          printed: 'not Error: foo'
        })
        makeTest<any[]>({
          props: { not: [1, 'abc'] },
          printed: 'not [ 1, "abc" ]'
        })
      })

      describe('Either', () => {
        makeTest<any>({
          props: { either: [undefined, null, true, false, 1, 'abc'] },
          printed: 'either undefined or null or true or false or 1 or "abc"'
        })
      })

      describe('Neither', () => {
        makeTest<any>({
          props: { neither: [undefined, null, true, false, 1, 'abc'] },
          printed: 'neither undefined nor null nor true nor false nor 1 nor "abc"'
        })
      })

      describe('string', () => {
        makeTest<any>({
          props: { string: true },
          printed: 'a string'
        })
        makeTest<any>({
          props: { a: true, string: true },
          printed: 'a string'
        })
        makeTest<any>({
          props: { not: true, string: true },
          printed: 'not a string'
        })
        makeTest<any>({
          props: { not: true, a: true, string: true },
          printed: 'not a string'
        })
      })

      describe('number', () => {
        makeTest<any>({
          props: { number: true },
          printed: 'a number'
        })
        makeTest<any>({
          props: { a: true, number: true },
          printed: 'a number'
        })
        makeTest<any>({
          props: { not: true, number: true },
          printed: 'not a number'
        })
        makeTest<any>({
          props: { not: true, a: true, number: true },
          printed: 'not a number'
        })
      })

      describe('boolean', () => {
        makeTest<any>({
          props: { boolean: true },
          printed: 'a boolean'
        })
        makeTest<any>({
          props: { a: true, boolean: true },
          printed: 'a boolean'
        })
        makeTest<any>({
          props: { not: true, boolean: true },
          printed: 'not a boolean'
        })
        makeTest<any>({
          props: { not: true, a: true, boolean: true },
          printed: 'not a boolean'
        })
      })

      describe('array', () => {
        makeTest<any>({
          props: { array: true },
          printed: 'an array'
        })
        makeTest<any>({
          props: { an: true, array: true },
          printed: 'an array'
        })
        makeTest<any>({
          props: { not: true, array: true },
          printed: 'not an array'
        })
        makeTest<any>({
          props: { not: true, an: true, array: true },
          printed: 'not an array'
        })
      })

      describe('object', () => {
        makeTest<any>({
          props: { object: true },
          printed: 'an object'
        })
        makeTest<any>({
          props: { an: true, object: true },
          printed: 'an object'
        })
        makeTest<any>({
          props: { not: true, object: true },
          printed: 'not an object'
        })
        makeTest<any>({
          props: { not: true, an: true, object: true },
          printed: 'not an object'
        })
      })

      describe('error', () => {
        makeTest<any>({
          props: { error: true },
          printed: 'an error'
        })
        makeTest<any>({
          props: { an: true, error: true },
          printed: 'an error'
        })
        makeTest<any>({
          props: { not: true, error: true },
          printed: 'not an error'
        })
        makeTest<any>({
          props: { not: true, an: true, error: true },
          printed: 'not an error'
        })
      })

      describe('regular expression', () => {
        makeTest<any>({
          props: { regular: true, expression: true },
          printed: 'a regular expression'
        })
        makeTest<any>({
          props: { a: true, regular: true, expression: true },
          printed: 'a regular expression'
        })
        makeTest<any>({
          props: { not: true, regular: true, expression: true },
          printed: 'not a regular expression'
        })
      })

    })
  })

  describe('Print Has', () => {
    describe('Type', () => {
      it('has type span', () => {
        expect(printHas({ type: 'span' })).toEqual('type span')
      })
      it('has not type span', () => {
        expect(printHas({ not: true, type: 'span' })).toEqual('not type span')
      })
    })
    describe('Text', () => {
      it('has text', () => {
        expect(printHas({ text: true })).toEqual('text')
      })
      it('has no text', () => {
        expect(printHas({ no: true, text: true })).toEqual('no text')
      })
      it('has not text', () => {
        expect(printHas({ not: true, text: true })).toEqual('no text')
      })
    })
    describe('Property', () => {
      it('has property p', () => {
        expect(printHas({ property: 'foo' })).toEqual('property foo')
      })
    })
    describe('Children', () => {
      it('has children', () => {
        expect(printHas({ children: true })).toEqual('children')
      })
      it('has not children', () => {
        expect(printHas({ not: true, children: true })).toEqual('no children')
      })
      it('has no children', () => {
        expect(printHas({ no: true, children: true })).toEqual('no children')
      })
    })
    describe('Child', () => {
      it('has child', () => {
        expect(printHas({ child: true })).toEqual('child')
      })
      it('has not child', () => {
        expect(printHas({ not: true, child: true })).toEqual('no child')
      })
      it('has no child', () => {
        expect(printHas({ no: true, child: true })).toEqual('no child')
      })
      it('has child div', () => {
        expect(printHas({ child: 'div' })).toEqual('child div')
      })
      it('has not child div', () => {
        expect(printHas({ not: true, child: 'div' })).toEqual('no child div')
      })
      it('has no child div', () => {
        expect(printHas({ no: true, child: 'div' })).toEqual('no child div')
      })
      it('has first child', () => {
        expect(printHas({ first: true, child: true })).toEqual('first child')
      })
      it('has not first child', () => {
        expect(printHas({ not: true, first: true, child: true })).toEqual('no first child')
      })
      it('has no first child', () => {
        expect(printHas({ no: true, first: true, child: true })).toEqual('no first child')
      })
      it('has first child div', () => {
        expect(printHas({ first: true, child: 'div' })).toEqual('first child div')
      })
      it('has not first child div', () => {
        expect(printHas({ not: true, first: true, child: 'div' })).toEqual('no first child div')
      })
      it('has no first child div', () => {
        expect(printHas({ no: true, first: true, child: 'div' })).toEqual('no first child div')
      })
    })
  })

  describe('Print which', () => {
    it('should print Is', () => {
      expect(printWhich(<Is exactly="foo" />)).toEqual('is exactly "foo"')
    })
    it('should print Has', () => {
      expect(printWhich(<Has type="span" />)).toEqual('has type span')
    })
    it('should print Have', () => {
      expect(printWhich(<Have type="span" />)).toEqual('have type span')
    })
    it('should print array', () => {
      expect(printWhich([<Has type="span" />, <Is exactly="foo" />]))
      .toEqual('has type span and is exactly "foo"')
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
      {
        props: { element: true, which: <Has type="span" /> },
        string: 'element which has type span'
      },
    ]

    for (const t of tests) {
      makeTest(t)
    }
  })
})
