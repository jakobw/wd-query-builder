import StatementSerializer from './StatementSerializer'
import QualifierSerializer from './QualifierSerializer'

// TODO: inject?
const statementSerializer = new StatementSerializer()
const qualifierSerializer = new QualifierSerializer()

export default class QuerySerializer {
  serialize(query) {
    return {
      statements: this.serializeStatements(query.statements),
      qualifiers: this.serializeQualifiers(query.qualifiers)
    }
  }

  serializeStatements(statements) {
    const result = {}

    for (const subject in statements) {
      result[subject] = {}
      for (const statementId in statements[subject]) {
        result[subject][statementId] = statementSerializer.serialize(
          statements[subject][statementId]
        )
      }
    }

    return result
  }


  serializeQualifiers(qualifiers) {
    return {}
  }
}
