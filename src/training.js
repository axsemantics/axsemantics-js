/* eslint camelcase: "off" */
/* global URLSearchParams */
import { cleanQuery, cleanNulls } from './utils'

const Training = function (fetch, baseUrl, token) {
	const api = {
		activityLogs: {
			list (trainingId, filters = {}, options = {}) {
				const query = {
					training: trainingId,
					page: options.page
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`activity-logs/?${qs}`)
			},
			get (id) {
				return api.fetch(`activity-logs/${id}/`)
			}
		},
		asoRequests: {
			list () {},
			get (id) {
				return api.fetch(`aso-requests/${id}/`)
			}
		},
		languages: {
			list () {
				return api.fetch(`languages/`)
			},
			listAll () {
				return api.fetch(`languages/all/`)
			}
		},
		lookupTables: {
			list () {},
			get (id) {},
			create () {},
			delete (id) {},
			update () {}
		},
		lookupValues: {
			list () {},
			get (id) {},
			create () {},
			delete (id) {},
			update () {}
		},
		lookups: {
			list () {},
			get (id) {},
			create () {},
			delete (id) {},
			update () {}
		},
		properties: {
			list (trainingId, filters = {}, options = {}) {
				const query = {
					training: trainingId,
					search: filters.search,
					page: options.page
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`properties/?${qs}`)
			},
			get (id) {
				return api.fetch(`properties/${id}/`)
			},
			create (property) {
				return api.fetch(`properties/`, 'POST', property) // {training,name, truth_expression, mapping_expression, comment}
			},
			createGroup () {},
			duplicate (id, name) {
				return api.fetch(`properties/${id}/duplicate/`, 'POST', {name})
			},
			delete (id) {
				return api.fetch(`properties/${id}/`, 'DELETE')
			},
			update (property) {
				const {id, name, truthExpression, mappingExpression, comment, x, y, z, height, width, typeHint, userReferences} = property
				const patchset = cleanNulls({
					name,
					truthExpression,
					mappingExpression,
					comment,
					typeHint,
					userReferences,
					x,
					y,
					z,
					height,
					width
				})
				return api.fetch(`properties/${id}/`, 'PATCH', patchset)
			}
		},
		sentenceGroups: {
			list () {},
			get (id) {},
			create () {},
			delete (id) {},
			update () {}
		},
		sentenceVariantContainers: {
			list (sentenceVariantId) {
				return api.fetch(`sentence-variant-containers/?sentence_variant=${sentenceVariantId}`)
			},
			get (id) {
				return api.fetch(`sentence-variant-containers/${id}/`)
			},
			create (container) {
				return api.fetch(`sentence-variant-containers/`, 'POST', container)
			},
			delete (id) {},
			update (container) {
				return api.fetch(`sentence-variant-containers/${container.id}/`, 'PATCH', container)
			},
			split (id, start, end) {
				return api.fetch(`sentence-variant-containers/${id}/split/`, 'POST', {start, end})
			},
			toGrammar (id) {
				return api.fetch(`sentence-variant-containers/${id}/to-grammar/`, 'POST')
			},
			toGroup (id, propertyId, groupMethod) {
				return api.fetch(`sentence-variant-containers/${id}/to-group/`, 'POST', {
					containerProperty: propertyId,
					group_method: groupMethod
				})
			},
			toPhrase (id, propertyId) {
				return api.fetch(`sentence-variant-containers/${id}/to-phrase/`, 'POST', {
					containerProperty: propertyId
				})
			},
			toPlain (id) {
				return api.fetch(`sentence-variant-containers/${id}/to-plain/`, 'POST')
			},
			toText (id) {
				return api.fetch(`sentence-variant-containers/${id}/to-text/`, 'POST')
			},
			toValue (id, propertyId) {
				return api.fetch(`sentence-variant-containers/${id}/to-value/`, 'POST', {
					containerProperty: propertyId
				})
			}
		},
		sentenceVariantSynonymValues: {
			list () {},
			get (id) {},
			create () {},
			delete (id) {},
			update () {}
		},
		sentenceVariantSynonyms: {
			list () {},
			get (id) {},
			create () {},
			delete (id) {},
			update () {}
		},
		sentenceVariantTags: {
			list () {},
			get (id) {}
		},
		sentenceVariants: {
			list (sentenceId, options = {}) {
				const query = {
					sentence: sentenceId,
					page: options.page
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`sentence-variants/?${qs}`)
			},
			get (id) {
				return api.fetch(`sentence-variants/${id}/`)
			},
			// sentenceVariant: {sentence, text, language, sample_output, property_output, tags: []}
			// sentence is name of sentence, not id
			create (sentenceVariant) {
				return api.fetch(`sentence-variants/`, 'POST', sentenceVariant)
			},
			duplicate (id) {
				return api.fetch(`sentence-variants/${id}/duplicate/`, 'POST')
			},
			delete (id) {
				return api.fetch(`sentence-variants/${id}/`, 'DELETE')
			},
			update (sentenceVariant) {
				const {id, text, language, sample_output, property_output, tags} = sentenceVariant
				return api.fetch(`sentence-variants/${id}/`, 'PATCH', {
					text,
					language,
					sample_output,
					property_output,
					tags
				})
			},
			// more ops
		},
		sentences: {
			list (trainingId, options = {}) {
				const query = {
					training: trainingId,
					page: options.page
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`sentences/?${qs}`)
			},
			get (id) {
				return api.fetch(`sentences/${id}/`)
			},
			create (sentence) {
				return api.fetch(`sentences/`, 'POST', sentence) // {training, name, style, comment, command, obligatory, auto_triggered, triggers}
			},
			duplicate (id, name) {
				return api.fetch(`sentences/${id}/duplicate/`, 'POST', {name})
			},
			delete (id) {
				return api.fetch(`sentences/${id}/`, 'DELETE')
			},
			update (sentence) {
				const {id, name, style, comment, command, obligatory, auto_triggered, triggers} = sentence
				return api.fetch(`sentences/${id}/`, 'PATCH', {
					name,
					style,
					comment,
					command,
					obligatory,
					auto_triggered,
					triggers
				})
			},
			validateVariants (id) {
				return api.fetch(`sentences/${id}/validate-sentence-variants/`, 'POST')
			}
		},
		sourceTexts: {
			list () {},
			get (id) {},
			create () {},
			duplicate (id) {},
			delete (id) {},
			update () {}
		},
		storyTypes: {
			list (trainingId) {
				const query = {
					training: trainingId
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`story-types/?${qs}`)
			},
			get (id) {
				return api.fetch(`story-types/${id}/`)
			},
			create (storyType) {
				return api.fetch(`story-types/`, 'POST', storyType)
			},
			duplicate (id, name) {
				return api.fetch(`story-types/${id}/duplicate/`, 'POST', {name})
			},
			delete (id) {
				return api.fetch(`story-types/${id}/`, 'DELETE')
			},
			update (storyType) {
				const {id, name, auto_triggered, triggers, sentences} = storyType
				return api.fetch(`story-types/${id}/`, 'PATCH', {
					name,
					auto_triggered,
					triggers,
					sentences
				})
			},
		},
		trainings: {
			list (fields = 'id,name') {
				return api.fetch(`trainings/?fields=${fields}`)
			},
			get (id) {
				return api.fetch(`trainings/${id}/`)
			},
			properties (id) {
				return api.fetch(`properties/?training=${id}`)
			},
			create (name, license_holder, more) {
				return api.fetch(`trainings/`, 'POST', {
					name,
					license_holder,
					...more
				})
			},
			update (id, patchset) {
				return api.fetch(`trainings/${id}/`, 'PATCH', patchset)
			},
			delete (id) {
				return api.fetch(`trainings/${id}/`, 'DELETE')
			},
			pushReferences (training) {
				return api.fetch(`trainings/${training.id}/`, 'PATCH', {
					myaxReferences: training.myaxReferences
				})
			},
			requestAso (training, language, validation_data) {
				return api.fetch(`trainings/${training.id}/aso-request/`, 'POST', {
					language,
					validation_data,
					aso_mode: 'json'
				})
			},
			publish (id) {
				return api.fetch(`trainings/${id}/publish/`, 'POST')
			},
			generateProperty (training, dataKeyName, dataType, languages) {
				const _languages = languages || ['*']
				const _dataType = dataType || 'string'
				return api.fetch(`trainings/${training.id}/generate-properties/`, 'POST', {
					dataKeys: [{name: dataKeyName, type: _dataType}],
					languages: _languages
				})
			}
		},
		// https://github.com/aexeagmbh/rincewind/issues/317#issuecomment-286102626
		validationData: {
			list (trainingId) {
				return api.fetch(`validation-data/?training=${trainingId}`)
			},
			get (id) {
				return api.fetch(`validation-data/${id}/`)
			},
			create (validationData) {
				// {training, name, uid, data}
				return api.fetch(`validation-data/`, 'POST', validationData)
			},
			createSyncedDocument (trainingId, collection_id, document) {
				return api.fetch(`validation-data/create-synced/`, 'POST', {
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
				return api.fetch(`validation-data/${id}/`, 'PATCH', {
					name,
					uid,
					data
				})
			},
			delete (id) {
				return api.fetch(`validation-data/${id}/`, 'DELETE')
			},
			select (id, language) {
				return api.fetch(`validation-data/${id}/select/`, 'PUT', {language})
			},
			selectDefault (id, language) {
				return api.fetch(`validation-data/${id}/select-global/`, 'PUT', {language})
			},
			sync (validationData) {
				const {id, name, uid, data} = validationData
				return api.fetch(`validation-data/${id}/sync/`, 'PUT', {
					name,
					uid,
					data
				})
			}
		},
		vocabularies: {
			list (propertyId, filters = {}, options = {}) {
				const query = {
					property: propertyId,
					language: filters.language,
					page: options.page
				}
				const qs = new URLSearchParams(cleanQuery(query)).toString()
				return api.fetch(`vocabularies/?${qs}`)
			},
			get (id) {
				return api.fetch(`vocabularies/${id}/`)
			},
			create (vocabulary) {
				return api.fetch(`vocabularies/`, 'POST', vocabulary)
			},
			delete (id) {
				return api.fetch(`vocabularies/${id}/`, 'DELETE')
			},
			update (vocabulary) {
				const {id, noun, headnoun, adjective} = vocabulary
				const patchset = cleanNulls({
					noun,
					headnoun,
					adjective
				})
				return api.fetch(`vocabularies/${id}/`, 'PATCH', patchset)
			}
		},
		import: {
			import (trainingId, atml) {
				return api.fetch(`trainings/${trainingId}/import/`, 'PUT', {
					atml
				})
			},
			migrate (oldTrainingId, newTrainingId, options) {
				return api.fetch(`trainings/${newTrainingId}/migrate-from-rincewind/`, 'POST', {
					rincewind_training_id: oldTrainingId,
					copy_collections: options && options.copyCollections,
					parametrize_expressions: options && options.parametrizeExpressions
				})
			},
			status (trainingId) {
				return api.fetch(`trainings/${trainingId}/import/?latest=1`)
			}
		}
	}

	// sentence-variant-containers/?sentence_variant=<PK>
	// 	containerContent: syntaxoutput
	// 	source: quelltext
	//
	// 	/split {start, end} => [preceeding container?, new text-container, succeeding container?]
	//
	// 	/to-group /to-value /to-text /to-plain…
	//
	// 	/insert-container-before /insert-container-after
	//
	// 	sentence-variant-containers/attributes-specification/ attributes als dict
	// 	/sentence-variant-containers/parameters-specification/ liste [{type: String, }]
	// 	sentence-variant-containers/group-method-specification/

	api.fetch = fetch
	return api
}

export default Training
