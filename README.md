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
        <span id="foo">Hello</span>
      </Render>
      <Expect
        root element
        toHaveText="Hello"
        toHaveProperty="id"
      />
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
- Expectations
  - [type]('#Describe')
  - [text]('#Describe')
  - [props]('#Describe')
  - [state]('#Describe')
  - [parent]('#Describe')
  - [children]('#Describe')
  - [siblings]('#Describe')
  - [any]('#Describe')

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

## Elements

```jsx
<Expect
  all elements="div"
  toHaveText="Hello"
/>

<Expect
  some elements="div"
  toHaveText="Hello"
/>

<Expect
  first={ 5 } elements="div"
  toHaveText="Hello"
/>

<Expect
  last={ 5 } elements="div"
  toHaveText="Hello"
/>

<Expect
  odd elements="div"
  toHaveText="Hello"
/>

<Expect
  even elements="div"
  toHaveText="Hello"
/>

<Expect
  elements="div" range={[ 5, 15 ]}
  toHaveText="Hello"
/>
```

## Expectation

### Any expectations

```jsx
class Foo extends React.Component {
  foo = true
  render() {
    return <div />
  }
}

<Describe>
  <Render>
    <Foo />
  </Render>

  <Expect
    root element
    to={ element => {
      expect(element.instance).toHaveProperty('foo', true)
    } }
  />
</Describe>
```

### Type expectation

Expect an element to have said type

```jsx
function Foo() {
  return <span />
}

<Describe>
  <Render>
    <Foo />
  </Render>

  <Expect
    root element
    toHaveType={ Foo }
  />
  <Expect
    first element
    toHaveType="div"
  />
</Describe>
```

#### Is not type

```jsx
<Expect element notToHaveType="div" />
```

#### Is one of types

```jsx
<Expect element toHaveOneOfTheseTypes={[ 'div', Foo ]} />
```

#### Is not one of types

```jsx
<Expect element notToHaveOneOfTheseTypes={[ 'div', Foo ]} />
```

### Text expectation

```jsx
<Describe>
  <Render>
    <span>Hello</span>
  </Render>

  <Expect
    root element
    toHaveText="Hello"
  />
  <Expect
    root element
    toHaveText={ /hello/i }
  />
</Describe>
```

#### Has any text

```jsx
<Expect element toHaveText />
```

#### Does not have text

```jsx
<Expect element notToHaveText />
```

#### Does not have specific text

```jsx
<Expect element notToHaveText="Hello" />
<Expect element notToHaveText={ /hello/i } />
```

#### Matches a range of text

```jsx
<Expect element toHaveOneOfTheseTexts={[ 'hello', /hello/i ]} />
```

#### Does not match a range of text

```jsx
<Expect element notToHaveOneOfTheseTexts={[ 'hello', /hello/i ]} />
```

### Properties expectation

```jsx
<Describe label="Properties expectations">
  <Render>
    <div id="foo" tabIndex={ 7 } />
  </Render>

  <Expect element toHaveProperty="id" />
  <Expect element toHaveProperty={ /id/ } />
  <Expect element toHaveProperty={{ name: 'id', value: 'foo' }} />
  <Expect element toHaveProperty={{
    name: /id/,
    value: (value, props) => value === 'foo' && props.tabIndex === 7
  }} />
  <Expect element notToHaveProperty="id" />
  <Expect element toHaveOneOfTheseProperties={[ 'id', 'className' ]} />
  <Expect element noToHaveOneOfTheseProperties={[ 'id', 'className' ]} />
</Describe>
```

## Events

If the element targeted has en event handler, you can call it like this:

```jsx
let foo = 0

<Describe label="Targeting root element">
  <Render>
    <button onClick={ () => foo++ } />
  </Render>
  
  <Run function={ async() => { expect(foo).toEqual(0) } } />
  <Event name="click" />
  <Run function={ async() => { expect(foo).toEqual(1) } } />
</Describe>
```

### Targeting event

By default the targeted element will be the root element. You can target a child by using the `target` attribute which is the same as the `element` attribute of `<Expect />`.

```jsx
function Foo() {
  const [counter, setCounter] = React.useState(0)
  return (
    <div>
      <span>{ counter }</span>
      <button
        value="+"
        onClick={ () => setCounter(counter + 1) }
      />
    </div>
  )
}

<Describe label="Targeting child">
  <Render>
    <Foo />
  </Render>
  
  <Expect element="span" toHaveText="0" />
  <Event name="click" target="button" />
  <Expect element="span" toHaveText="1" />
</Describe>
```

### Passing arguments to the handler

You can pass arguments using either the `argument` attribute -- or the `arguments` attribute to pass more than one argument

```jsx
function Foo() {
  const [name, setName] = React.useState(')
  return (
    <input
      value={ name }
      onChange={ e => setName(e.target.value) }
    />
  )
}

function ExpectValue(props) {
  return (
    <Expect
      element="input"
      toHaveProperty={{ value: props.value }}
    />
  )
}

function ChangeValue(props) {
  return (
    <Event
      name="change"
      target="input"
      argument={{ target: { value: props.value } }}
    />
  )
}

<Describe label="Passing event arguments">
  <Render>
    <Foo />
  </Render>
  
  <ExpectValue value="" />
  <ChangeValue value="test" />
  <ExpectValue value="test" />
</Describe>
```

## Update

You can force the update of the root element. You can pass an optional `props` attribute with new props.

```jsx
function Foo(props) {
  return (
    <div>
      { props.name }
    </div>
  )
}

<Describe label="Update">
  <Render>
    <Foo name="joe" />
  </Render>
  
  <Expect
    element="div"
    toHaveText="joe"
  />
  <Update
    props={{ name: 'jess' }}
  />
  <Expect
    element="div"
    toHaveText="jess"
  />
</Describe>
```

## Unmount

You can unmount the root element

## Run

You can run any function. The context of the tests is passed as the function argument

```jsx
let foo = 0

function Foo() {
  return (
    <div>
      { foo }
    </div>
  )
}

<Describe label="Run function">
  <Render>
    <Foo />
  </Render>

  <Expect
    first element
    toHaveText="0"
  />
  <Run
    function={ () => { foo++ } }
  />
  <Update />
  <Expect
    first element
    toHaveText="1"
  />
</Describe>
```

The function can be asynchronous. If so, you can use the `timeout` property to make sure the test does not tinmeout on a long function.

You can also use the `label` attribute to change the default test label, and the `skip` and `only` attributes as well.

## Wait

You can delay execution too

### Wait time

You can wait either milliseconds (via the `milliseconds` or `ms` attribute) or seconds (via the `seconds` attribute)

```jsx
<Describe label="Wait for time">
  <Wait seconds={ 5 } label="Simulate slow server response" />
</Describer>
```

You can also wait for an element via the `element` attribute or for elements via the `elements` attribute

```jsx
<Wait for element="div" />
<Wait
  for elements={{ elements: 'span', length: 4 }}
  label="Waiting for 4 spans to show up"
/>
```
