// TODO: use sparqljs or something more sophisticated
export default class Query {
  constructor() {
    this.variables = []
    this.triples = []
    this.optionalTriples = []
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

  addOptionalTriple(subject, predicate, object) {
    this.optionalTriples.push([subject, predicate, object])
  }

  joinOptionalTriples() {
    return this.optionalTriples.reduce(
      (acc, triple) => acc + 'OPTIONAL {' + triple.join(' ') + ' .}',
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
      + this.joinOptionalTriples()
      + this.services.join(' ')
      + ' } '
      + (this.limit ? 'LIMIT ' + this.limit : '')
  }
}
