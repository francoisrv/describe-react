import { isArray } from 'lodash'

import Is, { IsProps } from '../components/Is'
import Has, { HasProps } from '../components/Has'
import { isReactElementComponentOf } from '../utils'
import is from './is'
import has from './has'
import Have from '../components/Have'

type Expectation =
| React.ReactElement<IsProps<any>>
| React.ReactElement<HasProps>

export default function which(value: any, expected: Expectation | Expectation[]) {
  const expectations = isArray(expected) ? expected : [expected]
  for (const expectation of expectations) {
    if (isReactElementComponentOf(expectation, Is)) {
      is(value, expectation.props as IsProps<any>)
    } else if (isReactElementComponentOf(expectation, Has) || isReactElementComponentOf(expectation, Have)) {
      has(value, expectation.props as HasProps)
    }
  }
}
