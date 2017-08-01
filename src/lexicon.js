import querystring from 'querystring'
import { cleanQuery } from './utils'

const lexicon = function (fetch, baseUrl, token) {
	const api = {
		nouns: {
			list (trainings, options = {}) {
				const query = {
					trainings,
					page: options.page,
					language: options.language,
					o: options.modified
				}
				const qs = querystring.stringify(cleanQuery(query))
				return api.fetch(`nouns/?${qs}`)
			},
			create (lexiconEntry) {
				return api.fetch('nouns/', 'POST', lexiconEntry)
			},
			delete (id) {
				return api.fetch(`nouns/${id}/`, 'DELETE')
			},
			addTraining (id, trainingId) {
				return api.fetch(`nouns/${id}/add-training/`, 'POST', {training: trainingId})
			},
			removeTraining (id, trainingId) {
				return api.fetch(`nouns/${id}/remove-training/`, 'POST', {training: trainingId})
			},
			get (id) {
				return api.fetch(`nouns/${id}/`)
			},
			update (lexiconEntry) {
				return api.fetch(`nouns/${lexiconEntry.id}/`, 'PATCH', lexiconEntry)
			}
		},
		verbs: {
			list (trainings, options = {}) {
				const query = {
					trainings,
					page: options.page,
					language: options.language,
					o: options.modified
				}
				const qs = querystring.stringify(cleanQuery(query))
				return api.fetch(`verbs/?${qs}`)
			},
			create (lexiconEntry) {
				return api.fetch('verbs/', 'POST', lexiconEntry)
			},
			delete (id) {
				return api.fetch(`verbs/${id}/`, 'DELETE')
			},
			addTraining (id, trainingId) {
				return api.fetch(`verbs/${id}/add-training/`, 'POST', {training: trainingId})
			},
			removeTraining (id, trainingId) {
				return api.fetch(`verbs/${id}/remove-training/`, 'POST', {training: trainingId})
			},
			get (id) {
				return api.fetch(`verbs/${id}/`)
			},
			update (lexiconEntry) {
				return api.fetch(`verbs/${lexiconEntry.id}/`, 'PATCH', lexiconEntry)
			}
		},
		adjectives: {
			list (trainings, options = {}) {
				const query = {
					trainings,
					page: options.page,
					language: options.language,
					o: options.modified
				}
				const qs = querystring.stringify(cleanQuery(query))
				return api.fetch(`adjectives/?${qs}`)
			},
			create (lexiconEntry) {
				return api.fetch('adjectives/', 'POST', lexiconEntry)
			},
			delete (id) {
				return api.fetch(`adjectives/${id}/`, 'DELETE')
			},
			addTraining (id, trainingId) {
				return api.fetch(`adjectives/${id}/add-training/`, 'POST', {training: trainingId})
			},
			removeTraining (id, trainingId) {
				return api.fetch(`adjectives/${id}/remove-training/`, 'POST', {training: trainingId})
			},
			get (id) {
				return api.fetch(`adjectives/${id}/`)
			},
			update (lexiconEntry) {
				return api.fetch(`adjectives/${lexiconEntry.id}/`, 'PATCH', lexiconEntry)
			}
		},
		languageDefinitions: {
			get (language) {
				return api.fetch(`definitions/${language}/`)
			}
		}
	}
	api.fetch = fetch
	return api
}

export default lexicon
