import ReactTestRenderer from 'react-test-renderer'
import React from 'react'
import { findElements, getText, findNodesWithText, hasProperty, ExpectProperty } from './utils'

describe('Utils', () => {
  describe('Get text', () => {
    it('should return null if no children', () => {
      const elem = ReactTestRenderer.create(
        <div />
      )
      const text = getText(elem.root)
      expect(text).toBe(null)
    })
    it('should return null if no text children', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span />
        </div>
      )
      const text = getText(elem.root)
      expect(text).toBe(null)
    })
    it('should return text', () => {
      const elem = ReactTestRenderer.create(
        <div>
          Hello
        </div>
      )
      const text = getText(elem.root)
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
      const text = getText(elem.root)
      expect(text).toBe('Hello Friend')
    })
  })
  describe('Find nodes with text', () => {
    it('should find direct descendants with text', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span>Hello</span>
          <h1>Bye</h1>
          <h2>Hello</h2>
        </div>
      )
      const nodes = findNodesWithText('Hello', elem.root.children)
      
      expect(nodes).toHaveLength(2)
      expect(nodes[0]).toHaveProperty('type', 'span')
      expect(nodes[1]).toHaveProperty('type', 'h2')
    })
    it('should find deep descendants with text', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span>Hello</span>
          <h1>Bye</h1>
          <section>
            <h2>Hello</h2>
          </section>
        </div>
      )
      const nodes = findNodesWithText('Hello', elem.root.children, true)
      expect(nodes).toHaveLength(2)
      expect(nodes[0]).toHaveProperty('type', 'span')
      expect(nodes[1]).toHaveProperty('type', 'h2')
    })
    it('should find direct descendants with regex', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span>kwnjowe</span>
          <h1>Bye</h1>
          <h2>jdjdkjekjow</h2>
        </div>
      )
      const nodes = findNodesWithText(/jow/, elem.root.children)
      
      expect(nodes).toHaveLength(2)
      expect(nodes[0]).toHaveProperty('type', 'span')
      expect(nodes[1]).toHaveProperty('type', 'h2')
    })
    it('should find deep descendants with regex', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span>kwnjowe</span>
          <h1>Bye</h1>
          <section>
            <h2>jdjdkjekjow</h2>
          </section>
        </div>
      )
      const nodes = findNodesWithText(/jow/, elem.root.children, true)
      expect(nodes).toHaveLength(2)
      expect(nodes[0]).toHaveProperty('type', 'span')
      expect(nodes[1]).toHaveProperty('type', 'h2')
    })
  })
  describe('Find Elements', () => {
    it('should return root children if empty props', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span>Hello</span>
          <input />
        </div>
      )
      const found = findElements(
        {},
        elem.root
      )
      expect(found).toHaveLength(2)
      expect(found[0]).toHaveProperty('type', 'span')
      expect(found[1]).toHaveProperty('type', 'input')
    })
    it('should return children matching type', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span>Hello</span>
          <div>
            <input />
          </div>
        </div>
      )
      const found = findElements(
        { type: 'input' },
        elem.root
      )
      expect(found).toHaveLength(1)
      expect(found[0]).toHaveProperty('type', 'input')
    })
    it('should return children matching props', () => {
      const elem = ReactTestRenderer.create(
        <ul>
          <li className="li">1</li>
          <li className="li">2</li>
          <li>3</li>
        </ul>
      )
      const found = findElements(
        { props: { className: 'li' } },
        elem.root
      )
      expect(found).toHaveLength(2)
    })
    it('should return children matching parent', () => {
      const elem = ReactTestRenderer.create(
        <table>
          <tbody>
            <tr>
              <td>1</td>
            </tr>
            <tr>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      )
      const found = findElements(
        { parent: 'tr' },
        elem.root
      )
      expect(found).toHaveLength(2)
      expect(found[0]).toHaveProperty('type', 'td')
      expect(found[1]).toHaveProperty('type', 'td')
    })
    it('should return children matching text', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <h1>h1</h1>
          <h2>h2</h2>
          <h3>h3</h3>
          <div>
            <h4>h2</h4>
          </div>
        </div>
      )
      const found = findElements(
        { text: 'h2' },
        elem.root
      )
      expect(found).toHaveLength(2)
      expect(found[0]).toHaveProperty('type', 'h2')
      expect(found[1]).toHaveProperty('type', 'h4')
    })
    it('should return children matching regex', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <h1>h1</h1>
          <h2>h2</h2>
          <h3>h3</h3>
          <div>
            <h4>h2</h4>
          </div>
        </div>
      )
      const found = findElements(
        { text: /h2/ },
        elem.root
      )
      expect(found).toHaveLength(2)
      expect(found[0]).toHaveProperty('type', 'h2')
      expect(found[1]).toHaveProperty('type', 'h4')
    })
    it('should return apply filters', () => {
      const elem = ReactTestRenderer.create(
        <table>
          <tbody>
            <tr>
              <td>1</td>
              <td colSpan={ 2 }>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>4</td>
              <td colSpan={ 2 }>5</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      )
      const found = findElements(
        { parent: 'tr', props: { colSpan: 2 } },
        elem.root
      )
      expect(found).toHaveLength(2)
      expect(found[0]).toHaveProperty('type', 'td')
      expect(found[1]).toHaveProperty('type', 'td')
    })
  })
  describe('Has Property', () => {
    it('should find by string', () => {
      const elem = ReactTestRenderer.create(
        <div id="foo" />
      )
      expect(hasProperty(elem.root, 'id')).toBe(true)
    })
    it('should find by strings', () => {
      const elem = ReactTestRenderer.create(
        <div id="foo" className="bar" />
      )
      expect(hasProperty(elem.root, ['id', 'className'])).toBe(true)
    })
    it('should find by regex', () => {
      const elem = ReactTestRenderer.create(
        <div id="foo" className="bar" />
      )
      expect(hasProperty(elem.root, /class/)).toBe(true)
    })
    it('should find by strings or regex', () => {
      const elem = ReactTestRenderer.create(
        <div id="foo" className="bar" />
      )
      expect(hasProperty(elem.root, ['id', /class/])).toBe(true)
    })
    it('should find by object', () => {
      function foo() {

      }
      const elem = ReactTestRenderer.create(
        <div id="foo" className="bar" onClick={ foo } tabIndex={ 7 } title="hello" />
      )
      expect(hasProperty(elem.root, {
        id: new ExpectProperty(/foo/),
        className: 'bar',
        onClick: foo,
        title: new ExpectProperty((v, props) => v !== 'goodbye' && props.tabIndex > 5)
      })).toBe(true)
    })
  })
})