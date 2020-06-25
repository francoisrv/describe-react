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

## has property &lt;Property />

You can use the `<Property />` component to fine grain your selection

```jsx
<Expect
  root element
  toHaveProperty={ <Property name="disabled" value={ false } /> }
/>
```

### assert and isTrue

This is especially useful when used in conjunction with the properties `assert` and `isTrue`:

```jsx
<Describe label="assert and isTrue property">
  <Render>
    <input value={ 27 } />
  </Render>

  <Expect
    root element
    toHaveProperty={
      <Property name="value"
        isTrue={ prop => prop === 27 }
      />
    }
  />

  <Expect
    root element
    toHaveProperty={
      <Property name="value"
        assert={ prop => { expect(prop).toEqual(27) } }
      />
    }
  />
</Describe>
```

Both functions will receive the following arguments:

- `prop` The value of the property identified by name
- `name` The name of the property
- `props` All the properties of the targeted element
- `elem` The [react-test-renderer](https://reactjs.org/docs/test-renderer.html) instance of the targeted element
- `localState` The local state of the tests

### properties usage

You can use the `<Property />` in the following fashions:

#### without props

Using `<Property />` without props is redundant but will work and will resolve to true:

```jsx
<Expect element toHaveProperty={ <Property /> } />
// is the same than:
<Expect element toHaveProperty />

<Expect element notToHaveProperty={ <Property /> } />
// is the same than:
<Expect element notToHaveProperty />
```

#### with only name

Using `<Property />` with only the `name` property is redundant but will work:

```jsx
<Expect element toHaveProperty={ <Property name="disabled" /> } />
// is the same than:
<Expect element toHaveProperty="disabled" />
```

#### without name

You can omit the `name` property. In this case, it will check all properties for a match:

```jsx
<Expect
  element
  toHaveProperty={ <Property value={ false } /> }
  label="Must have one property which value is false, regardless of its name"
/>
```

If you use only `assert` or `isTrue`, then it will also check all properties for a match

## has property which is one of

You can use `<One of />` to find a property. The values admitted are:

- string
- regular expression
- object
- &lt;Property />

```jsx
<Expect
  element
  toHaveProperty={
    <One
      of={[
        'disabled',
        { required: true },
        <Property name="value" assert={ val => val > 100 } />,
      ]}
    />>
  }
/>
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

`toHaveProperty` can also accept a `isTrue` or `assert` function

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
      isTrue(props => props.required && props.type === 'number')
    }
  />
</Describe>
```

Both functions will receive the following arguments:

- `props` All the properties of the targeted element
- `elem` The [react-test-renderer](https://reactjs.org/docs/test-renderer.html) instance of the targeted element
- `localState` The local state of the tests
