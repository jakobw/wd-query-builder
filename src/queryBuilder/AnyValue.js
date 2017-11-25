import valueTypes from './valueTypes'

export default class AnyValue {
  constructor(object) {
    this.object = object
  }

  getObject() {
    return `?${this.object}`
  }

  getLabel() {
    return valueTypes.ANY.label
  }

  getId() {
    return valueTypes.ANY.id
  }

  toJSON() {
    return {
      object: this.object,
      id: this.getId(),
      label: valueTypes.ANY.label
    }
  }
}
