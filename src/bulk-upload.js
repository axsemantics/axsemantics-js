/* eslint camelcase: "off" */
const BulkUpload = function (fetch, baseUrl, token) {
	const api = {
		uploads: {
			list () {
				return api.fetch(`uploads/`)
			}
		}
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

export default BulkUpload
