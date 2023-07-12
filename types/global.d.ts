declare interface Fn<T = any, R = T> {
  (...arg: T): R;
}

declare type UnionBasis = Object | string | number | boolean 