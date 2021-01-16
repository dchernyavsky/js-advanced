import {flat, makeCounter, makeCounterExtended, sum, superSum} from "./lesson2";

test('Task 01 sum которая суммирует 2 числа следующим образом sum(3)(6) === 9', () => {
  expect(sum(1)(2)).toBe(3)
  expect(sum(3)(6)).toBe(9)
})

test('Task 02 makeCounter', () => {
  const counter = makeCounter();
  const counter2 = makeCounter();

  expect(counter()).toBe(1)
  expect(counter()).toBe(2)
  expect(counter2()).toBe(1)
  expect(counter()).toBe(3)
})

test('Task 03 makeCounterExtended', () => {
  const counterExtended = makeCounterExtended(2);
  const counterExtended2 = makeCounterExtended(10);

  expect(counterExtended.increase()).toBe(3)
  expect(counterExtended.decrease()).toBe(2)
  expect(counterExtended.set(6)).toBe(6)
  expect(counterExtended.reset()).toBe(0)

  expect(counterExtended2.increase()).toBe(11)
  expect(counterExtended2.decrease()).toBe(10)
  expect(counterExtended2.set(8)).toBe(8)
  expect(counterExtended2.reset()).toBe(0)
})

test('Task 04 superSum', () => {
  expect(superSum(0)).toBe(0)
  expect(superSum(3)(2)(5)(3)).toBe(10)
  expect(superSum(3)(2)(5, 3)).toBe(10)
  expect(superSum(3)(2, 5, 3)).toBe(10)
  expect(superSum(3)(2, 5)(3)).toBe(10)
  expect(superSum(3)(2, 5)(3, 9)).toBe(10)
})


test('Task 06 Array flat', () => {
  expect(flat([1, [2, 3]])).toEqual([1, 2, 3])
  expect(flat([1, [2, [3, [4, [5, 6]]]]])).toEqual([1, 2, 3, 4, 5, 6])
})