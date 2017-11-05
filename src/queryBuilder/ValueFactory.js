import specialValues from './specialValues'
import ItemValue from './ItemValue'

export default class SpecialValueFactory {
  static newValue(value) {
    const specialValue = this.specialValueFromId(value.id)

    if (specialValue) {
      return new specialValue.classConstructor(value.object)
    }

    return new ItemValue(value)
  }

  static specialValueFromId(id) {
    return Object.values(specialValues).find(value => value.id === id)
  }
}
