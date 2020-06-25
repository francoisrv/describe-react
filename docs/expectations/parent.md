# Parent expectations

Expect target to have a specific parent

```jsx
<Describe label="Parent expectation">
  <Render>
    <table>
      <tbody>
        <tr />
      </tbody>
    </table>
  </Render>

  <Expect child="tr" toHaveParent="tbody" />
</Describe>
```

The value can be either a component, a `<Is />` or an `<Element />`

You can use one of these properties:

- `toHaveParent`
- `notToHaveParent`
- `toHaveDirectParent`
- `notToHaveDirectParent`
- `toHaveNonDirectParent`
- `notToHaveNonDirectParent`

You can also use an array where the first element is the parent descriptor and the second is the genealogy level

```jsx
<Describe label="Parent expectation">
  <Render>
    <table>
      <tbody>
        <tr>
          <td />
        </tr>
      </tbody>
    </table>
  </Render>

  <Expect child="td" toHaveParent={[ 'tbody', { genealogy: 2 } ]} />
</Describe>
```
