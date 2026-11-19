import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppInquiryUrl,
  formatWhatsAppMessage,
  validateInquiryForm,
} from './inquiryLogic';

test('validateInquiryForm rejects empty name or invalid BD phone', () => {
  const empty = validateInquiryForm({
    name: '',
    phone: '',
    pkg: '2-Month Package (৳3,000 — Best Value)',
    batch: 'Morning (9:00 AM – 10:00 AM)',
    message: '',
  });
  assert.equal(empty.valid, false);
  assert.ok(empty.errors.name);
  assert.ok(empty.errors.phone);

  const badPhone = validateInquiryForm({
    name: 'Fatima Rahman',
    phone: '01100000000',
    pkg: '1-Month Package (৳2,000)',
    batch: 'Evening (6:00 PM – 7:00 PM)',
    message: '',
  });
  assert.equal(badPhone.valid, false);
  assert.ok(badPhone.errors.phone);
});

test('validateInquiryForm accepts valid Bangladesh mobile formats', () => {
  const res = validateInquiryForm({
    name: 'Fatima Rahman',
    phone: '01775-070398',
    pkg: '2-Month Package (৳3,000 — Best Value)',
    batch: 'Evening (6:00 PM – 7:00 PM)',
    message: 'Weight loss and toning',
  });
  assert.equal(res.valid, true);
  assert.deepEqual(res.errors, {});
});

test('buildWhatsAppInquiryUrl encodes exact WhatsApp destination and fields', () => {
  const input = {
    name: 'Fatima Rahman',
    phone: '01775-070398',
    pkg: '1-Month Package (৳2,000)',
    batch: 'Evening (6:00 PM – 7:00 PM)',
    message: 'Fat loss goal',
  };
  const msg = formatWhatsAppMessage(input);
  assert.match(msg, /Name: Fatima Rahman/);
  assert.match(msg, /Package: 1-Month Package \(৳2,000\)/);
  assert.match(msg, /Preferred Slot: Evening \(6:00 PM – 7:00 PM\)/);
  assert.match(msg, /Message: Fat loss goal/);

  const url = buildWhatsAppInquiryUrl(input);
  assert.ok(url.startsWith('https://wa.me/8801775070398?text='));
  assert.ok(decodeURIComponent(url).includes('Fatima Rahman'));
});
