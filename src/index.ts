import { MatchCallback, RecordExcess, RecordMatch, RecordMissing, ResultHandlers } from './types';

/**
 * Get a matching, missing and excess items of an array based on target array
 *
 * @param {Array} origin - Origin array
 * @param {Array} target - Target array
 * @param {MatchCallback?} matchFn - Function of matching arrays items
 *
 * @returns {ResultHandlers}
 */
export default function arraysOtherness<T = any>(
  origin: T[],
  target: T[],
  matchFn?: MatchCallback<T>,
): ResultHandlers<T> {
  const result: {
    excess: RecordExcess<T>[];
    match: RecordMatch<T>[];
    missing: RecordMissing<T>[];
  } = {
    excess: [],
    match: [],
    missing: [],
  };

  const match = matchFn ?? function (record: { target: T; origin: T }) { 
    return record.target === record.origin;
  };

  origin.forEach((originRecord) => {
    if (target.every((targetRecord) => (
      !match({ target: targetRecord, origin: originRecord })
    ))) {
      result.excess.push({
        origin: originRecord,
      });
    }
  });

  target.forEach((targetRecord) => {
    const sameRecord = origin.find((originRecord) => (
      match({ target: targetRecord, origin: originRecord })
    ));
    if (sameRecord) {
      result.match.push({
        origin: sameRecord,
        target: targetRecord,
      });
    } else {
      result.missing.push({
        target: targetRecord,
      });
    }
  });

  const methods = {
    excess: (callback: (record: RecordExcess<T>) => void) => {
      Promise.all(result.excess.map(callback));
      return methods;
    },
    match: (callback: (record: RecordMatch<T>) => void) => {
      Promise.all(result.match.map(callback));
      return methods;
    },
    missing: (callback: (record: RecordMissing<T>) => void) => {
      Promise.all(result.missing.map(callback));
      return methods;
    },
  };

  return methods;
}
