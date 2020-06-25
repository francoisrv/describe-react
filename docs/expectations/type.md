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

## Has one of types

You can expect the type to be one of

```jsx
<Describe label="Has one of types">
  <Render>
    <div />
  </Render>

  <Expect
    root element toHaveType={ <One of={[ 'div', 'section' ]} /> }
  />
</Describe>
```

```
PASS
  Has one of types
    Expect element
      ✓ to have type which to have type which is < div > or to have type which is < section > (1 ms)
```