import expectElementToHaveType from './type/expectElementToHaveType'
import expectElementToHaveText from './text/expectElementToHaveText'

const expectElement = {
  toHaveType: expectElementToHaveType,

  toHaveText: expectElementToHaveText,
}

export default expectElement
