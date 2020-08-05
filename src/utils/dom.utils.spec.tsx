import { create, ReactTestInstance } from 'react-test-renderer'
import React from 'react'
import { pickChildByNumber } from './dom.utils'

describe('DOM utils', () => {
  describe('Pick child by number', () => {
    it('should pick child by number', () => {
      const { root } = create(
        <div>
          <span />
          <p />
          <div />
        </div>
      )
      const nodes = root.children
      const result1 = pickChildByNumber(1)(nodes as ReactTestInstance[])
      const result2 = pickChildByNumber(2)(nodes as ReactTestInstance[])
      const result3 = pickChildByNumber(3)(nodes as ReactTestInstance[])
      expect(result1[0].type).toEqual('span')
      expect(result2[0].type).toEqual('p')
      expect(result3[0].type).toEqual('div')
    })
  })
})
