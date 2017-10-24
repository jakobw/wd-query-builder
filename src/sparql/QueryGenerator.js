import Query from './Query'

export default class QueryGenerator {
  constructor(statementTriples, qualifierTriples) {
    this.statementTriples = statementTriples
    this.qualifierTriples = qualifierTriples
  }

  generateQuery() {
    const query = new Query()

    this.addVariables(query)
    this.addStatementTriples(query)

    query.addService('SERVICE wikibase:label { bd:serviceParam wikibase:language "en" . }')

    return query.toString()
  }

  addStatementTriples(query) {
    for (const subject in this.statementTriples) {
      for (const statementId in this.statementTriples[subject]) {
        const statement = this.statementTriples[subject][statementId]

        if (statement.getProperty() && statement.getValue()) {
          query.addTriple(
            `?${subject}`,
            statement.getProperty().getValuePredicate(),
            statement.getValue().getObject()
          )
        }
      }
    }
  }

  addVariables(query) {
    for (const subject in this.statementTriples) {
      query.addVariable(`?${subject}`)
      query.addVariable(`?${subject}Label`)
    }
  }
}
