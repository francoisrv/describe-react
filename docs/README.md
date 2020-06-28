describe-react
===

Write your react tests in JSX

```jsx
// list.test.js
import React from 'react'
import run, { Describe, Expect, Property, Render } from 'describe-react'

run(() => (
  <Describe label="Quick usage">
    <Render>
      <ul>
        <li>1</li>
        <li className="selected">2</li>
        <li>
          <b>3</b>
        </li>
      </ul>
    </Render>

    <Expect
      root element
      to have={3} direct children
    />

    <Expect
      first child
      to have text="1"
    />

    <Expect
      next sibling of
      child with property="className" which is="selected" 
      to have type="b"
      to have text="3"
    />
  </Describe>
))
```

```bash
jest list.test
```
```
PASS  list.test.js
Quick usage
  Expect root element
    ✓ to be a <span>
    ✓ to have text "Hello"
    ✓ to have a property which name is "id" AND which value is "foo"
```
