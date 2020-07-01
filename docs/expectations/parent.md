# Parent

Use it either as a selector or an expectation:

As a selector:

```jsx
<Expect element which={ <Has parent which={ <Has type="div" /> } />}>
  // ....
</Expect>

<Expect elements which={ <Have parent which={ <Has type="div" /> } />}>
  // ....
</Expect>
```

As an expectation

```jsx
<Expect element>
  <To have parent which={ <Has type="div" /> } />
</Expect>
```

## Negation

You can negate the effect by using `not` or `NOT`

## Ancestor

If you want to select a parent that is not a direct parent, use `ancestor`

```jsx
<Expect element which={ <Has type="td" /> }>
  <To have parent which={ <Has type="tr" /> } />
  <To have ancestor which={ <Has type="table"/> } />
</Expect>
```
