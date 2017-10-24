export default class PropertyPredicate {
  constructor(property) {
    this.property = property
  }

  getValuePredicate() {
    return `wdt:${this.property.id}`
  }

  getStatementPredicate() {
    return `p:${this.property.id}`
  }

  getStatementValuePredicate() {
    return `ps:${this.property.id}`
  }

  getQualifierPredicate() {
    return `pq:${this.property.id}`
  }
}
