Text
===

## Has text

You can check if the target has text at all using one these equivalent methods:

```jsx
<Expect>
  <To have text />
</Expect>

<Expect to have text />
```

## Does not have text

You can check if the target does not have text at all using one these equivalent methods:

```jsx
<Expect>
  <To not have text />
</Expect>

<Expect>
  <To have text={ false } />
</Expect>

<Expect not to have text />

<Expect to have text={ false } />
```

Since both these attributes accept boolean, `toHaveText={ false }` is equivalent to `notToHaveText`, and `notToHaveText={ false }` is equivalent to `toHaveText`.

## Has exact text

You can check if the target has exact text using one these equivalent methods:

```jsx
<Expect>
  <To have text="abc" />
</Expect>

<Expect to have text="abc" />
```

## Does not have exact text

You can check if the target does not have exact text using one these equivalent methods:

```jsx
<Expect>
  <To NOT have text="abc" />
</Expect>

<Expect>
  <To NOT have text="abc" />
</Expect>

<Expect>
  <To not have text="abc" />
</Expect>

<Expect not to have text="abc" />
```

## Matches text

You can also use a regular expression to match a text

```jsx
<Describe label="matches text">
  <Render>
    <div>the brown fox jumps over the lazy dog</div>
  </Render>

  <Expect
    root element
    toHaveText={ /brown/ }
    notToHaveText={ /purple/ }
  />
</Describe>
```

## Using &lt;Is />

You can fine grain the selection using [Is](components/Is)

```jsx
<Describe label="Has one of types">
  <Render>
    <div>hello</div>
  </Render>

  <Expect
    root element
    toHaveText={ <Is one of={[ 'hello', 'goodbye' ]} /> }
  />

  <Expect
    root element
    toHaveText={ <Is not one of={[ /morning/, 'goodbye' ]} /> }
  />
</Describe>
```

IIf you use the `true` or `valid` functions, they will be called for these arguments:

- `text` the text of the node
- `elem` the [react test renderer](https://reactjs.org/docs/test-renderer.html) element
- `localState` The tests' local state

```jsx
<Describe label="Has one of types">
  <Render>
    <button disabled>
      off
    </button>
  </Render>

  <Expect
    root element
    toHaveType={
      <Is true={ (text, elem) => {
        if (elem.props.disabled) {
          return text === 'off'
        }
        return text === 'on'
      } } />
    }
    label="Has text 'off' if element is disabled - 'on' otherwise"
  />
</Describe>
```
