/* eslint camelcase: "off" */
const IDM = function (fetch, baseUrl, token) {
	const api = {
		groups: {
			list () {
				return api.fetch(`groups/`)
			},
			get (group) {
				return api.fetch(`groups/${group}/`)
			},
			chargeBeePortal (group) {
				return api.fetch(`groups/${group}/portal/`, 'POST')
			}
		},
		user: {
			get () {
				return api.fetch(`user/`)
			}
		},
		tokenExchange (refresh_token) {
			const headers = {
				'Content-Type': 'application/json',
			}
			return fetch(baseUrl + 'token-exchange', headers, 'POST', {refresh_token})
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
