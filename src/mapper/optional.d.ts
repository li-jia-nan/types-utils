import { Keys } from './key';
import { StrictOmit } from './omit';
import { Simplify } from './pick';

/**
  *
  * Make some properties in T optional.
  * @example
  * ```ts
  * interface Props {
      a: number;
      b: number;
      c: number;
    };
   // Expect: {  a?: number;  b?: number; c: number; }
   type NewProps = SetOptional<Props, 'a' | 'b'>;
  * ```
  */
export type SetOptional<T, K extends Keys<T>> = Simplify<StrictOmit<T, K> & Partial<Pick<T, K>>>;

/**
 * Get optional property keys of T.
 * @example
 * ```ts
 * interface Props {
    a?: number
    readonly b: number
    c?: number
  }

  // Expect: 'a' | 'c'
  type PropKeys = OptionalKeys<Props>
 * ```
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[Keys<T>];

/**
  *
  * Make all properties (includes deep properties) in T optional.
  * @example
  * ```ts
  * interface Props {
      a: {
        d: number
      };
      b: number;
      c: number;
    };
   // Expect: { a?: { d?: number }; b?: number; c?: number; }
   type NewProps = PartialDeep<Props>;
  * ```
  */
// here we use keyof T, which can allow us return a array at the end
export type PartialDeep<T> = {
  [P in keyof T]?: PartialDeep<T[P]>;
};
