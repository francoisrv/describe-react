describe-react
===

Write your react tests in JSX and using Jest

```jsx
// list.test.jsx
import React from 'react'
import run, { Describe, Expect, Render } from 'describe-react'

function Specs() {
  return (
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
  )
}

run(Specs)
```

```bash
jest list.test
```