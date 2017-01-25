/* eslint camelcase: "off" */
import querystring from 'querystring'
// TODO add v1 thing api
const MyAx = function (fetch, baseUrl, token) {
	const api = {
		collections: {
			list () {
				return api.fetch(`v2/collections/?page_size=50`)
			},
			listFromTraining (trainingId) {
				return api.fetch(`v2/collections/?training_id=${trainingId}&page_size=50`)
			},
			get (id) {
				return api.fetch(`v2/collections/${id}/`)
			},
			// collection = { language, training_id, name, licence_holder, training_tag: 'draft' }
			create (collection) {
				return api.fetch(`v2/collections/`, 'POST', collection)
			},
			delete (id) {
				return api.fetch(`v2/collections/${id}/`, 'DELETE')
			},
			save (collection) {
				api.fetch(`v2/collections/${collection.id}/`, 'PATCH', {
					name: collection.name,
					language: collection.language,
					uses_published_training: collection.uses_published_training,
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
			listForCollection (collectionId, search, processingState) {
				const query = {
					collection: collectionId
				}
				if (search) query.search = search
				if (processingState) query.processing_state = processingState
				const qs = querystring.stringify(query)
				return api.fetch(`v2/documents/?${qs}`)
			},
			// blob has to contain 'name' and 'uid'
			create (collectionId, blob) {
				return api.fetch(`v2/collections/${collectionId}/document/`, 'POST', blob)
			},
			get (id) {
				return api.fetch(`v2/documents/${id}/`)
			},
			generate (id) {
				return api.fetch(`v2/documents/${id}/generate-content/?highprio`, 'POST')
			},
			delete (documentId) {
				return api.fetch(`v2/documents/${documentId}/`, 'DELETE')
			}
		},
		contentProjects: {
			list () {
				return api.fetch(`v2/content-project/`)
			},
			get (id) {
				return api.fetch(`v2/content-project/${id}/`)
			},
		},
		things: {
			list (contentProjectId, search) {
				return api.fetch(`v2/content-project/${contentProjectId}/thing/`)
			}
		},
	}

	api.fetch = function (url, method, body) {
		const headers = {
			'Content-Type': 'application/json',
			'authorization': `JWT ${token}`
		}
		return fetch(url.startsWith('http') ? url : baseUrl + url, headers, method, body)
	}
	return api
}

export default MyAx
