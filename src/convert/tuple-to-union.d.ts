export type TupleToUnion<T> = T extends readonly unknown[] ? T[number] : never;

// type Foo = TupleToUnion<[string, number]>;
