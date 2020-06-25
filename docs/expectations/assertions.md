# Composite assertions

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

  <Expect child="td" toPass={ elem => {} } />
</Describe>
```
