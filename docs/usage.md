# Usage

The idea is to render an element and then apply a bunch of expectations to it:

```jsx
<Describe label="Basic usage">
  <Render>
    <div>Hello world!</div>
  </Render>

  <Expect>
    <To have text="Hello world!" />
  </Expect>
</Describe>
```

## Libraries

`describe-react` is built upon [jest](https://jestjs.io/) and [react-test-renderer](https://reactjs.org/docs/test-renderer.html).

View our section on [jest](jest) for more details

## Expectations

`Expect` expects:

- properties that are a [selector](selectors)
- children that are a [To](components/To) element containing an expectation

Example:

```jsx
<Expect
  first={5} elements="li"
  which={[
     <Have property="disabled" which={ <Is true /> } />,
     <Have next sibling="li" />
  ]}
>
  <To
    have first child="span"
    which={ <Has property="className" which={ <Is either={[ 'favorite', 'seclected' ]} /> } /> }
  />
</Expect>
```