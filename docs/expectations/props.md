# Have property

Use it either as a selector or an expectation:

As a selector:

```jsx
<Expect element which={ <Has property="type" />}>
  // ....
</Expect>

<Expect elements which={ <Have property="type" />}>
  // ....
</Expect>
```

As an expectation

```jsx
<Expect element>
  <To have property="type" />
</Expect>
```

## Usage

Check if the target has any props at all

```jsx
<Has properties />
```

## Negation

You can negate the effect by using `not` or `NOT`

```jsx
<Has not properties />
```

## Property name

You can check for a property by name

```jsx
<Has property="type" />
```

## Property value

You can check for a property by value via [which condition](which)

```jsx
<Has property which={ <Is exactly="abc" /> } />
```

## Property name and value

You can check for a property by name and value

```jsx
<Has property="disabled" which={ <Is true /> } />
```
