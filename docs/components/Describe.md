# Describe component

Use the `Describe` component as the root element of your tests

```jsx
<Describe label="Describe">
  // Your tests here
</Describe>
```

## Properties

### label (required)

The name of your tests

### only and skip (optional)

You can use [only](https://jestjs.io/docs/en/api#describeonlyname-fn) or [skip](https://jestjs.io/docs/en/api#describeskipname-fn)

```jsx
<Describe label="Describe" only>
  // Your tests here
</Describe>
```

Note that `only` and `skip` can not be used together. If that's the case, the first one encountered will be used
