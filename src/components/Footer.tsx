import { AppScreen, BRANCH_INFO, BRAND_ASSETS } from '../data/gymData';

interface FooterProps {
  onNavigate: (screen: AppScreen) => void;
  onOpenBooking: () => void;
}

export function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  return (
    <footer className="border-t border-[#E7E3E5] bg-[#161416] text-[#F2F0EE]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3.5">
              <img
                src={BRAND_ASSETS.logo}
                alt="Slim Fit Gym Only For Ladies logo"
                referrerPolicy="no-referrer"
                className="h-12 w-12 rounded-full border border-white/15 object-cover"
              />
              <div>
                <p className="font-display text-lg font-extrabold tracking-[-0.02em] text-white">
                  Slim Fit Gym
                </p>
                <p className="text-xs tracking-[0.04em] text-[#CBC5C8]">
                  Only for Ladies · Mirpur-2, Dhaka
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#CBC5C8]">
              A private, dignified athletic sanctuary built exclusively for women in Mirpur-2.
              100% female coaches, clinical nutrition guidance, and biometric privacy from
              entry to changing suites.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={onOpenBooking}
                className="rounded-full bg-[#D92662] px-5 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-[#B81D50]"
              >
                Book a Private Tour & Free Trial
              </button>
            </div>
          </div>

          {/* Navigation Mirror */}
          <div className="md:col-span-3">
            <h2 className="font-display text-sm font-bold tracking-[0.04em] text-white">
              Sanctuary
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-[#CBC5C8]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('overview')}
                  className="transition-colors hover:text-[#FFB2BF]"
                >
                  Overview & Facility Zones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('schedule')}
                  className="transition-colors hover:text-[#FFB2BF]"
                >
                  Weekly Class Schedule
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('trainers')}
                  className="transition-colors hover:text-[#FFB2BF]"
                >
                  Female Coaches & Nutrition
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('memberships')}
                  className="transition-colors hover:text-[#FFB2BF]"
                >
                  Memberships & BDT Rates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('visit')}
                  className="transition-colors hover:text-[#FFB2BF]"
                >
                  Mirpur-2 Location & Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="md:col-span-4">
            <h2 className="font-display text-sm font-bold tracking-[0.04em] text-white">
              Mirpur-2 Branch
            </h2>
            <div className="mt-4 space-y-2.5 text-sm leading-6 text-[#CBC5C8]">
              <p className="text-white">{BRANCH_INFO.addressLine1}</p>
              <p>{BRANCH_INFO.addressLine2}</p>
              <p className="pt-2 tabular-nums text-white">{BRANCH_INFO.phone}</p>
              <p>{BRANCH_INFO.email}</p>
              <div className="pt-2 text-xs text-[#CBC5C8]">
                <p>{BRANCH_INFO.hoursWeekdays}</p>
                <p>{BRANCH_INFO.hoursFriday}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#A39EA1] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Slim Fit Gym — Only for Ladies, Mirpur-2, Dhaka.</p>
          <p>100% Female Staff · Zero-Camera Changing & Prayer Suites</p>
        </div>
      </div>
    </footer>
  );
}
