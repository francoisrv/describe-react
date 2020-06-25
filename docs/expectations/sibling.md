# Sibling assertions

Expect target to have a specific sibling

```jsx
<Describe label="Parent expectation">
  <Render>
    <div>
      <span />
      <hr />
    </div>
  </Render>

  <Expect child="span" toHaveSibling="hr" />
</Describe>
```

The value can be either a component, a `<Is />` or an `<Element />`

You can use one of these properties:

- `toHaveSibling`
- `notToHaveSibling`
- `toHavePreviousSibling`
- `notToHavePreviousSibling`
- `toHaveNextSibling`
- `notToHaveNextSibling`
- `toHaveDirectSibling`
- `notToHaveDirectSibling`
- `toHaveNonDirectSibling`
- `notToHaveNonDirectSibling`
- `toHaveDirectPreviousSibling`
- `notToHaveDirectPreviousSibling`
- `toHaveNonDirectPreviousSibling`
- `notToHaveNonDirectPreviousSibling`
- `toHaveDirectNextSibling`
- `notToHaveDirectNextSibling`
- `toHaveNonDirectNextSibling`
- `notToHaveNonDirectNextSibling`

You can also use an array where the first element is the parent descriptor and the second is the previous or next position

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

  <Expect child="td" toHaveSibling={[ 'tbody', { previous: -2 } ]} />
</Describe>
```
