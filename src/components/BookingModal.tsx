import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Lock, X } from 'lucide-react';
import { BRANCH_INFO } from '../data/gymData';
import {
  BookingFormInput,
  BookingValidationResult,
  generatePassCode,
  validateBookingForm,
} from '../utils/gymLogic';

export interface BookingContext {
  kind: 'trial' | 'membership' | 'consultation';
  title: string;
  summary: string;
}

export interface ConfirmedPass {
  code: string;
  fullName: string;
  phone: string;
  preferredSlot: string;
  goal: string;
  contextTitle: string;
  contextSummary: string;
  createdAt: string;
}

interface BookingModalProps {
  isOpen: boolean;
  context: BookingContext;
  activePass: ConfirmedPass | null;
  onClose: () => void;
  onConfirmPass: (pass: ConfirmedPass) => void;
  onClearPass: () => void;
}

const TIME_SLOTS = [
  'Early Morning (6:30 AM – 9:30 AM)',
  'Mid-Morning (10:00 AM – 1:00 PM)',
  'Afternoon (2:30 PM – 5:00 PM)',
  'Evening (5:30 PM – 9:00 PM)',
];

const GOALS = [
  'Sustainable Fat Loss & Toning',
  'Strength Training for Beginners',
  'Reformer Pilates & Posture Relief',
  'PCOS / Hormonal Health & Nutrition',
  'Postnatal Core & Mobility Recovery',
];

