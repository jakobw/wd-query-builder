import valueTypes from './valueTypes'

export default class AnyMatchingValue {
  constructor(object) {
    this.object = object
  }

  getObject() {
    return `?${this.object}`
  }

  getLabel() {
    return valueTypes.ANY_MATCHING.label
  }

  getId() {
    return valueTypes.ANY_MATCHING.id
  }

  toJSON() {
    return {
      object: this.object,
      id: this.getId(),
      label: valueTypes.ANY_MATCHING.label
    }
  }
}
