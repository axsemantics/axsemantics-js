/* eslint camelcase: "off" */
/* global URLSearchParams */

// TODO clean up old billing endpoints

const IDM = function (fetch) {
	const api = {
		billing: {
			createContact (group, data) {
				return api.fetch(`groups/${group}/contact/`, 'POST', data)
			},
			updateContact (group, contact, data) {
				return api.fetch(`groups/${group}/contact/${contact}/`, 'PUT', {data})
			},
			deleteContact (group, contact) {
				return api.fetch(`groups/${group}/contact/${contact}/`, 'DELETE')
			},
			getPaymentMethods (group) {
				return api.fetch(`groups/${group}/payment-method/`)
			},
			updatePaymentMethod (group, paymentMethod, data) {
				return api.fetch(`groups/${group}/payment-method/${paymentMethod}/`, 'PUT', {data})
			}
		},
		groups: {
			// TODO order
			list () {
				return api.fetch(`groups/`)
			},
			get (group) {
				return api.fetch(`groups/${group}/`)
			},
			chargeBeePortal (group) {
				return api.fetch(`groups/${group}/portal/`, 'POST')
			},
			checkout (group, payload) {
				return api.fetch(`groups/${group}/checkout/`, 'POST', payload)
			},
			estimateCheckout (payload) {
				return api.fetch(`groups/checkout-estimate/`, 'POST', payload)
			},
			prepareCheckout (payload) {
				return api.fetch(`groups/checkout-prepare/`, 'POST', payload)
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
			updatePrimaryPaymentMethod (group, payload) {
				return api.fetch(`groups/${group}/update-primary-payment-method/`, 'POST', payload)
			},
			scheduleLicenseChanges (group, plan) {
				return api.fetch(`groups/${group}/schedule-license-changes/`, 'POST', {plan})
			},
			cancelScheduledLicenseChanges (group) {
				return api.fetch(`groups/${group}/cancel-scheduled-license-changes/`, 'POST')
			},
			cancelLicense (group) {
				return api.fetch(`groups/${group}/cancel-license/`, 'POST')
			},
			getBillingInfo (group) {
				return api.fetch(`groups/${group}/billing-info/`)
			},
			updateBillingAddress (group, billing_address) {
				return api.fetch(`groups/${group}/billing-address/`, 'PUT', billing_address)
			},
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