export function BookingModal({
  isOpen,
  context,
  activePass,
  onClose,
  onConfirmPass,
  onClearPass,
}: BookingModalProps) {
  const [form, setForm] = useState<BookingFormInput>({
    fullName: '',
    phone: '',
    preferredSlot: '',
    goal: '',
    notes: '',
  });
  const [errors, setErrors] = useState<BookingValidationResult['errors']>({});
  const [creatingNew, setCreatingNew] = useState(false);
  const [justConfirmed, setJustConfirmed] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setErrors({});
    setCreatingNew(false);
    setJustConfirmed(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const showExistingPass = Boolean(
    activePass && !creatingNew && (justConfirmed || context.kind === 'trial')
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm(form);
    if (!validation.valid || !validation.normalizedPhone) {
      setErrors(validation.errors);
      return;
    }

    const code = generatePassCode(validation.normalizedPhone, Date.now());
    const confirmed: ConfirmedPass = {
      code,
      fullName: form.fullName.trim(),
      phone: validation.normalizedPhone,
      preferredSlot: form.preferredSlot,
      goal: form.goal,
      contextTitle: context.title,
      contextSummary: context.summary,
      createdAt: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    onConfirmPass(confirmed);
    setCreatingNew(false);
    setJustConfirmed(true);
    setErrors({});
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#161416]/55 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#E7E3E5] bg-[#FFFFFF] p-6 shadow-ambient sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E7E3E5] pb-5">
          <div>
            <p className="font-display text-xs font-bold tracking-[0.06em] text-[#D92662]">
              MIRPUR-2 SANCTUARY · FEMALE RECEPTION
            </p>
            <h2
              id="booking-modal-title"
              className="mt-1.5 font-display text-2xl font-bold tracking-[-0.015em] text-[#161416]"
            >
              {showExistingPass ? 'Your Confirmed Sanctuary Pass' : context.title}
            </h2>
            <p className="mt-1 text-sm text-[#4A4448]">
              {showExistingPass
                ? 'Present this pass code at our female-only Mirpur-2 reception desk.'
                : context.summary}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking dialog"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E7E3E5] text-[#4A4448] transition-colors hover:border-[#161416] hover:text-[#161416]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {showExistingPass && activePass ? (
          <div className="mt-6 space-y-6" data-testid="confirmed-pass-view">
            <div className="rounded-2xl border border-[#E2BDC2] bg-[#FDF0F4] p-5">
              <div className="flex items-center gap-2.5 text-[#B81D50]">
                <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="font-display text-sm font-bold">
                  Confirmed · {activePass.contextTitle}
                </span>
              </div>
              <p className="mt-3 font-display text-3xl font-extrabold tracking-[-0.02em] tabular-nums text-[#161416]">
                {activePass.code}
              </p>
              <p className="mt-1 text-xs text-[#5A4044]">
                Issued {activePass.createdAt} · Valid for 14 days at {BRANCH_INFO.branchName}
              </p>
            </div>

            <dl className="grid grid-cols-1 gap-4 rounded-xl border border-[#E7E3E5] bg-[#FAF8F6] p-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-[#4A4448]">Member Name</dt>
                <dd className="mt-0.5 font-semibold text-[#161416]">{activePass.fullName}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#4A4448]">Mobile Number</dt>
                <dd className="mt-0.5 font-semibold tabular-nums text-[#161416]">
                  {activePass.phone}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#4A4448]">Preferred Slot</dt>
                <dd className="mt-0.5 font-semibold text-[#161416]">{activePass.preferredSlot}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#4A4448]">Primary Goal</dt>
                <dd className="mt-0.5 font-semibold text-[#161416]">{activePass.goal}</dd>
              </div>
            </dl>

            <div className="text-xs leading-5 text-[#4A4448]">
              <p className="font-semibold text-[#161416]">Where to arrive:</p>
              <p>
                {BRANCH_INFO.addressLine1}, {BRANCH_INFO.addressLine2}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E7E3E5] pt-5">
              <button
                type="button"
                onClick={() => {
                  onClearPass();
                  setCreatingNew(true);
                }}
                className="font-display text-sm font-semibold text-[#4A4448] underline underline-offset-4 transition-colors hover:text-[#D92662]"
              >
                Book another session
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[#161416] px-6 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-[#30302F]"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="booking-full-name"
                className="block font-display text-sm font-semibold text-[#161416]"
              >
                Full Name
              </label>
              <input
                id="booking-full-name"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="e.g., Nadia Sultana"
                value={form.fullName}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, fullName: e.target.value }));
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                className="input-editorial mt-1.5 w-full px-4 py-3 text-sm"
              />
              {errors.fullName && (
                <p role="alert" className="mt-1.5 text-xs font-medium text-[#BA1A1A]">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="booking-phone"
                className="block font-display text-sm font-semibold text-[#161416]"
              >
                Bangladesh Mobile / WhatsApp Number
              </label>
              <input
                id="booking-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="01712-345678"
                value={form.phone}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, phone: e.target.value }));
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                className="input-editorial mt-1.5 w-full px-4 py-3 text-sm tabular-nums"
              />
              {errors.phone && (
                <p role="alert" className="mt-1.5 text-xs font-medium text-[#BA1A1A]">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="booking-slot"
                  className="block font-display text-sm font-semibold text-[#161416]"
                >
                  Preferred Visit Time
                </label>
                <select
                  id="booking-slot"
                  name="preferredSlot"
                  value={form.preferredSlot}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, preferredSlot: e.target.value }));
                    if (errors.preferredSlot) {
                      setErrors((prev) => ({ ...prev, preferredSlot: undefined }));
                    }
                  }}
                  className="input-editorial mt-1.5 w-full px-3.5 py-3 text-sm"
                >
                  <option value="">Select time window</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.preferredSlot && (
                  <p role="alert" className="mt-1.5 text-xs font-medium text-[#BA1A1A]">
                    {errors.preferredSlot}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="booking-goal"
                  className="block font-display text-sm font-semibold text-[#161416]"
                >
                  Primary Goal
                </label>
                <select
                  id="booking-goal"
                  name="goal"
                  value={form.goal}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, goal: e.target.value }));
                    if (errors.goal) setErrors((prev) => ({ ...prev, goal: undefined }));
                  }}
                  className="input-editorial mt-1.5 w-full px-3.5 py-3 text-sm"
                >
                  <option value="">Select your goal</option>
                  {GOALS.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
                {errors.goal && (
                  <p role="alert" className="mt-1.5 text-xs font-medium text-[#BA1A1A]">
                    {errors.goal}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="booking-notes"
                className="block font-display text-sm font-semibold text-[#161416]"
              >
                Health Notes or Questions (Optional)
              </label>
              <textarea
                id="booking-notes"
                rows={2}
                placeholder="e.g., Postpartum recovery, beginner to strength training, PCOS meal guidance"
                value={form.notes ?? ''}
                onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                className="input-editorial mt-1.5 w-full px-4 py-2.5 text-sm"
              />
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-[#E2BDC2] bg-[#FDF0F4] p-3.5 text-xs leading-5 text-[#5A4044]">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#161416]" aria-hidden="true" />
              <p>
                Your contact details are handled solely by our female Mirpur-2 reception hosts
                and are never shared with third parties.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] rounded-full border border-[#E7E3E5] px-5 py-2.5 font-display text-sm font-semibold text-[#4A4448] transition-colors hover:border-[#161416] hover:text-[#161416]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="min-h-[44px] rounded-full bg-[#D92662] px-7 py-2.5 font-display text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#B81D50] hover:shadow-[0_12px_28px_-6px_rgba(217,38,98,0.28)]"
              >
                Confirm Pass
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
