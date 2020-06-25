# Child expectation

Expect target to have a specific child

```jsx
<Describe label="Child expectation">
  <Render>
    <table>
      <tbody>
        <tr />
      </tbody>
    </table>
  </Render>

  <Expect child="tbody" toHaveChild="tr" />
  <Expect child="tbody" toHaveChild={[ 'tr', { at: 7 } ]} />
</Describe>
```

The value can be either a component, a `<Is />` or an `<Element />`

You can use one of these properties:

- `toHaveChild`
- `notToHaveChild`
- `toHaveOnlyChild`
- `notToHaveOnlyChild`
- `toHaveFirstChild`
- `notToHaveFirstChild`
- `toHaveLastChild`
- `notToHaveLastChild`
