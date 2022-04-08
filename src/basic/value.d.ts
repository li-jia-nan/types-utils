import { IfExtends, IsExtends } from '../control-flow';

export type Primitive = null | undefined | string | number | boolean | symbol | bigint;

// 我们规定以下值为含有 falsy 意义的值（注意，Falsy 类型只是用于展示规则，不要使用它）
// 当一个类型为联合类型时，当所有元素都为 falsy 时它的值才是 falsy，否则为 truthy
// 比如：0 | false 就是 falsy 值，而 0 | false | 'true' 就是 truthy 值
export type Falsy = 0 | false | '' | undefined | null | void | never | unknown;

// 因为 unknown 的特殊性，它本身兼容其余的类型
// 比如上面的 Falsy 类型最后的结果是 unknown 类型，所以我们在做一些操作时需要单独将其提出再判断
export type FalsyWithoutUnknown = 0 | false | '' | undefined | null | void | never;

// 0 & any => any, 0 & unknown => 0, 0 & number => 0，0 & other => never
export type IsAny<T> = IsExtends<number, 0 & T>;

export type IsPrimitive<T> = IfExtends<
  [T, never],
  false,
  IfExtends<[T, Primitive], IfExtends<[IsAny<T>, true], false, true>, false>
>;
// type Foo = IsPrimitive<boolean>;

// 任何值都可以 extends unknown, unknown 只能 extends unknown 和 any，后续将 any 排除掉
export type IsUnknown<T> = IfExtends<[unknown, T], IfExtends<[IsAny<T>, true], false, true>, false>;
// type Foo = IsUnknown<unknown>;

// 只有 never 才可以 extends never
export type IsNever<T> = IsExtends<T, never>;
// type Foo = IsNever<never>;

// 先判断是否为 never，因为 never 进入判断会有意料之外的结果
// 如果满足 falsy 值，去除掉 any 的影响，因为 any extends 任何值
// 不满足 falsy 值，再判断一下是否是剩余的 unknown
export type IsFalsy<T> = IfExtends<
  [T, never],
  true,
  IfExtends<[T, FalsyWithoutUnknown], IfExtends<[IsAny<T>, true], false, true>, IsUnknown<T>>
>;
// type Foo = IsFalsy<never>
// type Foo = IsFalsy<true>;

export type IsObject<T> = IfExtends<
  [T, never],
  false,
  IfExtends<[T, object], IfExtends<[IsAny<T>, true], false, true>, false>
>;
// type Foo = IsObject<{ foo: 'foo' }>;

// IsFalsy 取反
export type IsTruthy<T> = IfExtends<[IsFalsy<T>, true], false, true>;
// type Foo = IsTruthy<true>;
