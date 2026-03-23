const getObjectsKeys = (obj) => Object.keys(obj);

function changeNullforFalse(obj){
	const objStr = JSON.stringify(obj).replaceAll('null', 'false')
	return JSON.parse(objStr);
}

function searchForKey(obj, key, newObject){

	if (key in obj) {
		newObject[key] = obj[key]
		return null
	}

	const objectsValues = getObjectsKeys(obj).filter(
		(key) => {
			return typeof obj[key] === 'object';
		}
	)

	const numberOfObjectsValues = objectsValues.length

	if (numberOfObjectsValues === 0) return null;

	let currentKey = null

	for(let i = 0; i < numberOfObjectsValues ; i++){
		currentKey = objectsValues[i];
		searchForKey(obj[currentKey], key, newObject);
	}

	return null;
}

function search(obj, ...keysToSearch){
	const objectWhitoutNulls = changeNullforFalse(obj) 
	let flattenedJSON = {}
	const len = keysToSearch.length
	let currentKey = null

	for(let i = 0; i < len ; i++){
	 	currentKey = keysToSearch[i];
	 	searchForKey(objectWhitoutNulls, currentKey, flattenedJSON);
	 	if (!getObjectsKeys(flattenedJSON).includes(currentKey)){
	 		flattenedJSON[currentKey] = undefined;
	 	}
	 }

	return flattenedJSON;
}

export default search;
