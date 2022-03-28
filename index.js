/**
 * Synchronization target array by source array
 * Allows to get matching, missing and exess items of an current array based on target array
 *
 * @param {Array} current - Current array
 * @param {Array} target - Target array
 * @param {Function} match - Function of matching arrays items
 *
 * @typedef {Object} ResultInterface
 * @property {function} excess - Handle excess items
 * @property {function} match - Handle match items
 * @property {function} missing - Handle missing items
 *
 * @return {ResultInterface}
 */
module.exports = function contrast(current, target, matchFn) {
  const result = {
    excess: [],
    match: [],
    missing: [],
  };

  current.forEach((currentItem) => {
    if (target.every((targetItem) => !matchFn(targetItem, currentItem))) {
      result.excess.push([currentItem]);
    }
  });

  target.forEach((targetItem) => {
    const sameItem = current.find((currentItem) => matchFn(targetItem, currentItem));
    if (sameItem) {
      result.match.push([targetItem, sameItem]);
    } else {
      result.missing.push([targetItem]);
    }
  });

  const api = {};
  Object.entries(result).forEach(([type, items]) => {
    api[type] = (callback) => {
      items.forEach(async (args) => {
        await callback(...args);
      });
      return api;
    };
  });

  return api;
};
