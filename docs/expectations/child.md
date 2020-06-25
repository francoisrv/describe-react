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
</Describe>
```
