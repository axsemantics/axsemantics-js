/* eslint camelcase: "off" */
/* global URLSearchParams */
import { cleanQuery } from './utils'

const Training = function (fetch, baseUrl, token) {
	const api = {
		activityLogs: {
			list (trainingId, filters = {}, options = {}) {
				const query = {
					training: trainingId,
					page: options.page
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`v1/activity-logs/?${qs}`)
			},
			get (id) {
				return api.fetch(`v1/activity-logs/${id}/`)
			}
		},
		languages: {
			list () {
				return api.fetch(`v1/languages/`)
			},
			listAll () {
				return api.fetch(`v1/languages/all/`)
			}
		},
		translationPackages: {
			list ({projectId, assignee, state} = {}) {
				const query = {
					project: projectId,
					assignee,
					state
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`v3/translation-packages/?${qs}`)
			},
			get (id) {
				return api.fetch(`v3/translation-packages/${id}/`)
			},
			create (translationPackage) {
				return api.fetch(`v3/translation-packages/`, 'POST', translationPackage)
			},
			delete (id) {
				return api.fetch(`v3/translation-packages/${id}/`, 'DELETE')
			},
			update (translationPackage) {
				const {id, state, assignees, translation_items} = translationPackage
				return api.fetch(`v3/translation-packages/${id}/`, 'PATCH', {
					state,
					assignees,
					translation_items
				})
			},
		},
		translationItems: {
			list (translationPackageId) {
				console.log(translationPackageId)
				return api.fetch(`v3/translation-packages/${translationPackageId}/translation-items/`)
			},
			create ({ translationPackageId, translationItem }) {
				return api.fetch(
					`v3/translation-packages/${translationPackageId}/translation-items/`,
					'POST',
					translationItem
				)
			},
			delete ({ translationPackageId, objectType, objectId }) {
				return api.fetch(
					`v3/translation-packages/${translationPackageId}/translation-items/${objectType}-${objectId}`,
					'DELETE'
				)
			},
			update ({ translationPackageId, objectType, objectId, objectStatus }) {
				return api.fetch(
					`v3/translation-packages/${translationPackageId}/translation-items/${objectType}-${objectId}`,
					'PATCH',
					{ object_status: objectStatus }
				)
			},
		},
		trainings: {
			list (fields = 'id,name') {
				return api.fetch(`v1/trainings/?fields=${fields}`)
			},
			get (id) {
				return api.fetch(`v1/trainings/${id}/`)
			},
			properties (id) {
				return api.fetch(`v1/properties/?training=${id}`)
			},
			create (name, license_holder, more) {
				return api.fetch(`v1/trainings/`, 'POST', {
					name,
					license_holder,
					...more
				})
			},
			update (id, patchset) {
				return api.fetch(`v1/trainings/${id}/`, 'PATCH', patchset)
			},
			delete (id) {
				return api.fetch(`v1/trainings/${id}/`, 'DELETE')
			},
			publish (id) {
				return api.fetch(`v1/trainings/${id}/publish/`, 'POST')
			}
		},
		// https://github.com/aexeagmbh/rincewind/issues/317#issuecomment-286102626
		validationData: {
			list (trainingId) {
				return api.fetch(`v1/validation-data/?training=${trainingId}`)
			},
			get (id) {
				return api.fetch(`v1/validation-data/${id}/`)
			},
			create (validationData) {
				// {training, name, uid, data}
				return api.fetch(`v1/validation-data/`, 'POST', validationData)
			},
			createSyncedDocument (trainingId, collection_id, document) {
				return api.fetch(`v1/validation-data/create-synced/`, 'POST', {
					training: trainingId,
					name: document.name,
					uid: document.uid,
					data: document.blob,
					myax_api_version: 2,
					myax_reference: {
						collection_id,
						document_id: document.id
					}
				})
			},
			update (validationData) {
				const {id, name, uid, data} = validationData
				return api.fetch(`v1/validation-data/${id}/`, 'PATCH', {
					name,
					uid,
					data
				})
			},
			delete (id) {
				return api.fetch(`v1/validation-data/${id}/`, 'DELETE')
			},
			select (id, language) {
				return api.fetch(`v1/validation-data/${id}/select/`, 'PUT', {language})
			},
			selectDefault (id, language) {
				return api.fetch(`v1/validation-data/${id}/select-global/`, 'PUT', {language})
			},
			sync (validationData) {
				const {id, name, uid, data} = validationData
				return api.fetch(`v1/validation-data/${id}/sync/`, 'PUT', {
					name,
					uid,
					data
				})
			}
		},
		import: {
			import (trainingId, atml) {
				return api.fetch(`v1/trainings/${trainingId}/import/`, 'PUT', {
					atml
				})
			},
			migrate (oldTrainingId, newTrainingId, options) {
				return api.fetch(`v1/trainings/${newTrainingId}/migrate-from-rincewind/`, 'POST', {
					rincewind_training_id: oldTrainingId,
					copy_collections: options && options.copyCollections,
					parametrize_expressions: options && options.parametrizeExpressions
				})
			},
			status (trainingId) {
				return api.fetch(`v1/trainings/${trainingId}/import/?latest=1`)
			}
		}
	}

	api.fetch = fetch
	return api
}

export default Training
