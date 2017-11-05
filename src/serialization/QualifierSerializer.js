export default class QualifierSerializer {
  serialize(qualifier) {
    return {
      property: qualifier.getProperty().toJSON(),
      value: qualifier.getValue().toJSON()
    }
  }
}
