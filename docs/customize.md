# Write your own tests

You can write your own tests importing the React context `Context`

```jsx
import { Context } from 'describe-react'

function MyCustomTest(props) {
  return (
    <Context.Consumer>
    {
      ctx => {
        ctx.sections.push({
          label: 'Describe test here',
          skip: false,
          only: false,
          timeout: null,
          sections: [
            {
              label: 'it should do something',
              fn: () => {
                // ... Your test here
                // You can use async functions too
              }
            }
          ]
        })
        // Don't forget to return an element
        return <div />
      }
    }
    </Context.Consumer>
  )
}

<Describe label="My custom test">
  <MyCustomTest />
</Describe>
```

```
PASS
My custom test
  Describe test here
    ✓ should do something
```