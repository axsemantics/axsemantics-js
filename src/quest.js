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
		},
		lessons: {
			list () {
				return api.fetch(`v1/lessons/`)
			},
			get (id) {
				return api.fetch(`v1/lessons/${id}/`)
			},
			create (lesson) {
				return api.fetch(`v1/lessons/`, 'POST', lesson)
			},
			// can only update linked_project and last_valid_route
			update (id, update) {
				return api.fetch(`v1/lessons/${id}/`, 'PATCH', update)
			},
			addStep (id, stepName) {
				return api.fetch(`v1/lessons/${id}/steps/`, 'POST', {step: stepName})
			},
			finish (id) {
				return api.fetch(`v1/lessons/${id}/finish/`, 'POST')
			}
		}
	}
	api.fetch = fetch
	return api
}

export default Quest
