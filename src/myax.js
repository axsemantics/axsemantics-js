/* eslint camelcase: "off" */
/* global URLSearchParams */
import { cleanQuery, cleanNullsorUndefined } from './utils'

const fieldsFromOptions = function (options) {
	return options.fields instanceof Array ? options.fields.join(',') : options.fields
}

const MyAx = function (fetch, baseUrl, token) {
	const api = {
		instantGenerationEndpoints: {
			list  (training_id, options = {}) {
				const query = {
					training_id,
					page_size: options.pageSize || 50,
					fields: fieldsFromOptions(options),
					is_instant: true
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`v2/collections/?${qs}`)
			},
			get (id, options = {}) {
				return api.collections.get(id, options)
			},
			create (endpoint) {
				endpoint.is_instant = true
				return api.fetch(`v2/collections/`, 'POST', endpoint)
			}
		},
		collections: {
			// options = {page_size: 50, fields}
			list (training_id, options = {}) {
				const query = {
					training_id,
					page_size: options.pageSize || 50,
					fields: fieldsFromOptions(options),
					is_instant: false
				}
				const qs = new URLSearchParams(cleanNullsorUndefined(query)).toString()
				return api.fetch(`v2/collections/?${qs}`)
			},
			get (id, options = {}) {
				const query = {
					fields: fieldsFromOptions(options)
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`v2/collections/${id}/?${qs}`)
			},
			getProcessingStates (collectionId) {
				return api.fetch(`v2/collections/${collectionId}/document-processing-states/`)
			},
			// collection = { language, training_id, name, licence_holder, training_tag: 'draft' }
			create (collection) {
				return api.fetch(`v2/collections/`, 'POST', collection)
			},
			delete (id) {
				return api.fetch(`v2/collections/${id}/`, 'DELETE')
			},
			save (collection) {
				return api.fetch(`v2/collections/${collection.id}/`, 'PATCH', {
					name: collection.name,
					language: collection.language,
					uses_published_training: collection.uses_published_training,
					webhook_secret: collection.webhook_secret,
					webhook_url: collection.webhook_url,
					fail_webhook_url: collection.fail_webhook_url,
					flags: collection.flags
				})
			},
			generateAll (id) {
				return api.fetch(`v2/collections/${id}/generate-content/`, 'POST')
			},
			generateFiltered (id, search, processingState) {
				const query = {
					search,
					processing_state: processingState
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`v2/collections/${id}/generate-content/?${qs}`, 'POST')
			},
			empty (id) {
				return api.fetch(`v2/collections/${id}/empty/`, 'POST')
			}
		},
		// https://github.com/aexeagmbh/myax/blob/master/myax/document/processing_states.py
		// optional search and processingState ['none', 'requested', 'generated', 'delivered', 'failed']
		documents: {
			// filters = {search, processingState}
			// options = {fields}
			list (collectionId, filters = {}, options = {}) {
				const query = {
					collection: collectionId,
					search: filters.search,
					processing_state: filters.processingState,
					fields: options.fields
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`v2/documents/?${qs}`)
			},
			// blob has to contain 'name' and 'uid'
			create (collectionId, blob) {
				return api.fetch(`v2/collections/${collectionId}/document/`, 'POST', blob)
			},
			// blob has to contain 'name'
			updateOrCreateByUid (collectionId, blob, uid) {
				const payload = Object.assign({uid}, blob)
				return api.fetch(`v2/collections/${collectionId}/update-or-create-by-uid/?uid=${uid}`, 'POST', payload)
			},
			// options = {fields}
			get (id, options = {}) {
				const query = {
					fields: fieldsFromOptions(options)
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`v2/documents/${id}/?${qs}`)
			},
			generate (id) {
				return api.fetch(`v2/documents/${id}/generate-content/?highprio`, 'POST')
			},
			delete (documentId) {
				return api.fetch(`v2/documents/${documentId}/`, 'DELETE')
			}
		},
		histograms: {
			// filters = {latest: Boolean}
			list (collectionId, filters = {}) {
				let query = {
					collection: collectionId
				}
				if (filters && filters.latest) {
					query.latest = true
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`v2/histograms/?${qs}`)
			},
			create (collectionId) {
				const data = {
					collection: collectionId
				}
				return api.fetch(`v2/histograms/`, 'POST', data)
			},
			get (id) {
				return api.fetch(`v2/histograms/${id}/`)
			}
		},
		exports: {
			list (collectionId) {
				const query = {
					collection: collectionId
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`v2/story-exports/?${qs}`)
			},
			get (id) {
				return api.fetch(`v2/story-exports/${id}/`)
			},
		},
		limits: {
			projects: {
				list (query = {}) {
					const qs = new URLSearchParams(cleanQuery(query)).toString()
					return api.fetch(`v3/limits/projects/?${qs}`)
				},
				activate (id) {
					return api.fetch(`v3/limits/projects/${id}/activate/`, 'POST')
				},
				deactivate (id) {
					return api.fetch(`v3/limits/projects/${id}/deactivate/`, 'POST')
				}
			},
			languages: {
				list (query = {}) {
					const qs = new URLSearchParams(cleanQuery(query)).toString()
					return api.fetch(`v3/limits/languages/?${qs}`)
				},
				activate (id) {
					return api.fetch(`v3/limits/languages/${id}/activate/`, 'POST')
				},
				deactivate (id) {
					return api.fetch(`v3/limits/languages/${id}/deactivate/`, 'POST')
				}
			},
			documents: {
				list (query = {}) {
					const qs = new URLSearchParams(cleanQuery(query)).toString()
					return api.fetch(`v3/limits/documents/?${qs}`)
				},
				activate (id) {
					return api.fetch(`v3/limits/documents/${id}/activate/`, 'POST')
				},
				deactivate (id) {
					return api.fetch(`v3/limits/documents/${id}/deactivate/`, 'POST')
				}
			}
		}
	}

	api.fetch = fetch
	return api
}

export default MyAx
