import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateBmi, classifyBmi } from './bmiLogic';

test('classifyBmi maps exact WHO threshold boundaries accurately', () => {
  assert.equal(classifyBmi(18.4).categoryId, 'underweight');
  assert.equal(classifyBmi(18.5).categoryId, 'normal');
  assert.equal(classifyBmi(24.9).categoryId, 'normal');
  assert.equal(classifyBmi(25.0).categoryId, 'overweight');
  assert.equal(classifyBmi(29.9).categoryId, 'overweight');
  assert.equal(classifyBmi(30.0).categoryId, 'obese');
});

test('calculateBmi computes ft/in and kg accurately with healthy weight target', () => {
  const normal = calculateBmi({
    heightFeet: '5',
    heightInches: '4',
    weightKg: '56',
  });
  assert.equal(normal.valid, true);
  assert.ok(normal.result);
  // 64 in = 1.6256 m; 56 / 2.642575 = 21.19 -> 21.2
  assert.equal(normal.result.bmi, 21.2);
  assert.equal(normal.result.categoryId, 'normal');
  assert.equal(normal.result.healthyWeightMinKg, 49);
  assert.equal(normal.result.healthyWeightMaxKg, 66);

  const exactFeet = calculateBmi({
    heightFeet: '5',
    heightInches: '',
    weightKg: '65',
  });
  assert.equal(exactFeet.valid, true);
  assert.ok(exactFeet.result);
  // 60 in = 1.524 m; 65 / 2.322576 = 27.99 -> 28.0
  assert.equal(exactFeet.result.bmi, 28.0);
  assert.equal(exactFeet.result.categoryId, 'overweight');
});

test('calculateBmi returns validation errors on empty or out-of-range inputs', () => {
  const empty = calculateBmi({
    heightFeet: '',
    heightInches: '',
    weightKg: '',
  });
  assert.equal(empty.valid, false);
  assert.ok(empty.errors.height);
  assert.ok(empty.errors.weight);

  const outOfRange = calculateBmi({
    heightFeet: '2',
    heightInches: '14',
    weightKg: '500',
  });
  assert.equal(outOfRange.valid, false);
  assert.ok(outOfRange.errors.height);
  assert.ok(outOfRange.errors.weight);
});
