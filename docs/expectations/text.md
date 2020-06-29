Text expectations
===

You can expect the target to have a specific text

```jsx
<Expect all elements that={ <Have text="abc" />  }>
  <To have text />
  <To fail>
    <NOT to have text />
  </To>
  <To have text="abc" />
  <To have text which is not="def" />
  <To have text which matches={ /abc/ } />
  <To have text which does not match={ /def/ } />
  <To have text which is one of={[ 'abc', 'def' ]} />
  <To have text which is not one of={[ 'def', 'ghi' ]} />
  <To have text which matches one of={[ /abc/, /def/ ]} />
  <To have text which does not match one of={[ /def/, /ghi/ ]} />
  <To have text which returns true to={ txt => txt === 'abc' } />
</Expect>
```