import StatementDeserializer from './StatementDeserializer'
import QualifierDeserializer from './QualifierDeserializer'

// TODO: inject?
const statementDeserializer = new StatementDeserializer()
const qualifierDeserializer = new QualifierDeserializer()

export default class QueryDeserializer {
  deserialize(query) {
    return {
      statements: this.deserializeStatements(query.statements),
      qualifiers: this.deserializeQualifiers(query.qualifiers)
    }
  }

  deserializeStatements(statements) {
    const result = {}

    for (const subject in statements) {
      result[subject] = {}

      for (const statementId in statements[subject]) {
        result[subject][statementId] = statementDeserializer.deserialize(statementId, statements[subject][statementId])
      }
    }

    return result
  }

  deserializeQualifiers(qualifiers) {
    const result = {}

    // for (const qualifier in qualifiers) {
    //   result[qualifier]
    // }

    return result
  }

}
