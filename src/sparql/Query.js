// TODO: use sparqljs or something more sophisticated
export default class Query {
  constructor() {
    this.variables = []
    this.triples = []
    this.services = []
  }

  addVariable(variable) {
    this.variables.push(variable)
  }

  addTriple(subject, predicate, object) {
    this.triples.push([subject, predicate, object])
  }

  joinTriples() {
    return this.triples.reduce(
      (acc, triple) => acc + triple.join(' ') + ' .',
      ''
    )
  }

  addService(service) {
    this.services.push(service)
  }

  setLimit(limit) {
    if (limit === '') {
      limit = 20
    }
    this.limit = limit
  }

  toString() {
    return 'SELECT DISTINCT '
      + this.variables.join(' ')
      + ' WHERE {'
      + this.joinTriples()
      + this.services.join(' ')
      + ' } '
      + (this.limit ? 'LIMIT ' + this.limit : '')
  }
}
