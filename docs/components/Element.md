# Element

Defines an element

```jsx
<Element
  type="input"
  props={{ type: 'text' }}
/>
```

## Properties

### Identifiers

- child
- children
- parent
- props
- sibling
- state
- text
- type

## child

Will select an element which child matches assertion

```jsx
<Element child="div" />
<Element child={ <Is one of={[ 'div', 'span' ]} /> } />
<Element child={ <Element props={{ disabled: true }} /> } />
```

It accepts:

- a type
- [Is](components/Is)
- [Element](components/Element)

You can also fine-grain the child selection:

```jsx
<Element onlyChild="div" />
<Element firstChild="div" />
<Element lastChild={ <Is one of={[ 'div', 'span' ]} /> } />
<Element childAt={[ div, 7 ]} />
```

## children

```jsx
<Element children="div" />
<Element children="div" />
<Element childrenAt={[ 'div', 5, 15 ]}>
```
