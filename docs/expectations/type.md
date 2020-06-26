Type expectations
===

## Has type

You can expect the target to have a specific type by using either `toHaveType` or `notToHaveType` properties.

```jsx
function Foo() {
  return <span />
}

<Describe label="Expect to have type">
  <Render>
    <div>
      <Foo />
    </div>
  </Render>

  <Expect
    element toHaveType="div"
    label="Expect root element's type to be a div"
  />
  <Expect 
    child toHaveType={ Foo }
    label="Expect first child's type to be a Foo"
  />
  <Expect
    element notToHaveType="table"
    label="Expect root element's type NOT to be a div"
  />
</Describe>
```

```
PASS
  Expect to have type
    Expect root element's type to be a div
      Expect root element
        ✓ to have type which is < div > (1 ms)
    Expect first child's type to be a Foo
      Expect first child
        ✓ to have type which is component < Foo >
    Expect root element's type NOT to be a div
      Expect root element
        ✓ not to have type which is < table >

```

## Using &lt;Is />

You can fine grain the selection using [Is](components/Is)

The following parameters are accepted:

- `Is not`
- `Is one of`
- `Is not one of`
- `Is true`
- `Is not true`
- `Is valid`
- `Is not valid`

```jsx
<Describe label="Has one of types">
  <Render>
    <div />
  </Render>

  <Expect
    root element
    toHaveType={ <Is not="span" /> }
  />

  <Expect
    root element
    toHaveType={ <Is one of={[ 'div', 'section' ]} /> }
  />

  <Expect
    root element
    toHaveType={ <Is not one of={[ 'span', 'section' ]} /> }
  />

  <Expect
    root element
    toHaveType={ <Is not one of={[ 'span', 'section' ]} /> }
  />
</Describe>
```

When using the functions `true` or `valid`, they are being called with the following arguments:

- `type` The element type
- `elem` the [react test renderer](https://reactjs.org/docs/test-renderer.html) element
- `localState` The tests' local state

```jsx
<Expect
  root element
  toHaveType={
    <Is true={(type, elem) => !elem.children.length && type === 'div' } />
  }
  label="Root element is a div and has no child"
/>
```