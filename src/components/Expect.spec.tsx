import run, { Describe, Render, Expect, Run } from "."
import * as React from 'react'

function Foo() {
  return (
    <div>
      Hello
    </div>
  )
}

class Bar extends React.Component {
  render() {
    return (
      <div>
        Hello
      </div>
    )
  }
}

function List() {
  return (
    <ul>
      <li className="foo" id="barz" tabIndex={ 7 }>1</li>
      <li>2</li>
      <li><Foo /></li>
      <li><Bar /></li>
      <li>100</li>
    </ul>
  )
}

describe('Expect', () => {
  run(() => (
    <Describe label="Targeting root element">
      <Render>
        <List />
      </Render>
      <Expect element toHaveType={ List } />
      <Expect root element toHaveType={ List } />
      <Expect element notToHaveType={ Foo } />
    </Describe>
  ))
})

// run(() => (
//   <Describe label="List">
//     <Render>
//       <ul>
//         <li className="foo" id="barz" tabIndex={ 7 }>1</li>
//         <li>2</li>
//         <li><Foo /></li>
//         <li><Bar /></li>
//         <li>100</li>
//       </ul>
//     </Render>
//     <Expect element toHaveType="ul" />
//     <Expect element notToHaveType="li" />
//     <Expect element="ul" toHaveType="ul" />
//     <Expect element="li" toHaveType="li" />
//     <Expect element={ Foo } toHaveType={ Foo } />
//     <Expect element={ Bar } toHaveType={ Bar } />
//     <Expect first element="li" toHaveText="1" />
//     <Expect last element="li" toHaveText="100" />
//     <Expect element="li" at={1} toHaveText="2" />
//     <Expect first element="li" toHaveProperty="className" />
//     <Expect first element="li" notToHaveProperty="foo" />
//     <Expect first element="li" toHaveProperty={ ['id', /class/ ] } />
//     <Expect first element="li" toHaveProperty={ /class/ } />
//     <Expect first element="li" toHaveProperty={{
//       className: 'foo',
//       id: new ExpectProperty((v, props) => v === 'barz' && props.tabIndex === 7)
//     }} />
//   </Describe>
// ))
