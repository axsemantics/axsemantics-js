/* eslint camelcase: "off" */
/* global URLSearchParams */
const Quest = function (fetch) {
	const api = {
		quests: {
			list () {
				return api.fetch(`v1/quests/`)
			},
			get (id) {
				return api.fetch(`v1/quests/${id}/`)
			},
			finish (id, email) {
				return api.fetch(`v1/quests/${id}/finish/`, 'POST', {email})
			}
		},
		tasks: {
			list () {
				return api.fetch(`v1/tasks/`)
			},
			get (id) {
				return api.fetch(`v1/tasks/${id}/`)
			},
			finish (id, email) {
				return api.fetch(`v1/tasks/${id}/finish/`, 'POST', {email})
			}
		},
		users: {
			get (email) {
				const qs = new URLSearchParams({email}).toString()
				return api.fetch(`v1/users/?${qs}`)
			},
		}
	}
	api.fetch = fetch
	return api
}

export default Quest
