declare type ResultItems<T> = {
    target?: T;
    current?: T;
};
declare type ResultCallback<T> = (items: ResultItems<T>) => void;
declare type MatchCallback<T> = (items: ResultItems<T>) => boolean;
export declare type ResultHandlers<T> = {
    excess: (callback: ResultCallback<T>) => void;
    match: (callback: ResultCallback<T>) => void;
    missing: (callback: ResultCallback<T>) => void;
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
declare function arraysOtherness<T = any>(current: T[], target: T[], matchFn: MatchCallback<T>): ResultHandlers<T>;
export = arraysOtherness;
