# Have text

Use it either as a selector or an expectation:

As a selector:

```jsx
<Expect element which={ <Has text="abc" />}>
  // ....
</Expect>

<Expect elements which={ <Have text="abc" />}>
  // ....
</Expect>
```

As an expectation

```jsx
<Expect element>
  <To have text="abc" />
</Expect>
```

## Usage

Check if the target has any text at all

```jsx
<Has text />
```

Check if the target has text "abc"

```jsx
<Has text="abc" />
```

Check if the target has text matching /abc/

```jsx
<Has text={ abc } />
```

## Negation

You can negate the effect by using `not` or `NOT`

```jsx
<Has not text />
<Has NOT text="abc" />
```

## Text which

You could use a [which condition](which) too

Example:

```jsx
<Has text which={ <Is either={[ 'abc', /def/ ]} /> } />
```