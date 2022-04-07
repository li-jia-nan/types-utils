import { StrictExclude } from './strict-exclude';

export type Diff<A, B> = StrictExclude<A | B, A & B>;

type Foo = Diff<'1' | '2', '1' | '3'>;
