# Targeting elements

## Targeting root element

If target is omitted, it will default to the root element:

```jsx
<Describe label="Omitting target hence defaulting to root element">
  <Render>
    <span />
  </Render>

  <Expect toHaveType="span" />
</Describe>
```

You could add more verbosity by either using the properties `root element`:

```jsx
<Expect root element toHaveType="span" />
// Also valid:
<Expect element toHaveType="span" />
```

Or the children `<Is root element />`

```jsx
<Expect>
  <Is root element />
  <To have type="span" />
</Expect>
```

## Targeting only one element

By default, the targets return all matching elements:

```jsx
<Describe label="Omitting target hence defaulting to root element">
  <Render>
    <span />
    <span id="foo" />
    <span />
  </Render>

  <Expect>
    <Is a="span" />
    <To have length={ 3 } />
  </Expect>

  // Or:

  <Expect is a="span" to have length={ 3 } />
</Describe>
```

You could target one or just some using:

```jsx
<Expect>
  <Is a="span" />
  <Is first />
  <Is last />
  <Is at={2} />
  <Is between={2} and={5} />
  
  <To not have text />
</Expect>
```