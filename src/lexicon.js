
const lexicon = function (fetch, baseUrl, token) {
	const api = {
		entries: {
			list (trainings, page, language) {
				return api.fetch(`lexica/?trainings=${trainings}&page=${page}&language=${language}`)
			},
			create (lexiconEntry) {
				return api.fetch('lexica/', 'POST', lexiconEntry)
			},
			delete (id) {
				return api.fetch(`lexica/${id}/`, 'DELETE')
			},
			getLexiconEntry (id) {
				return api.fetch(`lexica/${id}/`)
			},
			patch (id, lexiconEntry) {
				return api.fetch(`lexica/${id}/`, 'PATCH', lexiconEntry)
			}
		}
	}
	api.fetch = fetch
	return api
}

export default lexicon
