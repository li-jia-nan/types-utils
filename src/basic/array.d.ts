import { IsExtends, Not } from '../control-flow';

export type Tuple<T = unknown, R = T> =
  | [T, ...R[]]
  | [...R[], T]
  | readonly [T, ...R[]]
  | readonly [...R[], T];

// type Foo = Tuple<1, number>;

export type IsTuple<T extends readonly unknown[]> = T extends T ? IsExtends<T, Tuple> : never;

// type Foo = IsTuple<[1, 2, 3]>;

// notice: distributed condition type
export type ArrayItem<T extends readonly unknown[]> = T extends ReadonlyArray<infer Item>
  ? Item
  : never;

// type Foo = ArrayItem<number[]>;

export type FlattedArrayItem<T extends readonly unknown[]> = T extends ReadonlyArray<infer Item>
  ? Item extends readonly unknown[]
    ? FlattedArrayItem<Item>
    : Item
  : never;

// type Foo = FlattedArrayItem<number[][][]>;

export type IsEmptyTypeArray<T extends readonly unknown[]> = T extends T
  ? IsExtends<T['length'], 0>
  : never;

// type Foo = IsEmptyTypeArray<[]>;

export type IsReadonlyArray<T extends readonly unknown[]> = T extends T
  ? Not<IsExtends<T, any[]>>
  : never;

// type Foo = IsReadonlyArray<readonly [1, 2, 3]>;
