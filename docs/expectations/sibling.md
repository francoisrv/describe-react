# Sibling assertions

Expect target to have a specific sibling

```jsx
<Describe label="Parent expectation">
  <Render>
    <div>
      <span />
      <hr />
    </div>
  </Render>

  <Expect child="span" toHaveSibling="hr" />
</Describe>
```

