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

### Transformers

- all
- direct
- first
- last
- next
- only
- previous
- some

## Identifiers

### child

```jsx
<Element child="div" />
<Element child={ <Is one of={[ 'div', 'span' ]} /> } />
```

It accepts:

- a type
- [Is](components/Is)
- [Element](components/Element)