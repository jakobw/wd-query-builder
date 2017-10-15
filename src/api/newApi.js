import Api from './Api.js'

const ENDPOINT = 'https://www.wikidata.org/w/api.php'
const LANGUAGE = 'en'

export const api = new Api(ENDPOINT, LANGUAGE)
