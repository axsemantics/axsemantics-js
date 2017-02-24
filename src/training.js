/* eslint camelcase: "off" */

const Training = function (fetch, baseUrl, token) {
	const api = {
		asoRequests: {
			list () {},
			get (id) {}
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
			list () {},
			get (id) {
				return api.fetch(`properties/${id}/`)
			},
			create () {},
			createGroup () {},
			duplicate (id) {},
			delete (id) {},
			update () {},
			vocabularies (id) {
				return api.fetch(`properties/${id}/vocabularies/`)
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
			list () {},
			get (id) {},
			create () {},
			delete (id) {},
			update () {}
			// a boatload of ops
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
			list () {},
			get (id) {},
			create () {},
			delete (id) {},
			update () {}
			// more ops
		},
		sentences: {
			list () {},
			get (id) {},
			create () {},
			delete (id) {},
			update () {}
			// more ops
		},
		sourceTexts: {
			list () {},
			get (id) {},
			create () {},
			delete (id) {},
			update () {}
		},
		storyTypes: {
			list () {},
			get (id) {},
			create () {},
			delete (id) {},
			update () {}
			// DUP
		},
		trainings: {
			list (fields = 'id,name') {
				return api.fetch(`trainings/?fields=${fields}&container_mode=True`)
			},
			get (id) {
				return api.fetch(`trainings/${id}/`)
			},
			properties (id) {
				return api.fetch(`properties/?training=${id}`)
			},
			create (name, license_holder) {
				return api.fetch(`trainings/`, 'POST', {
					name,
					license_holder,
					container_mode: true
				})
			},
			pushReferences (training) {
				return api.fetch(`trainings/${training.id}/`, 'PATCH', {
					myaxReferences: training.myaxReferences
				})
			}
		},
		vocabularies: {
			list () {},
			get (id) {},
			create () {},
			delete (id) {},
			update () {}
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
