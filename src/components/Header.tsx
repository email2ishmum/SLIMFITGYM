import { useState } from 'react';
import { NAV_LINKS, ORIGINAL_IMAGES, STUDIO_CONTACT } from '../data/originalGymData';

interface HeaderProps {
  activeSection: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({ activeSection, isDarkMode, onToggleDarkMode }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-container bg-surface-container-lowest/95 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-md transition-colors duration-200 dark:border-white/10 dark:bg-[#06060a]/92">
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-4 sm:px-5 lg:px-10">
        <a href="#hero" className="flex shrink-0 items-center gap-2">
          <img
            src={ORIGINAL_IMAGES.logo}
            alt="SLIM FIT GYM Only For Ladies Logo"
            referrerPolicy="no-referrer"
            className="h-10 w-10 rounded-full bg-white object-contain p-0.5 shadow-sm sm:h-11 sm:w-11"
          />
          <div className="flex flex-col justify-center pl-1 leading-none">
            <span className="font-display text-[18px] leading-[24px] font-bold tracking-tight whitespace-nowrap text-on-surface sm:text-[20px] sm:leading-[28px]">
              {STUDIO_CONTACT.brand}
            </span>
            <span className="font-display text-[11px] leading-[15px] font-bold tracking-wider whitespace-nowrap text-primary uppercase sm:text-[12px] sm:leading-[16px]">
              {STUDIO_CONTACT.tagline}
            </span>
          </div>
        </a>

        <nav
          id="desktopNav"
          aria-label="Primary navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={`font-display text-[14px] leading-[20px] tracking-[0.02em] whitespace-nowrap transition-colors ${
                  isActive
                    ? 'font-bold text-primary'
                    : 'font-semibold text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            data-testid="theme-toggle"
            onClick={onToggleDarkMode}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDarkMode}
            className="inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-surface-container bg-surface-container px-3 font-display text-[12px] font-semibold text-on-surface transition-colors hover:border-primary/40 hover:text-primary dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-primary-fixed/40 dark:hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-[19px]" aria-hidden="true">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
            <span className="hidden sm:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>

          <a
            href="#pricing"
            className="hidden items-center justify-center rounded-full bg-primary-container px-6 py-2 font-display text-[14px] leading-[20px] font-semibold tracking-[0.02em] whitespace-nowrap text-on-primary-container shadow-sm transition-all duration-200 hover:bg-primary sm:inline-flex"
          >
            Join Now
          </a>
          <button
            type="button"
            id="mobileMenuBtn"
            aria-label="Toggle Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-surface-container text-on-surface transition-colors hover:bg-surface-container-high dark:bg-white/5 dark:text-white dark:hover:bg-white/15 lg:hidden"
          >
            <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div
          id="mobileMenu"
          className="border-t border-surface-container bg-surface-container-lowest px-5 py-4 shadow-lg dark:border-white/10 dark:bg-[#0c0c13] lg:hidden"
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2 font-display text-[14px] font-semibold transition-colors ${
                    isActive ? 'font-bold text-primary' : 'text-on-surface hover:text-primary'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="mt-2 w-full rounded-full bg-primary-container py-3 text-center font-display text-[14px] font-bold text-on-primary-container transition-colors hover:bg-primary"
            >
              Join Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
