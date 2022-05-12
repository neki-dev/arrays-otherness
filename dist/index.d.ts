import { MatchCallback, ResultHandlers } from "./types";
/**
 * Get a matching, missing and excess items of an array based on target array
 *
 * @param {Array} current - Current array
 * @param {Array} target - Target array
 * @param {MatchCallback} matchFn - Function of matching arrays items
 *
 * @returns {ResultHandlers}
 */
export default function arraysOtherness<T = any>(current: T[], target: T[], matchFn: MatchCallback<T>): ResultHandlers<T>;
export * from './types';
