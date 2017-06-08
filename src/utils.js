export function cleanQuery (object) {
	Object.keys(object).forEach(key => !object[key] && delete object[key])
	return object
}

export function cleanNulls (object) {
	Object.keys(object).forEach(key => object[key] === null && delete object[key])
	return object
}
