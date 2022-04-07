import { IsEquals, If, IfExtends, IsExtends } from '../control-flow';
import { EqualTag, ExtendsTag } from '../utils';
import { ArrayItem, IsReadonlyArray, IsTuple } from '../basic';

// notice: distributed condition type
type Foo = Filter<[1, 1, string], number>;
type Bar = Filter<[1, 1, string], number, false>;
type Baz = Filter<[1, 1, string, number], number, false, 'equal'>;

export type Filter<
  T extends readonly unknown[],
  V,
  Extends extends boolean = true,
  Type extends EqualTag | ExtendsTag = ExtendsTag
> = T extends T
  ? If<
      IsTuple<T>,
      T extends readonly [infer Current, ...infer Rest]
        ? IsReadonlyArray<T> extends true
          ? readonly [
              ...IfExtends<
                [Type, EqualTag],
                IfExtends<[IsEquals<Current, V>, Extends], [Current], []>,
                IfExtends<[IsExtends<Current, V>, Extends], [Current], []>
              >,
              ...Filter<Rest, V, Extends, Type>
            ]
          : [
              ...IfExtends<
                [Type, EqualTag],
                IfExtends<[IsEquals<Current, V>, Extends], [Current], []>,
                IfExtends<[IsExtends<Current, V>, Extends], [Current], []>
              >,
              ...Filter<Rest, V, Extends, Type>
            ]
        : T extends readonly [...infer Rest, infer Current]
        ? IsReadonlyArray<T> extends true
          ? readonly [
              ...Filter<Rest, V, Extends, Type>,
              ...IfExtends<
                [Type, EqualTag],
                IfExtends<[IsEquals<Current, V>, Extends], [Current], []>,
                IfExtends<[IsExtends<Current, V>, Extends], [Current], []>
              >
            ]
          : [
              ...Filter<Rest, V, Extends, Type>,
              ...IfExtends<
                [Type, EqualTag],
                IfExtends<[IsEquals<Current, V>, Extends], [Current], []>,
                IfExtends<[IsExtends<Current, V>, Extends], [Current], []>
              >
            ]
        : never,
      IfExtends<
        [Type, EqualTag],
        IfExtends<
          [IsEquals<ArrayItem<T>, V>, Extends],
          T,
          IsReadonlyArray<T> extends true ? readonly [] : []
        >,
        IfExtends<
          [IsExtends<ArrayItem<T>, V>, Extends],
          T,
          IsReadonlyArray<T> extends true ? readonly [] : []
        >
      >
    >
  : never;
