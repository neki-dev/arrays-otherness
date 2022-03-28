declare type ResultItems<T> = {
    target?: T;
    current?: T;
};
declare type ResultCallback<T> = (items: ResultItems<T>) => void;
declare type ResultHandlers<T> = {
    excess: ResultCallback<T>;
    match: ResultCallback<T>;
    missing: ResultCallback<T>;
};
declare type MatchCallback = (targetItem: any, currentItem: any) => boolean;
/**
 * Getting and handle matching, missing and exess items of
 * an current array based on target array
 *
 * @param {Array} current - Current array
 * @param {Array} target - Target array
 * @param {MatchCallback} matchFn - Function of matching arrays items
 *
 * @returns {ResultHandlers}
 */
export default function otherness<T = any>(current: any[], target: any[], matchFn: MatchCallback): ResultHandlers<T>;
export {};
