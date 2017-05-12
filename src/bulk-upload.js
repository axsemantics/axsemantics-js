/* eslint camelcase: "off" */
/* global FormData */
const BulkUpload = function (fetch, idToken) {
	const api = {
		uploads: {
			list () {
				return api.fetch(`uploads/?page_size=100`)
			},
			get (uploadId) {
				return api.fetch(`uploads/${uploadId}/`)
			},
			upload (collectionId, hint, file) {
				const data = new FormData()
				data.append('collection_id', collectionId)
				data.append('hint', hint)
				data.append('data_file', file)
				return api.fetch(`uploads/`, 'POST', data)
			}
		},
		itemResponses: {
			listByUpload (uploadId) {
				return api.fetch(`item-responses/?upload=${uploadId}`)
			}
		}
	}

	api.fetch = function (url, method, body) {
		const headers = {
			'authorization': `JWT ${idToken}`,
			'Accept': 'application/json'
		}
		if (!(body instanceof FormData)) {
			headers['Content-Type'] = 'application/json'
		}
		return fetch(url, method, body, headers)
	}
	return api
}

export default BulkUpload
