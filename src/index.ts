import {
  MatchCallback, Result, ResultCallback, ResultHandlers, ResultItems,
} from './types';

/**
 * Get a matching, missing and excess items of an array based on target array
 *
 * @param {Array} current - Current array
 * @param {Array} target - Target array
 * @param {MatchCallback?} matchFn - Function of matching arrays items
 *
 * @returns {ResultHandlers}
 */
export default function arraysOtherness<T = any>(
  current: T[],
  target: T[],
  matchFn?: MatchCallback<T>,
): ResultHandlers<T> {
  const result: Result<T> = {
    excess: [],
    match: [],
    missing: [],
  };

  const defaultMathFn = (item: ResultItems<T>) => (item.target === item.current);
  const match = matchFn || defaultMathFn;

  current.forEach((currentItem: T) => {
    if (target.every((targetItem: T) => (
      !match({ target: targetItem, current: currentItem })
    ))) {
      result.excess.push({
        current: currentItem,
      });
    }
  });

  target.forEach((targetItem: T) => {
    const sameItem = current.find((currentItem: T) => (
      match({ target: targetItem, current: currentItem })
    ));
    if (sameItem) {
      result.match.push({
        current: sameItem,
        target: targetItem,
      });
    } else {
      result.missing.push({
        target: targetItem,
      });
    }
  });

  const api = Object.keys(result).reduce((curr, type: keyof Result<T>) => ({
    ...curr,
    [type]: (callback: ResultCallback<T>): ResultHandlers<T> => {
      Promise.all(result[type].map(callback));
      return api;
    },
  }), {} as ResultHandlers<T>);

  return api;
}

export * from './types';
