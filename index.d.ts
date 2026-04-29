type Mutable<T> = T extends object
  ? { -readonly [K in keyof T]: Mutable<T[K]> }
  : T;

type DeepGet<T, K extends string> = T extends object
  ? K extends keyof T
    ? Mutable<T[K]>
    : DeepGet<T[keyof T & string], K>
  : never;

type Search<T, Keys extends string[]> = {
  [K in Keys[number]]: DeepGet<T, K>;
};

export default function searchIn<T extends object, Keys extends string[]>(
  obj: T,
  ...searchKeys: Keys
): Search<T, Keys>;
