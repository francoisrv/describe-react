describe-react
===

Write your react tests in JSX

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

- Components
  - [Describe]('#Describe')
  - [Render]('#Render')
  - [Expect]('#Expect')
  - [Element]('#Element')
  - [Property]('#Property')
  - [Trigger]('#Trigger')
  - [Update]('#Update')
  - [Wait]('#Wait')
  - [Unmount]('#Unmount')
  - [Run]('#Run')

## Describe

```ts
type Describe = React.FC<{
  label: string
  skip?: boolean
  only?: boolean

  children?: DescribeAcceptedChildren | DescribeAcceptedChildren[]
}>

type DescribeAcceptedChildren =
| Expect
| Render
| Trigger
| Update
| Wait
| Unmount
| Run
```

- there can be only one Describe

## Render

```ts
type Render = React.FC<{}>
```

## <a id="Expect"></a>Expect

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

### Expect element(s)

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

**Note** You could also use `root element` which is the same -- verbosity added:

```jsx
<Expect root element toHaveType="ul" />
```

#### Children element

If `props.element` is specified, it refers to a child of the root element. You can use a string for HTML elements or a function to refer to a React component

```jsx
function Foo(props) {
  return <div>{ props.name }</div>
}

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
```

#### Element position

By default, the first element matching your criteria is returned. You can specify which one to return using `first`, `last` and `at`

```jsx
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
```

#### Element describer

You can use the `<Element />` component to fine-grain your selection (view usage below)

```jsx
<Describe label="Selecting element using Element">
  <Render>
    <table>
      <tbody>
        <tr>
          <td>1</td>
          <td colSpan={ 2 }>2</td>
          <td>3</td>
        </tr>
        <tr>
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
        props={{ colSpan: 2 }}
      />
    }
    toHaveText="5"
  />
</Describe>
```

## Element



## Events

```ts
type Event = React.FC<{
  name:         string
  target?:      string | React.ComponentType<any>
}>
```

If the element targeted has en event handler, you can call it like this:

```jsx
let foo = 0

<Describe label="Selecting element by position">
  <Render>
    <button onClick={ () => foo++ } />
  </Render>
  
  <Run function={ async() => { expect(foo).toEqual(0) } } />
  <Event name="click" target root />
  <Run function={ async() => { expect(foo).toEqual(1) } } />
</Describe>
```

## Update