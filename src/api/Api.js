import jsonp from 'jsonp'
import queryString from 'query-string'

export default class Api {
  constructor(endpoint, language) {
    this.endpoint = endpoint;
    this.language = language;
  }

  request(requestData) {
    requestData.language = requestData.language || this.language
    requestData.uselang = requestData.uselang || this.language

    return new Promise((resolve, reject) => {
      jsonp(
        this.endpoint + '?' + queryString.stringify(requestData),
        { param: 'callback' },
        function (err, data) {
          if (err) reject(err)
          else resolve(data)
        }
      )
    })
  }
}
