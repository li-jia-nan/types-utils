export type StrictExclude<T, U extends T> = Exclude<T, U>;

// type Bar = StrictExclude<'a' | 'b' | 'c', 'a'>;
