import base from './_base'

const Training = function (baseUrl, token) {
	const api = {
		trainings: {
			list () {
				return api.fetch(`trainings/?fields=id,name&container_mode=True`)
			},
			get (id) {
				return api.fetch(`trainings/${id}/`)
			},
			properties (id) {
				return api.fetch(`properties/?training=${id}`)
			},
			create (name) {
				return api.fetch(`trainings/`, 'POST', {
					name,
					container_mode: true
				})
			},
			pushReferences (training) {
				return api.fetch(`trainings/${training.id}/`, 'PATCH', {
					myaxReferences: training.myaxReferences
				})
			}
		},
		properties: {
			get (id) {
				return api.fetch(`properties/${id}/`)
			},
			vocabularies (id) {
				return api.fetch(`properties/${id}/vocabularies/`)
			}
		},
		languages: {
			list () {
				return api.fetch(`languages/`)
			},
			listAll () {
				return api.fetch(`languages/all/`)
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

	api.fetch = function (url, method, body) {
		const headers = {
			'Content-Type': 'application/json',
			'authorization': `JWT ${token}`
		}
		return base.fetch(url.startsWith('http') ? url : baseUrl + url, headers, method, body)
	}

	return api
}

export default Training
