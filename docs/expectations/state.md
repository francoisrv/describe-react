# State

You can expect a targeted element to have a specific state via the following properties:

- `toHaveState`
- `notToHaveState`
- `toHaveExactState`
- `notToHaveExactState`

```jsx
class Foo extends React.Component {
  state = { counter: 0 }
  increment = () => {
    this.setState({ counter: this.state.counter + 1 })
  }
  render() {
    return (
      <>
        <input
          type="number"
          value={ this.state.counter }
        />
        <button onClick={ this.increment }>
          +
        </button>
      </>
    )
  }
}

<Describe label="has state">
  <Render>
    <Foo />
  </Render>

  <Expect
    root element
    toHaveState={{ counter: 0 }}
  />

  <Trigger
    event="click"
    target="button"
  />

  <Expect
    root element
    toHaveState={{ counter: 1 }}
  />
</Describe>
```

## expect any state

You can check if the element has a state at all

```jsx
<Expect element toHaveState />
<Expect element noToHaveState />
```

## expect state to have object

You can pass an object that must be in the state

```jsx
<Expect element toHaveState={{ counter: 1 }} />
```

## expect state to equal object

You can pass an object that must be exactly the state

```jsx
<Expect element toHaveExactState={{ counter: 1 }} />
```

## use &lt;Is />

You can fine grain the selection using [Is](components/Is)

```jsx
<Expect
  element
  toHaveState={
    <Is true={ state => state.counter === 1 } />
  }
/>
```

You can also [Is](components/Is) inside an object

```jsx
<Expect
  element
  toHaveState={{
    counter: <Is lesser than={ 5 } />
  }}
/>
```
