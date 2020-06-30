# Have state

Use it either as a selector or an expectation:

As a selector:

```jsx
<Expect element which={ <Has state="counter" />}>
  // ....
</Expect>

<Expect elements which={ <Have state="counter" />}>
  // ....
</Expect>
```

As an expectation

```jsx
<Expect element>
  <To have state="counter" />
</Expect>
```

## Usage

Check if the target has any state at all

```jsx
<Has state />
```

## Negation

You can negate the effect by using `not` or `NOT`

```jsx
<Has not state />
```

## State name

You can check for a state by name

```jsx
<Has state="counter" />
```

You can use a condition

```jsx
const isACounter = <Is either={[ 'clickCounter', 'visitCounter' ]} />

<Has state={{ which: isACounter }} />
```

## State value

You can check for a state by value via [which condition](which)

```jsx
<Has state which={ <Is exactly={0} /> } />
```

## State name and value

You can check for a state by name and value

```jsx
<Has state="counter" which={ <Is a number /> } />
```
