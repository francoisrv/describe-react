Type expectations
===

You can expect the target to have a specific type 

You can use this inside a which selector:

```jsx
<Expect element which={ <Has type="span" />}>

</Expect>
```

Or inside an expectation declaration

```jsx
<Expect all elements which={ <Are direct children to root element /> }>
  <To have type="span" />
  <To have type which is not="div" />
  <To have type which is one of={[ 'span', 'div' ]} />
  <To have type which is not one of={[ 'div', 'section' ]} />
  <To have text which returns true to={ type => type === 'span' } />
</Expect>
```
