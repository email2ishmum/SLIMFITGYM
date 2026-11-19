import { FormEvent, useState } from 'react';
import { CheckCircle2, Clock, Lock, MapPin, Phone } from 'lucide-react';
import { BRANCH_INFO, BRAND_ASSETS } from '../data/gymData';
import { BookingValidationResult, generatePassCode, validateBookingForm } from '../utils/gymLogic';
import { ConfirmedPass } from './BookingModal';
import { MediaFrame } from './MediaFrame';

interface VisitScreenProps {
  activePass: ConfirmedPass | null;
  onConfirmPass: (pass: ConfirmedPass) => void;
}

const SLOTS = [
  'Early Morning (6:30 AM – 9:30 AM)',
  'Mid-Morning (10:00 AM – 1:00 PM)',
  'Afternoon (2:30 PM – 5:00 PM)',
  'Evening (5:30 PM – 9:00 PM)',
];

const GOALS = [
  'Private Sanctuary Tour & Trial',
  'Sustainable Fat Loss & Toning',
  'Reformer Pilates & Core Rehab',
  'PCOS / Nutrition Consultation',
];

export function VisitScreen({ activePass, onConfirmPass }: VisitScreenProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('');
  const [goal, setGoal] = useState('');
  const [errors, setErrors] = useState<BookingValidationResult['errors']>({});
  const [submittedPass, setSubmittedPass] = useState<ConfirmedPass | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = validateBookingForm({ fullName, phone, preferredSlot, goal });
    if (!res.valid || !res.normalizedPhone) {
      setErrors(res.errors);
      return;
    }

    const pass: ConfirmedPass = {
      code: generatePassCode(res.normalizedPhone, Date.now()),
      fullName: fullName.trim(),
      phone: res.normalizedPhone,
      preferredSlot,
      goal,
      contextTitle: 'Mirpur-2 Private Studio Tour',
      contextSummary: 'Complimentary female-hosted tour & 1-day trial access.',
      createdAt: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    onConfirmPass(pass);
    setSubmittedPass(pass);
    setErrors({});
    setFullName('');
    setPhone('');
    setPreferredSlot('');
    setGoal('');
  };

  const displayPass = submittedPass ?? activePass;

  return (
    <div className="bg-[#FAF8F6] py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-bold tracking-[0.06em] text-[#D92662]">
            MIRPUR-2, DHAKA · LOCATION & PRIVATE TOURS
          </p>
          <h1 className="mt-2 font-display text-[32px] leading-[40px] font-extrabold tracking-[-0.025em] text-[#161416] md:text-[44px] md:leading-[52px]">
            Visit Slim Fit Gym in Mirpur-2
          </h1>
          <p className="mt-3 text-base leading-7 text-[#4A4448]">
            Located two minutes from Mirpur Stadium Gate 2 with dedicated female reception, easy
            rickshaw & car drop-off, and quiet sunlit interiors away from main-road noise.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Address, Hours, Studio Photo */}
          <div className="space-y-6 lg:col-span-6">
            <MediaFrame
              src={BRAND_ASSETS.pilatesZone}
              alt="Sunlit Reformer Pilates studio inside Slim Fit Gym Mirpur-2"
              className="aspect-[4/3] w-full"
              fallbackTitle="Slim Fit Gym · Mirpur-2 Sanctuary"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#E7E3E5] bg-white p-6">
                <MapPin className="h-5 w-5 text-[#D92662]" aria-hidden="true" />
                <h2 className="mt-3 font-display text-base font-bold text-[#161416]">
                  Sanctuary Address
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-[#4A4448]">
                  {BRANCH_INFO.addressLine1}
                  <br />
                  {BRANCH_INFO.addressLine2}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E7E3E5] bg-white p-6">
                <Clock className="h-5 w-5 text-[#D92662]" aria-hidden="true" />
                <h2 className="mt-3 font-display text-base font-bold text-[#161416]">
                  Opening Hours
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-[#4A4448]">
                  {BRANCH_INFO.hoursWeekdays}
                  <br />
                  {BRANCH_INFO.hoursFriday}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E2BDC2] bg-[#FDF0F4] p-6">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#161416]" aria-hidden="true" />
                <div>
                  <h2 className="font-display text-base font-bold text-[#161416]">
                    Female Front-Desk Hotline & WhatsApp
                  </h2>
                  <p className="mt-1 font-display text-lg font-extrabold tabular-nums text-[#D92662]">
                    {BRANCH_INFO.phone}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#5A4044]">
                    All calls and WhatsApp messages are answered exclusively by our female
                    reception team in Mirpur-2.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Tour Booking Form */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-[#E7E3E5] bg-white p-7 shadow-ambient md:p-9">
              <h2 className="font-display text-2xl font-bold text-[#161416]">
                Schedule Your Private Studio Tour
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#4A4448]">
                Walk through our strength floor, Reformer Pilates loft, and private changing &
                prayer suites before selecting a membership.
              </p>

              {displayPass && (
                <div className="mt-6 rounded-xl border border-[#E2BDC2] bg-[#FDF0F4] p-4">
                  <div className="flex items-center gap-2 text-[#B81D50]">
                    <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="font-display text-xs font-bold">
                      Active Pass Ready · {displayPass.code}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#5A4044]">
                    Reserved for {displayPass.fullName} ({displayPass.preferredSlot}). You can
                    also schedule an additional visit below.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="visit-name"
                    className="block font-display text-sm font-semibold text-[#161416]"
                  >
                    Full Name
                  </label>
                  <input
                    id="visit-name"
                    type="text"
                    placeholder="e.g., Maliha Rahman"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
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
                    htmlFor="visit-phone"
                    className="block font-display text-sm font-semibold text-[#161416]"
                  >
                    Bangladesh Mobile Number
                  </label>
                  <input
                    id="visit-phone"
                    type="tel"
                    placeholder="01712-345678"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                    }}
                    className="input-editorial mt-1.5 w-full px-4 py-3 text-sm tabular-nums"
                  />
                  {errors.phone && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-[#BA1A1A]">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="visit-slot"
                    className="block font-display text-sm font-semibold text-[#161416]"
                  >
                    Preferred Visit Window
                  </label>
                  <select
                    id="visit-slot"
                    value={preferredSlot}
                    onChange={(e) => {
                      setPreferredSlot(e.target.value);
                      if (errors.preferredSlot) {
                        setErrors((p) => ({ ...p, preferredSlot: undefined }));
                      }
                    }}
                    className="input-editorial mt-1.5 w-full px-3.5 py-3 text-sm"
                  >
                    <option value="">Choose time slot</option>
                    {SLOTS.map((slot) => (
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
                    htmlFor="visit-goal"
                    className="block font-display text-sm font-semibold text-[#161416]"
                  >
                    What Would You Like to Explore?
                  </label>
                  <select
                    id="visit-goal"
                    value={goal}
                    onChange={(e) => {
                      setGoal(e.target.value);
                      if (errors.goal) setErrors((p) => ({ ...p, goal: undefined }));
                    }}
                    className="input-editorial mt-1.5 w-full px-3.5 py-3 text-sm"
                  >
                    <option value="">Select focus</option>
                    {GOALS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  {errors.goal && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-[#BA1A1A]">
                      {errors.goal}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-2.5 text-xs leading-5 text-[#4A4448]">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#161416]" aria-hidden="true" />
                  <p>Strict privacy guarantee: female-only entry & zero third-party sharing.</p>
                </div>

                <button
                  type="submit"
                  className="min-h-[48px] w-full rounded-full bg-[#D92662] px-6 py-3 font-display text-sm font-semibold text-white transition-all hover:bg-[#B81D50]"
                >
                  Confirm Private Tour Pass
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
