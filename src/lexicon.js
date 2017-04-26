import querystring from 'querystring'
import { cleanQuery } from './utils'

const lexicon = function (fetch, baseUrl, token) {
	const api = {
		entries: {
			list (trainings, options = {}) {
				const query = {
					trainings,
					page: options.page,
					language: options.language,
					o: options.modified
				}
				const qs = querystring.stringify(cleanQuery(query))
				return api.fetch(`lexica/?${qs}`)
			},
			create (lexiconEntry) {
				return api.fetch('lexica/', 'POST', lexiconEntry)
			},
			delete (id) {
				return api.fetch(`lexica/${id}/`, 'DELETE')
			},
			addTraining (id, trainingId) {
				return api.fetch(`lexica/${id}/add-training/`, 'POST', {training: trainingId})
			},
			removeTraining (id, trainingId) {
				return api.fetch(`lexica/${id}/remove-training/`, 'POST', {training: trainingId})
			},
			getLexiconEntry (id) {
				return api.fetch(`lexica/${id}/`)
			},
			patch (id, lexiconEntry) {
				return api.fetch(`lexica/${id}/`, 'PATCH', lexiconEntry)
			}
		}
	}
	api.fetch = fetch
	return api
}

export default lexicon
