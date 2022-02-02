import { cleanQuery } from './utils'

/* eslint camelcase: "off" */
/* global URLSearchParams */
const Report = function (fetch, idToken) {
	const api = {
		reports: {
			list (licenseGroup, filters = {}, options = {}) {
				const query = Object.assign({}, filters, {
					license_group: licenseGroup,
					page: options.page,
					page_size: options.pageSize,
					collection: undefined,
					project: undefined
				})
				if (filters.collection) {
					query.scope = 'collection'
					query.subject = filters.collection
				} else if (filters.project) {
					query.scope = 'project'
					query.subject = filters.project
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`v3/reports/?${qs}`)
			},
			get (id) {
				return api.fetch(`v3/reports/${id}/`)
			},
		},
	}

	api.fetch = function (url, method) {
		// *allow* caching
		const headers = {
			Authorization: `JWT ${idToken}`,
			'Content-Type': 'application/json'
		}
		return fetch(url, method, undefined, headers)
	}
	return api
}

export default Report
