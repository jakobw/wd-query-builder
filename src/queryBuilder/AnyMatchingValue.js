export default class AnyMatchingValue {
  constructor(object) {
    this.object = object
  }

  getObject() {
    return `?${this.object}`
  }
}
