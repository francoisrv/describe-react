# Expect

## Abstract

```jsx
<Expect { selector }>
  { To... }
</Expect>
```

## Selectors

### Root element

This will select the root element. If no selector is specified, this will be used

```jsx
<Expect root element />
```

Example:

```jsx
<Describe label="Select root element">
  <Render>
    <div>
      <span>
        <b>Foo</b>
      </span>
    </div>
  </Render>

  <Expect root element>
    <To have type="div" />
  </Expect>
</Describe>
```

### Child

Select a specific child (child must be a direct child)

- `Expect child` will select the first child of root element
- `Expect first child` same as above but with more verbosity
- `Expect last child` will select the last child of root element
- `Expect child={ 5 }` will select the 6th child of root element (with nesting)

`child` is a child of the root element. You can specify another parent using `of element which`

```jsx
<Describe label="Select root element">
  <Render>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>
        <ul>
          <li>4</li>
        </ul>
      </li>
      <li>
        <ul>
          <li>5</li>
        </ul>
      </li>
    </ul>
  </Render>

  <Expect first child>
    <To have text="1" />
  </Expect>

  <Expect last child>
    <To have only child which={ <Has type="ul" /> } />
  </Expect>

  <Expect child={ 1 }>
    <To Have text="2" />
  </Expect>

  <Expect child number={ 2 }>
    <To Have text="2" />
  </Expect>

  <Expect
    the first child of the second element which={ <Has type="ul" /> }
  >
    <To Have text="5" />
  </Expect>
</Describe>
```

### Children

You can select a group of children

- `Expect children` Select all children
- `Expect all children` Same as above
- `Expect exactly={ n } children` Select all child and expect exactly _n_ to be satisfying
- `Expect at least={ n } children` Select all children and expect at least _n_ to be satisfying
- `Expect no more than={ n } children` Select all children and expect no more than _n_ to be satisfying

### Element

### Elements

### Target