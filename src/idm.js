/* eslint camelcase: "off" */
const IDM = function (fetch, baseUrl, token) {
	const api = {
		chargebee: {
			portal () {
				return api.fetch(`chargebee/portal/`, 'POST')
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

export default IDM
