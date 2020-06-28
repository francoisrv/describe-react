import getExpectations, { Story, StoryEpic } from "./getExpectations"
import React from "react"
import Expect from "../components/Expect"

interface Test {
  label: string
  ctx: React.ReactElement<any>
  length: number
  each?: Array<{
    sentence?: string
    epic?: StoryEpic
    identifier?: any
    not?: boolean
  }>
}

function makeTest(test: Test) {
  describe(test.label, () => {
    let expectations: Story[]
    beforeAll(() => {
      expectations = getExpectations(test.ctx)
    })
    it(`should have ${ test.length } expectation(s)`, () => {
      expect(expectations).toHaveLength(test.length)
    })
    if (test.each) {
      test.each.forEach((item, index) => {
        describe(`Expectation #${ index }`, () => {
          if ('sentence' in item) {
            it(`should have sentence "${ item.sentence }"`, () => {
              expect(expectations[index].toString()).toEqual(item.sentence)
            })
          }
          if ('epic' in item) {
            it(`should have epic ${ item.epic }`, () => {
              expect(expectations[index]).toHaveProperty('epic', item.epic)
            })
          }
          if ('identifier' in item) {
            it(`should have identifier ${ item.identifier }`, () => {
              expect(expectations[index]).toHaveProperty('identifier', item.identifier)
            })
          }
          if ('not' in item) {
            it(`should ${ item.not ? 'have not' : 'not have not' }`, () => {
              expect(expectations[index]).toHaveProperty('not', item.not)
            })
          }
        })
      })
    }
  })
}

describe('Get expectations', () => {
  describe('Expect type', () => {
    describe('to be', () => {
      makeTest({
        label: '<Expect to be a="span" />',
        ctx: <Expect to be a="span" />,
        length: 1,
        each: [
          {
            sentence: 'to be a "span"',
            epic: 'type',
            identifier: 'span',
            not: false
          }
        ]
      })

      makeTest({
        label: '<Expect to be an="img" />',
        ctx: <Expect to be an="img" />,
        length: 1,
        each: [
          {
            sentence: 'to be an "img"',
            epic: 'type',
            identifier: 'img',
            not: false
          }
        ]
      })
    
      makeTest({
        label: '<Expect not to be a="span" />',
        ctx: <Expect not to be a="span" />,
        length: 1,
        each: [
          {
            sentence: 'not to be a "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect to not be a="span" />',
        ctx: <Expect to not be a="span" />,
        length: 1,
        each: [
          {
            sentence: 'to not be a "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect to be not a="span" />',
        ctx: <Expect to be not a="span" />,
        length: 1,
        each: [
          {
            sentence: 'to be not a "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect NOT to be a="span" />',
        ctx: <Expect NOT to be a="span" />,
        length: 1,
        each: [
          {
            sentence: 'NOT to be a "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect to NOT be a="span" />',
        ctx: <Expect to NOT be a="span" />,
        length: 1,
        each: [
          {
            sentence: 'to NOT be a "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect to be NOT a="span" />',
        ctx: <Expect to be NOT a="span" />,
        length: 1,
        each: [
          {
            sentence: 'to be NOT a "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })
    })

    describe('to have', () => {
      makeTest({
        label: '<Expect to have type="span" />',
        ctx: <Expect to have type="span" />,
        length: 1,
        each: [
          {
            sentence: 'to have type "span"',
            epic: 'type',
            identifier: 'span',
            not: false
          }
        ]
      })

      makeTest({
        label: '<Expect not to have type="span" />',
        ctx: <Expect not to have type="span" />,
        length: 1,
        each: [
          {
            sentence: 'not to have type "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect to not have type="span" />',
        ctx: <Expect to not have type="span" />,
        length: 1,
        each: [
          {
            sentence: 'to not have type "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect to have not type="span" />',
        ctx: <Expect to have not type="span" />,
        length: 1,
        each: [
          {
            sentence: 'to have not type "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect NOT to have type="span" />',
        ctx: <Expect NOT to have type="span" />,
        length: 1,
        each: [
          {
            sentence: 'NOT to have type "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect to NOT have type="span" />',
        ctx: <Expect to NOT have type="span" />,
        length: 1,
        each: [
          {
            sentence: 'to NOT have type "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect to have NOT type="span" />',
        ctx: <Expect to have NOT type="span" />,
        length: 1,
        each: [
          {
            sentence: 'to have NOT type "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect to have type which is="span" />',
        ctx: <Expect to have type which is="span" />,
        length: 1,
        each: [
          {
            sentence: 'to have type which is "span"',
            epic: 'type',
            identifier: 'span',
            not: false
          }
        ]
      })

      makeTest({
        label: '<Expect not to have type which is="span" />',
        ctx: <Expect not to have type which is="span" />,
        length: 1,
        each: [
          {
            sentence: 'not to have type which is "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect NOT to have type which is="span" />',
        ctx: <Expect NOT to have type which is="span" />,
        length: 1,
        each: [
          {
            sentence: 'NOT to have type which is "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect to not have type which is="span" />',
        ctx: <Expect to not have type which is="span" />,
        length: 1,
        each: [
          {
            sentence: 'to not have type which is "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect to have not type which is="span" />',
        ctx: <Expect to have not type which is="span" />,
        length: 1,
        each: [
          {
            sentence: 'to have not type which is "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })

      makeTest({
        label: '<Expect to have type which is not="span" />',
        ctx: <Expect to have type which is not="span" />,
        length: 1,
        each: [
          {
            sentence: 'to have type which is not "span"',
            epic: 'type',
            identifier: 'span',
            not: true
          }
        ]
      })
    })
  })
})