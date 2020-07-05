# Quick start

Create a new directory. Inside this directory create a new `package.json` via the command:

```bash
npm init
```

Then install the following dependencies:

```bash
npm install react
npm install --dev jest describe-react
```

Now creates a new file `App.js` with the following contents:

```jsx
import React from 'react'

export default function App() {
  return (
    <div>
      Hello world!
    </div>
  )
}
```

Now creates a new file `App.spec.js` with the following contents:

```jsx
import React from 'react'
import run, { Describe, Render, Expect } from 'describe-react'
import App from './App'

run(() => (
  <Describe label="App">
    <Render>
      <App />
    </Render>

    <Expect element="div">
      <To have text="Hello world!" />
    </Expect>
  </Describe>
))
```

You can now run your tests via this command

```bash
jest
```

This will print the following to the console:

```
PASS ./App.spec.js
App
  Expect root element
    ✓ to have text which equals "Hello world!"
```
