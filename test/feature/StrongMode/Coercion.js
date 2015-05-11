// Options: --strong-mode --strong-mode-asserts --exponentiation

'use strong'

let nonNumbersOrStrings = [
  true,
  false,
  null,
  undefined,
  Symbol(),
  {},
  new Number(555),
  function() {},
  {valueOf() { return 42}},
  {toString() { return 'def'}},
];

let nonNumbers = nonNumbersOrStrings.concat('abc');
let nonStrings = nonNumbersOrStrings.concat(42);

let binaryFunctions = [
  (x, y) => x & y,
  (x, y) => x ^ y,
  (x, y) => x | y,
  (x, y) => x << y,
  (x, y) => x - y,
  (x, y) => x % y,
  (x, y) => x >> y,
  (x, y) => x / y,
  (x, y) => x * y,
  (x, y) => x ** y,
  (x, y) => x >>> y,
];

for (let x of nonNumbers) {
  for (let y of nonNumbers) {
    for (let f of binaryFunctions) {
      assert.throws(() => f(x, y));
    }
  }
}

for (let x of nonNumbers) {
  for (let f of binaryFunctions) {
    assert.throws(() => f(42, x));
    assert.throws(() => f(x, 42));
  }
}

for (let f of binaryFunctions) {
  f(1, 2);
}

let assignmentFunctions = [
  (x, y) => x &= y,
  (x, y) => x ^= y,
  (x, y) => x |= y,
  (x, y) => x <<= y,
  (x, y) => x -= y,
  (x, y) => x %= y,
  (x, y) => x >>= y,
  (x, y) => x /= y,
  (x, y) => x *= y,
  (x, y) => x **= y,
  (x, y) => x >>>= y,
];

for (let x of nonNumbers) {
  for (let y of nonNumbers) {
    for (let f of assignmentFunctions) {
      assert.throws(() => f(x, y));
    }
  }
}

for (let x of nonNumbers) {
  for (let f of assignmentFunctions) {
    assert.throws(() => f(x, 1));
    assert.throws(() => f(2, x));
  }
}

for (let f of assignmentFunctions) {
  f(1, 2);
}

let unaryFunctions = [
  (x) => ~x,
  (x) => +x,
  (x) => -x,
  (x) => --x,
  (x) => ++x,
];

for (let x of nonNumbers) {
  for (let f of unaryFunctions) {
    assert.throws(() => f(x));
  }
}

for (let f of unaryFunctions) {
  f(1);
}

let postfixFunctions = [
  (x) => x++,
  (x) => x--,
];

  for (let f of postfixFunctions) {
for (let x of nonNumbers) {
    assert.throws(() => f(x));
  }
}

for (let f of postfixFunctions) {
  f(1);
}

let stringOrNumberFunctions = [
  (x, y) => x + y,
  (x, y) => x < y,
  (x, y) => x > y,
  (x, y) => x <= y,
  (x, y) => x >= y,
  (x, y) => x += y,
];

for (let x of nonNumbers) {
  for (let f of stringOrNumberFunctions) {
    assert.throws(() => f(x, 1));
    assert.throws(() => f(1, x));
  }
}

for (let x of nonStrings) {
  for (let f of stringOrNumberFunctions) {
    assert.throws(() => f(x, 'a'));
    assert.throws(() => f('a', x));
  }
}

for (let f of stringOrNumberFunctions) {
  f(1, 2);
  f('abc', 'def');
}
