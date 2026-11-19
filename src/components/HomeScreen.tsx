import { useState } from 'react';
import { ArrowRight, Check, Lock, MapPin, ShieldCheck } from 'lucide-react';
import {
  AppScreen,
  BRANCH_INFO,
  BRAND_ASSETS,
  ClassCategory,
  FACILITY_ZONES,
  GymClass,
  MEMBERSHIP_PLANS,
  TESTIMONIALS,
  TRAINERS,
  WEEKLY_CLASSES,
} from '../data/gymData';
import { formatBDT, getRemainingSpots } from '../utils/gymLogic';
import { BookingContext } from './BookingModal';
import { MediaFrame } from './MediaFrame';

interface HomeScreenProps {
  reservedIds: string[];
  onToggleReserve: (cls: GymClass) => void;
  onNavigate: (screen: AppScreen) => void;
  onOpenBooking: (ctx?: BookingContext) => void;
}

const PREVIEW_CATEGORIES: (ClassCategory | 'All')[] = ['All', 'Strength', 'Pilates', 'HIIT', 'Zumba'];

export function HomeScreen({
  reservedIds,
  onToggleReserve,
  onNavigate,
  onOpenBooking,
}: HomeScreenProps) {
  const [previewCategory, setPreviewCategory] = useState<ClassCategory | 'All'>('All');
  const [storyLang, setStoryLang] = useState<'all' | 'en' | 'bn'>('all');

  const previewClasses = WEEKLY_CLASSES.filter((cls) =>
    previewCategory === 'All' ? true : cls.category === previewCategory
  ).slice(0, 4);

  const visibleTestimonials = TESTIMONIALS.filter((t) =>
    storyLang === 'all' ? true : t.language === storyLang
  );

  return (
    <div className="bg-[#FAF8F6]">
      {/* 1. HERO SECTION */}
      <section className="mx-auto max-w-[1280px] px-5 pt-10 pb-14 md:px-10 md:pt-16 md:pb-20">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Copy Column */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="font-display text-xs font-bold tracking-[0.06em] text-[#D92662]">
              MIRPUR-2, DHAKA · 100% FEMALE-ONLY SANCTUARY
            </p>
            <h1 className="mt-4 font-display text-[38px] leading-[1.12] font-extrabold tracking-[-0.03em] text-[#161416] md:text-[56px] md:leading-[1.12]">
              Strength in Complete Privacy.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#4A4448] md:text-lg md:leading-8">
              Slim Fit Gym is Mirpur-2’s dedicated ladies-only athletic studio—pairing clinical
              strength training, sunlit Reformer Pilates, and practical Bengali nutrition under
              100% female leadership.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  onOpenBooking({
                    kind: 'trial',
                    title: 'Book Your Free 1-Day Trial Pass',
                    summary:
                      'Experience a private tour, complimentary InBody check, and a studio floor or group class session in Mirpur-2.',
                  })
                }
                className="min-h-[48px] whitespace-nowrap rounded-full bg-[#D92662] px-7 py-3 font-display text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#B81D50] hover:shadow-[0_16px_36px_-6px_rgba(217,38,98,0.28)]"
              >
                Book Free Trial
              </button>
              <button
                type="button"
                onClick={() => onNavigate('schedule')}
                className="min-h-[48px] whitespace-nowrap rounded-full border-[1.5px] border-[#161416] bg-transparent px-7 py-3 font-display text-sm font-semibold text-[#161416] transition-all duration-200 hover:bg-[#161416] hover:text-white"
              >
                Explore Schedule
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-y-1.5 border-t border-[#E7E3E5] pt-6 text-xs font-medium text-[#4A4448] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
              <span>Female Trainers Only</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>Frosted Architectural Glass</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>Private Prayer & Shower Suite</span>
            </div>
          </div>

          {/* Hero Photography Column */}
          <div className="lg:col-span-6">
            <MediaFrame
              src={BRAND_ASSETS.heroStudio}
              alt="Sunlit private strength training floor inside Slim Fit Gym Mirpur-2"
              className="h-full min-h-[320px] lg:min-h-[460px]"
              imgClassName="h-full w-full object-cover"
              fallbackTitle="Slim Fit Gym · Mirpur-2 Floor"
            />
          </div>
        </div>

        {/* Full-Width Key Proof Strip Below Hero */}
        <div className="mt-12 grid grid-cols-2 gap-6 border-y border-[#E7E3E5] py-7 md:grid-cols-4 md:gap-8">
          <div>
            <p className="font-display text-2xl font-extrabold tabular-nums text-[#161416] md:text-3xl">
              100%
            </p>
            <p className="mt-1 text-sm text-[#4A4448]">Female coaches, hosts & members</p>
          </div>
          <div>
            <p className="font-display text-2xl font-extrabold tabular-nums text-[#161416] md:text-3xl">
              4,800 sq ft
            </p>
            <p className="mt-1 text-sm text-[#4A4448]">Private sunlit floor in Mirpur-2</p>
          </div>
          <div>
            <p className="font-display text-2xl font-extrabold tabular-nums text-[#161416] md:text-3xl">
              14+ / wk
            </p>
            <p className="mt-1 text-sm text-[#4A4448]">Small-group Strength, Pilates & HIIT</p>
          </div>
          <div>
            <p className="font-display text-2xl font-extrabold tabular-nums text-[#161416] md:text-3xl">
              6:30 AM
            </p>
            <p className="mt-1 text-sm text-[#4A4448]">Early opening through 9:30 PM daily</p>
          </div>
        </div>
      </section>

      {/* 2. PRIVACY & ASSURANCE BANNER */}
      <section className="mx-auto max-w-[1280px] px-5 pb-16 md:px-10 md:pb-24">
        <div className="rounded-2xl border border-[#E2BDC2] bg-[#FDF0F4] p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#161416] text-white">
                <Lock className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-[-0.015em] text-[#161416] md:text-[32px] md:leading-[40px]">
                Dignity & Privacy Engineered Into Every Wall.
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5A4044] md:text-base md:leading-7">
                No awkward shared lobbies, no stray cameras, and no compromises. Every operational
                detail is designed so women across Mirpur can train freely and comfortably.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {[
                {
                  title: 'Biometric Ladies-Only Entry',
                  desc: 'Secured turnstile reception staffed exclusively by female hosts during all open hours.',
                },
                {
                  title: 'Frosted Architectural Daylight',
                  desc: 'Bright natural morning sunlight enters through full-height opaque privacy glass.',
                },
                {
                  title: 'Strict Zero-Camera Policy',
                  desc: 'No recording in changing suites, showers, prayer nook, or active group classes.',
                },
                {
                  title: 'Modest Attire Friendly',
                  desc: 'Train comfortably in athletic hijabs, loose layers, or standard studio wear.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#E2BDC2]/70 bg-white/85 p-5"
                >
                  <p className="font-display text-sm font-bold text-[#161416]">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-6 text-[#4A4448]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ASYMMETRIC FACILITY ZONES */}
      <section className="mx-auto max-w-[1280px] px-5 pb-20 md:px-10 md:pb-28">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-display text-xs font-bold tracking-[0.06em] text-[#D92662]">
              THE SPACE
            </p>
            <h2 className="mt-2 font-display text-[30px] leading-[36px] font-bold tracking-[-0.02em] text-[#161416] md:text-[40px] md:leading-[48px]">
              Four Purpose-Built Zones
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#4A4448] md:text-base">
            Thoughtfully zoned to prevent overcrowding—from quiet Reformer Pilates to progressive
            strength training.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Primary Featured Zone 01 */}
          <article className="overflow-hidden rounded-2xl border border-[#E7E3E5] bg-white lg:col-span-7">
            <div className="grid h-full grid-cols-1 sm:grid-cols-12">
              <div className="sm:col-span-6">
                <MediaFrame
                  src={FACILITY_ZONES[0].image!}
                  alt={FACILITY_ZONES[0].imageAlt!}
                  className="h-full min-h-[240px] rounded-none ring-0"
                />
              </div>
              <div className="flex flex-col justify-between p-6 sm:col-span-6">
                <div>
                  <p className="font-display text-xs font-bold text-[#D92662]">
                    {FACILITY_ZONES[0].number} {FACILITY_ZONES[0].area}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-[#161416]">
                    {FACILITY_ZONES[0].title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#4A4448]">
                    {FACILITY_ZONES[0].summary}
                  </p>
                </div>
                <ul className="mt-5 space-y-2 border-t border-[#E7E3E5] pt-4 text-xs text-[#4A4448]">
                  {FACILITY_ZONES[0].highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D92662]" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          {/* Featured Zone 02 */}
          <article className="flex flex-col overflow-hidden rounded-2xl border border-[#E7E3E5] bg-white lg:col-span-5">
            <MediaFrame
              src={FACILITY_ZONES[1].image!}
              alt={FACILITY_ZONES[1].imageAlt!}
              className="h-52 rounded-none ring-0"
            />
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <p className="font-display text-xs font-bold text-[#D92662]">
                  {FACILITY_ZONES[1].number} {FACILITY_ZONES[1].area}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-[#161416]">
                  {FACILITY_ZONES[1].title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#4A4448]">
                  {FACILITY_ZONES[1].summary}
                </p>
              </div>
            </div>
          </article>

          {/* Compact Zones 03 & 04 */}
          {FACILITY_ZONES.slice(2).map((zone) => (
            <article
              key={zone.id}
              className="rounded-2xl border border-[#E7E3E5] bg-white p-6 lg:col-span-6"
            >
              <p className="font-display text-xs font-bold text-[#D92662]">
                {zone.number} {zone.area}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-[#161416]">{zone.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#4A4448]">{zone.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#E7E3E5] pt-4 text-xs text-[#4A4448]">
                {zone.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-[#D92662]" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 4. LIVE SCHEDULE PREVIEW (Alternating Blush Band) */}
      <section className="border-y border-[#E7E3E5] bg-[#FDF0F4] py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-display text-xs font-bold tracking-[0.06em] text-[#D92662]">
                GUIDED GROUP CLASSES
              </p>
              <h2 className="mt-2 font-display text-[30px] leading-[36px] font-bold tracking-[-0.02em] text-[#161416] md:text-[40px] md:leading-[48px]">
                Reserve Your Mat or Reformer
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter preview classes">
              {PREVIEW_CATEGORIES.map((cat) => {
                const active = previewCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setPreviewCategory(cat)}
                    className={`min-h-[40px] whitespace-nowrap rounded-full px-4 py-2 font-display text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-[#161416] text-white'
                        : 'border border-[#E7E3E5] bg-white text-[#4A4448] hover:border-[#161416] hover:text-[#161416]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {previewClasses.map((cls) => {
              const isReserved = reservedIds.includes(cls.id);
              const spotsLeft = getRemainingSpots(cls, reservedIds);
              return (
                <div
                  key={cls.id}
                  className="shadow-ambient-hover flex flex-col justify-between gap-4 rounded-2xl border border-[#E7E3E5] bg-white p-6 sm:flex-row sm:items-center"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A4448]">
                      <span className="font-semibold text-[#D92662]">{cls.day}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums font-semibold text-[#161416]">
                        {cls.startTime}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{cls.durationMin} min</span>
                      <span aria-hidden="true">·</span>
                      <span>{cls.category}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold text-[#161416]">
                      {cls.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#4A4448]">
                      Coach {cls.trainerName} · {cls.studio}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <span className="text-xs font-medium tabular-nums text-[#4A4448]">
                      {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleReserve(cls)}
                      className={`min-h-[40px] whitespace-nowrap rounded-full px-5 py-2 font-display text-xs font-semibold transition-colors ${
                        isReserved
                          ? 'bg-[#161416] text-white hover:bg-[#30302F]'
                          : 'bg-[#D92662] text-white hover:bg-[#B81D50]'
                      }`}
                    >
                      {isReserved ? 'Reserved ✓' : 'Reserve Spot'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigate('schedule')}
              className="inline-flex items-center gap-2 font-display text-sm font-semibold text-[#161416] underline decoration-[#161416]/40 underline-offset-4 transition-colors hover:text-[#D92662] hover:decoration-[#D92662]"
            >
              <span>View Full Saturday–Thursday Timetable</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. FEMALE COACHES & CLINICAL NUTRITION PREVIEW */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-display text-xs font-bold tracking-[0.06em] text-[#D92662]">
              100% FEMALE COACHING TEAM
            </p>
            <h2 className="mt-2 font-display text-[30px] leading-[36px] font-bold tracking-[-0.02em] text-[#161416] md:text-[40px] md:leading-[48px]">
              Certified Coaches & Clinical Nutrition
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('trainers')}
            className="inline-flex items-center gap-2 self-start font-display text-sm font-semibold text-[#161416] underline decoration-[#161416]/40 underline-offset-4 transition-colors hover:text-[#D92662] hover:decoration-[#D92662] md:self-auto"
          >
            <span>Meet All Specialists</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TRAINERS.slice(0, 3).map((trainer) => (
            <article
              key={trainer.id}
              className="shadow-ambient-hover flex flex-col overflow-hidden rounded-2xl border border-[#E7E3E5] bg-white"
            >
              <MediaFrame
                src={trainer.image}
                alt={trainer.imageAlt}
                className="aspect-[3/4] w-full rounded-none ring-0"
                imgClassName="h-full w-full object-cover object-top"
                fallbackTitle={trainer.name}
              />
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="text-xs font-medium text-[#D92662]">
                    {trainer.specialty} · {trainer.experienceYears} yrs exp
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-[#161416]">
                    {trainer.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#4A4448]">{trainer.role}</p>
                  <p className="mt-3 text-sm leading-6 text-[#4A4448]">{trainer.bio}</p>
                </div>
                <div className="mt-5 border-t border-[#E7E3E5] pt-4">
                  <p className="text-xs font-semibold text-[#161416]">{trainer.outcomeStat}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. MEMBERSHIP TIERS PREVIEW (Blush Alternating Band) */}
      <section className="border-y border-[#E7E3E5] bg-[#FDF0F4] py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-display text-xs font-bold tracking-[0.06em] text-[#D92662]">
                TRANSPARENT BDT MEMBERSHIPS
              </p>
              <h2 className="mt-2 font-display text-[30px] leading-[36px] font-bold tracking-[-0.02em] text-[#161416] md:text-[40px] md:leading-[48px]">
                Invest in Consistent Health
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('memberships')}
              className="inline-flex items-center gap-2 self-start font-display text-sm font-semibold text-[#161416] underline decoration-[#161416]/40 underline-offset-4 transition-colors hover:text-[#D92662] hover:decoration-[#D92662] md:self-auto"
            >
              <span>Open Savings Calculator & Annual Plans</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`flex flex-col justify-between rounded-2xl bg-white p-7 ${
                  plan.featured
                    ? 'border-2 border-[#D92662] shadow-ambient'
                    : 'border border-[#E7E3E5]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-bold text-[#161416]">{plan.name}</h3>
                    {plan.featured && (
                      <span className="font-display text-xs font-bold tracking-[0.04em] text-[#D92662]">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#4A4448]">{plan.subtitle}</p>
                  <div className="mt-6 flex items-baseline gap-1.5 border-b border-[#E7E3E5] pb-6">
                    <span className="font-display text-4xl font-extrabold tabular-nums tracking-[-0.02em] text-[#161416]">
                      {formatBDT(plan.monthlyRate)}
                    </span>
                    <span className="text-sm text-[#4A4448]">/ month</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4A4448]">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-[#D92662]"
                          aria-hidden="true"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenBooking({
                        kind: 'membership',
                        title: `Enroll in ${plan.name}`,
                        summary: `${formatBDT(plan.monthlyRate)}/month · Reserve your onboarding orientation at our Mirpur-2 studio.`,
                      })
                    }
                    className={`min-h-[46px] w-full rounded-full px-6 py-3 font-display text-sm font-semibold transition-all ${
                      plan.featured
                        ? 'bg-[#D92662] text-white hover:bg-[#B81D50]'
                        : 'border-[1.5px] border-[#161416] bg-transparent text-[#161416] hover:bg-[#161416] hover:text-white'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BILINGUAL MEMBER STORIES (English & Hind Siliguri Bengali) */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-display text-xs font-bold tracking-[0.06em] text-[#D92662]">
              VERIFIED MIRPUR-2 MEMBERS
            </p>
            <h2 className="mt-2 font-display text-[30px] leading-[36px] font-bold tracking-[-0.02em] text-[#161416] md:text-[40px] md:leading-[48px]">
              Real Progress, Told in Their Own Words
            </h2>
          </div>

          <div className="flex items-center gap-2" role="group" aria-label="Filter stories by language">
            {[
              { id: 'all', label: 'All Stories' },
              { id: 'en', label: 'English' },
              { id: 'bn', label: 'বাংলা' },
            ].map((tab) => {
              const active = storyLang === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStoryLang(tab.id as 'all' | 'en' | 'bn')}
                  className={`min-h-[40px] whitespace-nowrap rounded-full px-4 py-2 font-display text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-[#161416] text-white'
                      : 'border border-[#E7E3E5] bg-white text-[#4A4448] hover:border-[#161416] hover:text-[#161416]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {visibleTestimonials.map((story) => (
            <article
              key={story.id}
              data-testid={`story-${story.language}`}
              className="flex flex-col justify-between rounded-2xl border border-[#E7E3E5] bg-white p-7"
            >
              <div>
                <p className="font-sans text-xs font-semibold tabular-nums text-[#D92662]">
                  {story.englishMetric}
                </p>
                <blockquote
                  className={`mt-4 text-[#161416] ${
                    story.language === 'bn'
                      ? 'font-bengali text-base leading-relaxed'
                      : 'text-base leading-7'
                  }`}
                >
                  “{story.quote}”
                </blockquote>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#E7E3E5] pt-4 text-xs text-[#4A4448]">
                <div>
                  <span className="font-display font-bold text-[#161416]">{story.name}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>{story.role}</span>
                </div>
                <span>
                  {story.neighborhood} · {story.duration}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 8. MIRPUR-2 VISIT & FINAL CTA */}
      <section className="mx-auto max-w-[1280px] px-5 pb-24 md:px-10">
        <div className="rounded-2xl border border-[#E7E3E5] bg-white p-8 shadow-ambient md:p-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold tracking-[0.06em] text-[#D92662]">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>MIRPUR-2, DHAKA</span>
              </div>
              <h2 className="mt-3 font-display text-[28px] leading-[36px] font-bold tracking-[-0.02em] text-[#161416] md:text-[36px] md:leading-[44px]">
                Tour the Sanctuary Before You Commit.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#4A4448] md:text-base md:leading-7">
                Visit {BRANCH_INFO.addressLine1}, {BRANCH_INFO.addressLine2}. Enjoy a complimentary
                1-day studio pass and private consultation with our female reception and coaching
                team.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <button
                type="button"
                onClick={() =>
                  onOpenBooking({
                    kind: 'trial',
                    title: 'Book Your Free 1-Day Trial Pass',
                    summary:
                      'Reserve your complimentary tour and studio workout at Slim Fit Gym Mirpur-2.',
                  })
                }
                className="min-h-[48px] whitespace-nowrap rounded-full bg-[#D92662] px-7 py-3 font-display text-sm font-semibold text-white transition-all hover:bg-[#B81D50]"
              >
                Book Free Trial
              </button>
              <button
                type="button"
                onClick={() => onNavigate('visit')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-full border-[1.5px] border-[#161416] px-6 py-3 font-display text-sm font-semibold text-[#161416] transition-colors hover:bg-[#161416] hover:text-white"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                <span>Directions & Hours</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
