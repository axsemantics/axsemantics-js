
const lexicon = function (fetch, baseUrl, token) {
	const api = {
		lexica: {
			listFromTraining (page, language, trainingId) {
				return api.fetch(`lexica/?page=${page}&language=${language}&training_id=${trainingId}`)
			},
			create (entryJson) {
				return api.fetch('lexica/', 'POST', entryJson)
			},
			delete (id) {
				return api.fetch(`lexica/${id}/`, 'DELETE')
			},
			getLexiconEntry (id) {
				return api.fetch(`lexica/${id}/`)
			},
			patch (id, entryJson) {
				return api.fetch(`lexica/${id}/`, 'PATCH', entryJson)
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
