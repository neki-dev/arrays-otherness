export type ResultItems<T> = {
  target?: T
  current?: T
};

export type ResultCallback<T> = (items: ResultItems<T>) => void;

export type MatchCallback<T> = (items: ResultItems<T>) => boolean;

export type ResultHandlers<T> = {
  excess: (callback: ResultCallback<T>) => ResultHandlers<T>
  match: (callback: ResultCallback<T>) => ResultHandlers<T>
  missing: (callback: ResultCallback<T>) => ResultHandlers<T>
};

export type Result<T> = {
  excess: ResultItems<T>[]
  match: ResultItems<T>[]
  missing: ResultItems<T>[]
};