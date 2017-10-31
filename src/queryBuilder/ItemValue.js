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
}
