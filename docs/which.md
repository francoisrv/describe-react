# Which

Allows you to fine-grain a selection.

It can be used as a selector:

```jsx
<Expect element which={ <Has text="abc" /> } />
```

Or inside an expectation:

```jsx
<To have text which={ <Has length={3} /> } />
```

You can also use an array if you want more than one assertion

```jsx
<Expect element which={[ <Has text="abc" />, <Has property="title" /> ]} />
```