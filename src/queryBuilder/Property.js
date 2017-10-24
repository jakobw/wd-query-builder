export default class PropertyPredicate {
  constructor(property) {
    this.property = property
  }

  getValuePredicate() {
    return `wdt:${this.property.id}`
  }
}
