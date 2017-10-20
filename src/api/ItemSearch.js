export default class PropertySearch {
  constructor(api) {
    this.api = api
  }

  search(term) {
    return this.api.request({
      action: 'wbsearchentities',
      format: 'json',
      continue: 0,
      search: term,
      type: 'item'
    }).then(data => {
      return data.search
    })
  }
}
