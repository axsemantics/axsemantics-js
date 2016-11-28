/* global fetch:false */

export default {
	fetch (url, headers, method, body) {
		let options = {
			method: method || 'GET',
			headers,
			body: JSON.stringify(body)
		}
		return fetch(url, options).then((response) => {
			return response.json().then((json) => {
				if (!response.ok)
					return Promise.reject({response, json})
				return Promise.resolve(json)
			})
		}).catch((error) => {
			return Promise.reject(error)
		})
	}
}
