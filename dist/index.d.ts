export declare type ResultItems<T> = {
    target?: T;
    current?: T;
};
declare type ResultCallback<T> = (items: ResultItems<T>) => void;
export declare type ResultHandlers<T> = {
    excess: (callback: ResultCallback<T>) => void;
    match: (callback: ResultCallback<T>) => void;
    missing: (callback: ResultCallback<T>) => void;
};
export declare type MatchCallback<T> = (targetItem: T, currentItem: T) => boolean;
/**
 * Get a matching, missing and excess items of an array based on target array
 *
 * @param {Array} current - Current array
 * @param {Array} target - Target array
 * @param {MatchCallback} matchFn - Function of matching arrays items
 *
 * @returns {ResultHandlers}
 */
export default function otherness<T = any>(current: any[], target: any[], matchFn: MatchCallback<T>): ResultHandlers<T>;
export {};
