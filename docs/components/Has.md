# Has

Check if a value has something. You can use the `not` or `no` property to negate the effect

## Has type

Check if a given element has a given type. You can use [which](which) to fine-grain the selection. A type identifier is either a string (for HTML elements) or a function (for React components)

```jsx
<Expect root element>
  <To have type="span" />
  <To have type which={ <Is either={[ 'span', App ]} /> } />
</Expect>
```

## Has text
Check if a given element has a given text

```jsx
<Has text /> // Element has text
<Has no text /> // Element does not have text at all
<Has text which={ <Is empty /> } /> // Element has text but it's an empty string
<Has text="abc" /> // Element has text which is exactly "abc"
<Has text which={ <Is matching={/abc/} /> } /> // Element has text which matches the regular expression /abc/
<Has text which={ <Has length={100} /> } /> // Element has text which has 100 characters
<Has text which={ <Has length which={ <Is greater than={100} /> } /> } /> // Element has text which has more than 100 characters
```

## Has property

## Has child

## Has sibling

## Has length

## Has entry

## Has property

## Has name

## Has value

## Has item
