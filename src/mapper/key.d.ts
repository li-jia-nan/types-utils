import { IsObject } from '../basic';

export type TupleKeys<T extends readonly unknown[]> = T extends readonly [any, ...infer Tail]
  ? TupleKeys<Tail> | Tail['length'] | `${Tail['length']}`
  : never;

// type Foo = TupleKeys<[3, 4]>;

export type Keys<T> = T extends readonly unknown[]
  ? // unknown[] extends readonly unknown[], but readonly unknown[] not extends unknown[]
    TupleKeys<T> extends infer K
    ? K extends keyof T
      ? K
      : never
    : never
  : keyof T;

// interface Props {
//   a?: number;
//   b: number;
//   c: number;
// }

// type PropKeys = Keys<Props>;

type PathKey = string | number;

export type DeepKeys<T, P extends string = ''> = keyof {
  [K in Keys<T> as K extends PathKey
    ? P extends ''
      ? T[K] extends infer V
        ? V extends V
          ? IsObject<V> extends true
            ? // we will get values like 0 and '0', but only need to recurse once
              K | (K extends number ? never : DeepKeys<V, `${K}`>)
            : K
          : never
        : never
      : T[K] extends infer V
      ? V extends V
        ? IsObject<V> extends true
          ? `${P}.${K}` | (K extends number ? never : DeepKeys<V, `${P}.${K}`>)
          : `${P}.${K}`
        : never
      : never
    : never]: never;
};

// interface Props {
//   a?: {
//     readonly b?: number;
//     c: {
//       d?: number;
//     };
//   };
//   e: number;
// }

// type PropKeys = DeepKeys<Props>;
