import { IsNever, IsObject } from '../basic';
import { OtherToString } from '../convert';
import { StrictExclude } from '../union';
import { DeepKeys, Keys } from './key';

export type StrictOmit<T, K extends Keys<T>> = {
  [P in keyof T as P extends StrictExclude<
    Keys<T>,
    OtherToString<K> extends infer V ? ([V] extends [Keys<T>] ? V : never) : never
  >
    ? P
    : never]: T[P];
};

interface Props {
  a: 1;
  b: 2;
  c: 3;
}

type PropValue = StrictOmit<Props, 'a'>;

/**
 *
 * Remove the deep value path from T.
 * @example
 * ```ts
 *  interface Props {
      a?: {
        c: boolean
        d: () => void
        e: number
      }
      b: string
    }
 *
 *  // Expect: { a?: { e: number }, b: string }
 *  type PropValues = DeepOmit<Props, 'a.c' | 'a.d'>
 * ```
 */
export type DeepOmit<T, K extends DeepKeys<T>> = IsNever<Extract<K, Keys<T>>> extends true
  ? {
      [P in keyof T]: [Exclude<K, Keys<T>>] extends [`${infer Head}.${infer Tail}`]
        ? P extends Head
          ? T[P] extends infer V
            ? V extends V
              ? IsObject<V> extends true
                ? DeepOmit<
                    V,
                    Extract<
                      Tail extends Tail ? (`${P}.${Tail}` extends K ? Tail : never) : never,
                      DeepKeys<V>
                    >
                  >
                : V
              : never
            : never
          : T[P]
        : never;
    }
  : {
      [P in keyof T as P extends OtherToString<K> ? never : P extends Keys<T> ? P : never]: [
        Exclude<K, Keys<T>>
      ] extends [`${infer Head}.${infer Tail}`]
        ? P extends Head
          ? T[P] extends infer V
            ? V extends V
              ? IsObject<V> extends true
                ? DeepOmit<
                    V,
                    Extract<
                      Tail extends Tail ? (`${P}.${Tail}` extends K ? Tail : never) : never,
                      DeepKeys<V>
                    >
                  >
                : V
              : never
            : never
          : T[P]
        : never;
    };
