import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { TRAINERS, Trainer } from '../data/gymData';
import { BookingContext } from './BookingModal';
import { MediaFrame } from './MediaFrame';

interface TrainersScreenProps {
  onOpenBooking: (ctx: BookingContext) => void;
}

const SPECIALTIES: (Trainer['specialty'] | 'All')[] = [
  'All',
  'Strength & Conditioning',
  'Pilates & Mobility',
  'Clinical Nutrition',
  'HIIT & Weight Loss',
];

export function TrainersScreen({ onOpenBooking }: TrainersScreenProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Trainer['specialty'] | 'All'>('All');

  const visibleTrainers = TRAINERS.filter((t) =>
    selectedSpecialty === 'All' ? true : t.specialty === selectedSpecialty
  );

  return (
    <div className="bg-[#FAF8F6] py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="font-display text-xs font-bold tracking-[0.06em] text-[#D92662]">
            100% FEMALE SPECIALISTS · MIRPUR-2
          </p>
          <h1 className="mt-2 font-display text-[32px] leading-[40px] font-extrabold tracking-[-0.025em] text-[#161416] md:text-[44px] md:leading-[52px]">
            Certified Coaches & Clinical Nutritionists
          </h1>
          <p className="mt-3 text-base leading-7 text-[#4A4448]">
            Every trainer on our studio floor is a certified female coach fluent in Bengali and
            English—trained in women’s strength biomechanics, postpartum recovery, and sustainable
            South Asian nutrition.
          </p>
        </div>

        {/* Specialty Filter Chips */}
        <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter trainers by specialty">
          {SPECIALTIES.map((spec) => {
            const active = selectedSpecialty === spec;
            return (
              <button
                key={spec}
                type="button"
                onClick={() => setSelectedSpecialty(spec)}
                className={`min-h-[40px] whitespace-nowrap rounded-full px-4 py-2 font-display text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-[#161416] text-white'
                    : 'border border-[#E7E3E5] bg-white text-[#4A4448] hover:border-[#161416] hover:text-[#161416]'
                }`}
              >
                {spec}
              </button>
            );
          })}
        </div>

        {/* Trainer Cards */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {visibleTrainers.map((trainer) => (
            <article
              key={trainer.id}
              className="shadow-ambient-hover grid grid-cols-1 overflow-hidden rounded-2xl border border-[#E7E3E5] bg-white sm:grid-cols-12"
            >
              <div className="sm:col-span-5">
                <MediaFrame
                  src={trainer.image}
                  alt={trainer.imageAlt}
                  className="h-full min-h-[280px] rounded-none ring-0"
                  imgClassName="h-full w-full object-cover object-top"
                  fallbackTitle={trainer.name}
                />
              </div>

              <div className="flex flex-col justify-between p-6 sm:col-span-7">
                <div>
                  <p className="text-xs font-semibold text-[#D92662]">
                    {trainer.specialty} · {trainer.experienceYears} years experience
                  </p>
                  <h2 className="mt-1.5 font-display text-2xl font-bold text-[#161416]">
                    {trainer.name}
                  </h2>
                  <p className="mt-0.5 text-sm font-medium text-[#4A4448]">{trainer.role}</p>

                  <p className="mt-3 text-sm leading-6 text-[#4A4448]">{trainer.bio}</p>

                  <ul className="mt-4 space-y-1.5 text-xs text-[#161416]">
                    {trainer.certifications.map((cert) => (
                      <li key={cert} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D92662]"
                          aria-hidden="true"
                        />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 space-y-4 border-t border-[#E7E3E5] pt-4">
                  <div className="text-xs text-[#4A4448]">
                    <p className="font-semibold text-[#161416]">{trainer.outcomeStat}</p>
                    <p className="mt-1">
                      {trainer.availability} · Speaks {trainer.languages.join(' & ')}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenBooking({
                        kind: 'consultation',
                        title: `1-on-1 Consultation with ${trainer.name}`,
                        summary: `${trainer.role} · Available ${trainer.availability} at Mirpur-2 Sanctuary.`,
                      })
                    }
                    className="min-h-[42px] w-full rounded-full bg-[#D92662] px-5 py-2.5 font-display text-xs font-semibold text-white transition-colors hover:bg-[#B81D50]"
                  >
                    Book 1-on-1 Consultation
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Clinical Nutrition Philosophy Band */}
        <section className="mt-16 rounded-2xl border border-[#E2BDC2] bg-[#FDF0F4] p-7 md:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold tracking-[0.06em] text-[#D92662]">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>REALISTIC BANGLADESHI NUTRITION</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#161416] md:text-3xl">
                Meal Plans Built Around Your Family Kitchen.
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5A4044] md:text-base md:leading-7">
                Crash diets fail because they ignore how Dhaka households eat. Our clinical
                nutritionist builds macro-balanced plans using familiar staples—steamed rice,
                masoor dal, local fish, seasonal shak, and egg-based breakfasts—tailored for
                PCOS, thyroid balance, and postpartum vitality.
              </p>
            </div>
            <div className="flex lg:col-span-5 lg:justify-end">
              <button
                type="button"
                onClick={() =>
                  onOpenBooking({
                    kind: 'consultation',
                    title: 'Clinical Nutrition Assessment with Dr. Tahmina',
                    summary:
                      'Includes InBody 570 body-composition review and custom Bangladeshi household meal blueprint.',
                  })
                }
                className="min-h-[48px] whitespace-nowrap rounded-full bg-[#161416] px-7 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-[#30302F]"
              >
                Schedule Nutrition Assessment
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
