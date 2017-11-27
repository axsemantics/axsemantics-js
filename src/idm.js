/* eslint camelcase: "off" */
import querystring from 'querystring'

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
			},
			invite (group, email, name) {
				return api.fetch(`groups/${group}/invitation/${email}/`, 'PUT', {name})
			},
			cancelInvite (group, email) {
				return api.fetch(`groups/${group}/invitation/${email}/`, 'DELETE')
			},
			appointRole (group, role, email) {
				return api.fetch(`groups/${group}/${role}/${email}/`, 'PUT')
			},
			revokeRole (group, role, email) {
				return api.fetch(`groups/${group}/${role}/${email}/`, 'DELETE')
			}
		},
		users: {
			getMe () {
				return api.fetch(`user/`)
			},
			save (user) {
				return api.fetch('user/', 'PATCH', user)
			},
			getByEmail (email) {
				const qs = querystring.stringify({email})
				return api.fetch(`user/?${qs}`)
			},
			saveSettings (settings) {
				return api.fetch('user/', 'PATCH', {
					settings
				})
			},
			acceptInvitation (user, group) {
				return api.fetch(`user/${user}/accept-invitation/${group}/`, 'POST')
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
