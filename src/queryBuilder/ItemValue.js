export default class ItemValue {
  constructor(item) {
    this.item = item
  }

  getObject() {
    return `wd:${this.item.id}`
  }

  getLabel() {
    return this.item.label
  }

  getId() {
    return this.item.id
  }

  toJSON() {
    return {
      id: this.item.id,
      label: this.item.label
    }
  }
}
