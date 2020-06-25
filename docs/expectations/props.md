Property
====

You can expect a target to have a specific type of properties using the following attributes:

- `toHaveProperty`
- `notToHaveProperty`
- `toHaveProperties`
- `notToHaveProperties`
- `toHaveExactProperties`
- `notToHaveExactProperties`

## has property which a specific name

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

Note that you could pass more than one entry to your object, and it will work but in this case we recommend using `toHaveProperties` instead since it is more correct.

```jsx
<Expect root element toHaveProperties={{ type: 'number', value: 10 }} />
```

## has properties which equals exactly object

You can pass an object which equals exactly the properties

```jsx
<Expect root element toHaveExactProperties={{ type: 'number', required: true, disabled: true }} />
```

## has any property

Expect target to have at least one property

```jsx
<Expect root element toHaveProperties />
```

## does not have properties

Expect target to not have properties at all

```jsx
<Expect root element toHaveProperties={ false } />
// Or
<Expect root element notToHaveProperties />
```

## Using &lt;Is />

You can fine grain the selection using [Is](components/Is) inside the object

```jsx
<Describe label="Has one of types">
  <Render>
    <div />
  </Render>

  <Expect
    root element
    toHaveProperty={{
      type: <Is not="email" />
    }}
  />
</Describe>
```

## to have properties

You can check for more than one property. In this case, use an array of which each item could be applied to `toHaveProperty`. It will throw if not **all** the conditions are being satisfied

```jsx
<Describe label="has properties">
  <Render>
    <input
      type="number"
      required
      value={ 27 }
      title="Counter"
      tabIndex={ 1 }
    />
  </Render>

  <Expect
    root element
    toHaveProperties={[
      'required',
      { type: 'number' },
      <Property name="value" value={ 27 } />,
      <One
        of={[
          { title: 'foo' },
          { tabIndex: 1 },
        ]}
      />
    ]}
  />
</Describe>
```

`toHaveProperties` can also accept a [Is](components/Is)

```jsx
<Describe label="has properties">
  <Render>
    <input
      type="number"
      required
      value={ 27 }
      title="Counter"
      tabIndex={ 1 }
    />
  </Render>

  <Expect
    root element
    toHaveProperties={
      <Is
        true={
          props => props.required && props.type === 'number'
        }
      />
    }
  />
</Describe>
```

Both functions will receive the following arguments:

- `props` All the properties of the targeted element
- `elem` The [react-test-renderer](https://reactjs.org/docs/test-renderer.html) instance of the targeted element
- `localState` The local state of the tests
