import { DAILY_BATCHES, PROGRAMMES } from '../data/originalGymData';

interface ProgrammesAndScheduleProps {
  selectedBatch: string;
  onSelectBatch: (batchValue: string) => void;
}

export function ProgrammesAndSchedule({
  selectedBatch,
  onSelectBatch,
}: ProgrammesAndScheduleProps) {
  return (
    <>
      {/* OUR PROGRAMMES SECTION */}
      <section id="programmes" className="w-full scroll-mt-20 bg-surface py-10 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
            <span className="mb-1 rounded-full bg-primary-fixed/40 px-3.5 py-1 font-display text-[12px] leading-[16px] font-bold tracking-wider text-primary uppercase dark:border dark:border-primary-container/30 dark:bg-primary-container/20 dark:text-primary-fixed">
              Comprehensive Fitness Options
            </span>
            <h2 className="mb-1 font-display text-[30px] leading-[36px] font-bold tracking-[-0.015em] text-on-surface lg:text-[40px] lg:leading-[48px] lg:tracking-[-0.02em]">
              Our Specialised Programmes
            </h2>
            <p className="text-[16px] leading-[24px] text-secondary">
              Tailored fitness regimes engineered specifically for women&apos;s wellness, strength,
              and confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROGRAMMES.map((prog) => (
              <div
                key={prog.id}
                className="group rounded-2xl bg-surface-container-lowest p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border dark:border-white/10 dark:hover:border-primary-container/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary-fixed text-primary transition-colors group-hover:bg-primary-container group-hover:text-on-primary-container dark:bg-primary-container/20 dark:text-primary-fixed">
                  <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                    {prog.icon}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-[20px] leading-[28px] font-bold text-on-surface">
                  {prog.title}
                </h3>
                <p className="text-[14px] leading-[20px] text-secondary">{prog.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLASS TIMES & STUDIO HOURS SECTION */}
      <section
        id="schedule"
        className="w-full scroll-mt-20 bg-surface-container-low py-10 lg:py-24"
      >
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
            <span className="mb-1 rounded-full bg-primary-fixed/40 px-3.5 py-1 font-display text-[12px] leading-[16px] font-bold tracking-wider text-primary uppercase dark:border dark:border-primary-container/30 dark:bg-primary-container/20 dark:text-primary-fixed">
              Flexible Timetable
            </span>
            <h2 className="mb-1 font-display text-[30px] leading-[36px] font-bold tracking-[-0.015em] text-on-surface lg:text-[40px] lg:leading-[48px] lg:tracking-[-0.02em]">
              Class Times &amp; Studio Hours
            </h2>
            <p className="text-[16px] leading-[24px] text-secondary">
              Click any batch below to pre-select that time slot in your inquiry form.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
            {/* Left Card: Gym Hours */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-inverse-surface p-5 text-inverse-on-surface shadow-xl dark:border dark:border-white/10 sm:p-8 lg:col-span-5 lg:p-10">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-surface-container-high/10 px-3 py-1 font-display text-[12px] leading-[16px] font-bold tracking-wider text-primary-fixed uppercase">
                  <span>Studio Timetable</span>
                </div>
                <h3 className="mb-2 font-display text-[26px] leading-[34px] font-bold sm:text-[32px] sm:leading-[40px]">
                  Weekly Studio Hours
                </h3>
                <p className="mb-6 text-[15px] leading-[22px] text-surface-container-highest sm:text-[16px] sm:leading-[24px]">
                  Open Saturday through Thursday for continuous fitness.
                </p>

                <div className="mb-6 flex flex-col gap-3 sm:gap-4">
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface-container-high/10 p-3.5 sm:p-4">
                    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                      <span
                        className="material-symbols-outlined shrink-0 text-[22px] text-primary-fixed sm:text-[26px]"
                        aria-hidden="true"
                      >
                        wb_sunny
                      </span>
                      <span className="text-[15px] font-medium sm:text-[16px]">Opening Time</span>
                    </div>
                    <span className="shrink-0 font-display text-[17px] font-bold whitespace-nowrap tabular-nums text-inverse-on-surface sm:text-[20px]">
                      7:30 AM
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface-container-high/10 p-3.5 sm:p-4">
                    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                      <span
                        className="material-symbols-outlined shrink-0 text-[22px] text-primary-fixed sm:text-[26px]"
                        aria-hidden="true"
                      >
                        bedtime
                      </span>
                      <span className="text-[15px] font-medium sm:text-[16px]">Closing Time</span>
                    </div>
                    <span className="shrink-0 font-display text-[17px] font-bold whitespace-nowrap tabular-nums text-inverse-on-surface sm:text-[20px]">
                      10:00 PM
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary-container/50 bg-primary-container/20 p-3.5 sm:p-4">
                    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                      <span
                        className="material-symbols-outlined shrink-0 text-[22px] text-tertiary-fixed sm:text-[26px]"
                        aria-hidden="true"
                      >
                        event_busy
                      </span>
                      <span className="text-[15px] font-medium text-tertiary-fixed sm:text-[16px]">
                        Friday
                      </span>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary-container px-3 py-1 font-display text-[12px] font-semibold whitespace-nowrap text-on-primary-container">
                      Weekly Off
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-surface-container-high/10 pt-5 sm:pt-6">
                <p className="flex items-start gap-2 text-[14px] leading-[20px] text-surface-container-highest">
                  <span
                    className="material-symbols-outlined mt-0.5 shrink-0 text-[20px] text-primary-fixed"
                    aria-hidden="true"
                  >
                    info
                  </span>
                  <span>
                    Open-floor workouts, cardio, and machine training are unrestricted all day
                    during open hours.
                  </span>
                </p>
              </div>
            </div>

            {/* Right Card: Daily Class Batches */}
            <div className="flex flex-col justify-between rounded-3xl bg-surface-container-lowest p-5 shadow-sm dark:border dark:border-white/10 sm:p-8 lg:col-span-7 lg:p-10">
              <div>
                <div className="mb-3 flex flex-col items-start gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-display text-[24px] leading-[32px] font-bold text-on-surface sm:text-[28px] sm:leading-[36px] lg:text-[32px] lg:leading-[40px]">
                    Daily Instructor Batches
                  </h3>
                  <span className="inline-flex shrink-0 rounded-full bg-primary-fixed/40 px-3 py-1 font-display text-[12px] font-bold tracking-wider whitespace-nowrap text-primary uppercase dark:border dark:border-primary-container/30 dark:bg-primary-container/20 dark:text-primary-fixed">
                    5 Daily Sessions
                  </span>
                </div>
                <p className="mb-5 text-[15px] leading-[22px] text-secondary sm:mb-6 sm:text-[16px] sm:leading-[24px]">
                  Specialized instructor-guided group classes held at scheduled high-energy
                  intervals.
                </p>

                <div className="flex flex-col gap-3">
                  {DAILY_BATCHES.map((batch) => {
                    const isSelected = selectedBatch === batch.selectValue;
                    return (
                      <button
                        key={batch.code}
                        type="button"
                        onClick={() => onSelectBatch(batch.selectValue)}
                        className={`flex w-full cursor-pointer flex-col gap-3 rounded-2xl p-3.5 text-left transition-colors sm:flex-row sm:items-center sm:justify-between sm:p-4 ${
                          isSelected
                            ? 'bg-tertiary-fixed/50 ring-1 ring-primary-container dark:bg-primary-container/20'
                            : 'bg-surface-container hover:bg-tertiary-fixed/40 dark:hover:bg-primary-container/15'
                        }`}
                      >
                        <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-lowest font-display text-[14px] font-bold text-primary">
                            {batch.code}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <span
                                className="material-symbols-outlined shrink-0 text-[18px] text-secondary"
                                aria-hidden="true"
                              >
                                schedule
                              </span>
                              <span className="font-display text-[16px] leading-[22px] font-bold tabular-nums text-on-surface sm:text-[20px] sm:leading-[28px]">
                                {batch.timeRange}
                              </span>
                            </div>
                            <p className="mt-0.5 text-[13px] leading-[18px] text-secondary sm:mt-0 sm:text-[14px] sm:leading-[20px]">
                              {batch.title}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`self-end shrink-0 rounded-full px-3.5 py-1.5 font-display text-[12px] font-bold whitespace-nowrap shadow-sm sm:self-center sm:px-3 sm:py-1 ${
                            isSelected
                              ? 'bg-primary-container text-on-primary-container'
                              : 'bg-surface-container-lowest text-primary'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Book Slot'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-surface-container pt-4">
                <span className="text-[14px] text-secondary">Need a customized time slot?</span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 font-display text-[14px] font-semibold text-primary hover:text-primary-container"
                >
                  <span>Talk to our trainer</span>
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    chevron_right
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
