import { BasicTypeDescriber } from '../types'

export function printAny(v: any): string {
  if (typeof v === 'function') {
    if (v.name) {
      return `function ${ v.name }`
    }
    const string = `${ v }`
    const lines = string.split(/\n/)
    if (lines.length < 5) {
      return string
    }
    return [
      lines[0],
      lines[1],
      lines[2],
      lines[3],
      '',
      `  ... ${ lines.length - 5 } other lines`,
      '}'
    ].join('\n')
  }
  return v
}

export function printType(type: BasicTypeDescriber): string {
  if (typeof type === 'string') {
    return type
  }
  return printAny(type).replace(/^function /, '')
}

export function printProperties(props: { [name: string]: any }): string {
  const results: string[] = []
  for (const prop in props) {
    if (typeof props[prop] === 'string') {
      results.push(`${ prop }="${ props[prop] }"`)
    } else {
      results.push(`${ prop }={ ${ printAny(props[prop]) } }`)
    }
  }
  return results.join(' ')
}
