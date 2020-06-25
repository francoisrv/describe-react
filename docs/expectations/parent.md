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
