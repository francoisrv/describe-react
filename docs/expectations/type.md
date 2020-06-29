Type expectations
===

You can expect the target to have a specific type 

```jsx
<Expect all elements that={ <Have type="span" />  }>
  <To have type="span" />
  <To have type which is not="div" />
  <To have type which is one of={[ 'span', 'div' ]} />
  <To have type which is not one of={[ 'div', 'section' ]} />
  <To have text which returns true to={ type => type === 'span' } />
</Expect>
```