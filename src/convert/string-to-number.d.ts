type InternalStringToNumber<
  S extends string,
  T extends readonly unknown[] = []
> = S extends `${number}`
  ? S extends `${T['length']}`
    ? T['length']
    : InternalStringToNumber<S, [...T, '']>
  : never;

// type sss = InternalStringToNumber<'20'>;

export type StringToNumber<S extends string> = InternalStringToNumber<S>;
