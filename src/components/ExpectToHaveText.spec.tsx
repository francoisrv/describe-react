import run from "../run";
import React from "react";
import Describe from "./Describe";
import { assert } from "../entities/Assert";
import Render from "./Render";
import Expect from "./Expect";
import One from "./One";
import { Of, UnitTextIdentifier } from "../types";
import colors from 'colors'
import { isTrue } from "../entities/IsTrue";

const Duda = () => <span />

function lambda() {}

function isText(t: string) {
  return t === 'hello'
}

run(() => (
  <Describe label="Expect target (not) to have text">
    <Render>
      <div />
    </Render>

    <Expect
      first element
      toHaveText
      label={ `text identifier is ${ colors.bold('true') }` }
    />

    <Expect
      first element
      toHaveText={ false }
      label={ `text identifier is ${ colors.bold('false') }` }
    />

    <Expect
      first element
      notToHaveText
      label={ `text identifier is ${ colors.bold('not false') }` }
    />

    <Expect
      first element
      notToHaveText={ false }
      label={ `text identifier is ${ colors.bold('not true') }` }
    />

    <Expect
      first element
      toHaveText="foo"
      notToHaveText="foo"
      label={ `text identifier is a ${ colors.bold('string') }` }
    />

    <Expect
      first element
      toHaveText={/foo/}
      notToHaveText={/foo/}
      label={ `text identifier is a ${ colors.bold('regular expression') }` }
    />

    <Expect
      first element
      toHaveText={assert(lambda, 'is a nice text')}
      notToHaveText={assert(lambda, 'is a nice text')}
      label={ `text identifier is an ${ colors.bold('assertion') }` }
    />

    <Expect
      first element
      toHaveText={<One<Of<UnitTextIdentifier>> of={['foo', /bar/, assert(lambda, 'is a nice text')]} />}
      notToHaveText={<One<Of<UnitTextIdentifier>> of={['foo', /bar/, assert(lambda, 'is a nice text')]} />}
      label={ `text identifier is ${ colors.bold('one of') }` }
    />

    <Expect
      first element
      toHaveText={isTrue(isText, 'is text')}
      notToHaveText={isTrue(isText, 'is text')}
      label={ `text identifier is a ${ colors.bold('verification') }` }
    />
  </Describe>
))