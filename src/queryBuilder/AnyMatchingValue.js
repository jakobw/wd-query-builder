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

  getId() {
    return specialValues.ANY_MATCHING.id
  }

  toJSON() {
    return {
      object: this.object,
      id: this.getId(),
      label: specialValues.ANY_MATCHING.label
    }
  }
}
