# Siblings

Use it either as a selector or an expectation:

As a selector:

```jsx
<Expect element which={ <Has siblings />}>
  // ....
</Expect>

<Expect elements which={ <Have siblings />}>
  // ....
</Expect>
```

As an expectation

```jsx
<Expect element>
  <To have siblings />
</Expect>
```

## Usage

Check if the target has any siblings at all

```jsx
<Has siblings />
```

## Specify previous or next

Check if the target has previous siblings

```jsx
<Has previous siblings />
```

Check if the target has next siblings

```jsx
<Has next siblings />
```

## Direct sibling

```jsx
<Has direct sibling />
```

## Sibling range

```jsx
<Has exactly={5} previous siblings  />
<Has at least={5} previous siblings  />
<Has no more than={5} previous siblings  />
<Has between={5} amd {10} previous siblings  />
```

## Use with which

```jsx
<Has direct previous sibling which={ <Has type="div" /> } />
<Has exactly={ 5 } siblings which={ <Have text="abc" /> } />
```
