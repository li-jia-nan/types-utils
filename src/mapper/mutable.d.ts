export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type MutableDeep<T> = {
  -readonly [P in keyof T]: MutableDeep<T[P]>;
};

// interface Props {
//   readonly a: {
//     readonly d: number;
//   };
//   readonly b: number;
//   readonly c: number;
// }

// type NewProps = MutableDeep<Props>;
