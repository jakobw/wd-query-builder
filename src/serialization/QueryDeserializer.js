import StatementDeserializer from './StatementDeserializer'
import QualifierDeserializer from './QualifierDeserializer'

// TODO: inject?
const statementDeserializer = new StatementDeserializer()
const qualifierDeserializer = new QualifierDeserializer()

export default class QueryDeserializer {
  deserialize(query) {
    return {
      statements: this.deserializeStatements(query.statements),
      qualifiers: this.deserializeQualifiers(query.qualifiers),
      limit: query.limit
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

    for (const subject in qualifiers) {
      result[subject] = {}

      for (const qualifierId in qualifiers[subject]) {
        result[subject][qualifierId] = qualifierDeserializer.deserialize(qualifierId, qualifiers[subject][qualifierId])
      }
    }

    return result
  }

}
