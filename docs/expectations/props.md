Property
====
You can expect the target to have specific properties 

```jsx
<To have properties />
<NOT to have properties />
<To have property="foo" />
<NOT to have property="foo" />
<To have property="foo" which equals="bar" />
<To have property="foo" which is not null />
<To have properties={{ foo: 'bar', enabled: <Is true /> }} />
<To have the following properties>
  <Has one property with name="foo" which equals="bar" />
  <Has one property with name="disabled" which is true />
</To >
<To have exactly the following properties in that order>
  <Has one property with name="foo" which equals="bar" />
  <Has one property with name="disabled" which is true />
</To >
```

## has properties

- To have properties
- To have some properties

## does not have properties

- NOT to have properties
- To have no properties

## has a property with a specific name

- To have (a) property="foo"
- To have (a) property named="foo"
- To have (a) property with name="foo"

## has a property with a specific name and value

- To have (a) property="foo" which equals="bar"
- To have (a) property="foo" which is not null