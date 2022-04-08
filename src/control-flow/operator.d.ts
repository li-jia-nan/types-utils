export type IsExtends<A, B> = [A] extends [B] ? true : false;

// 判断 A 是否 extends B，但是去除了条件类型的影响。成功返回true，失败返回false。

// type Foo = IsExtends<1, number>;

/**
 * if A equals B, return true, else return false.
 * @see https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
 */
export type IsEquals<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
  ? true
  : false;
