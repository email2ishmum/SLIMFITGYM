import { useMemo, useState } from 'react';
import { Calendar, Search, X } from 'lucide-react';
import {
  CLASS_CATEGORIES,
  ClassCategory,
  DAYS_OF_WEEK,
  DayOfWeek,
  GymClass,
  IntensityLevel,
  WEEKLY_CLASSES,
} from '../data/gymData';
import { filterClasses, getRemainingSpots } from '../utils/gymLogic';

interface ScheduleScreenProps {
  reservedIds: string[];
  onToggleReserve: (cls: GymClass) => void;
  onClearAllReservations: () => void;
}

const INTENSITIES: (IntensityLevel | 'All')[] = ['All', 'Gentle', 'Moderate', 'Athletic'];

export function ScheduleScreen({
  reservedIds,
  onToggleReserve,
  onClearAllReservations,
}: ScheduleScreenProps) {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<ClassCategory | 'All'>('All');
  const [selectedIntensity, setSelectedIntensity] = useState<IntensityLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClasses = useMemo(
    () =>
      filterClasses(WEEKLY_CLASSES, {
        day: selectedDay,
        category: selectedCategory,
        intensity: selectedIntensity,
        query: searchQuery,
      }),
    [selectedDay, selectedCategory, selectedIntensity, searchQuery]
  );

  const reservedClasses = useMemo(
    () => WEEKLY_CLASSES.filter((cls) => reservedIds.includes(cls.id)),
    [reservedIds]
  );

  const hasActiveFilters =
    selectedDay !== 'All' ||
    selectedCategory !== 'All' ||
    selectedIntensity !== 'All' ||
    searchQuery.trim() !== '';

  const resetFilters = () => {
    setSelectedDay('All');
    setSelectedCategory('All');
    setSelectedIntensity('All');
    setSearchQuery('');
  };

  return (
    <div className="bg-[#FAF8F6] py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="font-display text-xs font-bold tracking-[0.06em] text-[#D92662]">
            WEEKLY TIMETABLE · MIRPUR-2 STUDIO
          </p>
          <h1 className="mt-2 font-display text-[32px] leading-[40px] font-extrabold tracking-[-0.025em] text-[#161416] md:text-[44px] md:leading-[52px]">
            Guided Classes & Reformer Sessions
          </h1>
          <p className="mt-3 text-base leading-7 text-[#4A4448]">
            Saturday through Thursday small-group sessions led exclusively by certified female
            coaches. Reserve your spot in advance—Reformer Pilates is capped at 8 women per class.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-[#E7E3E5] pb-5" role="group" aria-label="Filter by day of week">
          {(['All', ...DAYS_OF_WEEK] as const).map((day) => {
            const active = selectedDay === day;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`min-h-[42px] whitespace-nowrap rounded-full px-4 py-2 font-display text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-[#161416] text-white'
                    : 'border border-[#E7E3E5] bg-white text-[#4A4448] hover:border-[#161416] hover:text-[#161416]'
                }`}
              >
                {day === 'All' ? 'All Days (Sat–Thu)' : day}
              </button>
            );
          })}
        </div>

        {/* Category + Intensity + Search Bar */}
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by class category">
            {(['All', ...CLASS_CATEGORIES] as const).map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[38px] whitespace-nowrap rounded-full px-3.5 py-1.5 font-display text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-[#D92662] text-white'
                      : 'border border-[#E7E3E5] bg-white text-[#4A4448] hover:border-[#D92662] hover:text-[#D92662]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:w-56">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#4A4448]"
                aria-hidden="true"
              />
              <label htmlFor="schedule-search" className="sr-only">
                Search classes or coaches
              </label>
              <input
                id="schedule-search"
                type="search"
                placeholder="Search class or coach..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-editorial w-full py-2.5 pr-4 pl-10 text-sm"
              />
            </div>

            <div>
              <label htmlFor="intensity-select" className="sr-only">
                Filter by intensity
              </label>
              <select
                id="intensity-select"
                value={selectedIntensity}
                onChange={(e) => setSelectedIntensity(e.target.value as IntensityLevel | 'All')}
                className="input-editorial min-h-[42px] px-3.5 py-2 text-sm"
              >
                {INTENSITIES.map((level) => (
                  <option key={level} value={level}>
                    {level === 'All' ? 'All Intensities' : `${level} Intensity`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main 12-Col Grid: Class List + My Reservations Sidebar */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Class List */}
          <div className="space-y-4 lg:col-span-8">
            <div className="flex items-center justify-between text-xs text-[#4A4448]">
              <p className="tabular-nums font-medium">
                Showing {filteredClasses.length} of {WEEKLY_CLASSES.length} weekly sessions
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="font-display font-semibold text-[#D92662] underline underline-offset-4 hover:text-[#B81D50]"
                >
                  Reset filters
                </button>
              )}
            </div>

            {filteredClasses.length === 0 ? (
              <div className="rounded-2xl border border-[#E7E3E5] bg-white p-10 text-center">
                <p className="font-display text-lg font-bold text-[#161416]">
                  No classes match your current filters.
                </p>
                <p className="mt-2 text-sm text-[#4A4448]">
                  Try choosing another day or resetting your category and intensity filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-full bg-[#161416] px-6 py-2.5 font-display text-xs font-semibold text-white transition-colors hover:bg-[#30302F]"
                >
                  Show All Classes
                </button>
              </div>
            ) : (
              filteredClasses.map((cls) => {
                const isReserved = reservedIds.includes(cls.id);
                const spotsLeft = getRemainingSpots(cls, reservedIds);
                const isFull = spotsLeft === 0 && !isReserved;
                return (
                  <article
                    key={cls.id}
                    data-testid={`class-card-${cls.id}`}
                    className={`rounded-2xl border bg-white p-6 transition-all ${
                      isReserved
                        ? 'border-[#D92662] shadow-ambient'
                        : 'border-[#E7E3E5] hover:border-[#D92662]/50'
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A4448]">
                          <span className="font-display font-bold text-[#D92662]">{cls.day}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold tabular-nums text-[#161416]">
                            {cls.startTime}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{cls.durationMin} min</span>
                          <span aria-hidden="true">·</span>
                          <span>{cls.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{cls.intensity}</span>
                        </div>
                        <h2 className="font-display text-xl font-bold text-[#161416]">
                          {cls.title}
                        </h2>
                        <p className="text-sm leading-6 text-[#4A4448]">{cls.description}</p>
                        <p className="pt-1 text-xs font-medium text-[#161416]">
                          Coach {cls.trainerName} · {cls.studio}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-row items-center justify-between gap-4 border-t border-[#E7E3E5] pt-4 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <p
                            data-testid={`spots-${cls.id}`}
                            className={`text-xs font-semibold tabular-nums ${
                              spotsLeft <= 2 ? 'text-[#B4004B]' : 'text-[#4A4448]'
                            }`}
                          >
                            {spotsLeft} of {cls.capacity} spots left
                          </p>
                          <p className="mt-0.5 text-[11px] text-[#4A4448]">
                            {isReserved ? 'Spot confirmed for you' : 'Instant reservation'}
                          </p>
                        </div>

                        <button
                          type="button"
                          disabled={isFull}
                          onClick={() => onToggleReserve(cls)}
                          aria-label={
                            isReserved
                              ? `Cancel reservation for ${cls.title}`
                              : `Reserve spot for ${cls.title}`
                          }
                          className={`min-h-[42px] whitespace-nowrap rounded-full px-5 py-2 font-display text-xs font-semibold transition-all ${
                            isFull
                              ? 'cursor-not-allowed bg-[#EAE8E6] text-[#656164]'
                              : isReserved
                                ? 'bg-[#161416] text-white hover:bg-[#30302F]'
                                : 'bg-[#D92662] text-white hover:bg-[#B81D50]'
                          }`}
                        >
                          {isFull ? 'Class Full' : isReserved ? 'Reserved · Cancel' : 'Reserve Spot'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* Sidebar: My Reserved Sessions */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-[#E7E3E5] bg-white p-6 shadow-ambient">
              <div className="flex items-center justify-between gap-3 border-b border-[#E7E3E5] pb-4">
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-5 w-5 text-[#D92662]" aria-hidden="true" />
                  <h2 className="font-display text-lg font-bold text-[#161416]">
                    My Reservations
                  </h2>
                </div>
                <span
                  data-testid="reserved-count"
                  className="font-display text-sm font-bold tabular-nums text-[#D92662]"
                >
                  {reservedClasses.length}
                </span>
              </div>

              {reservedClasses.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="font-display text-sm font-semibold text-[#161416]">
                    No sessions booked yet
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-[#4A4448]">
                    Select “Reserve Spot” on any class to hold your mat or reformer. Your bookings
                    stay saved on this device.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {reservedClasses.map((cls) => (
                    <div
                      key={cls.id}
                      className="flex items-start justify-between gap-3 rounded-xl border border-[#E7E3E5] bg-[#FAF8F6] p-3.5"
                    >
                      <div>
                        <p className="font-display text-sm font-bold text-[#161416]">{cls.title}</p>
                        <p className="mt-0.5 text-xs tabular-nums text-[#4A4448]">
                          {cls.day} · {cls.startTime} · {cls.studio}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onToggleReserve(cls)}
                        aria-label={`Remove ${cls.title} from reservations`}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#4A4448] transition-colors hover:bg-[#FDF0F4] hover:text-[#D92662]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  <div className="border-t border-[#E7E3E5] pt-4 text-right">
                    <button
                      type="button"
                      onClick={onClearAllReservations}
                      className="font-display text-xs font-semibold text-[#4A4448] underline underline-offset-4 hover:text-[#BA1A1A]"
                    >
                      Clear all reservations
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-5 rounded-xl border border-[#E2BDC2] bg-[#FDF0F4] p-4 text-xs leading-5 text-[#5A4044]">
                <p className="font-display font-bold text-[#161416]">Friday Special Hours</p>
                <p className="mt-1">
                  Open floor training is available Fridays 8:00 AM–12:00 PM & 3:00 PM–8:00 PM.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
