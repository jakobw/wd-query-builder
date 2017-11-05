export default class StatementSerializer {
  serialize(statement) {
    return {
      property: statement.getProperty().toJSON(),
      value: statement.getValue().toJSON()
    }
  }
}
