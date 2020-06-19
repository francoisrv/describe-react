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

## Describe

```ts
type Describe = React.FC<{
  label: string
  skip?: boolean
  only?: boolean
}>
```

- there can be only one Describe

## Render

```ts
type Render = React.FC<{}>
```

## Expect

```ts
type Expect = React.FC<{
  at?:              number
  element?:         string | React.ComponentType<any> | true
  elements?:        string
  first?:           boolean
  last?:            boolean
  toHaveLength?:    number | boolean
  toHaveProperty?:  string
  toHaveText?:      string
  toHaveType?:      string
  whichEquals?:     any
}>
```

### Expect element

##### Root element

If `props.element` is `true`, then the root element will be targeted:

```jsx
<Describe label="Selecting root element">
  <Render>
    <ul>
      <li>1</li>
      <li>2</li>
    </ul>
  </Render>
  
  <Expect element toHaveType="ul" />
</Describe>
```

#### Children element

If `props.element` is specified, it refers to a child of the root element. You can use a string for HTML elements or a function to refer to a React component

```jsx
function Foo(props) {
  return <div>{ props.name }</div>
}

<Describe label="Selecting root element">
  <Render>
    <div>
      <input disabled />
      <Foo name="Hello" />
    </div>
  </Render>
  
  <Expect element="input" toHaveProperty="disabled" />
  <Expect element={ Foo } toHaveText="Hello" />
</Describe>
```

#### Element position

By default, the first element matching your criteria is returned. You can specify which one to return using `first`, `last` and `at`

```jsx
<Describe label="Selecting root element">
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
```