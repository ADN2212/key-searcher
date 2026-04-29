import searchIn from "./index.js";

describe("searchIn", () => {
  const obj = {
    name: "Alice",
    age: 30,
    address: {
      city: "NYC",
      zip: { code: "10001" },
    },
  };

  describe("top-level keys", () => {
    test("finds a key at the top level", () => {
      expect(searchIn(obj, "name")).toEqual({ name: "Alice" });
    });

    test("finds multiple top-level keys", () => {
      expect(searchIn(obj, "name", "age")).toEqual({ name: "Alice", age: 30 });
    });
  });

  describe("nested keys", () => {
    test("finds a key one level deep", () => {
      expect(searchIn(obj, "city")).toEqual({ city: "NYC" });
    });

    test("finds a key multiple levels deep", () => {
      expect(searchIn(obj, "code")).toEqual({ code: "10001" });
    });

    test("returns full subtree when the matched value is an object", () => {
      expect(searchIn(obj, "zip")).toEqual({ zip: { code: "10001" } });
    });

    test("returns full subtree for deeply nested object value", () => {
      expect(searchIn(obj, "address")).toEqual({
        address: { city: "NYC", zip: { code: "10001" } },
      });
    });
  });

  describe("missing keys", () => {
    test("returns undefined for a key that does not exist", () => {
      expect(searchIn(obj, "unknown")).toEqual({ unknown: undefined });
    });

    test("mixes found and missing keys", () => {
      expect(searchIn(obj, "name", "missing")).toEqual({
        name: "Alice",
        missing: undefined,
      });
    });
  });

  describe("falsy values", () => {
    test("preserves boolean false values", () => {
      const o = { active: false };
      expect(searchIn(o, "active")).toEqual({ active: false });
    });

    test("preserves zero values", () => {
      const o = { count: 0 };
      expect(searchIn(o, "count")).toEqual({ count: 0 });
    });

    test("preserves empty string values", () => {
      const o = { label: "" };
      expect(searchIn(o, "label")).toEqual({ label: "" });
    });

    test("preserves null values", () => {
      const o = { value: null };
      expect(searchIn(o, "value")).toEqual({ value: null });
    });
  });

  describe("edge cases", () => {
    test("returns empty object when no keys are passed", () => {
      expect(searchIn(obj)).toEqual({});
    });

    test("handles empty input object", () => {
      expect(searchIn({}, "name")).toEqual({ name: undefined });
    });

    test("finds key nested inside an array element", () => {
      // when the key appears in multiple siblings, the last occurrence wins
      const o = { users: [{ id: 1 }, { id: 2 }] };
      expect(searchIn(o, "id")).toEqual({ id: 2 });
    });

    test("does not mutate the original object", () => {
      const original = { a: { b: "value" } };
      const copy = JSON.stringify(original);
      searchIn(original, "b");
      expect(JSON.stringify(original)).toBe(copy);
    });

    test("handles the full README example", () => {
      const obj1 = {
        key1: false,
        key2: {
          key3: "val2",
          key4: {
            key5: "val3",
            key6: {
              key7: "val4",
              key8: {
                key9: "val5",
              },
            },
          },
          key5: "val4",
        },
        key10: { key11: "val6" },
      };

      expect(searchIn(obj1, "key25", "key1", "key6")).toEqual({
        key25: undefined,
        key1: false,
        key6: { key7: "val4", key8: { key9: "val5" } },
      });
    });
  });
});
