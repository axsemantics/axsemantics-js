/* eslint camelcase: "off" */
const IDM = function (fetch) {
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
			},
			saveSettings (settings) {
				return api.fetch('user/', 'PATCH', {
					settings
				})
			}
		},
		tokenExchange (refresh_token) {
			const headers = {
				'Content-Type': 'application/json',
			}
			return fetch('token-exchange/', 'POST', {refresh_token}, headers)
		}
	}

	api.fetch = fetch
	return api
}

export default IDM
