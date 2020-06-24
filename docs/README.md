describe-react
===

Write your react tests in JSX

```jsx
// list.test.js
import React from 'react'
import run, { Describe, Expect, Property, Render } from 'describe-react'

function Specs() {
  return (
    <Describe label="Quick usage">
      <Render>
        <span id="foo">Hello</span>
      </Render>
      
      <Expect
        root element
        toHaveType="span"
        toHaveText="Hello"
        toHaveProperty={ <Property name="id" value="foo" /> }
        notToHaveProperty="className"
      />
    </Describe>
  )
}

run(Specs)
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
    ✓ NOT to have a property which name is "className" (2 ms)
```
