# General assertions

```jsx
<Describe label="Parent expectation">
  <Render>
    <span className="foo">Hello</span>
  </Render>

  <Expect
    root element
    toBeTrue={ elem => {
      elem.type === 'span' &&
      elem.props.className === 'foo' &&
      elem.children === ['Hello']
    } }
  />
  
  <Expect
    root element
    toBeValid={ elem => {
      expect(elem).toHaveProperty('type', 'span')
      expect(elem.props).toHaveProperty('className', 'foo')
      expect(elem.children).toEqual(['Hello'])
    } }
  />
</Describe>
```
