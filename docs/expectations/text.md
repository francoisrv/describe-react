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

## Has exact text

Checks if target has exact text

```jsx
<Describe label="has exact text">
  <Render>
    <div>the brown fox jumps over the lazy dog</div>
  </Render>

  <Expect
    root element toHaveText="the brown fox jumps over the lazy dog"
  />

  <Expect
    root element notToHaveText="something else"
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
    root element toHaveText={ /brown/ }
  />

  <Expect
    root element notToHaveText={ /purple/ }
  />
</Describe>
```
