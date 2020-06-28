Type expectations
===

## Has type

You can expect the target to have a specific type by using one of these equivalent methods:

```jsx
<Expect>
  <To be a="span" />
</Expect>

<Expect>
  <To have type="span" />
</Expect>

<Expect to be a="span" />

<Expect to have type="span" />
```

Different ways of writing this:

- to be a="span"
- to have type="span"
- to have type which is="span"
- to have type which is a="span"

## Does not have type

You can expect the target not to have a specific type by using one of these equivalent methods:

```jsx
<Expect>
  <To NOT be a="span" />
</Expect>

<Expect>
  <To NOT have type="span" />
</Expect>

<Expect NOT to be a="span" />

<Expect NOT to have type="span" />
```

Different ways of writing this:

- to be a="span"
- to have type="span"
- to have type which is="span"
- to have type which is a="span"

## Has one of the types

You can expect the target to have one of specific types by using one of these equivalent methods:

```jsx
<Expect>
  <To be one of={[ 'span', 'div' ]} />
</Expect>

<Expect>
  <Or>
    <To be a="span" />
    <To be a="div" />
  </Or>
</Expect>

<Expect>
  <To have type which is one of={[ 'span', 'div' ]} />
</Expect>

<Expect>
  <Or>
    <To have type="span" />
    <To have type="div" />
  </Or>
</Expect>

<Expect to be one of={[ 'span', 'div' ]} />

<Expect to have type which is one of={[ 'span', 'div' ]}  />
```

## Has none of the types

You can expect the target to have none of specific types by using one of these equivalent methods:

```jsx
<Expect>
  <To not be one of={[ 'span', 'div' ]} />
</Expect>

<Expect>
  <To be none of={[ 'span', 'div' ]} />
</Expect>

<Expect>
  <Or>
    <To not be a="span" />
    <To not be a="div" />
  </Or>
</Expect>

<Expect>
  <To not have type which is one of={[ 'span', 'div' ]} />
</Expect>

<Expect>
  <To have type which is not one of={[ 'span', 'div' ]} />
</Expect>

<Expect>
  <To have type which is none of={[ 'span', 'div' ]} />
</Expect>

<Expect>
  <Or>
    <To not have type="span" />
    <To not have type="div" />
  </Or>
</Expect>

<Expect not to be one of={[ 'span', 'div' ]} />

<Expect to be none of={[ 'span', 'div' ]} />

<Expect not to have type which is one of={[ 'span', 'div' ]}  />

<Expect to have type which is not one of={[ 'span', 'div' ]}  />

<Expect to have type which is none of={[ 'span', 'div' ]}  />
```
