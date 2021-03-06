export declare type ResultItems<T> = {
    target?: T;
    current?: T;
};
export declare type ResultCallback<T> = (items: ResultItems<T>) => void;
export declare type MatchCallback<T> = (items: ResultItems<T>) => boolean;
export declare type ResultHandlers<T> = {
    excess: (callback: ResultCallback<T>) => ResultHandlers<T>;
    match: (callback: ResultCallback<T>) => ResultHandlers<T>;
    missing: (callback: ResultCallback<T>) => ResultHandlers<T>;
};
export declare type Result<T> = {
    excess: ResultItems<T>[];
    match: ResultItems<T>[];
    missing: ResultItems<T>[];
};
