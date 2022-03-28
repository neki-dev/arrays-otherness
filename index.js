/**
 * Synchronization target array by source array
 *
 * @param {Array} current - Current array
 * @param {Array} target - Target array
 * @param {Function} match - Function of matching arrays items
 *
 * @return {Object} api
 */
module.exports = async function contrast(current, target, match) {
  const result = {
    excess: [],
    match: [],
    missing: [],
  };

  current.forEach((currentItem) => {
    if (target.every((targetItem) => !match(targetItem, currentItem))) {
      result.excess.push([currentItem]);
    }
  });

  target.forEach((targetItem) => {
    const sameItem = current.find((currentItem) => match(targetItem, currentItem));
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
