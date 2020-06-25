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

## expect state to have name

You can expect a state to have a specific name. You could use either a string or a regular expression to identify the name:

```jsx
<Expect element toHaveState="counter" />
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

## use &lt;State />

You can use the `<State />` component to fine grain your selection

```jsx
<Expect element toHaveState={ <State name="counter" value={ 1 } /> } />
```

### use &lt;State /> with only name

The `name` property accepts a string or a regular expression 

```jsx
<Expect element toHaveState={ <State name="counter" /> } />
```

### use &lt;State /> with only value

If only `value` is passed, it will check any entry of the state that equals that value

```jsx
<Expect element toHaveState={ <State value={ 1 } /> } />
```

### use &lt;State /> with name and assert or isTrue

[assert](functions/assert) is simply executed when [isTrue](functions/assert)  will throw if `true` is not returned

```jsx
<Expect
  element
  toHaveState={
    <State
      name="counter"
      assert={ value => { expect(typeof value).toEqual('number') } }
      isTrue={ value => value < 10 }
    />
  }
  />
```

Both functions will receive the following arguments:

- `value` The state value
- `name` The state name
- `state` The state
- `elem` The [react-test-renderer](https://reactjs.org/docs/test-renderer.html) instance of the targeted element
- `localState` The local state of the tests

### use &lt;State /> without name

If the `name` attribute is specified, each entry of the state will be checked

## expect to have state

If you just want to check if the element has any state at all, you could use the following

```jsx
<Expect element toHaveState />
<Expect element noToHaveState />
```

## expect state to satisfy assertion

You can use directly [assert](functions/assert) or [isTrue](functions/assert):

```jsx
<Expect
  element
  toHaveState={ assert(state => state.counter === 1) }
/>
```