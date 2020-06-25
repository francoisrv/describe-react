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
    <div />
  </Render>

  <Expect
    root element toHaveText={ <Is one of={[ 'hello', 'goodbye' ]} /> }
  />
</Describe>
```