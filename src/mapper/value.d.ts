import { IsObject } from '../basic';
import { Keys } from './key';

export type ValueOf<T> = T[Keys<T>];

// interface Props {
//   a?: number;
//   b: string;
//   c: boolean;
// }

// type PropValues = ValueOf<Props>;

export type DeepValueOf<T> = {
  [K in Keys<T>]: T[K] extends infer V
    ? V extends V
      ? IsObject<V> extends true
        ? T[K] | DeepValueOf<T[K]>
        : T[K]
      : never
    : never;
}[Keys<T>];

// interface Props {
//   a?: {
//     d: () => void;
//   };
//   b: string;
//   c: boolean;
// }

// type PropValues = DeepValueOf<Props>;

export type Get<T, K extends Keys<T>> = T[K];

// interface Props {
//   a?: number;
//   b: string;
//   c: boolean;
// }

// type PropValues = Get<Props, 'a' | 'b'>;
