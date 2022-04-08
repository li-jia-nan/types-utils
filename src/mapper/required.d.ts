import { Keys } from './key';
import { StrictOmit } from './omit';
import { OptionalKeys } from './optional';
import { Simplify } from './pick';

export type SetRequired<T, K extends Keys<T>> = Simplify<StrictOmit<T, K> & Required<Pick<T, K>>>;

export type RequiredKeys<T> = Exclude<Keys<T>, OptionalKeys<T>>;
// interface Props {
//   a?: number;
//   b: number;
//   c?: number;
// }

// type PropKeys = OptionalKeys<Props>;

export type RequiredDeep<T> = {
  [P in keyof T]-?: RequiredDeep<T[P]>;
};

// interface Props {
//   a?: {
//     d?: number;
//   };
//   b?: number;
//   c?: number;
// }

// type NewProps = RequiredDeep<Props>;
