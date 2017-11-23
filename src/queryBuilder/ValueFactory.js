import valueTypes from './valueTypes'
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
    return Object.values(valueTypes).find(value => value.id === id)
  }
}
