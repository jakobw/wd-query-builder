import specialValues from './specialValues'

export default class AnyMatchingValue {
  constructor(object) {
    this.object = object
  }

  getObject() {
    return `?${this.object}`
  }

  getLabel() {
    return specialValues.ANY_MATCHING.label
  }
}
