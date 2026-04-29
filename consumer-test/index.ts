import searchIn from "key-searcher";

const obj = {
  name: "Alice",
  age: 30,
  address: {
    city: "NYC",
    zip: { code: "10001" },
  },
};

function utilUsesSearchIn(obj: Record<string, unknown>) {
  const result = searchIn(obj, "name", "age", "code");

  result satisfies {
    name: unknown;
    age: unknown;
    code: unknown;
  };
}

// Single key
const byName = searchIn(obj, "name");
const name: string = byName.name;

// Multiple keys
const byNameAge = searchIn(obj, "name", "age");
const name2: string = byNameAge.name;
const age: number = byNameAge.age;

// Nested key
const byCode = searchIn(obj, "code");
const code: string = byCode.code;

console.log({ name, name2, age, code });
