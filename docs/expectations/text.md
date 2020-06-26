Text
===

You can expect a target to have or not a specific text using the attributes `toHaveText` or `notToHaveText`

## Has text

Will check if target has text or not

```jsx
<Describe label="has text">
  <Render>
    <div>
      <span>hello</span>
      <span />
    </div>
  </Render>

  <Expect first child toHaveText />
  <Expect last child notToHaveText />
</Describe>
```

Since both these attributes accept boolean, `toHaveText={ false }` is equivalent to `notToHaveText`, and `notToHaveText={ false }` is equivalent to `toHaveText`.

## Has exact text

Checks if target has exact text

```jsx
<Describe label="has exact text">
  <Render>
    <div>the brown fox jumps over the lazy dog</div>
  </Render>

  <Expect root element
    toHaveText="the brown fox jumps over the lazy dog"
    notToHaveText="brown fox jump"
  />
</Describe>
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
