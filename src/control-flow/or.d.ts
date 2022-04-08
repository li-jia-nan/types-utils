import { ArrayItem, IsTuple, IsTruthy } from '../basic';
import { If } from './if';

export type Or<A extends readonly unknown[]> = If<
  IsTuple<A>,
  A extends readonly [infer Current, ...infer Rest]
    ? If<Current, true, Or<Rest>>
    : A extends [...infer Rest, infer Current]
    ? If<Current, true, Or<Rest>>
    : never,
  IsTruthy<ArrayItem<A>>
>;

// type Foo = Or<[1, 2, false]>;

// type Bar = Or<[null, undefined, 0]>;
