import Training from './training'
import MyAx from './myax'

// Why use class and not just a constructor function? Because we can, and it is a tad cleaner.
//
// The client operates on plain js objects and quasi-static procedures.
// It also unifies both the myax and training apis into one interface.
class AxSemanticsClient {
	constructor (userConfig) {
		const config = {
			myAxBaseUrl: 'https://api.ax-semantics.com/',
			trainingBaseUrl: 'https://training-api.ax-semantics.com/v1/',
			token: ''
		}
		Object.assign(config, userConfig)
		this._myax = MyAx(config.myAxBaseUrl, config.token)
		this._editor = Training(config.trainingBaseUrl, config.token)

		this.collections = this._myax.collections
		this.documents = this._myax.documents
		this.me = this._myax.documents
	}
}

export default AxSemanticsClient
