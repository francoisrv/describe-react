# Selectors


You can select a single element or many of them. If you want to select a single element, use the `element` property -- otherwise use the `elements` property

```jsx
// Expect root element to have text
<Expect element>...</Expect>
// Expect root element and all its children to have type dib
<Expect elements>...</Expect>
```

## Single element

### Position

#### first

Expect first matching element

```jsx
<Expect first element>...</Expect>
```

#### last

Expect last matching element

```jsx
<Expect last element>...</Expect>
```

#### number

Expect element number n

```jsx
<Expect element number={5}>...</Expect>
```

#### n

Expect element zero-based number n

```jsx
// Expect 6th element
<Expect element at={5}>...</Expect>
```


### Root element

If it is not clear which element to pick, the root element will be used. So the following are all the same

- `<Expect element>...</Expect>`
- `<Expect root element>...</Expect>`
- `<Expect first element>...</Expect>`

## Many elements

### Position

### all

Expect all matching elements

```jsx
<Expect all elements>...</Expect>
```

### some

Expect all matching elements and expect at least one to match expectations

```jsx
<Expect some elements>...</Expect>
```

### first

Expect first n matching elements

```jsx
<Expect first={5} elements>...</Expect>
```

### last

Expect last n matching elements

```jsx
<Expect last={5} elements>...</Expect>
```

### at least

Expect at least n matching elements

```jsx
<Expect at least={5} elements>...</Expect>
```

### no more than

Expect no more than n matching elements

```jsx
<Expect no more than={5} elements>...</Expect>
```

### between

Expect between n and n2 matching elements

```jsx
<Expect between={5} and={10} elements>...</Expect>
```

