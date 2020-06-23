import * as React from 'react'

export interface PropertyProps {
  name?: string | RegExp
  value?: any
}

const Property: React.FC<PropertyProps> = props => (
  <div />
)

export default Property

export function makePropertyLabel(props: PropertyProps) {
  const bits: string[] = []
  if ('name' in props) {
    if (typeof props.name === 'string') {
      bits.push(`which name is "${ props.name }"`)
    }
  }
  if ('value' in props) {
    bits.push(`which value is ${ JSON.stringify(props.value) }`)
  }
  return bits.join(' AND ')
}
