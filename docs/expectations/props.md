Property
====

You can expect a target to have a specific type of properties using the following attributes:

- `toHaveProperty`
- `notToHaveProperty`
- `toHaveExactProperties`
- `notToHaveExactProperties`

## has property which name equals string

```jsx
<Describe label="has property name">
  <Render>
    <input disabled type="number" required />
  </Render>

  <Expect
    root element toHaveProperty="disabled"
  />

  <Expect
    root element notToHaveProperty="id"
  />
</Describe>
```

## has property which name matches regular expression

You can use a regular expression to match a property name:

```jsx
<Expect root element toHaveProperty={ /disabled/ } />
```

## has property which has object

You can pass an object to be matched

```jsx
<Expect root element toHaveProperty={{ type: 'number' }} />
```

## has property which equals exactly object

You can pass an object which equals exactly the properties

```jsx
<Expect root element toHaveExactProperties={{ type: 'number', required: true, disabled: true }} />
```
