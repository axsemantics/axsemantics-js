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
			create (name, training_id, language) {
				return api.fetch(`v2/collections/`, 'POST', {
					language,
					training_id,
					name,
					training_tag: 'draft', // TODO
					license_holder: 'aexea-developers' // TODO
				})
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
			}
		},
		me: {
			get () {
				return api.fetch(`v1/me/`)
			}
		},
		// https://github.com/aexeagmbh/myax/blob/master/myax/document/processing_states.py
		documents: {
			listForCollection (collectionId, search) {
				const qs = querystring.stringify({
					collection: collectionId,
					search: search
				})
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
