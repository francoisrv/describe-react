# Expect

## Abstract

```jsx
<Expect { selector } to { assert }>
```

## Selector

View selectors in the [Selectors](selectors.md) section

## Asertions

View all assertions in the [Expectations](expectations/type) section

## Example

```jsx
<Describe label="Expect example">
  <Render>
    <div>Hello</div>
  </Render>

  <Expect
    root element
    toHaveType="div"
    toHaveText="Hello"
  />
</Describe>
```
