# key-searcher

Lightweight utility to recursively search for keys in JSON objects and return a filtered object with matching keys.

## Installation

```bash
npm install key-searcher
```

## Usage
```javascript
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

const newJSON = searchIn(obj1, "key25", "key1", "key6");
console.log(newJSON);
```

## What it does ?
- Traverses objects recursively
- Finds matching keys at any depth
- Returns a new object containing only the matched keys
- Preserves the original structure where matches are found
- Does not mutate the original object

## Example
```javascript
//Given a JSON object with nested keys like the following:
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

//when passing it as the first argument to the function, in addition to the keys you want to search for
const newJSON = searchIn(obj1, "key25", "key1", "key6");

//the result will look like the followingL
{
  key25: undefined,
  key1: false,
  key6: { key7: 'val4', key8: { key9: 'val5' } }
}
```
## Behavior & Notes
- What happens if a key is not found? The result will be set to `undefined`.
- If the value of a key is a nested object, the entire subtree of that object will appear in the result, as shown with `key6` in the example.
- The original JSON is not modified during the search.
- Only matching branches are preserved in the output.

## Use Cases
- Filtering API responses
- Extracting specific fields from deeply nested data
- Cleaning large JSON structures
