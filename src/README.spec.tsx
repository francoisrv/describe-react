import run from "./run";
import React from "react";
import Describe from "./Describe";
import Render from "./Render";
import Expect from "./Expect";
import Element from "./Element"
import { property } from "lodash";

describe('README', () => {
  run(() => (
    <Describe label="List">
      <Render>
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
      </Render>
      <Expect elements="li" toHaveLength={2} />
      <Expect first element="li" toHaveText="1" />
    </Describe>
  ))

  run(() => (
    <Describe label="Selecting root element">
      <Render>
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
      </Render>
      
      <Expect element toHaveType="ul" />
    </Describe>
  ))

  run(() => {
    function Foo(props) {
      return <div>{ props.name }</div>
    }
    return (
      <Describe label="Selecting element">
        <Render>
          <div>
            <input disabled />
            <Foo name="Hello" />
          </div>
        </Render>
        
        <Expect element="input" toHaveProperty="disabled" />
        <Expect element={ Foo } toHaveProperty="name" />
      </Describe>
    )
  })

  run(() => (
    <Describe label="Selecting element by position">
      <Render>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </Render>
      
      <Expect first element="li" toHaveText="1" />
      <Expect element="li" at={1} toHaveText="2" />
      <Expect last element="li" toHaveText="3" />
    </Describe>
  ))

  run(() => (
    <Describe label="Selecting element using Element">
      <Render>
        <table>
          <tbody>
            <tr id="f1">
              <td>1</td>
              <td colSpan={ 2 }>2</td>
              <td>3</td>
            </tr>
            <tr id="f2">
              <td>4</td>
              <td colSpan={ 2 }>5</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      </Render>
      
      <Expect
        element={
          <Element
            parent={ <Element type="tr" at={ 1 } /> }
          />
        }
        toHaveType="td"
      />
    </Describe>
  ))
})