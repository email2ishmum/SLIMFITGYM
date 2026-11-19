import {
  ABOUT_HIGHLIGHTS,
  ORIGINAL_IMAGES,
  STUDIO_CONTACT,
} from '../data/originalGymData';
import { ResilientImage } from './ResilientImage';

const HERO_ATHLETE_CUTOUT = '/assets/hero_female_athlete_cutout.png';
const HERO_ATHLETE_FALLBACK = '/src/assets/images/hero_female_athlete_1795086741220.jpg';

const MEMBER_AVATARS = [
  { src: ORIGINAL_IMAGES.hero, alt: 'SLIM FIT GYM Mirpur-2 members training' },
  { src: ORIGINAL_IMAGES.aboutCardio, alt: 'SLIM FIT GYM cardio floor member' },
  { src: ORIGINAL_IMAGES.aboutYoga, alt: 'SLIM FIT GYM yoga studio member' },
];

export function HeroAndAbout() {
  return (
    <>
      {/* HERO SECTION — Adaptive Light & Dark Obsidian Editorial Campaign */}
      <section
        id="hero"
        className="relative w-full scroll-mt-20 overflow-hidden border-b border-surface-container bg-surface text-on-surface transition-colors duration-200 dark:border-white/5 dark:bg-[#06060a] dark:text-white"
      >
        {/* Subtle atmospheric rose spotlight behind athlete */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_48%_at_50%_62%,rgba(217,38,98,0.11),transparent_72%)] dark:bg-[radial-gradient(ellipse_55%_48%_at_50%_62%,rgba(217,38,98,0.18),transparent_72%)]"
        />

        <div className="relative mx-auto flex min-h-[600px] w-full max-w-[1320px] flex-col justify-between px-5 pt-8 pb-20 sm:px-8 sm:pt-10 sm:pb-16 lg:min-h-[clamp(620px,calc(100svh-5rem),780px)] lg:px-12 lg:pt-10 lg:pb-20 xl:pt-12">
          {/* Giant Centered 2-Line Display Headline (sits behind athlete's head on desktop) */}
          <div className="relative z-10 mx-auto w-full text-center">
            <h1 className="font-display text-[40px] leading-[1.04] font-bold tracking-[-0.03em] text-on-surface select-none dark:text-white sm:text-[60px] md:text-[74px] lg:text-[88px] xl:text-[106px]">
              <span className="block">
                <span>Reach </span>
                <span className="text-on-surface/35 dark:text-white/55">Your</span>
                <span> Best</span>
              </span>
              <span className="block">
                <span>Shape </span>
                <span className="text-on-surface/30 dark:text-white/45">for</span>
                <span> Life</span>
              </span>
            </h1>
          </div>

          {/* Centerpiece Female Athlete Cutout — proportional to hero height so top never clips on PC */}
          <div className="pointer-events-none relative z-20 mx-auto -mt-4 flex w-full max-w-[270px] justify-center sm:-mt-8 sm:max-w-[340px] lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:h-[min(72%,480px)] lg:max-w-none xl:h-[min(74%,535px)]">
            <div className="relative flex h-full w-full items-end justify-center">
              <ResilientImage
                src={HERO_ATHLETE_CUTOUT}
                fallbackSrc={HERO_ATHLETE_FALLBACK}
                alt="Female athlete in modest black athletic wear and sport hijab at SLIM FIT GYM Mirpur-2"
                className="mx-auto h-auto max-h-[340px] w-auto object-contain object-bottom drop-shadow-[0_14px_28px_rgba(27,28,27,0.16)] dark:drop-shadow-[0_18px_40px_rgba(0,0,0,0.75)] sm:max-h-[430px] lg:h-full lg:max-h-full"
              />
              {/* Seamless floor melt matching active Light or Dark background */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface via-surface/75 to-transparent dark:from-[#06060a] dark:via-[#06060a]/70 lg:h-20"
              />
            </div>
          </div>

          {/* Left Vertical Quick-Contact / Social Rail (Desktop lg+) */}
          <div className="absolute top-[56%] left-6 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:left-10 lg:flex">
            <a
              href={`https://wa.me/${STUDIO_CONTACT.whatsappNumber}?text=Hello%20Slim%20Fit%20Gym%2C%20I%20want%20to%20book%20a%20class`}
              aria-label="WhatsApp SLIM FIT GYM"
              className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface/75 transition-colors hover:bg-primary/10 hover:text-primary dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-primary-fixed"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                chat
              </span>
            </a>
            <a
              href={STUDIO_CONTACT.phoneHref}
              aria-label="Call SLIM FIT GYM"
              className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface/75 transition-colors hover:bg-primary/10 hover:text-primary dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-primary-fixed"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                call
              </span>
            </a>
            <a
              href={`mailto:${STUDIO_CONTACT.email}`}
              aria-label="Email SLIM FIT GYM"
              className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface/75 transition-colors hover:bg-primary/10 hover:text-primary dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-primary-fixed"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                mail
              </span>
            </a>
            <span aria-hidden="true" className="mt-1 h-16 w-px bg-on-surface/20 dark:bg-white/30" />
          </div>

          {/* Right-Side Editorial Copy (positioned cleanly below headline on desktop, centered below athlete on mobile) */}
          <div className="relative z-30 mx-auto mt-3 max-w-md text-center lg:absolute lg:top-[58%] lg:right-12 lg:mx-0 lg:mt-0 lg:max-w-[265px] lg:-translate-y-1/2 lg:text-left xl:top-[56%] xl:max-w-[300px]">
            <p className="text-[15px] leading-[23px] text-secondary dark:text-white/80 sm:text-[16px] lg:text-[14px] lg:leading-[22px] xl:text-[15px] xl:leading-[24px]">
              Get stronger, healthier, and more energized in Mirpur-2&apos;s 100% ladies-only gym
              with certified female coaches and custom diet plans.
            </p>
            <a
              href="#schedule"
              className="mt-3 inline-flex items-center gap-1.5 font-display text-[13px] font-semibold tracking-wide text-primary transition-colors hover:text-primary-container dark:text-primary-fixed dark:hover:text-white"
            >
              <span>View Class Times</span>
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                arrow_forward
              </span>
            </a>
          </div>

          {/* Bottom Bar: Left 1.2k+ Member Proof Cluster & Right BOOK A CLASS Pill CTA */}
          <div className="relative z-30 mt-7 flex flex-col-reverse items-center justify-between gap-6 sm:flex-row sm:items-end lg:mt-auto lg:pt-6">
            {/* Bottom-Left: Overlapping Avatars + 1.2k+ Empowered Ladies */}
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <div className="flex items-center -space-x-2.5">
                {MEMBER_AVATARS.map((avatar) => (
                  <div
                    key={avatar.src}
                    className="h-11 w-11 overflow-hidden rounded-full bg-surface-container-lowest ring-2 ring-primary-container shadow-md dark:bg-inverse-surface"
                  >
                    <ResilientImage
                      src={avatar.src}
                      fallbackSrc={ORIGINAL_IMAGES.fallbackStudio}
                      alt={avatar.alt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[28px] leading-none font-bold tabular-nums text-on-surface dark:text-white sm:text-[32px]">
                  1.2k+
                </span>
                <span className="text-[13px] font-medium text-secondary dark:text-white/75">
                  Empowered Ladies
                </span>
              </div>
            </div>

            {/* Bottom-Right: High-Impact Pill CTA */}
            <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:items-end">
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-container px-9 py-4 font-display text-[14px] font-extrabold tracking-[0.08em] text-on-primary-container uppercase shadow-[0_8px_24px_rgba(217,38,98,0.32)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_12px_30px_rgba(217,38,98,0.48)] dark:shadow-[0_0_28px_rgba(217,38,98,0.45)] dark:hover:shadow-[0_0_36px_rgba(217,38,98,0.65)] sm:w-auto"
              >
                <span>Book a Class</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="w-full scroll-mt-20 bg-tertiary-fixed/20 py-10 transition-colors duration-200 dark:bg-[#0a0810] lg:py-24"
      >
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-surface-container shadow-md dark:ring-1 dark:ring-white/10">
                  <ResilientImage
                    src={ORIGINAL_IMAGES.aboutCardio}
                    fallbackSrc={ORIGINAL_IMAGES.fallbackStudio}
                    alt="Modern women-only gym cardio floor in Mirpur Dhaka"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center rounded-2xl bg-surface-container-lowest p-4 shadow-sm dark:border dark:border-white/10 sm:p-6">
                  <span className="font-display text-[32px] leading-[38px] font-bold tabular-nums text-primary sm:text-[40px] sm:leading-[48px]">
                    5+
                  </span>
                  <span className="font-display text-[13px] leading-[18px] font-semibold text-on-surface sm:text-[14px] sm:leading-[20px]">
                    Certified Female Trainers
                  </span>
                  <p className="mt-1 text-[13px] leading-[18px] text-secondary sm:text-[14px] sm:leading-[20px]">
                    Dedicated supervision every minute you exercise.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-6 sm:gap-4 sm:pt-8">
                <div className="flex flex-col justify-center rounded-2xl bg-primary-container p-4 text-on-primary-container shadow-sm dark:shadow-[0_12px_32px_rgba(217,38,98,0.28)] sm:p-6">
                  <span className="font-display text-[32px] leading-[38px] font-bold tabular-nums sm:text-[40px] sm:leading-[48px]">
                    1,200+
                  </span>
                  <span className="font-display text-[13px] leading-[18px] font-semibold sm:text-[14px] sm:leading-[20px]">
                    Empowered Women
                  </span>
                  <p className="mt-1 text-[13px] leading-[18px] opacity-90 sm:text-[14px] sm:leading-[20px]">
                    Transforming their lifestyle right in Mirpur-2.
                  </p>
                </div>
                <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-surface-container shadow-md dark:ring-1 dark:ring-white/10">
                  <ResilientImage
                    src={ORIGINAL_IMAGES.aboutYoga}
                    fallbackSrc={ORIGINAL_IMAGES.fallbackPilates}
                    alt="Peaceful ladies-only yoga and stretching studio"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-start lg:col-span-6 lg:mt-0 lg:pl-4">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-surface-container-lowest px-3 py-1 font-display text-[12px] leading-[16px] font-bold tracking-wider text-primary uppercase shadow-sm dark:border dark:border-primary-container/30 dark:bg-primary-container/20 dark:text-primary-fixed">
                <span>Our Dedicated Sanctuary</span>
              </div>

              <h2 className="mb-4 font-display text-[30px] leading-[36px] font-bold tracking-[-0.015em] text-on-surface lg:text-[40px] lg:leading-[48px] lg:tracking-[-0.02em]">
                Fit Ladies, Happy Life — <br />
                <span className="text-primary-container dark:text-primary">
                  A Private Space Built Just for You
                </span>
              </h2>

              <p className="mb-6 text-[16px] leading-[24px] text-secondary">
                Located in the vibrant heart of Mirpur-2, SLIM FIT GYM was founded with a singular,
                unwavering mission: to provide the women of Dhaka with an uncompromisingly secure,
                comfortable, and world-class athletic environment. Whether you are a student,
                homemaker, doctor, or corporate executive, this is your personal sanctuary to
                release stress, build sustainable stamina, and flourish.
              </p>

              <div className="flex w-full flex-col gap-4">
                {ABOUT_HIGHLIGHTS.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-xl bg-surface-container-lowest p-4 shadow-sm transition-shadow hover:shadow-md dark:border dark:border-white/10"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tertiary-fixed text-primary dark:bg-primary-container/20 dark:text-primary-fixed">
                      <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-[20px] leading-[28px] font-semibold text-on-surface">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-[14px] leading-[20px] text-secondary">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
