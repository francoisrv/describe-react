# Have type

Use it either as a selector or an expectation:

As a selector:

```jsx
<Expect element which={ <Has type="span" />}>
  // ....
</Expect>

<Expect elements which={ <Have type="span" />}>
  // ....
</Expect>
```

As an expectation

```jsx
<Expect element>
  <To have type="span" />
</Expect>
```

## Usage

Use the name of the component type. It could be either a string for HTML built-in elements or a component function / class

```jsx
<Has type="span" />
<Has type={ MyComponent } />
```

## Negation

You can negate the effect by using `not` or `NOT`

```jsx
<Has not type="span" />
<Has NOT type="span" />
```

## Type which

You could use a [which condition](which) too

Values accepted.

```jsx
<Has type which={ <Is exactly="span" /> } />
<Has type which={ <Is not="span" /> } />
<Has type which={ <Is either={[ 'span', 'div' ]} /> } />
<Has type which={ <Is neither={[ 'span', 'div' ]} /> } />
```
