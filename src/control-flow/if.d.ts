import { IsTruthy } from '../basic';

export type IfExtends<Condition extends [any, any], Case1, Case2> = [Condition[0]] extends [
  Condition[1]
]
  ? Case1
  : Case2;

// 判断 Condition 元组中的两个值是否符合Condition[0] 满足 Condition[1]，如果成功返回 Case1，否则返回 Case2

// type Foo = IfExtends<[true, boolean], 1, 2>;

export type If<Condition, Case1, Case2> = IfExtends<[IsTruthy<Condition>, true], Case1, Case2>;

// type Foo = If<true, 1, 2>;
