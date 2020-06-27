import ReactTestRender from 'react-test-renderer'
import hasType from './hasType'
import React from 'react'
import DescribeReactError from '../DescribeReactError'
import { Is } from '../components/Is'
import { TypeIdentifier } from '../types'
import { printElement } from '../print/common'

function makeTest(
  label: string,
  elem: React.ReactElement<any>,
  ok: TypeIdentifier,
  ko: any
) {
  describe(`${ printElement(elem) } | ${ label }`, () => {
    it('should pass', () => {
      hasType(
        ReactTestRender.create(elem).root,
        ok
      )
    })
    it('should fail', () => {
      let failed = false
      try {
        hasType(
          ReactTestRender.create(elem).root,
          ko
        )
      } catch (error) {
        if (!(error instanceof DescribeReactError)) {
          console.log(error)
          throw new Error(`Was expecting a DescribeReactError but instead got ${ error.name }`)
        } 
        failed = true
      }
      expect(failed).toBe(true)
    })
  })
}

const isTrue = () => true
const isFalse = () => false
const isValid = () => {}
const isNotValid = () => { throw new Error('!') }

describe('Has type', () => {
  makeTest(
    '"div"',
    <div />,
    'div',
    'span'
  )

  makeTest(
    'Is',
    <Is />,
    Is,
    'span'
  )

  makeTest(
    '<Is one of={[ "span", "div" ]} />',
    <div />,
    <Is one of={[ 'span', 'div' ]} />,
    <Is one of={[ 'span', 'table' ]} />,
  )

  makeTest(
    '<Is not one of={[ "span", "div" ]} />',
    <div />,
    <Is not one of={[ 'span', 'table' ]} />,
    <Is not one of={[ 'span', 'div' ]} />,
  )

  makeTest(
    '<Is true={ isTrue } />',
    <div />,
    <Is true={ isTrue } />,
    <Is true={ isFalse } />,
  )

  makeTest(
    '<Is not true={ isFalse } />',
    <div />,
    <Is not true={ isFalse } />,
    <Is not true={ isTrue } />,
  )

  makeTest(
    '<Is valid={ isValid } />',
    <div />,
    <Is valid={ isValid } />,
    <Is valid={ isNotValid } />
  )

  makeTest(
    '<Is not valid={ isNotValid } />',
    <div />,
    <Is not valid={ isNotValid } />,
    <Is not valid={ isValid } />
  )
})
