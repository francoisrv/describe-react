import { printGeneric, printType, printLabel } from './print'
import Is from './components/Is'
import Describe from './components/Describe'
import React from 'react'

describe('Common printers', () => {
  describe('Print generic', () => {
    it('should print number', () => {
      expect(printGeneric(24)).toEqual('24')
    })
    it('should print number in array', () => {
      expect(printGeneric([24])).toEqual('[24]')
    })
    it('should print named function', () => {
      expect(printGeneric(encodeURIComponent))
      .toEqual('encodeURIComponent')
    })
  })

  describe('Print type', () => {
    it('should print string', () => {
      expect(printType('div')).toEqual('"div"')
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
})
