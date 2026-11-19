import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AppScreen, BRAND_ASSETS } from '../data/gymData';

interface NavbarProps {
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onOpenBooking: () => void;
  reservedCount: number;
  hasActivePass: boolean;
}

const NAV_ITEMS: { id: AppScreen; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'trainers', label: 'Trainers' },
  { id: 'memberships', label: 'Memberships' },
  { id: 'visit', label: 'Visit Us' },
];

export function Navbar({
  activeScreen,
  onNavigate,
  onOpenBooking,
  reservedCount,
  hasActivePass,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (screen: AppScreen) => {
    onNavigate(screen);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E7E3E5] bg-[#FAF8F6]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-5 md:h-[72px] md:px-10">
        {/* Zone 1: Brand lockup (single-line wordmark, no clutter badges) */}
        <button
          type="button"
          onClick={() => handleSelect('overview')}
          className="flex shrink-0 items-center gap-3 whitespace-nowrap text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D92662]"
        >
          <img
            src={BRAND_ASSETS.logo}
            alt="Slim Fit Gym Only For Ladies emblem"
            referrerPolicy="no-referrer"
            className="h-10 w-10 shrink-0 rounded-full border border-[#E7E3E5] object-cover"
          />
          <span className="font-display text-lg font-extrabold tracking-[-0.02em] text-[#161416] whitespace-nowrap">
            Slim Fit Gym
          </span>
        </button>

        {/* Zone 2: Clean single-line typography navigation links */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative whitespace-nowrap shrink-0 py-1 font-display text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D92662] ${
                  isActive
                    ? 'text-[#161416]'
                    : 'text-[#4A4448] hover:text-[#161416]'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'schedule' && reservedCount > 0 && (
                  <span className="ml-1.5 font-sans text-xs font-semibold tabular-nums text-[#D92662]">
                    ({reservedCount})
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-[22px] h-[2px] transition-opacity ${
                    isActive ? 'bg-[#D92662] opacity-100' : 'bg-[#D92662] opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Drawer Toggle */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden shrink-0 whitespace-nowrap rounded-full bg-[#D92662] px-5 py-2.5 font-display text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#B81D50] hover:shadow-[0_12px_28px_-6px_rgba(217,38,98,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D92662] sm:inline-flex sm:items-center"
          >
            {hasActivePass ? 'View Trial Pass' : 'Book Free Trial'}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E7E3E5] bg-white text-[#161416] transition-colors hover:border-[#161416] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#E7E3E5] bg-[#FFFFFF] px-5 py-4 lg:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center justify-between rounded-xl px-3.5 py-2.5 text-left font-display text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#FDF0F4] text-[#D92662]'
                      : 'text-[#161416] hover:bg-[#FAF8F6]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'schedule' && reservedCount > 0 && (
                    <span className="font-sans text-xs font-semibold tabular-nums text-[#D92662]">
                      {reservedCount} booked
                    </span>
                  )}
                </button>
              );
            })}
            <div className="mt-3 border-t border-[#E7E3E5] pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenBooking();
                }}
                className="flex min-h-[46px] w-full items-center justify-center rounded-full bg-[#D92662] px-5 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-[#B81D50]"
              >
                {hasActivePass ? 'View Trial Pass' : 'Book Free Trial'}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
