import { If } from '../control-flow';
import { IsReadonlyArray, IsTuple } from '../basic';

export type Reverse<T extends readonly unknown[]> = T extends T
  ? If<
      IsTuple<T>,
      T extends [infer F, ...infer R]
        ? IsReadonlyArray<T> extends true
          ? readonly [...Reverse<R>, F]
          : [...Reverse<R>, F]
        : T extends [...infer R, infer L]
        ? IsReadonlyArray<T> extends true
          ? readonly [L, ...Reverse<R>]
          : [L, ...Reverse<R>]
        : never,
      T
    >
  : never;

// type Foo = Reverse<[1, 2, 3]>;
