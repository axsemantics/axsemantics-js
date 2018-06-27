/* eslint camelcase: "off" */
/* global URLSearchParams */

const IDM = function (fetch) {
	const api = {
		billing: {
			getAddress (group) {
				return api.fetch(`groups/${group}/billing-address`)
			},
			updateAddress (group, billing_address) {
				return api.fetch(`groups/${group}/billing-address`, 'PATCH', {billing_address})
			}
		},
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
			removeMember (group, email) {
				return api.fetch(`groups/${group}/member/${email}/`, 'DELETE')
			},
			appointRole (group, role, email) {
				return api.fetch(`groups/${group}/${role}/${email}/`, 'PUT')
			},
			revokeRole (group, role, email) {
				return api.fetch(`groups/${group}/${role}/${email}/`, 'DELETE')
			},
			purchaseSeat (group, pay_extra_money) {
				return api.fetch(`groups/${group}/purchase-seat/`, 'POST', {pay_extra_money})
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
				const qs = new URLSearchParams({email}).toString()
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
