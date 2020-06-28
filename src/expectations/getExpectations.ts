import { Dictionary, compact, findIndex, includes } from "lodash"
import { printGeneric } from "../print/common"

export type StoryEpic =
| 'type'

const TO_BE_REGEX_PART = '^((not|NOT) )?to( (not|NOT))? be( (not|NOT))?'
const TO_HAVE_REGEX_PART = '^((not|NOT) )?to( (not|NOT))? have( (not|NOT))? type($| which is( (not|NOT))?$)'

const BE_REGEX = new RegExp(`${ TO_BE_REGEX_PART } an?$`)
const HAVE_TYPE_REGEX = new RegExp(`${ TO_HAVE_REGEX_PART }`)

function isTypeSentence(sentence: string) {
  return isTypeSentence.Is(sentence) || isTypeSentence.Has(sentence)
}

isTypeSentence.Is = function(sentence: string) {
  return BE_REGEX.test(sentence)
}

isTypeSentence.Has = function(sentence: string) {
  return HAVE_TYPE_REGEX.test(sentence)
}

function isTypeEpic(sentence: string) {
  return isTypeSentence(sentence)
}

export class Story {
  epic: StoryEpic | null = null
  identifier: any
  not = false

  constructor (
    private readonly sentence: Sentence
  ) {
    this.findEpic()
    this.findIdentifier()
    this.verify()
    this.not = includes(this.sentence.words, 'not') || includes(this.sentence.words, 'NOT')
  }

  findEpic() {
    if (isTypeEpic(this.sentence.sentence)) {
      this.epic = 'type'
    }
  }

  findIdentifier() {
    if (this.epic === 'type') {
      let position = -1
      if (isTypeSentence.Is(this.sentence.sentence)) {
        position = findIndex(this.sentence.words, word => /^an?$/.test(word))
      } else if (isTypeSentence.Has(this.sentence.sentence)) {
        if (includes(this.sentence.words, 'is')) {
          if (/is not$/.test(this.sentence.sentence)) {
            position = findIndex(this.sentence.words, word => word === 'not')
          } else {
            position = findIndex(this.sentence.words, word => word === 'is')
          }
        } else {
          position = findIndex(this.sentence.words, word => word === 'type')
        }
      }
      if (position > -1) {
        this.identifier = this.sentence.values[position]
      }
    }
  }

  verify() {
    if (!this.epic) {
      throw new Error(`Could not find epic of story: ${ this.sentence.sentence }`)
    }
    if (!this.identifier) {
      throw new Error(`Could not find identifier for story: ${ this.sentence.sentence }`)
    }
  }

  toString() {
    return this.sentence.words
      .map((word, index) => {
        const value = this.sentence.values[index]
        if (value === true) {
          return word
        }
        return `${ word } ${ printGeneric(value) }`
      })
      .join(' ')
  }
}

interface Sentence {
  sentence: string
  words: string[]
  values: any[]
}

function getSentences(props: Dictionary<any>): Sentence {
  const words: string[] = []
  const values: any[] = []
  for (const prop in props) {
    words.push(prop)
    values.push(props[prop])
  }
  return {
    words: compact(words),
    sentence: compact(words).join(' '),
    values
  }
}

export default function getExpectations(element: React.ReactElement<any>) {
  const expectations: Story[] = []
  const sentences = getSentences(element.props)
  expectations.push(new Story(sentences))
  return expectations
}