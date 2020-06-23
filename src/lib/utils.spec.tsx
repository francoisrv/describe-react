import { utils } from '..'
import React from 'react'
import ReactTestRenderer from 'react-test-renderer'

describe('Utils', () => {
  describe('Print any', () => {
    it('should print named function', () => {
      function foo() {}
      expect(utils.printAny(foo)).toEqual('function foo')
    })
    it('should print unnamed function', () => {
      expect(utils.printAny(() => 1)).toEqual(`function () {
        return 1;
      }`)
    })
    it('should print unnamed long function', () => {
      expect(utils.printAny(() => {
        const a = 1
        const b = 2
        const c = 3
        const d = 4
        const e = 5
        const f = 6
        return { a, b, c, d, e, f }
      }))
      .toEqual(`function () {
        var a = 1;
        var b = 2;
        var c = 3;

  ... 11 other lines
}`)
    })
    it('should print named class', () => {
      class foo {}
      expect(utils.printAny(foo)).toEqual('function foo')
    })
  })

  describe('Print Type', () => {
    it('should print string type', () => {
      expect(utils.printType('div')).toEqual('div')
    })
    it('should print functional component type', () => {
      function Foo() {
        return <div />
      }
      expect(utils.printType(Foo)).toEqual('Foo')
    })
    it('should print class component type', () => {
      class Foo extends React.Component {
        render() {
          return <div />
        }
      }
      expect(utils.printType(Foo)).toEqual('Foo')
    })
  })

  describe('Get text', () => {
    it('should return null if no children', () => {
      const elem = ReactTestRenderer.create(
        <div />
      )
      const text = utils.getText(elem.root)
      expect(text).toBe(null)
    })
    it('should return null if no text children', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span />
        </div>
      )
      const text = utils.getText(elem.root)
      expect(text).toBe(null)
    })
    it('should return text', () => {
      const elem = ReactTestRenderer.create(
        <div>
          Hello
        </div>
      )
      const text = utils.getText(elem.root)
      expect(text).toBe('Hello')
    })
    it('should return text among nodes', () => {
      const elem = ReactTestRenderer.create(
        <div>
          Hello
          <span>dear</span>
          Friend
        </div>
      )
      const text = utils.getText(elem.root)
      expect(text).toBe('Hello Friend')
    })
  })
})
