import Qualifier from '../queryBuilder/Qualifier'
import Property from '../queryBuilder/Property'
import ValueFactory from '../queryBuilder/ValueFactory'

export default class QualifierDeserializer {
  deserialize(id, qualifier) {
    const result = new Qualifier(id)

    result.setProperty(new Property(qualifier.property))
    result.setValue(ValueFactory.newValue(qualifier.value))

    return result
  }
}
