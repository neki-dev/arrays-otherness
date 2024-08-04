export type MatchCallback<T> = (record: {
    target: T;
    origin: T;
}) => boolean;
export type RecordExcess<T> = {
    origin: T;
};
export type RecordMatch<T> = {
    target: T;
    origin: T;
};
export type RecordMissing<T> = {
    target: T;
};
export type ResultHandlers<T> = {
    excess: (callback: (record: RecordExcess<T>) => void) => ResultHandlers<T>;
    match: (callback: (record: RecordMatch<T>) => void) => ResultHandlers<T>;
    missing: (callback: (record: RecordMissing<T>) => void) => ResultHandlers<T>;
};
