# Is

Check if a value is something. You can use the `not` property to negate the effect

## Simple checks

```jsx
<Is true />
<Is false />
<Is null />
<Is undefined />
```

## Type checks

```jsx
<Is a string />
<Is a number />
<Is a boolean />
<Is an object />
<Is an array />
<Is a function />
<Is a date />
<Is an error />
<Is a regular expression />
<Is empty />
```

## Equality

### Any

```jsx
<Is equal to={ 1 } />
<Is not={ 1 } />
<Is either={[ 1, 2, 3 ]} />
<Is neither={[ 1, 2, 3 ]} />
```

## Dates and numbers

```jsx
<Is lesser than={ 100 } />
<Is lesser than or equal to={ 100 } />
<Is greater than={ 100 } />
<Is greater than or equal to={ 100 } />
<Is between={[ 0, 100 ]} />
```

## Regular expressions

```jsx
<Is matching={ /abc/ } />
<Is matching either={[ /abc/, /def/ ]} />
<Is matching neither={[ /abc/, /def/ ]} />
```
