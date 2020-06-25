Text
===

You can expect a target to have or not a specific text using the attributes `toHaveText` or `notToHaveText`

## Has text

Will check if target has text or not

```jsx
<Describe label="has text">
  <Render>
    <div>
      <span>hello</span>
      <span />
    </div>
  </Render>

  <Expect first child toHaveText />
  <Expect last child notToHaveText />
</Describe>
```

Since both these attributes accept boolean, `toHaveText={ false }` is equivalent to `notToHaveText`, and `notToHaveText={ false }` is equivalent to `toHaveText`.

## Has exact text

Checks if target has exact text

```jsx
<Describe label="has exact text">
  <Render>
    <div>the brown fox jumps over the lazy dog</div>
  </Render>

  <Expect root element
    toHaveText="the brown fox jumps over the lazy dog"
    notToHaveText="brown fox jump"
  />
</Describe>
```

## Matches text

You can also use a regular expression to match a text

```jsx
<Describe label="matches text">
  <Render>
    <div>the brown fox jumps over the lazy dog</div>
  </Render>

  <Expect
    root element
    toHaveText={ /brown/ }
    notToHaveText={ /purple/ }
  />
</Describe>
```

## Has verified text

In case you want more advanced control, you could use the [isTrue](functions/isTrue) function which will throw if the function does not return true.

```jsx
<Describe label="matches text">
  <Render>
    <div>hello</div>
  </Render>

  <Expect
    root element
    toHaveText={
      isTrue(
        text => text.length > 2,
        'Text should be more than 2 characters long'
      )
    }
  />
</Describe>
```

## Has asserted text

You could use the [assert](functions/assert) function which is executed. You could place your own assertions inside the body of the function

```jsx
<Describe label="matches text">
  <Render>
    <div>hello</div>
  </Render>

  <Expect
    root element
    toHaveText={
      assert(
        text => { expect(text).toHaveLength(15) },
        'Expect text to be 15 characters long'
      )
    }
  />
</Describe>
```

## Has text which is one of

You could use the [One](components/One) component to match one of the list. It accepts any conditions accepted by `toHaveText` except `<One of />`

```jsx
<Describe label="matches text">
  <Render>
    <div>hello</div>
  </Render>

  <Expect
    root element
    toHaveText={
      <One
        of={[
          'hello',
          'bye',
          /foo/,
          isTrue(fn),
          assert(fn)
        ]}
      />
    }
  />
</Describe>
```
