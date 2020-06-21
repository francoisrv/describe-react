import ReactTestRenderer from 'react-test-renderer'
import React from 'react'
import { findElements, getText, findNodesWithText, hasProperty, ExpectProperty, findElement } from './utils'

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
  describe('Find Element', () => {
    it('should return root first children if empty props', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span>Hello</span>
          <input />
        </div>
      )
      const found = findElement(
        {},
        elem.root
      )
      expect(found).toHaveProperty('type', 'span')
    })
    it('should return root last children if empty props', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span>Hello</span>
          <input />
        </div>
      )
      const found = findElement(
        { last: true },
        elem.root
      )
      expect(found).toHaveProperty('type', 'input')
    })
    it('should return root positioned children if empty props', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span>Hello</span>
          <input />
        </div>
      )
      const found = findElement(
        { at: 1 },
        elem.root
      )
      expect(found).toHaveProperty('type', 'input')
    })
    it('should return first children matching type', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span>Hello</span>
          <div>
            <input />
          </div>
        </div>
      )
      const found = findElement(
        { type: 'input' },
        elem.root
      )
      expect(found).toHaveProperty('type', 'input')
    })
    it('should return last children matching type', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span>Hello</span>
          <div>
            <input />
            <span className="foo">hey</span>
          </div>
        </div>
      )
      const found = findElement(
        { type: 'span', last: true },
        elem.root
      )
      expect(found.props).toHaveProperty('className', 'foo')
    })
    it('should return positioned children matching type', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span>Hello</span>
          <div>
            <input />
            <span className="foo">hey</span>
          </div>
        </div>
      )
      const found = findElement(
        { type: 'span', at: 1 },
        elem.root
      )
      expect(found.props).toHaveProperty('className', 'foo')
    })
    it('should return first children matching props', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span className="li">1</span>
          <h1 className="li">2</h1>
          <h2>3</h2>
        </div>
      )
      const found = findElement(
        { props: { className: 'li' } },
        elem.root
      )
      expect(found).toHaveProperty('type', 'span')
    })
    it('should return last children matching props', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span className="li">1</span>
          <h1 className="li" id="foo">2</h1>
          <h2>3</h2>
        </div>
      )
      const found = findElement(
        { props: { className: 'li' }, last: true },
        elem.root
      )
      expect(found).toHaveProperty('type', 'h1')
    })
    it('should return positioned children matching props', () => {
      const elem = ReactTestRenderer.create(
        <div>
          <span className="li">1</span>
          <h1 className="li" id="foo">2</h1>
          <h2>3</h2>
        </div>
      )
      const found = findElement(
        { props: { className: 'li' }, at: 1 },
        elem.root
      )
      expect(found).toHaveProperty('type', 'h1')
    })
    it('should return first children matching parent', () => {
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
      const found = findElement(
        { parent: 'tr' },
        elem.root
      )
      expect(found).toHaveProperty('type', 'td')
    })
    it('should return last children matching parent', () => {
      const elem = ReactTestRenderer.create(
        <table>
          <tbody>
            <tr>
              <td>1</td>
              <td id="foo">2</td>
            </tr>
          </tbody>
        </table>
      )
      const found = findElement(
        { parent: 'tr', last: true },
        elem.root
      )
      expect(found).toHaveProperty('type', 'td')
      expect(found.props).toHaveProperty('id', 'foo')
    })
    it('should return positioned children matching parent', () => {
      const elem = ReactTestRenderer.create(
        <table>
          <tbody>
            <tr>
              <td>1</td>
              <td id="foo">2</td>
            </tr>
          </tbody>
        </table>
      )
      const found = findElement(
        { parent: 'tr', at: 1 },
        elem.root
      )
      expect(found).toHaveProperty('type', 'td')
      expect(found.props).toHaveProperty('id', 'foo')
    })
    it('should return first children matching text', () => {
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
      const found = findElement(
        { text: 'h2' },
        elem.root
      )
      expect(found).toHaveProperty('type', 'h2')
    })
    it('should return last children matching text', () => {
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
      const found = findElement(
        { text: 'h2', last: true },
        elem.root
      )
      expect(found).toHaveProperty('type', 'h4')
    })
    it('should return positioned children matching text', () => {
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
      const found = findElement(
        { text: 'h2', at: 1 },
        elem.root
      )
      expect(found).toHaveProperty('type', 'h4')
    })
    it('should return first children matching regex', () => {
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
      const found = findElement(
        { text: /h2/ },
        elem.root
      )
      expect(found).toHaveProperty('type', 'h2')
    })
    it('should return last children matching regex', () => {
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
      const found = findElement(
        { text: /h2/, last: true },
        elem.root
      )
      expect(found).toHaveProperty('type', 'h4')
    })
    it('should return positioned children matching regex', () => {
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
      const found = findElement(
        { text: /h2/, at: 1 },
        elem.root
      )
      expect(found).toHaveProperty('type', 'h4')
    })
    it('should return first child apply filters', () => {
      const elem = ReactTestRenderer.create(
        <table>
          <tbody>
            <tr>
              <td>1</td>
              <td colSpan={ 2 } id="f0">2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>4</td>
              <td colSpan={ 2 } id="f1">5</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      )
      const found = findElement(
        { parent: 'tr', props: { colSpan: 2 } },
        elem.root
      )
      expect(found.props).toHaveProperty('id', 'f0')
    })
    it('should return last child apply filters', () => {
      const elem = ReactTestRenderer.create(
        <table>
          <tbody>
            <tr>
              <td>1</td>
              <td colSpan={ 2 } id="f0">2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>4</td>
              <td colSpan={ 2 } id="f1">5</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      )
      const found = findElement(
        { parent: 'tr', props: { colSpan: 2 }, last: true },
        elem.root
      ) as ReactTestRenderer.ReactTestInstance
      expect(found.props).toHaveProperty('id', 'f1')
    })
    it('should return positioned child apply filters', () => {
      const elem = ReactTestRenderer.create(
        <table>
          <tbody>
            <tr>
              <td>1</td>
              <td colSpan={ 2 } id="f0">2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>4</td>
              <td colSpan={ 2 } id="f1">5</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      )
      const found = findElement(
        { parent: 'tr', props: { colSpan: 2 }, at: 1 },
        elem.root
      ) as ReactTestRenderer.ReactTestInstance
      expect(found.props).toHaveProperty('id', 'f1')
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