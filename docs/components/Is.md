# Is

## Simple checks

```jsx
<Is anything />
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

### Any

```jsx
<Is equal to={ 1 } />
<Is not={ 1 } />
<Is one of={[ 1, 2, 3 ]} />
<Is not one of={[ 1, 2, 3 ]} />
```

## Dates and numbers

```jsx
<Is lesser than={ 100 } />
<Is lesser than or equal to={ 100 } />
<Is greater than={ 100 } />
<Is greater than or equal to={ 100 } />
<Is between={[ 0, 100 ]} />
<Is not between={[ 0, 100 ]} />
```

## Regular expressions

```jsx
<Is matching={ /abc/ } />
<Is not matching={ /abc/ } />
```

## Arrays

```jsx
<Is having={ 1 } />
<Is not having={ 1 } />
<Is having length={ 4 } />
<Is not having length={ 4 } />
<Is having length lesser than={ 100 } />
<Is having length lesser than or equal to={ 100 } />
<Is having length greater than={ 100 } />
<Is having length greater than or equal to={ 100 } />
<Is having length between={[ 0, 100 ]} />
<Is not having length between={[ 0, 100 ]} />
```

## Functions

```jsx
<Is true={ p => p === 1 } />
<Is not true={ p => p === 2 } />
<Is valid={ p => { expect(p).toEqual(1) } }>
<Is not valid={ p => { expect(p).toEqual(2) } }>
```
