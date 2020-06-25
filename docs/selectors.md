# Selectors

## Root element

This will target the root element

```jsx
<Describe label="Target root element">
  <Render>
    <div>
      <span />
    </div>
  </Render>

  <Expect root element toHaveType="div" />
</Describe>
```

You could also omit `root`:

```jsx
<Expect element toHaveType="div" />
```

## Child element

This will target a specific children

### First child

By default, the first child will be targeted

```jsx
<Expect child toHaveType="div" />
// Same as
<Expect first child toHaveType="div" />
```

```jsx
<Describe label="Target first child">
  <Render>
    <div>
      <span />
    </div>
  </Render>

  <Expect child toHaveType="span" />
</Describe>
```

### Last child

Target last child

```jsx
<Describe label="Target first child">
  <Render>
    <div>
      <span>1</span>
      <span>3</span>
    </div>
  </Render>

  <Expect last child toHaveText="3" />
</Describe>
```

### Only child

Target child and expect it to be the only child

```jsx
<Describe label="Target first child">
  <Render>
    <div>
      <span>1</span>
    </div>
  </Render>

  <Expect only child />
</Describe>
```

### nth child

Target child at position *n*

```jsx
<Describe label="Target first child">
  <Render>
    <div>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
    </div>
  </Render>

  <Expect child at={ 3 } toHaveText="4" />
</Describe>
```

### Child with type

You can specify the child's type

```jsx
<Describe label="Target first child">
  <Render>
    <table>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </tbody>
    </table>
  </Render>

  <Expect child="td" toHaveText="1" />
</Describe>
```

You can also use [Is](components/is)

```jsx
<Expect child={ <Is not="div" /> } >
```

### Child with &lt;Element />

You can specify the child's element

```jsx
<Describe label="Target first child">
  <Render>
    <table>
      <tbody>
        <tr>
          <td className="foo">1</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </tbody>
    </table>
  </Render>

  <Expect
    child={ <Element props={{ className: 'foo' }} /> }
    toHaveText="1"
  />
</Describe>
```

## Children

You can target all children

```jsx
<Expect children toHaveType="div" />
// Is the same than
<Expect all children toHaveType="div" />
```

### Range children

```jsx
<Expect first={ 2 } children toHaveType="div" />
<Expect last={ 5 } children toHaveType="div" />
<Expect children range={[ 5, 15 ]} toHaveType="div" />
```

`children` accept the same values as `child` 
