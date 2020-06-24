import run from "../run";
import React from "react";
import Describe from "./Describe";
import { assert } from "../entities/Assert";
import Render from "./Render";
import Expect from "./Expect";
import One from "./One";
import { Of, UnitTextIdentifier } from "../types";
import colors from 'colors'

const Duda = () => <span />

function lambda() {}

run(() => (
  <Describe label="Expect target (not) to have text">
    <Render>
      <div />
    </Render>

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
  </Describe>
))