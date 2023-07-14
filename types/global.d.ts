declare interface Fn<T = any, R = T> {
  (...arg: T): R;
}

declare type UnionBasis = Object | string | number | boolean 

declare type MaybeArray<T> = T | T[]

declare type MaybePromise<T> = T | Promise<T>