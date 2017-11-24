export default class Property {
  constructor(property) {
    this.property = property
  }

  getLabel() {
    return this.property.label
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

  getId() {
    return this.property.id
  }

  toJSON() {
    return {
      id: this.property.id,
      label: this.property.label
    }
  }
}
