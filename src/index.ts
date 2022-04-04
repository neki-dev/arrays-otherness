type ResultItems<T> = {
  target?: T
  current?: T
};

type ResultCallback<T> = (items: ResultItems<T>) => void;

type MatchCallback<T> = (items: ResultItems<T>) => boolean;

export type ResultHandlers<T> = {
  excess: (callback: ResultCallback<T>) => void
  match: (callback: ResultCallback<T>) => void
  missing: (callback: ResultCallback<T>) => void
};

type Result<T> = {
  excess: ResultItems<T>[]
  match: ResultItems<T>[]
  missing: ResultItems<T>[]
};

/**
 * Get a matching, missing and excess items of an array based on target array
 *
 * @param {Array} current - Current array
 * @param {Array} target - Target array
 * @param {MatchCallback} matchFn - Function of matching arrays items
 *
 * @returns {ResultHandlers}
 */
function arraysOtherness<T = any>(
  current: T[],
  target: T[],
  matchFn: MatchCallback<T>,
): ResultHandlers<T> {
  const result: Result<T> = {
    excess: [],
    match: [],
    missing: [],
  };

  current.forEach((currentItem: T) => {
    if (target.every((targetItem: T) => (
      !matchFn({ target: targetItem, current: currentItem })
    ))) {
      result.excess.push({
        current: currentItem,
      });
    }
  });

  target.forEach((targetItem: T) => {
    const sameItem = current.find((currentItem: T) => (
      matchFn({ target: targetItem, current: currentItem })
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
    [type]: async (callback: ResultCallback<T>): Promise<ResultHandlers<T>> => {
      await Promise.all(result[type].map(callback));
      return api;
    },
  }), {} as ResultHandlers<T>);

  return api;
}

// export for commonjs
// @ts-ignore
export = arraysOtherness;
