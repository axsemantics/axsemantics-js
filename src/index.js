/* global FormData, fetch */
import EventEmitter from 'events'
import Training from './training'
import MyAx from './myax'
import IDM from './idm'
import Lexicon from './lexicon'
import BulkUpload from './bulk-upload'
import Quest from './quest'
import Report from './report'

// Why use class and not just a constructor function? Because we can, and it is a tad cleaner.
//
// The client operates on plain js objects and quasi-static procedures.
// It also unifies both the myax and training apis into one interface.
class AxSemanticsClient extends EventEmitter {
	constructor (userConfig) {
		super()
		const config = {
			myAxBaseUrl: 'https://api.ax-semantics.com/',
			trainingBaseUrl: 'https://training-api.ax-semantics.com/v1/',
			lexiconBaseUrl: 'https://lexicon.ax-semantics.com/v1/',
			idmBaseUrl: 'https://idm.ax-semantics.com/v1/',
			bulkUploadBaseUrl: 'https://bulk-api.ax-semantics.com/v1/',
			questBaseUrl: 'https://quest-api.ax-semantics.com/',
			reportBaseUrl: 'https://report-api.ax-semantics.com/',
			idToken: '',
			refreshToken: null,
			fetch: AxSemanticsClient.fetch // set this for handling the fetch promise globally
		}
		Object.assign(config, userConfig)
		this._idm = IDM(config.fetch.bind(this, config.idmBaseUrl)) // needed for refresh token shake
		const initApis = (idToken) => {
			this.idToken = idToken
			this._myax = MyAx(config.fetch.bind(this, config.myAxBaseUrl))
			this._editor = Training(config.fetch.bind(this, config.trainingBaseUrl))
			this._lexicon = Lexicon(config.fetch.bind(this, config.lexiconBaseUrl))
			this._bulkUpload = BulkUpload(config.fetch.bind(this, config.bulkUploadBaseUrl), this.idToken)
			this._quest = Quest(config.fetch.bind(this, config.questBaseUrl))
			this._report = Report(config.fetch.bind(this, config.reportBaseUrl), this.idToken)
		}
		if (config.refreshToken) {
			this._idm.tokenExchange(config.refreshToken).then((tokenExchange) => {
				initApis(tokenExchange.id_token)
				this.emit('ready')
			})
		} else {
			initApis(config.idToken)
			this.emit('ready')
		}
	}

	static fetch (baseUrl, url, method, body, userHeaders) {
		const headers = userHeaders || {
			'Content-Type': 'application/json',
			'authorization': `JWT ${this.idToken}`,
			'Cache-Control': 'no-cache'
		}
		const options = {
			method: method || 'GET',
			headers,
			body: body instanceof FormData ? body : JSON.stringify(body),
			credentials: 'omit' // api wants no cookies
		}
		return fetch(url.startsWith('http') ? url : baseUrl + url, options).then((response) => {
			if (response.status === 204) // no content to parse
				return Promise.resolve()
			return response.json().then((json) => {
				if (!response.ok)
					// TODO change to error
					return Promise.reject({response, json}) // eslint-disable-line
				return Promise.resolve(json)
			}).catch(error => {
				if (!error.json) // no json
					return Promise.reject({response}) // eslint-disable-line
				return Promise.reject(error)
			})
		}).catch((error) => {
			return Promise.reject(error)
		})
	}
}

export default AxSemanticsClient
