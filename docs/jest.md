# jest

You need to have `jest` installed and use it to run a file:

```jsx
// describe.test.jsx
import React from 'react'
import run, { Describe, Expect, Render } from 'describe-react'

run(() => (
  <Describe label="Basic usage">
    <Render>
      <div>Hello world!</div>
    </Render>

    <Expect>
      <To have text="Hello world!" />
    </Expect>
  </Describe>
))
```

Then from your terminal:

```bash
jest describe.test.jsx
```

Which will return:

```
PASS  describe.test.jsx
Basic usage
  Expect
    ✓ to have text "Hello world!"
```

## `only` and `skip`

You can use `only` and `skip` with properties `_only` and `_skip`

```jsx
<Describe label="Basic usage" _only>
  <Render>
    <div>Hello world!</div>
  </Render>

  <Expect>
    <To have text="Hello world!" _skip />
  </Expect>
</Describe>
```

## label

You can use `_label` to specify a label


```jsx
<Expect root element _label="Your own custom label">
  <To have type="div" />
</Expect>
```

```
Your own custom label
  Expect root element
    ✓ to have type "div"
```

## timeout

You can use `_timeout` to specify a timeout (in milliseconds)


```jsx
<Run
  function={ async () => {} }
  _label="Perform a really long operation"
  _timeout={ 5000 }
/>
```
