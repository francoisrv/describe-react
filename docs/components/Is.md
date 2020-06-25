# Is

## Simple checks

```jsx
<Is true />
<Is false />
<Is null />
<Is not null />
<Is undefined />
<Is not undefined />
```

## Type checks

```jsx
<Is a string />
<Is not a string />

<Is a number />
<Is not a number />

<Is a boolean />
<Is not a boolean />

<Is an object />
<Is not an object />

<Is an array />
<Is not an array />

<Is a date />
<Is not a date />

<Is an error />
<Is not an error />

<Is a regular expression />
<Is not a regular expression />
```

## Equality

```jsx
<Is exactly={ 1 } />
<Is not={ 1 } />
<Is one of={[ 1, 2, 3 ]} />
<Is not one of={[ 1, 2, 3 ]} />
```

## Functions

```jsx
<Is true={ p => p === 1 } />
<Is not true={ p => p === 2 } />
<Is valid={ p => { expect(p).toEqual(1) } }>
<Is not valid={ p => { expect(p).toEqual(2) } }>
```