import run from "./run"
import Describe from "./components/Describe"
import React from "react"
import Render from "./components/Render"
import Expect, { ExpectProps } from "./components/Expect"
import To, { ToProps } from "./components/To"
import Is from "./components/Is"
import Has from "./components/Has"
import Have from "./components/Have"

describe('Examples', () => {
  run(() => (
    <Describe label="Root element">
      <Render>
        <div />
      </Render>

      <Expect root element>
        <To have type="div" />
        <To have type which={ <Is exactly="div" /> } />
        <To have type which={ <Is not="span" /> } />
        <To have type which={ <Is either={[ 'span', 'div' ]} /> } />
        <To have type which={ <Is neither={[ 'span', 'table' ]} /> } />
        <To not have text />
        <To have no properties />
        <To have no state />
        <To have no children />
        <To have no parent />
        <To have no siblings />
      </Expect>

    </Describe>
  ))

  run(() => (
    <Describe label="Targeting element">
      <Render>
        <table>
          <tr>
            <td>
              <span />
            </td>
          </tr>
        </table>
      </Render>

      <Expect first element>
        <To have type="table" />
      </Expect>

      <Expect last element>
        <To have type="span" />
      </Expect>

      <Expect element number={2}>
        <To have type="tr" />
      </Expect>

      <Expect element at={2}>
        <To have type="td" />
      </Expect>
    </Describe>
  ))

  run(() => (
    <Describe label="Targeting element which">
      <Render>
        <table>
          <tr>
            <td>
              <span />
            </td>
            <td>
              <h1>hello</h1>
              <span id="foo">bye</span>
            </td>
          </tr>
        </table>
      </Render>

      <Expect last element which={[ <Has type="span" />, <Has property="id" which={ <Is exactly="foo" /> } /> ]}>
        <To have text="bye" />
      </Expect>

      <Expect element number={2} which={ <Has type="span" /> }>
        <To have text="bye" />
      </Expect>

      <Expect element at={0} which={ <Has type="span" /> }>
        <To not have text />
      </Expect>
    </Describe>
  ))

  run(() => (
    <Describe label="Targeting element type">
      <Render>
        <table>
          <tr>
            <td>
              <span id="foo" />
            </td>
            <td>
              <h1>hello</h1>
              <span>bye</span>
            </td>
          </tr>
        </table>
      </Render>

      <Expect element="h1">
        <To have text="hello" />
      </Expect>

      <Expect last element="span">
        <To have text="bye" />
      </Expect>

      <Expect element="span" number={2}>
        <To have text="bye" />
      </Expect>

      <Expect element="span" at={0} which={ <Has property="id" /> }>
        <To not have text />
      </Expect>
    </Describe>
  ))

  run(() => (
    <Describe label="Targeting elements">
      <Render>
        <ul className="foo">
          <li className="foo">1</li>
          <li className="bar">2</li>
          <li className="bar">3</li>
        </ul>
      </Render>

      <Expect elements>
        <To have type which={ <Is either={[ 'ul', 'li' ]} /> } />
      </Expect>

      <Expect all elements>
        <To have type which={ <Is either={[ 'ul', 'li' ]} /> } />
      </Expect>

      <Expect some elements>
        <To have type which={ <Is exactly="li" /> } />
      </Expect>

      <Expect first={2} elements>
        <To have property="className" which={ <Is exactly="foo" /> } />
      </Expect>

      <Expect last={2} elements>
        <To have property="className" which={ <Is exactly="bar" /> } />
      </Expect>

      <Expect at least={3} elements>
        <To have type which={ <Is exactly="li" /> } />
      </Expect>

      <Expect more than={3} elements>
        <To have type which={ <Is exactly="li" /> } />
      </Expect>

      <Expect no more than={3} elements>
        <To have type which={ <Is exactly="li" /> } />
      </Expect>

      <Expect exactly={3} elements>
        <To have type which={ <Is exactly="li" /> } />
      </Expect>

      <Expect between={0} and={3} elements>
        <To have type which={ <Is exactly="li" /> } />
      </Expect>

    </Describe>
  ))

  run(() => (
    <Describe label="Targeting elements which">
      <Render>
        <ul className="foo">
          <li className="foo">1</li>
          <li className="bar">2</li>
          <li className="bar">3</li>
        </ul>
      </Render>

      <Expect elements which={ <Have type="li" /> }>
        <To have type which={ <Is either={[ 'ul', 'li' ]} /> } />
      </Expect>

      <Expect all elements which={ <Have property="className" /> }>
        <To have type which={ <Is either={[ 'ul', 'li' ]} /> } />
      </Expect>

      <Expect some elements which={ <Have text /> }>
        <To have length={3} />
      </Expect>

      <Expect first={2} elements which={ <Have property="className" which={ <Is exactly="bar" /> } />} >
        <To have property="className" which={ <Is exactly="bar" /> } />
      </Expect>

      <Expect last={2} elements which={ <Have property="className" which={ <Is exactly="foo" /> } />} >
        <To have property="className" which={ <Is exactly="foo" /> } />
      </Expect>

      <Expect at least={3} elements which={ <Have property="className" /> }>
        <To have type which={ <Is exactly="li" /> } />
      </Expect>

      <Expect no more than={3} elements which={ <Have type="li" /> }>
        <To have type which={ <Is exactly="li" /> } />
      </Expect>

      <Expect exactly={3} elements which={ <Have type="li" /> }>
        <To have type which={ <Is exactly="li" /> } />
      </Expect>

      <Expect between={0} and={3} elements which={ <Have type="li" /> }>
        <To have type which={ <Is exactly="li" /> } />
      </Expect>

    </Describe>
  ))

  function Foo() {
    return <div />
  }

  run(() => (
    <Describe label="Type">
      <Render>
        <div>
          <Foo />
        </div>
      </Render>

      <Expect root element>
        <To have type="div" />
        <To not have type="span" />
        <To have not type={ Foo } />
        <To have type which={ <Is exactly="div" /> } />
        <To have type which={ <Is not="span" /> } />
        <To have type which={ <Is either={[ 'div', 'span', Foo ]} /> } />
        <To have type which={ <Is neither={[ 'table', 'span', Foo ]} /> } />
      </Expect>

      <Expect element which={ <Has type={ Foo } /> }>
        <To have type={ Foo } />
        <To have type which={ <Is not="div" /> } />
      </Expect>
    </Describe>
  ))

  run(() => (
    <Describe label="Text">
      <Render>
        <div>
          <span>abc</span>
          <a>{''}</a>
        </div>
      </Render>

      <Expect root element>
        <To have not text />
        <To have no text />
        <To not have text="def" />
        <To not have text which={ <Is matching={ /def/ } /> } />
      </Expect>

      <Expect element which={ <Has type="span" /> }>
        <To have text />
        <To have text="abc" />
        <To have text which={ <Is matching={ /abc/ } /> } />
        <To have text which={ <Has length /> } />
        <To have text which={[ <Has length={3} />, <Has length which={ <Is greater than={2} /> } /> ]} />
      </Expect>

      <Expect element which={ <Has type="a" /> }>
        <To have text which={ <Is empty /> } />
      </Expect>
    </Describe>
  ))

  run(() => (
    <Describe label="Properties">
      <Render>
        <div id="foo">
          <span />
        </div>
      </Render>

      <Expect root element>
        <To have properties />
        <To have property="id" />
        <To not have property="foo" />
        <To have property="id" which={ <Is exactly="foo" /> } />
        <To have not property="id" which={ <Is exactly="bar" /> } />
        <To have not property="id2" which={ <Is exactly="foo" /> } />
        <To have property which={ <Is exactly="foo" /> } />
        <To have not property which={ <Is exactly="bar" /> } />
      </Expect>

      <Expect element which={ <Has type="span" /> }>
        <To have no property />
        <To have no properties />
        <To have not property />
        <To have not properties />
        <To not have property="id" />
        <To have no property="id" />
      </Expect>
    </Describe>
  ))

  run(() =>{
    class Foo extends React.Component {
      state = {
        counter: 0
      }
      render() {
        return <div />
      }
    }

    class Bar extends React.Component {
      render() {
        return <div />
      }
    }

    return  (
      <Describe label="State">
        <Render>
          <div>
            <Foo />
            <Bar />
          </div>
        </Render>
  
        <Expect element which={ <Has type={ Foo } /> }>
          <To have state />
          <To have state="counter" />
          <To not have state="enabled" />
          <To have state="counter" which={ <Is a number /> } />
          <To have state which={ <Is a number /> } />
        </Expect>

        <Expect element which={ <Has type={ Bar } /> }>
          <To not have state />
        </Expect>
      </Describe>
    )
  })

  run(() => (
    <Describe label="Child">
      <Render>
        <table>
          <thead>
            <tr>
              <td>
                <div />
              </td>
              <td />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div />
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </Render>

      <Expect element which={ <Has type="table" /> }>
        <To have children />
      </Expect>

      <Expect elements which={ <Have type="tr" /> }>
        <To have at least={2} children />
      </Expect>

      <Expect elements which={ <Have type="tr" /> }>
        <To have exactly={2} children />
      </Expect>

      <Expect elements which={ <Have type="tr" /> }>
        <To have no more than={2} children />
      </Expect>

      <Expect elements which={ <Have type="tr" /> }>
        <To have more than={1} child />
      </Expect>

      <Expect elements which={ <Have type="tr" /> }>
        <To have between={2} and={3} children />
      </Expect>

      <Expect element="thead">
        <To have less than={2} children />
      </Expect>

      <Expect element which={ <Has type="div" /> }>
        <To have no children />
      </Expect>
    </Describe>
  ))
})
