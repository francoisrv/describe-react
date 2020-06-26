# Examples

## Hooks

### State hook

```jsx
function Foo() {
  const [state, setState] = React.useState(false)
  return (
    <button onClick={ () => setState(!state) }>
      { state ? 'on' : 'off' }
    </button>
  )
}

<Describe label="Hooks example">
  <Render>
    <Foo />
  </Render>

  <Expect toHaveText="off" />
  <Trigger event="click" />
  <Expect toHaveText="on" />
</Describe>
```
