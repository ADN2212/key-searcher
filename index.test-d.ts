import { expectType } from "tsd";
import searchIn from "./index.js";

const obj = {
  name: "Alice",
  age: 30,
  address: {
    city: "NYC",
    zip: { code: "10001" },
  },
};

const objLiteral = {
  name: "Alice",
  age: 30,
  address: {
    city: "NYC",
    zip: { code: "10001" },
  },
} as const;

expectType<{ name: string }>(searchIn(obj, "name"));

expectType<{ name: string; age: number }>(searchIn(obj, "name", "age"));

expectType<{ code: string }>(searchIn(obj, "code"));

expectType<{ address: { city: "NYC"; zip: { code: "10001" } } }>(
  searchIn(objLiteral, "address"),
);
