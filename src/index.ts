type ResultItems<T> = {
  target?: T
  current?: T
};

type ResultCallback<T> = (items: ResultItems<T>) => void;

type ResultHandlers<T> = {
  excess: ResultCallback<T>
  match: ResultCallback<T>
  missing: ResultCallback<T>
};

type Result<T> = {
  excess: ResultItems<T>[]
  match: ResultItems<T>[]
  missing: ResultItems<T>[]
};

type MatchCallback = (targetItem: any, currentItem: any) => boolean;

/**
 * Get a matching, missing and excess items of an array based on target array
 *
 * @param {Array} current - Current array
 * @param {Array} target - Target array
 * @param {MatchCallback} matchFn - Function of matching arrays items
 *
 * @returns {ResultHandlers}
 */
export default function otherness<T = any>(
  current: any[],
  target: any[],
  matchFn: MatchCallback,
): ResultHandlers<T> {
  const result: Result<T> = {
    excess: [],
    match: [],
    missing: [],
  };

  current.forEach((currentItem: T) => {
    if (target.every((targetItem: T) => !matchFn(targetItem, currentItem))) {
      result.excess.push({
        current: currentItem,
      });
    }
  });

  target.forEach((targetItem: T) => {
    const sameItem = current.find((currentItem: T) => matchFn(targetItem, currentItem));
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
    [type]: async (callback: ResultCallback<T>): Promise<ResultHandlers<T>> => {
      await Promise.all(result[type].map(callback));
      return api;
    },
  }), {} as ResultHandlers<T>);

  return api;
}
