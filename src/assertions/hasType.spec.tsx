import ReactTestRender from 'react-test-renderer'
import hasType from './hasType'
import React from 'react'
import DescribeReactError from '../DescribeReactError'

describe('Has type', () => {
  describe('Passing', () => {
    it('has type "div"', () => {
      hasType(
        ReactTestRender.create(
          <div />
        ).root,
        'div'
      )
    })
  })

  describe('Failing', () => {
    it('has type "div"', () => {
      let failed = false
      try {
        hasType(
          ReactTestRender.create(
            <span />
          ).root,
          'div'
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
})