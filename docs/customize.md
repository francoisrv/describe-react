# Write your own tests

You can write your own tests importing the React context `Context`

```jsx
import { Context } from 'describe-react'

function MyCustomTest(props) {
  return (
    <Context.Consumer>
    {
      ctx => {
        ctx.describe('Describe test here', () => {
          ctx.it('should do something', () => {
            // ... Your test here
          })
          ctx.it('should do something else', () => {
            // ... Your test here
          })
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
    ✓ should do something else
```