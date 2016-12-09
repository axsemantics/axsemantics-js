import Training from './training'
import MyAx from './myax'
import IDM from './idm'

// Why use class and not just a constructor function? Because we can, and it is a tad cleaner.
//
// The client operates on plain js objects and quasi-static procedures.
// It also unifies both the myax and training apis into one interface.
class AxSemanticsClient {
	constructor (userConfig) {
		const config = {
			myAxBaseUrl: 'https://api.ax-semantics.com/',
			trainingBaseUrl: 'https://training-api.ax-semantics.com/v1/',
			idmBaseUrl: 'https://idm.ax-semantics.com/v1/',
			token: '',
			fetch: AxSemanticsClient.fetch // set this for handling the fetch promise globally
		}
		Object.assign(config, userConfig)
		this._myax = MyAx(config.fetch, config.myAxBaseUrl, config.token)
		this._editor = Training(config.fetch, config.trainingBaseUrl, config.token)
		this._idm = IDM(config.fetch, config.idmBaseUrl, config.token)

		this.collections = this._myax.collections
		this.documents = this._myax.documents
		this.me = this._myax.documents
	}

	static fetch (url, headers, method, body) {
		let options = {
			method: method || 'GET',
			headers,
			body: JSON.stringify(body)
		}
		return window.fetch(url, options).then((response) => {
			if (response.status === 204) // no content to parse
				return Promise.resolve()
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

export default AxSemanticsClient
