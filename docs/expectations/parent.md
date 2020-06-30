# Parent

Use it either as a selector or an expectation:

As a selector:

```jsx
<Expect element which={ <Has parent which={ <Has type="div" /> } />}>
  // ....
</Expect>

<Expect elements which={ <Have parent which={ <Has type="div" /> } />}>
  // ....
</Expect>
```

As an expectation

```jsx
<Expect element>
  <To have parent which={ <Has type="div" /> } />
</Expect>
```

## Negation

You can negate the effect by using `not` or `NOT`

## Child position

By default, the first child is scanned when using `child`. You can change that:

```jsx
<Has no child />
<Has first child />
<Has last child />
<Has only child />
<Has child number={5} />
```

## Children range

By default, all the children are scanned when using `children`. You can change that:

```jsx
<Has no children />
<Has some children />
<Has exactly={ 5 } children />
<Has at least={ 5 } children />
<Has no more than={ 5 } children />
<Has between={ 5 } and={ 10 } children />
```

## Direct children

By default all children, even the nested one are selected. You can use `direct` so select only direct children

```jsx
<Has last direct child />
<Has exactly={ 5 } direct children />
```
