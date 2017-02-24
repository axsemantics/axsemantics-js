/* eslint camelcase: "off" */
const BulkUpload = function (fetch, baseUrl, token) {
	const api = {
		uploads: {
			list () {
				return api.fetch(`uploads/`)
			}
		}
	}

	api.fetch = fetch
	return api
}

export default BulkUpload
