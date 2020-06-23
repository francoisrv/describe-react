import { BasicTypeDescriber, SelectedElement } from '../types'

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

export function getText(elem: SelectedElement): string | null {
  if (typeof elem === 'string') {
    return null
  }
  if (!elem.children.length) {
    return null
  }
  const textNodes: string[] = elem.children.filter(c => typeof c === 'string') as string[]
  if (!textNodes.length) {
    return null
  }
  return textNodes.join(' ')
}

export function getNumberWithOrdinal(n: number) {
  var s = ["th", "st", "nd", "rd"],
      v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
