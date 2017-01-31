
const lexicon = function (fetch, baseUrl, token) {
	const api = {
		entries: {
			listfromLexicon (trainingId, language, page) {
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
	api.fetch = function (url, method, body) {
		const headers = {
			'Content-Type': 'application/json',
			'authorization': `JWT ${token}`
		}
		return fetch(url.startsWith('http') ? url : baseUrl + url, headers, method, body)
	}

	return api
}

export default lexicon
