# Usage

## Expectations

Expectations are made of two parts:

- the target(s) to which the expectation should be applied
- the expectation(s) to apply

## Root element

If targeting is omitted, it will target the root element:

```jsx
<Describe label="Omitting target hence defaulting to root element">
  <Render>
    <span />
  </Render>

  <Expect toHaveType="span" />
</Describe>
```

## Expect children and properties

`Expect` accept children which are either

- a target
- an expectation

Yet these can be translated into properties if they are not complex

Imagine the following context

```jsx
<div>
  <span>hello</span>
  <span>goodbye</span>
</div>
```

Let's say we expect the first child being a span to have text hello.

We could write it like this:

```jsx
<Expect>
  <Is first="span" />
  <To Have text="hello" />
</Expect>
```

Or like this:

```jsx
<Expect first="span" toHaveText="hello" />
```

You could also mix properties and children:

```jsx
<Expect first="span">
  <To Have text="hello" />
</Expect>
```

Or:

```jsx
<Expect toHaveText="hello">
  <Is first="span" />
</Expect>
```