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
</Describer>
```

## Has one of types

You can expect the type to be one of

```jsx
<Expect
  element toHaveType={ <One of={[ 'div', Foo ]} /> }
  label="Expect root element's type to be either a div or a Foo"
/>
```
