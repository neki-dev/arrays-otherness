export type ResultItems<T> = {
  target?: T
  current?: T
};

export type ResultCallback<T> = (items: ResultItems<T>) => void;

export type MatchCallback<T> = (items: ResultItems<T>) => boolean;

export type ResultHandlers<T> = {
  excess: (callback: ResultCallback<T>) => void
  match: (callback: ResultCallback<T>) => void
  missing: (callback: ResultCallback<T>) => void
};

export type Result<T> = {
  excess: ResultItems<T>[]
  match: ResultItems<T>[]
  missing: ResultItems<T>[]
};