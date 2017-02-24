
const lexicon = function (fetch, baseUrl, token) {
	const api = {
		entries: {
			list (trainingId, language, page) {
				return api.fetch(`lexica/?page=${page}&language=${language}&training_id=${trainingId}`)
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
