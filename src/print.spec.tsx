import { printGeneric, printType } from './print'
import Is from './components/Is'

describe('Common printers', () => {
  describe('Print generic', () => {
    it('should print number', () => {
      expect(printGeneric(24)).toEqual('24')
    })
    it('should print number in array', () => {
      expect(printGeneric([24])).toEqual('[24]')
    })
    it('should print named function', () => {
      expect(printGeneric(encodeURIComponent))
      .toEqual('encodeURIComponent')
    })
  })

  describe('Print type', () => {
    it('should print string', () => {
      expect(printType('div')).toEqual('div')
    })
    it('should print function', () => {
      expect(printType(Is)).toEqual('Is')
    })
  })
})
