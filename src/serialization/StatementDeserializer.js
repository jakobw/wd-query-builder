import Statement from '../queryBuilder/Statement'
import Property from '../queryBuilder/Property'
import ValueFactory from '../queryBuilder/ValueFactory'

export default class StatementDeserializer {
  deserialize(id, statement) {
    const result = new Statement(id)

    result.setProperty(new Property(statement.property))
    result.setValue(ValueFactory.newValue(statement.value))

    return result
  }
}
