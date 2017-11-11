import Query from './Query'

export default class QueryGenerator {
  constructor(query) {
    this.statementTriples = query.statementTriples
    this.qualifierTriples = query.qualifierTriples
    this.limit = query.limit
    this.select = query.select
  }

  generateQuery() {
    const query = new Query()

    this.addVariables(query)
    this.addStatementTriples(query)
    this.addQualifierTriples(query)
    this.addPropertiesToSelect(query)

    query.addService('SERVICE wikibase:label { bd:serviceParam wikibase:language "en" . }')

    query.setLimit(this.limit)

    return query.toString()
  }

  addStatementTriples(query) {
    for (const subject in this.statementTriples) {
      for (const statementId in this.statementTriples[subject]) {
        const statement = this.statementTriples[subject][statementId]

        if (statement.getProperty() && statement.getValue()) {
          const statementVariable = this.statementVariable(statement.getId())

          query.addTriple(
            `?${subject}`,
            statement.getProperty().getStatementPredicate(),
            statementVariable
          )

          query.addTriple(
            statementVariable,
            statement.getProperty().getStatementValuePredicate(),
            statement.getValue().getObject()
          )
        }
      }
    }
  }

  addQualifierTriples(query) {
    for (const subject in this.qualifierTriples) {
      for (const qualifierId in this.qualifierTriples[subject]) {
        const qualifier = this.qualifierTriples[subject][qualifierId]
        const statement = this.statementVariable(subject)

        query.addTriple(
          statement,
          qualifier.getProperty().getQualifierPredicate(),
          qualifier.getValue().getObject()
        )
      }
    }
  }

  statementVariable(name) {
    return `?${name}Statement`
  }

  addVariables(query) {
    for (const subject in this.statementTriples) {
      query.addVariable(`?${subject}`)
      query.addVariable(`?${subject}Label`)
    }
  }

  addPropertiesToSelect(query) {
    for (const subject in this.select) {
      this.select[subject].properties.forEach(property => {
        const varName = `?${subject}` + this.labelToVar(property.label)

        query.addOptionalTriple(
          `?${subject}`,
          `wdt:${property.id}`, //TODO: should use property object
          varName
        )
        query.addVariable(varName)
      })
    }
  }

  labelToVar(label) {
    return label.replace(/[^\w]+/g, '')
  }
}
