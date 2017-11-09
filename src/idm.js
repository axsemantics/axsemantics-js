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
			invite (group, email) {
				return api.fetch(`groups/${group}/invitation/${email}/`, 'PUT')
			},
			cancelInvite (group, email) {
				return api.fetch(`groups/${group}/invitation/${email}/`, 'DELETE')
			},
			appointOwner (group, email) {
				return api.fetch(`groups/${group}/owner/${email}/`, 'PUT')
			},
			revokeOwner (group, email) {
				return api.fetch(`groups/${group}/owner/${email}/`, 'DELETE')
			},
			appointAdmin (group, email) {
				return api.fetch(`groups/${group}/admin/${email}/`, 'PUT')
			},
			revokeAdmin (group, email) {
				return api.fetch(`groups/${group}/admin/${email}/`, 'DELETE')
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
