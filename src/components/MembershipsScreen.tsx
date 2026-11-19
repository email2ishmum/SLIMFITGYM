import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  BillingCycle,
  FAQ_ITEMS,
  MEMBERSHIP_ADDONS,
  MEMBERSHIP_PLANS,
  MembershipPlan,
} from '../data/gymData';
import {
  BILLING_CYCLES,
  calculateMembershipPricing,
  formatBDT,
} from '../utils/gymLogic';
import { BookingContext } from './BookingModal';

interface MembershipsScreenProps {
  onOpenBooking: (ctx: BookingContext) => void;
}

const CYCLE_ORDER: BillingCycle[] = ['monthly', 'quarterly', 'biannual', 'annual'];

export function MembershipsScreen({ onOpenBooking }: MembershipsScreenProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('quarterly');
  const [selectedPlanId, setSelectedPlanId] = useState<MembershipPlan['id']>('vip');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const activeCalculation = calculateMembershipPricing(
    selectedPlanId,
    billingCycle,
    selectedAddOns
  );

  return (
    <div className="bg-[#FAF8F6] py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-bold tracking-[0.06em] text-[#D92662]">
              TRANSPARENT BDT MEMBERSHIPS · NO HIDDEN FEES
            </p>
            <h1 className="mt-2 font-display text-[32px] leading-[40px] font-extrabold tracking-[-0.025em] text-[#161416] md:text-[44px] md:leading-[52px]">
              Choose Your Sanctuary Plan
            </h1>
            <p className="mt-3 text-base leading-7 text-[#4A4448]">
              Every tier includes 100% female-only floor access, private changing & prayer suites,
              and a complimentary onboarding orientation. Save up to 22% with annual enrollment.
            </p>
          </div>

          {/* Billing Cadence Segmented Switch */}
          <div
            className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl border border-[#E7E3E5] bg-white p-1.5"
            role="group"
            aria-label="Select billing cadence"
          >
            {CYCLE_ORDER.map((cycleId) => {
              const cfg = BILLING_CYCLES[cycleId];
              const active = billingCycle === cycleId;
              return (
                <button
                  key={cycleId}
                  type="button"
                  onClick={() => setBillingCycle(cycleId)}
                  className={`min-h-[40px] whitespace-nowrap rounded-xl px-4 py-2 font-display text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-[#161416] text-white'
                      : 'text-[#4A4448] hover:bg-[#FAF8F6] hover:text-[#161416]'
                  }`}
                >
                  <span>{cfg.label}</span>
                  {cfg.discountRate > 0 && (
                    <span
                      className={`ml-1.5 tabular-nums ${
                        active ? 'text-[#FFB2BF]' : 'text-[#D92662]'
                      }`}
                    >
                      -{Math.round(cfg.discountRate * 100)}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Plan Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {MEMBERSHIP_PLANS.map((plan) => {
            const calc = calculateMembershipPricing(plan.id, billingCycle, []);
            const isSelected = selectedPlanId === plan.id;
            return (
              <div
                key={plan.id}
                className={`flex flex-col justify-between rounded-2xl bg-white p-7 transition-all ${
                  plan.featured
                    ? 'border-2 border-[#D92662] shadow-ambient'
                    : isSelected
                      ? 'border-2 border-[#161416]'
                      : 'border border-[#E7E3E5]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-display text-xl font-bold text-[#161416]">{plan.name}</h2>
                    {plan.highlightNote && (
                      <span className="font-display text-[11px] font-bold tracking-[0.04em] text-[#D92662]">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#4A4448]">{plan.subtitle}</p>

                  <div className="mt-6 border-b border-[#E7E3E5] pb-6">
                    <div className="flex items-baseline gap-2">
                      <span
                        data-testid={`plan-rate-${plan.id}`}
                        className="font-display text-4xl font-extrabold tabular-nums tracking-[-0.02em] text-[#161416]"
                      >
                        {formatBDT(calc.discountedMonthlyPlanRate)}
                      </span>
                      <span className="text-sm text-[#4A4448]">/ month</span>
                    </div>
                    <p className="mt-1.5 text-xs tabular-nums text-[#4A4448]">
                      {billingCycle === 'monthly'
                        ? calc.admissionFee === 0
                          ? 'Admission fee waived (Save ৳2,000)'
                          : `One-time admission: ${formatBDT(calc.admissionFee)}`
                        : `Billed ${formatBDT(calc.discountedCycleTotal)} for ${calc.cycle.months} months · Save ${formatBDT(calc.savingsAmount)}`}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4A4448]">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-[#D92662]"
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPlanId(plan.id);
                      onOpenBooking({
                        kind: 'membership',
                        title: `Enroll in ${plan.name} (${calc.cycle.label})`,
                        summary: `${formatBDT(calc.discountedMonthlyPlanRate)}/mo · Total initial payment ${formatBDT(calc.grandTotalFirstPayment)} at Mirpur-2 studio.`,
                      });
                    }}
                    className={`min-h-[46px] w-full rounded-full px-6 py-3 font-display text-sm font-semibold transition-all ${
                      plan.featured
                        ? 'bg-[#D92662] text-white hover:bg-[#B81D50]'
                        : 'border-[1.5px] border-[#161416] text-[#161416] hover:bg-[#161416] hover:text-white'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlanId(plan.id)}
                    className="w-full py-1.5 font-display text-xs font-semibold text-[#4A4448] transition-colors hover:text-[#D92662]"
                  >
                    {isSelected ? 'Selected in calculator below' : 'Customize in calculator ↓'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive BDT Add-on Customizer & Live Breakdown */}
        <section className="mt-14 rounded-2xl border border-[#E2BDC2] bg-[#FDF0F4] p-6 md:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-display text-xs font-bold tracking-[0.06em] text-[#D92662]">
                CUSTOM PLAN BUILDER
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#161416]">
                Tailor {activeCalculation.plan.name} With Optional Add-Ons
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#5A4044]">
                Combine your chosen tier and billing period ({activeCalculation.cycle.label}) with
                private coaching or clinical nutrition support.
              </p>

              <div className="mt-6 space-y-3">
                {MEMBERSHIP_ADDONS.map((addon) => {
                  const checked = selectedAddOns.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex cursor-pointer items-start justify-between gap-4 rounded-xl border bg-white p-4 transition-colors ${
                        checked ? 'border-[#D92662]' : 'border-[#E7E3E5] hover:border-[#161416]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAddOn(addon.id)}
                          className="mt-1 h-4 w-4 accent-[#D92662]"
                        />
                        <div>
                          <span className="font-display text-sm font-bold text-[#161416]">
                            {addon.name}
                          </span>
                          <p className="mt-0.5 text-xs leading-5 text-[#4A4448]">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 font-display text-sm font-bold tabular-nums text-[#161416]">
                        +{formatBDT(addon.monthlyCost)}/mo
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                data-testid="pricing-summary-card"
                className="flex h-full flex-col justify-between rounded-2xl border border-[#E7E3E5] bg-white p-6 shadow-ambient"
              >
                <div>
                  <p className="font-display text-xs font-bold tracking-[0.06em] text-[#4A4448]">
                    LIVE ESTIMATE SUMMARY
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-[#161416]">
                    {activeCalculation.plan.name} · {activeCalculation.cycle.label}
                  </h3>

                  <dl className="mt-5 space-y-3 border-t border-[#E7E3E5] pt-5 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-[#4A4448]">Effective Monthly Rate</dt>
                      <dd
                        data-testid="summary-monthly-rate"
                        className="font-display font-bold tabular-nums text-[#161416]"
                      >
                        {formatBDT(activeCalculation.effectiveMonthlyTotal)} / mo
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-[#4A4448]">
                        {activeCalculation.cycle.months}-Month Subtotal
                      </dt>
                      <dd className="tabular-nums text-[#161416]">
                        {formatBDT(activeCalculation.discountedCycleTotal)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-[#4A4448]">One-Time Admission Fee</dt>
                      <dd className="tabular-nums text-[#161416]">
                        {activeCalculation.admissionFee === 0
                          ? 'Waived (৳0)'
                          : formatBDT(activeCalculation.admissionFee)}
                      </dd>
                    </div>
                    {activeCalculation.savingsAmount > 0 && (
                      <div className="flex items-center justify-between font-semibold text-[#B81D50]">
                        <dt>Total Savings</dt>
                        <dd data-testid="summary-savings" className="tabular-nums">
                          -{formatBDT(activeCalculation.savingsAmount)}
                        </dd>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-t border-[#E7E3E5] pt-4">
                      <dt className="font-display font-bold text-[#161416]">
                        Total First Payment
                      </dt>
                      <dd
                        data-testid="summary-grand-total"
                        className="font-display text-2xl font-extrabold tabular-nums text-[#D92662]"
                      >
                        {formatBDT(activeCalculation.grandTotalFirstPayment)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenBooking({
                        kind: 'membership',
                        title: `Lock In ${activeCalculation.plan.name} (${activeCalculation.cycle.label})`,
                        summary: `Effective ${formatBDT(activeCalculation.effectiveMonthlyTotal)}/mo · Total initial payment ${formatBDT(activeCalculation.grandTotalFirstPayment)}. Pay safely at Mirpur-2 reception after your tour.`,
                      })
                    }
                    className="min-h-[48px] w-full rounded-full bg-[#D92662] px-6 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-[#B81D50]"
                  >
                    Reserve This Plan
                  </button>
                  <p className="mt-2.5 text-center text-xs text-[#4A4448]">
                    Zero online prepayment required · Pay via Cash, bKash, or Card at reception
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="mt-20">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-bold tracking-[0.06em] text-[#D92662]">
              COMMON QUESTIONS
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-[#161416] md:text-3xl">
              Privacy, Attire & Membership Policies
            </h2>
          </div>

          <div className="mt-8 divide-y divide-[#E7E3E5] rounded-2xl border border-[#E7E3E5] bg-white">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div key={item.id} className="p-6">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 text-left font-display text-base font-bold text-[#161416] transition-colors hover:text-[#D92662]"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#4A4448] transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#D92662]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-[#4A4448]">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
