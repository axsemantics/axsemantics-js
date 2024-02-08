/* global URLSearchParams */
import { cleanQuery } from './utils'

const lexicon = function (fetch, baseUrl, token) {
	const api = {
		nouns: {
			list (trainings, options = {}) {
				const query = {
					trainings,
					page_size: options.page_size || options.pageSize,
					language: options.language,
					search: options.search,
					o: options.modified
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`nouns/?${qs}`)
			},
			create (lexiconEntry) {
				return api.fetch('nouns/', 'POST', lexiconEntry)
			},
			delete (id) {
				return api.fetch(`nouns/${id}/`, 'DELETE')
			},
			get (id) {
				return api.fetch(`nouns/${id}/`)
			},
			update (lexiconEntry) {
				return api.fetch(`nouns/${lexiconEntry.id}/`, 'PATCH', lexiconEntry)
			},
			lookupLemma (trainingId, language, lemma) {
				return api.fetch(`nouns/lemma-lookup/${trainingId}/${language}/${lemma}/`)
			}
		},
		verbs: {
			list (trainings, options = {}) {
				const query = {
					trainings,
					page_size: options.page_size || options.pageSize,
					language: options.language,
					search: options.search,
					o: options.modified
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
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
			},
			lookupLemma (trainingId, language, lemma) {
				return api.fetch(`verbs/lemma-lookup/${trainingId}/${language}/${lemma}/`)
			}
		},
		adjectives: {
			list (trainings, options = {}) {
				const query = {
					trainings,
					page_size: options.page_size || options.pageSize,
					language: options.language,
					search: options.search,
					o: options.modified
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
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
			},
			lookupLemma (trainingId, language, lemma) {
				return api.fetch(`adjectives/lemma-lookup/${trainingId}/${language}/${lemma}/`)
			}
		},
		languageDefinitions: {
			list () {
				return api.fetch('definitions/')
			},
			get (language) {
				return api.fetch(`definitions/${language}/`)
			}
		}
	}
	api.fetch = fetch
	return api
}

export default lexicon
