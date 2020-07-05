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

## Negation

You can negate the effect by using `not` or `NOT`

```jsx
<Has not text />
<Has NOT text="abc" />
```

## Text which

You could use a [which condition](which) too

Values expected:

- is not=`string`
- is either={`string[]`}
- is neither={`string[]`}
- is (not) an empty string
- has (not) length={`number`}
- has (not) length which={`<Is greater than=number />`}
- has (not) length which={`<Is greater than or equals=number />`}
- has (not) length which={`<Is lesser than=number />`}
- has (not) length which={`<Is lesser than or equals=number />`}
- is (not) matching={`RegExp`}
- is (not) matching either={`RegExp[]`}
- is (not) matching neither={`RegExp[]`}


```jsx
<Has text which={ <Is not="abc" /> } />
<Has
  text which={[
    <Is matching={ /foo/ } />,
    <Is neither={[ 'foo1', 'foo2' ]} />
  ]}
>
```
