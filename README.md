describe-react
===

Write your react tests in JSX

```jsx
// list.test.js

import React from 'react'
import run, { Describe, Expect, Render, Trigger } from 'describe-react'

// A component with hooks to test
function Counter() {
  const [counter, setCounter] = React.useState(0)
  function increment() {
    setCounter(counter + 1)
  }
  return (
    <button onClick={ increment }>
      { counter }
    </button>
  )
}

run(() => (
  <Describe label="Counter">
    <Render>
      <Counter />
    </Render>
    
    <Expect element="button">
      <To have text="0" />
    </Expect>

    <Trigger event="click" to element="button" />

    <Expect element="button">
      <To have text="1" />
    </Expect>
  </Describe>
))
```

```bash
jest list.test
```
```
PASS  list.test.js
Quick usage
  Expect element="button"
    ✓ to have text "0"
  Trigger
    ✓ event="click" to element="button"
  Expect element="button"
    ✓ to have text "1"
```

View [documentation](https://francoisrv.github.io/describe-react/#/)
