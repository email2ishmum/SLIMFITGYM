import { useEffect, useState } from 'react';
import { GALLERY_PHOTOS, PACKAGE_OPTIONS } from '../data/originalGymData';
import { ResilientImage } from './ResilientImage';

interface PricingAndGalleryProps {
  onSelectPackage: (pkgValue: string) => void;
}

export function PricingAndGallery({ onSelectPackage }: PricingAndGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
        );
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex]);

  const activePhoto = lightboxIndex !== null ? GALLERY_PHOTOS[lightboxIndex] : null;

  return (
    <>
      {/* MEMBERSHIP & PACKAGES SECTION */}
      <section id="pricing" className="w-full scroll-mt-20 bg-surface py-10 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
            <span className="mb-1 rounded-full bg-primary-fixed/40 px-3.5 py-1 font-display text-[12px] leading-[16px] font-bold tracking-wider text-primary uppercase dark:border dark:border-primary-container/30 dark:bg-primary-container/20 dark:text-primary-fixed">
              Transparent Value
            </span>
            <h2 className="mb-1 font-display text-[30px] leading-[36px] font-bold tracking-[-0.015em] text-on-surface lg:text-[40px] lg:leading-[48px] lg:tracking-[-0.02em]">
              Membership &amp; Packages
            </h2>
            <p className="text-[16px] leading-[24px] text-secondary">
              Affordable, women-led fitness investment with zero hidden charges.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
            {PACKAGE_OPTIONS.map((pkg) => {
              const isDark = Boolean(pkg.featured);
              return (
                <div
                  key={pkg.id}
                  className={
                    isDark
                      ? 'relative flex flex-col justify-between rounded-3xl bg-inverse-surface p-6 text-inverse-on-surface shadow-xl dark:border dark:border-primary-container/50 dark:shadow-[0_18px_40px_rgba(217,38,98,0.18)] sm:p-8 lg:-translate-y-2'
                      : 'flex flex-col justify-between rounded-3xl bg-surface-container-lowest p-6 shadow-sm transition-shadow hover:shadow-md dark:border dark:border-white/10 sm:p-8'
                  }
                >
                  {isDark && (
                    <div className="absolute -top-3.5 right-8 rounded-full bg-primary-container px-4 py-1 font-display text-[12px] leading-[16px] font-bold tracking-wider text-on-primary-container uppercase shadow-md">
                      Best Value
                    </div>
                  )}

                  <div>
                    <span
                      className={`font-display text-[12px] leading-[16px] font-bold tracking-wider uppercase ${
                        isDark ? 'text-primary-fixed' : 'text-secondary'
                      }`}
                    >
                      {pkg.optionLabel}
                    </span>
                    <h3
                      className={`mt-1 font-display text-[24px] leading-[32px] font-bold ${
                        isDark ? 'text-inverse-on-surface' : 'text-on-surface'
                      }`}
                    >
                      {pkg.name}
                    </h3>
                    <p
                      className={`mt-1 text-[14px] leading-[20px] ${
                        isDark ? 'text-surface-container-highest' : 'text-secondary'
                      }`}
                    >
                      {pkg.subtitle}
                    </p>

                    <div className="my-4">
                      <div className="flex items-baseline">
                        <span
                          className={`font-display text-[48px] leading-[56px] font-extrabold tabular-nums tracking-[-0.03em] lg:text-[56px] lg:leading-[64px] ${
                            isDark ? 'text-inverse-on-surface' : 'text-on-surface'
                          }`}
                        >
                          {pkg.price}
                        </span>
                        <span
                          className={`ml-1 text-[16px] ${
                            isDark ? 'text-surface-container-highest' : 'text-secondary'
                          }`}
                        >
                          {pkg.unit}
                        </span>
                      </div>
                      <div
                        className={`mt-2 inline-block rounded-full px-3 py-1 font-display text-[12px] font-semibold ${
                          pkg.badgeVariant === 'dark'
                            ? 'bg-primary-container/30 text-tertiary-fixed'
                            : pkg.badgeVariant === 'blush'
                              ? 'bg-tertiary-fixed text-primary dark:bg-primary-container/20 dark:text-primary-fixed'
                              : 'bg-surface-container text-secondary'
                        }`}
                      >
                        {pkg.badgeText}
                      </div>
                    </div>

                    <div
                      className={`flex flex-col gap-3 border-t py-4 text-[14px] leading-[20px] ${
                        isDark
                          ? 'border-surface-container-high/20 text-inverse-on-surface'
                          : 'border-surface-container text-on-surface'
                      }`}
                    >
                      {pkg.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2">
                          <span
                            className={`material-symbols-outlined text-[20px] ${
                              isDark ? 'text-primary-fixed' : 'text-primary'
                            }`}
                            aria-hidden="true"
                          >
                            check_circle
                          </span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label={`Join Now — ${pkg.name}`}
                    onClick={() => onSelectPackage(pkg.selectValue)}
                    className={
                      isDark
                        ? 'mt-4 w-full cursor-pointer rounded-full bg-primary-container py-3.5 text-center font-display text-[14px] font-bold text-on-primary-container shadow-lg transition-all duration-200 hover:bg-primary'
                        : 'mt-4 w-full cursor-pointer rounded-full bg-surface-container py-3.5 text-center font-display text-[14px] font-semibold text-on-surface transition-colors hover:bg-primary-container hover:text-on-primary-container'
                    }
                  >
                    Join Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY SECTION */}
      <section
        id="gallery"
        className="w-full scroll-mt-20 bg-surface-container-low py-10 lg:py-24"
      >
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
            <span className="mb-1 rounded-full bg-primary-fixed/40 px-3.5 py-1 font-display text-[12px] leading-[16px] font-bold tracking-wider text-primary uppercase dark:border dark:border-primary-container/30 dark:bg-primary-container/20 dark:text-primary-fixed">
              Exclusive Sanctuary Tour
            </span>
            <h2 className="mb-1 font-display text-[30px] leading-[36px] font-bold tracking-[-0.015em] text-on-surface lg:text-[40px] lg:leading-[48px] lg:tracking-[-0.02em]">
              Studio Photo Gallery
            </h2>
            <p className="text-[16px] leading-[24px] text-secondary">
              Click any photo to view it fullscreen.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GALLERY_PHOTOS.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                aria-label={`View ${photo.title} fullscreen`}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-surface-container text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
              >
                <ResilientImage
                  src={photo.src}
                  fallbackSrc={photo.fallbackSrc}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent p-5">
                  <div>
                    <span className="rounded-full bg-surface-container-lowest/90 px-2.5 py-0.5 font-display text-[12px] font-semibold tracking-wider text-on-surface uppercase backdrop-blur-sm">
                      {photo.category}
                    </span>
                    <h3 className="mt-1 font-display text-[20px] leading-[28px] font-bold text-inverse-on-surface">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FULLSCREEN GALLERY LIGHTBOX MODAL */}
      {activePhoto && lightboxIndex !== null && (
        <div
          id="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close Image"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <span className="material-symbols-outlined text-[28px]" aria-hidden="true">
              close
            </span>
          </button>

          <button
            type="button"
            aria-label="Previous Image"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                (lightboxIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
              );
            }}
            className="absolute left-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <span className="material-symbols-outlined text-[28px]" aria-hidden="true">
              chevron_left
            </span>
          </button>

          <div
            className="flex w-full max-w-4xl flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <ResilientImage
              src={activePhoto.src}
              fallbackSrc={activePhoto.fallbackSrc}
              alt={activePhoto.title}
              className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <p className="font-display text-[20px] font-semibold text-white">
              {activePhoto.title}
            </p>
          </div>

          <button
            type="button"
            aria-label="Next Image"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % GALLERY_PHOTOS.length);
            }}
            className="absolute right-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <span className="material-symbols-outlined text-[28px]" aria-hidden="true">
              chevron_right
            </span>
          </button>
        </div>
      )}
    </>
  );
}
