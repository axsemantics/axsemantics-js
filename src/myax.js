/* eslint camelcase: "off" */
import querystring from 'querystring'
import { cleanQuery, cleanNulls } from './utils'

const fieldsFromOptions = function (options) {
	return options.fields instanceof Array ? options.fields.join(',') : options.fields
}

const MyAx = function (fetch, baseUrl, token) {
	const api = {
		instantEndpoint: {
			list  (training_id, options = {}) {
				const query = {
					training_id,
					page_size: options.pageSize || 50,
					fields: fieldsFromOptions(options),
					is_instant: true
				}
				const qs = querystring.stringify(cleanQuery(query))
				return api.fetch(`v2/collections/?${qs}`)
			},
			create (collection) {
				collection.is_instant = true
				return api.fetch(`v2/collections/`, 'POST', collection)
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
				const qs = querystring.stringify(cleanNulls(query))
				return api.fetch(`v2/collections/?${qs}`)
			},
			get (id, options = {}) {
				const query = {
					fields: fieldsFromOptions(options)
				}
				const qs = querystring.stringify(cleanQuery(query))
				return api.fetch(`v2/collections/${id}/?${qs}`)
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
					flags: collection.flags
				})
			},
			generateAll (id) {
				return api.fetch(`v2/collections/${id}/generate-content/`, 'POST')
			},
			generateFiltered (id, search, processingState) {
				const query = {}
				if (search) query.search = search
				if (processingState) query.processing_state = processingState
				const qs = querystring.stringify(query)
				return api.fetch(`v2/collections/${id}/generate-content/?${qs}`, 'POST')
			}
		},
		me: {
			get () {
				return api.fetch(`v1/me/`)
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
				const qs = querystring.stringify(cleanQuery(query))
				return api.fetch(`v2/documents/?${qs}`)
			},
			// blob has to contain 'name' and 'uid'
			create (collectionId, blob) {
				return api.fetch(`v2/collections/${collectionId}/document/`, 'POST', blob)
			},
			// options = {fields}
			get (id, options = {}) {
				const query = {
					fields: fieldsFromOptions(options)
				}
				const qs = querystring.stringify(cleanQuery(query))
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
			list (collectionId) {
				const query = {
					collection: collectionId
				}
				const qs = querystring.stringify(cleanQuery(query))
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
				const qs = querystring.stringify(cleanQuery(query))
				return api.fetch(`v2/story-exports/?${qs}`)
			},
			get (id) {
				return api.fetch(`v2/story-exports/${id}/`)
			},
		},
		contentProjects: {
			list (training_id) {
				return api.fetch(`v1/content-project/?training_id=${training_id}`)
			},
		}
	}

	api.fetch = fetch
	return api
}

export default MyAx
