/**
 * Synchronization target array by source array
 *
 * @param {Array} current - Current array
 * @param {Array} target - Target array
 * @param {Function} match - Function of matching arrays items
 * 
 * @return {Object} api
 */
module.exports = async function (current, target, match) {
	const result = {
		excess: [],
		match: [],
		missing: [],
	};
  
	for (const currentItem of current) {
		if (target.every((targetItem) => !match(targetItem, currentItem))) {
			result.excess.push([currentItem]);
		}
	}
	for (const targetItem of target) {
		const currentItem = current.find((currentItem) => match(targetItem, currentItem));
		if (currentItem) {
			result.match.push([targetItem, currentItem]);
		} else {
			result.missing.push([targetItem]);
	  	}
	}

	const api = {};
	for (const [type, items] of Object.entries(result)) {
		api[type] = async (callback) => {
			for (const args of items) {
				await callback(...args);
			}
			return api;
		}
	}

	return api;
};
  