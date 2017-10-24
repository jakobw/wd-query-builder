export default class Statement {
  constructor(id) {
    this.id = id
  }

  getId() {
    return this.id
  }

  setProperty(property) {
    this.property = property
  }

  setValue(value) {
    this.value = value
  }

  getProperty() {
    return this.property
  }

  getValue() {
    return this.value
  }
}
