import { FormEvent, RefObject, useState } from 'react';
import {
  DAILY_BATCHES,
  MEMBER_REVIEWS,
  ORIGINAL_IMAGES,
  PACKAGE_OPTIONS,
  STUDIO_CONTACT,
} from '../data/originalGymData';
import {
  buildWhatsAppInquiryUrl,
  formatWhatsAppMessage,
  InquiryValidationResult,
  validateInquiryForm,
} from '../utils/inquiryLogic';

interface ReviewsAndContactProps {
  selectedPackage: string;
  selectedBatch: string;
  message: string;
  onChangePackage: (val: string) => void;
  onChangeBatch: (val: string) => void;
  onChangeMessage: (val: string) => void;
  nameInputRef: RefObject<HTMLInputElement | null>;
}

export function ReviewsAndContact({
  selectedPackage,
  selectedBatch,
  message,
  onChangePackage,
  onChangeBatch,
  onChangeMessage,
  nameInputRef,
}: ReviewsAndContactProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<InquiryValidationResult['errors']>({});
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(null);
  const [submittedMessagePreview, setSubmittedMessagePreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      phone,
      pkg: selectedPackage,
      batch: selectedBatch,
      message,
    };

    const validation = validateInquiryForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      setSubmittedWhatsAppUrl(null);
      return;
    }

    setErrors({});
    const url = buildWhatsAppInquiryUrl(formData);
    const preview = formatWhatsAppMessage(formData);
    setSubmittedWhatsAppUrl(url);
    setSubmittedMessagePreview(preview);
    setCopied(false);
    window.location.href = url;
  };

  const handleCopyMessage = async () => {
    if (!submittedMessagePreview) return;
    try {
      await navigator.clipboard.writeText(submittedMessagePreview);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      {/* REAL MEMBER REVIEWS SECTION */}
      <section id="reviews" className="w-full scroll-mt-20 bg-surface py-10 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
            <span className="mb-1 rounded-full bg-primary-fixed/40 px-3.5 py-1 font-display text-[12px] leading-[16px] font-bold tracking-wider text-primary uppercase dark:border dark:border-primary-container/30 dark:bg-primary-container/20 dark:text-primary-fixed">
              Voices of Transformation
            </span>
            <h2 className="mb-1 font-display text-[30px] leading-[36px] font-bold tracking-[-0.015em] text-on-surface lg:text-[40px] lg:leading-[48px] lg:tracking-[-0.02em]">
              Real Member Reviews
            </h2>
            <p className="text-[16px] leading-[24px] text-secondary">
              Hear straight from the wonderful women who train, grow, and flourish at SLIM FIT GYM.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {MEMBER_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="flex flex-col justify-between rounded-3xl bg-surface-container-lowest p-6 shadow-sm transition-shadow hover:shadow-md dark:border dark:border-white/10 sm:p-8 lg:p-10"
              >
                <div>
                  <div className="mb-4 flex items-center gap-1 text-primary-container" aria-label="5 out of 5 stars">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <span
                        key={star}
                        className="material-symbols-outlined material-symbols-filled text-[22px]"
                        aria-hidden="true"
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p
                    className={`mb-6 text-[18px] leading-relaxed text-on-surface ${
                      review.isBengali ? 'font-bengali' : ''
                    }`}
                  >
                    {review.quote}
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-surface-container pt-6">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full font-display text-[20px] font-bold ${
                      review.avatarVariant === 'rose'
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-primary-fixed text-primary dark:bg-primary-container/25 dark:text-primary-fixed'
                    }`}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <h3 className="font-display text-[20px] leading-[28px] font-bold text-on-surface">
                      {review.name}
                    </h3>
                    <p className="text-[14px] leading-[20px] text-secondary">{review.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & LOCATION SECTION */}
      <section
        id="contact"
        className="w-full scroll-mt-20 bg-surface-container-low py-10 lg:py-24"
      >
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
            <span className="mb-1 rounded-full bg-primary-fixed/40 px-3.5 py-1 font-display text-[12px] leading-[16px] font-bold tracking-wider text-primary uppercase dark:border dark:border-primary-container/30 dark:bg-primary-container/20 dark:text-primary-fixed">
              Start Your Journey
            </span>
            <h2 className="mb-1 font-display text-[30px] leading-[36px] font-bold tracking-[-0.015em] text-on-surface lg:text-[40px] lg:leading-[48px] lg:tracking-[-0.02em]">
              Contact &amp; Book Trial Session
            </h2>
            <p className="text-[16px] leading-[24px] text-secondary">
              Reach out directly via WhatsApp or fill out the booking form below to secure your
              spot.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            {/* Left: Form */}
            <div className="rounded-3xl bg-surface-container-lowest p-6 shadow-sm dark:border dark:border-white/10 sm:p-8 lg:col-span-6 lg:p-10">
              <h3 className="mb-2 font-display text-[24px] leading-[32px] font-bold text-on-surface">
                Book a Trial / Send Inquiry
              </h3>
              <p className="mb-6 text-[14px] leading-[20px] text-secondary">
                Submit your details and our team will connect with you immediately on WhatsApp.
              </p>

              <form
                id="gymInquiryForm"
                noValidate
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block font-display text-[12px] font-semibold tracking-wider text-on-surface"
                  >
                    Full Name
                  </label>
                  <input
                    ref={nameInputRef}
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Fatima Rahman"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                    }}
                    className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-[16px] text-on-surface outline-none focus:border-transparent focus:ring-2 focus:ring-primary-container"
                  />
                  {errors.name && (
                    <p role="alert" className="mt-1 text-xs font-medium text-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block font-display text-[12px] font-semibold tracking-wider text-on-surface"
                  >
                    Phone Number (WhatsApp preferred)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="017XX-XXXXXX"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                    }}
                    className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-[16px] tabular-nums text-on-surface outline-none focus:border-transparent focus:ring-2 focus:ring-primary-container"
                  />
                  {errors.phone && (
                    <p role="alert" className="mt-1 text-xs font-medium text-error">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="package"
                    className="mb-1 block font-display text-[12px] font-semibold tracking-wider text-on-surface"
                  >
                    Select Package
                  </label>
                  <select
                    id="package"
                    value={selectedPackage}
                    onChange={(e) => onChangePackage(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-[16px] text-on-surface outline-none focus:border-transparent focus:ring-2 focus:ring-primary-container"
                  >
                    <option value={PACKAGE_OPTIONS[2].selectValue}>
                      {PACKAGE_OPTIONS[2].selectValue}
                    </option>
                    <option value={PACKAGE_OPTIONS[1].selectValue}>
                      {PACKAGE_OPTIONS[1].selectValue}
                    </option>
                    <option value={PACKAGE_OPTIONS[0].selectValue}>
                      {PACKAGE_OPTIONS[0].selectValue}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="batch"
                    className="mb-1 block font-display text-[12px] font-semibold tracking-wider text-on-surface"
                  >
                    Preferred Time Slot
                  </label>
                  <select
                    id="batch"
                    value={selectedBatch}
                    onChange={(e) => onChangeBatch(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-[16px] text-on-surface outline-none focus:border-transparent focus:ring-2 focus:ring-primary-container"
                  >
                    {DAILY_BATCHES.map((batch) => (
                      <option key={batch.code} value={batch.selectValue}>
                        {batch.selectValue}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block font-display text-[12px] font-semibold tracking-wider text-on-surface"
                  >
                    Message / Fitness Goals (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Tell us what you would like to achieve (e.g., Weight loss, toning, stamina)"
                    value={message}
                    onChange={(e) => onChangeMessage(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-[16px] text-on-surface outline-none focus:border-transparent focus:ring-2 focus:ring-primary-container"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary-container py-4 font-display text-[14px] font-bold text-on-primary-container shadow-md transition-all duration-200 hover:bg-primary"
                >
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    chat
                  </span>
                  <span>Send via WhatsApp</span>
                </button>
              </form>

              {submittedWhatsAppUrl && submittedMessagePreview && (
                <div
                  data-testid="whatsapp-confirmation"
                  className="mt-6 rounded-2xl border border-outline-variant bg-tertiary-fixed/40 p-5 dark:border-primary-container/40 dark:bg-primary-container/15"
                >
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                      check_circle
                    </span>
                    <p className="font-display text-sm font-bold">
                      Inquiry Ready for WhatsApp ({STUDIO_CONTACT.phoneDisplay})
                    </p>
                  </div>
                  <pre className="mt-3 overflow-x-auto rounded-xl bg-surface-container-lowest p-3 font-sans text-xs leading-5 whitespace-pre-wrap text-on-surface">
                    {submittedMessagePreview}
                  </pre>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={submittedWhatsAppUrl}
                      className="inline-flex items-center gap-2 rounded-full bg-primary-container px-5 py-2.5 font-display text-xs font-bold text-on-primary-container transition-colors hover:bg-primary"
                    >
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                        open_in_new
                      </span>
                      <span>Open WhatsApp Chat</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant bg-surface-container-lowest px-4 py-2.5 font-display text-xs font-semibold text-on-surface transition-colors hover:border-primary hover:text-primary"
                    >
                      <span>{copied ? 'Copied!' : 'Copy Message'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Contact Details Card & Live Map */}
            <div className="flex flex-col gap-6 lg:col-span-6">
              <div className="flex flex-col gap-6 rounded-3xl bg-surface-container-lowest p-6 shadow-sm dark:border dark:border-white/10 sm:p-8 lg:p-10">
                <h3 className="font-display text-[24px] leading-[32px] font-bold text-on-surface">
                  Studio Contact Details
                </h3>

                <div className="flex flex-col gap-4 text-[16px] leading-[24px]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tertiary-fixed text-primary dark:bg-primary-container/20 dark:text-primary-fixed">
                      <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                        location_on
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display text-[20px] leading-[28px] font-bold text-on-surface">
                        Address
                      </h4>
                      <p className="mt-0.5 text-secondary">{STUDIO_CONTACT.addressFull}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tertiary-fixed text-primary dark:bg-primary-container/20 dark:text-primary-fixed">
                      <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                        call
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display text-[20px] leading-[28px] font-bold text-on-surface">
                        Phone Number
                      </h4>
                      <a
                        href={STUDIO_CONTACT.phoneHref}
                        className="mt-0.5 block font-bold tabular-nums text-primary hover:underline"
                      >
                        {STUDIO_CONTACT.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tertiary-fixed text-primary dark:bg-primary-container/20 dark:text-primary-fixed">
                      <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                        mail
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display text-[20px] leading-[28px] font-bold text-on-surface">
                        Email
                      </h4>
                      <a
                        href={`mailto:${STUDIO_CONTACT.email}`}
                        className="mt-0.5 block text-secondary hover:text-primary"
                      >
                        {STUDIO_CONTACT.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tertiary-fixed text-primary dark:bg-primary-container/20 dark:text-primary-fixed">
                      <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                        schedule
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display text-[20px] leading-[28px] font-bold text-on-surface">
                        Studio Hours
                      </h4>
                      <p className="mt-0.5 text-secondary">{STUDIO_CONTACT.hoursMain}</p>
                      <p className="text-[14px] font-semibold text-primary">
                        {STUDIO_CONTACT.hoursOff}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Embedded Google Map */}
              <div className="flex flex-col gap-3 overflow-hidden rounded-3xl bg-surface-container-lowest p-4 shadow-sm dark:border dark:border-white/10">
                <div className="h-60 w-full overflow-hidden rounded-2xl bg-surface-container shadow-inner">
                  <iframe
                    allowFullScreen
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={STUDIO_CONTACT.mapEmbedUrl}
                    title="Slim Fit Gym Mirpur-2 Map"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 px-2">
                  <span className="text-[14px] text-secondary">{STUDIO_CONTACT.mapLabel}</span>
                  <a
                    href={STUDIO_CONTACT.mapOpenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-display text-[12px] font-bold text-primary hover:underline"
                  >
                    <span>Open in Google Maps</span>
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                      open_in_new
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING QUICK WHATSAPP CTA */}
      <a
        href={`https://wa.me/${STUDIO_CONTACT.whatsappNumber}?text=Hello%20Slim%20Fit%20Gym%2C%20I%20want%20to%20know%20about%20membership`}
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-primary-container px-4 py-2.5 text-on-primary-container shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary sm:right-6 sm:bottom-6 sm:px-5 sm:py-3"
      >
        <span className="material-symbols-outlined text-[22px] sm:text-[24px]" aria-hidden="true">
          chat
        </span>
        <span className="font-display text-[13px] font-bold tracking-wide sm:text-[14px]">
          Quick Chat
        </span>
      </a>

      {/* FOOTER */}
      <footer className="w-full bg-inverse-surface pt-10 pb-20 text-inverse-on-surface dark:border-t dark:border-white/10 dark:bg-[#06060a] sm:pb-8">
        <div className="mx-auto w-full max-w-[1280px] px-5 lg:px-10">
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-4">
              <a href="#hero" className="flex items-center gap-2">
                <img
                  src={ORIGINAL_IMAGES.logo}
                  alt="SLIM FIT GYM Logo"
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full bg-white object-contain p-0.5 shadow-sm"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-display text-[20px] font-bold text-inverse-on-surface">
                    {STUDIO_CONTACT.brand}
                  </span>
                  <span className="font-display text-[12px] font-bold tracking-wider text-primary-fixed uppercase">
                    {STUDIO_CONTACT.tagline}
                  </span>
                </div>
              </a>
              <p className="max-w-xs text-[14px] leading-[20px] text-surface-container-highest">
                Stronger, Healthier, Happier You. A private, elite female-only wellness and
                strength sanctuary crafted for empowered living.
              </p>
              <div className="flex items-center gap-2">
                <a
                  aria-label="WhatsApp"
                  href={`https://wa.me/${STUDIO_CONTACT.whatsappNumber}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high/10 text-inverse-on-surface transition-colors hover:bg-primary-container hover:text-on-primary-container"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    chat
                  </span>
                </a>
                <a
                  aria-label="Call Us"
                  href={STUDIO_CONTACT.phoneHref}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high/10 text-inverse-on-surface transition-colors hover:bg-primary-container hover:text-on-primary-container"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    call
                  </span>
                </a>
                <a
                  aria-label="Email Us"
                  href={`mailto:${STUDIO_CONTACT.email}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high/10 text-inverse-on-surface transition-colors hover:bg-primary-container hover:text-on-primary-container"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    mail
                  </span>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-display text-[20px] font-semibold text-inverse-on-surface">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-1 text-[14px] text-surface-container-highest">
                <li className="py-0.5">
                  <a href="#about" className="transition-colors hover:text-primary-fixed">
                    About the Sanctuary
                  </a>
                </li>
                <li className="py-0.5">
                  <a href="#programmes" className="transition-colors hover:text-primary-fixed">
                    Fitness Programmes
                  </a>
                </li>
                <li className="py-0.5">
                  <a href="#schedule" className="transition-colors hover:text-primary-fixed">
                    Class Timetable
                  </a>
                </li>
                <li className="py-0.5">
                  <a href="#pricing" className="transition-colors hover:text-primary-fixed">
                    Membership Plans
                  </a>
                </li>
                <li className="py-0.5">
                  <a href="#reviews" className="transition-colors hover:text-primary-fixed">
                    Member Stories
                  </a>
                </li>
                <li className="py-0.5">
                  <a href="#contact" className="transition-colors hover:text-primary-fixed">
                    Book Trial Session
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-display text-[20px] font-semibold text-inverse-on-surface">
                Contact Details
              </h4>
              <div className="flex flex-col gap-2 text-[14px] text-surface-container-highest">
                <div className="flex items-start gap-1.5">
                  <span
                    className="material-symbols-outlined mt-0.5 shrink-0 text-[20px] text-primary-fixed"
                    aria-hidden="true"
                  >
                    location_on
                  </span>
                  <span>{STUDIO_CONTACT.addressShort}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined shrink-0 text-[20px] text-primary-fixed"
                    aria-hidden="true"
                  >
                    call
                  </span>
                  <a
                    href={STUDIO_CONTACT.phoneHref}
                    className="tabular-nums transition-colors hover:text-primary-fixed"
                  >
                    {STUDIO_CONTACT.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined shrink-0 text-[20px] text-primary-fixed"
                    aria-hidden="true"
                  >
                    mail
                  </span>
                  <a
                    href={`mailto:${STUDIO_CONTACT.email}`}
                    className="transition-colors hover:text-primary-fixed"
                  >
                    {STUDIO_CONTACT.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-display text-[20px] font-semibold text-inverse-on-surface">
                Training Hours
              </h4>
              <div className="flex flex-col gap-2 text-[14px] text-surface-container-highest">
                <div className="flex items-start gap-1.5">
                  <span
                    className="material-symbols-outlined mt-0.5 shrink-0 text-[20px] text-primary-fixed"
                    aria-hidden="true"
                  >
                    schedule
                  </span>
                  <div>
                    <p className="font-medium text-inverse-on-surface">Saturday – Thursday</p>
                    <p className="tabular-nums">7:30 AM – 10:00 PM</p>
                  </div>
                </div>
                <div className="mt-1 flex items-start gap-1.5">
                  <span
                    className="material-symbols-outlined mt-0.5 shrink-0 text-[20px] text-outline"
                    aria-hidden="true"
                  >
                    event_busy
                  </span>
                  <div>
                    <p className="font-medium text-inverse-on-surface">Friday</p>
                    <p className="text-outline-variant dark:text-white/60">Weekly Off</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-2 border-t border-surface-container-high/10 pt-4 font-display text-[12px] font-bold tracking-[0.05em] text-surface-container-highest sm:flex-row">
            <p>© 2026 SLIM FIT GYM (Only For Ladies). All rights reserved.</p>
            <p className="text-outline-variant dark:text-white/60">
              Mirpur-2, Dhaka • 100% Female Protected Space
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
