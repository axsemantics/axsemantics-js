/* eslint camelcase: "off" */
/* global URLSearchParams */
import {cleanQuery} from './utils'

const Quest = function (fetch) {
	const api = {
		quests: {
			list () {
				return api.fetch(`quests/`)
			},
			get (id) {
				return api.fetch(`quests/${id}/`)
			},
			finish (id, email) {
				return api.fetch(`quests/${id}/finish/`, 'POST', {email})
			}
		},
		tasks: {
			list () {
				return api.fetch(`tasks/`)
			},
			get (id) {
				return api.fetch(`tasks/${id}/`)
			},
			finish (id, email) {
				return api.fetch(`tasks/${id}/finish/`, 'POST', {email})
			}
		},
		users: {
			get (email) {
				const qs = new URLSearchParams({email}).toString()
				return api.fetch(`languages/?${qs}`)
			},
		}
	}
	api.fetch = fetch
	return api
}

export default Quest
