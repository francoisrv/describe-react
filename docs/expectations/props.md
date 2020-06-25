Property
====

You can expect a target to have a specific type of properties using the following attributes:

- `toHaveProperty`
- `notToHaveProperty`
- `toHaveProperties`
- `notToHaveProperties`
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

Expect target to not have properties

```jsx
<Expect root element toHaveProperties={ false } />
// Or
<Expect root element notToHaveProperties />
```

## has property which matches description

Expect target to have at least one property satisfying a boolean constraint

```jsx
<Expect
  root element
  toHaveProperty={ <Property name="disabled" is={ false } /> }
/>
```

### Descriptions

#### is / isNot

```jsx
<Describe label="has property which is / is not">
  <Render>
    <div>
      <input type="number" />
      <img alt="logo" />
    </div>
  </Render>

  <Expect
    child="img"
    toHaveProperty={ <Property name="alt" is="logo" /> }
  />

  <Expect
    child="input"
    toHaveProperty={ <Property name="type" isNot="text" /> }
  />

  <Expect
    child="input"
    toHaveProperty={
      <Property
        name="type"
        isNot={ <One of={[ 'text', 'date', 'email' ]} /> }
      />
    }
  />
</Describe>
```

#### number equality

```jsx
<Property isLesserThan={ 0 } />
<Property isLesserThanOrEqual={ 0 } />
<Property isGreaterThan={ 0 } />
<Property isGreaterThanOrEqual={ 0 } />
```

#### is type of

Returns `typeof value`

```jsx
<Property isTypeOf="string" />
<Property isNotTypeOf="function" />
<Property isTypeOf={ <One of={[ 'object', 'function' ]} /> } />
```

#### is an instance of

Returns `value instanceof`

```jsx
<Property isInstanceOf={ Date } />
<Property isNotInstanceOf={ RegExp } />
```

### array contains

You can use interchangeably `has`, `contains` and `includes`

```jsx
<Render>
  <Foo
    tracks={[1, 2, 3]}
  />
</Render>

<Property name="tracks" has={ 1 } />
<Property name="tracks" hasNot={ 5 } />
<Property name="tracks" containsNot={ <One of={[ 5, 15, 20 ]} /> } />
```
