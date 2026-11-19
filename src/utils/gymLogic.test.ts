import test from 'node:test';
import assert from 'node:assert/strict';
import { WEEKLY_CLASSES } from '../data/gymData';
import {
  calculateMembershipPricing,
  filterClasses,
  formatBDT,
  generatePassCode,
  getRemainingSpots,
  toggleReservationId,
  validateBookingForm,
} from './gymLogic';

test('calculateMembershipPricing computes monthly and annual discounts accurately', () => {
  const monthly = calculateMembershipPricing('complete', 'monthly', []);
  assert.equal(monthly.discountedMonthlyPlanRate, 4500);
  assert.equal(monthly.admissionFee, 2000);
  assert.equal(monthly.grandTotalFirstPayment, 6500);
  assert.equal(monthly.savingsAmount, 0);

  const annual = calculateMembershipPricing('complete', 'annual', ['bengali-diet']);
  // 4500 * 0.78 = 3510 / mo, + 1500 diet = 5010 / mo
  assert.equal(annual.discountedMonthlyPlanRate, 3510);
  assert.equal(annual.addOnsMonthlyTotal, 1500);
  assert.equal(annual.effectiveMonthlyTotal, 5010);
  // Annual waives 2000 admission fee
  assert.equal(annual.admissionFee, 0);
  // Plan savings: (4500 - 3510)*12 = 11880 + 2000 admission = 13880
  assert.equal(annual.savingsAmount, 13880);
  assert.equal(annual.grandTotalFirstPayment, 5010 * 12);
});

test('VIP plan always waives admission fee even on monthly billing', () => {
  const vipMonthly = calculateMembershipPricing('vip', 'monthly', []);
  assert.equal(vipMonthly.admissionFee, 0);
  assert.equal(vipMonthly.grandTotalFirstPayment, 8500);
});

test('filterClasses filters by day, category, intensity, and search query', () => {
  const sundayStrength = filterClasses(WEEKLY_CLASSES, {
    day: 'Sunday',
    category: 'Strength',
  });
  assert.equal(sundayStrength.length, 1);
  assert.equal(sundayStrength[0].id, 'sun-01');

  const pilatesGentle = filterClasses(WEEKLY_CLASSES, {
    category: 'Pilates',
    intensity: 'Gentle',
  });
  assert.equal(pilatesGentle.length, 2);

  const queryZumba = filterClasses(WEEKLY_CLASSES, { query: 'zumba' });
  assert.equal(queryZumba.length, 2);
});

test('getRemainingSpots and toggleReservationId update capacity cleanly', () => {
  const target = WEEKLY_CLASSES[0]; // capacity 12, baseBooked 8 -> 4 left
  assert.equal(getRemainingSpots(target, []), 4);

  const reserve = toggleReservationId([], target);
  assert.equal(reserve.action, 'reserved');
  assert.equal(getRemainingSpots(target, reserve.nextReservedIds), 3);

  const cancel = toggleReservationId(reserve.nextReservedIds, target);
  assert.equal(cancel.action, 'cancelled');
  assert.equal(getRemainingSpots(target, cancel.nextReservedIds), 4);
});

test('validateBookingForm rejects empty or invalid Bangladesh numbers and accepts valid ones', () => {
  const emptyRes = validateBookingForm({
    fullName: '',
    phone: '',
    preferredSlot: '',
    goal: '',
  });
  assert.equal(emptyRes.valid, false);
  assert.ok(emptyRes.errors.fullName);
  assert.ok(emptyRes.errors.phone);
  assert.ok(emptyRes.errors.preferredSlot);
  assert.ok(emptyRes.errors.goal);

  const badPhone = validateBookingForm({
    fullName: 'Nadia Sultana',
    phone: '01234567890', // 012 is invalid BD prefix
    preferredSlot: 'Morning (7:00 AM – 11:00 AM)',
    goal: 'Strength & Toning',
  });
  assert.equal(badPhone.valid, false);
  assert.ok(badPhone.errors.phone);

  const validRes = validateBookingForm({
    fullName: 'Nadia Sultana',
    phone: '+88 01712-345678',
    preferredSlot: 'Morning (7:00 AM – 11:00 AM)',
    goal: 'Strength & Toning',
  });
  assert.equal(validRes.valid, true);
  assert.equal(validRes.normalizedPhone, '+8801712345678');
});

test('formatBDT and generatePassCode return clean display strings', () => {
  assert.equal(formatBDT(8500), '৳8,500');
  assert.equal(generatePassCode('+8801712345678', 250), 'SFG-M2-5678-350');
});
