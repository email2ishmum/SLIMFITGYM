import { FormEvent, useState } from 'react';
import {
  BMI_CATEGORIES,
  BmiResult,
  BmiValidationErrors,
  calculateBmi,
} from '../utils/bmiLogic';

interface BmiCalculatorProps {
  onApplyRecommendation: (packageValue: string, prefillMessage: string) => void;
}

export function BmiCalculator({ onApplyRecommendation }: BmiCalculatorProps) {
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [errors, setErrors] = useState<BmiValidationErrors>({});
  const [result, setResult] = useState<BmiResult | null>(null);

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    const res = calculateBmi({
      heightFeet,
      heightInches,
      weightKg,
    });

    if (!res.valid || !res.result) {
      setErrors(res.errors);
      setResult(null);
      return;
    }

    setErrors({});
    setResult(res.result);
  };

  const handleReset = () => {
    setHeightFeet('');
    setHeightInches('');
    setWeightKg('');
    setErrors({});
    setResult(null);
  };

  return (
    <section
      id="bmi"
      className="w-full scroll-mt-20 bg-tertiary-fixed/20 py-10 transition-colors duration-200 dark:bg-[#0a0810] lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
          <span className="mb-1 rounded-full bg-surface-container-lowest px-3.5 py-1 font-display text-[12px] leading-[16px] font-bold tracking-wider text-primary uppercase shadow-sm dark:border dark:border-primary-container/30 dark:bg-primary-container/20 dark:text-primary-fixed">
            Instant Wellness Check
          </span>
          <h2 className="mb-1 font-display text-[30px] leading-[36px] font-bold tracking-[-0.015em] text-on-surface lg:text-[40px] lg:leading-[48px] lg:tracking-[-0.02em]">
            BMI Calculator
          </h2>
          <p className="text-[16px] leading-[24px] text-secondary">
            Enter your height and weight to discover your Body Mass Index category and receive a
            tailored SLIM FIT GYM programme recommendation.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {/* Left Card: Calculator Inputs */}
          <div className="flex flex-col justify-between rounded-3xl bg-surface-container-lowest p-5 shadow-sm dark:border dark:border-white/10 sm:p-8 lg:col-span-6 lg:p-10">
            <div>
              <h3 className="font-display text-[24px] leading-[32px] font-bold text-on-surface">
                Check Your Body Mass Index
              </h3>
              <p className="mt-1 text-[14px] leading-[20px] text-secondary">
                Enter your height in feet &amp; inches and your weight in kilograms.
              </p>

              <form onSubmit={handleCalculate} noValidate className="mt-6 flex flex-col gap-5">
                {/* Height Block (ft / in) */}
                <div>
                  <label
                    htmlFor="bmi-height-ft"
                    className="mb-2 block font-display text-[12px] font-bold tracking-wider text-on-surface uppercase"
                  >
                    Height (ft / in)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <label htmlFor="bmi-height-ft" className="sr-only">
                        Height in feet
                      </label>
                      <input
                        id="bmi-height-ft"
                        type="number"
                        inputMode="numeric"
                        placeholder="e.g. 5"
                        value={heightFeet}
                        onChange={(e) => {
                          setHeightFeet(e.target.value);
                          if (errors.height) setErrors((p) => ({ ...p, height: undefined }));
                        }}
                        className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest py-3 pr-12 pl-4 text-[16px] tabular-nums text-on-surface outline-none focus:border-transparent focus:ring-2 focus:ring-primary-container"
                      />
                      <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 font-display text-[13px] font-semibold text-secondary">
                        ft
                      </span>
                    </div>
                    <div className="relative">
                      <label htmlFor="bmi-height-in" className="sr-only">
                        Height in inches
                      </label>
                      <input
                        id="bmi-height-in"
                        type="number"
                        inputMode="decimal"
                        placeholder="e.g. 4"
                        value={heightInches}
                        onChange={(e) => {
                          setHeightInches(e.target.value);
                          if (errors.height) setErrors((p) => ({ ...p, height: undefined }));
                        }}
                        className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest py-3 pr-12 pl-4 text-[16px] tabular-nums text-on-surface outline-none focus:border-transparent focus:ring-2 focus:ring-primary-container"
                      />
                      <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 font-display text-[13px] font-semibold text-secondary">
                        in
                      </span>
                    </div>
                  </div>
                  {errors.height && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-error">
                      {errors.height}
                    </p>
                  )}
                </div>

                {/* Weight Block (kg) */}
                <div>
                  <label
                    htmlFor="bmi-weight"
                    className="mb-2 block font-display text-[12px] font-bold tracking-wider text-on-surface uppercase"
                  >
                    Weight (kg)
                  </label>
                  <div className="relative">
                    <input
                      id="bmi-weight"
                      type="number"
                      inputMode="decimal"
                      step="0.5"
                      placeholder="e.g. 60"
                      value={weightKg}
                      onChange={(e) => {
                        setWeightKg(e.target.value);
                        if (errors.weight) setErrors((p) => ({ ...p, weight: undefined }));
                      }}
                      className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest py-3 pr-14 pl-4 text-[16px] tabular-nums text-on-surface outline-none focus:border-transparent focus:ring-2 focus:ring-primary-container"
                    />
                    <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 font-display text-[13px] font-semibold text-secondary">
                      kg
                    </span>
                  </div>
                  {errors.weight && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-error">
                      {errors.weight}
                    </p>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary-container px-7 py-3.5 font-display text-[14px] font-bold text-on-primary-container shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary"
                  >
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                      calculate
                    </span>
                    <span>Calculate BMI</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="cursor-pointer rounded-full border border-surface-container-highest bg-surface-container-lowest px-5 py-3.5 font-display text-[14px] font-semibold text-secondary transition-colors hover:border-on-surface hover:text-on-surface"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            <p className="mt-6 border-t border-surface-container pt-4 text-[12px] leading-[18px] text-secondary">
              Note: BMI is a general screening guide. Every new member receives an in-person BMI
              &amp; body-composition assessment with our female trainers.
            </p>
          </div>

          {/* Right Card: Result & Category Breakdown */}
          <div className="flex flex-col justify-between rounded-3xl bg-inverse-surface p-5 text-inverse-on-surface shadow-xl dark:border dark:border-white/10 sm:p-8 lg:col-span-6 lg:p-10">
            {result ? (
              <div data-testid="bmi-result-panel" className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-surface-container-high/10 px-3 py-1 font-display text-[12px] font-bold tracking-wider text-primary-fixed uppercase">
                      Your BMI Result
                    </span>
                    <span className="font-display text-[12px] font-semibold text-surface-container-highest">
                      Healthy target:{' '}
                      <strong className="tabular-nums text-inverse-on-surface">
                        {result.healthyWeightMinKg} – {result.healthyWeightMaxKg} kg
                      </strong>
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap items-baseline gap-4">
                    <span
                      data-testid="bmi-score"
                      className="font-display text-[56px] leading-[64px] font-extrabold tabular-nums tracking-[-0.03em] text-inverse-on-surface"
                    >
                      {result.bmi.toFixed(1)}
                    </span>
                    <div>
                      <p
                        data-testid="bmi-category"
                        className="font-display text-[22px] leading-[28px] font-bold text-primary-fixed"
                      >
                        {result.categoryLabel}
                      </p>
                      <p className="text-[13px] text-surface-container-highest">
                        WHO bracket: {result.rangeText}
                      </p>
                    </div>
                  </div>

                  {/* 4-Zone Visual Scale Bar */}
                  <div className="mt-6">
                    <div className="relative flex h-4 w-full items-center">
                      <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container-high/15">
                        <div className="grid h-full w-full grid-cols-4 gap-0.5">
                          <div className="bg-surface-container-highest/50" />
                          <div className="bg-primary-fixed" />
                          <div className="bg-primary-container/80" />
                          <div className="bg-primary" />
                        </div>
                      </div>
                      <div
                        aria-hidden="true"
                        style={{ left: `clamp(0px, calc(${result.scalePercent}% - 8px), calc(100% - 16px))` }}
                        className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-inverse-surface bg-white shadow-md transition-all duration-300"
                      />
                    </div>
                    <div className="mt-2 grid grid-cols-4 text-[11px] font-medium text-surface-container-highest">
                      <span>Under</span>
                      <span className="text-center">Normal</span>
                      <span className="text-center">Over</span>
                      <span className="text-right">Obese</span>
                    </div>
                  </div>

                  <p className="mt-6 text-[15px] leading-[24px] text-surface-container-highest">
                    {result.summary}
                  </p>

                  <div className="mt-5 rounded-2xl border border-surface-container-high/15 bg-surface-container-high/10 p-4">
                    <p className="font-display text-[11px] font-bold tracking-wider text-primary-fixed uppercase">
                      Recommended at SLIM FIT GYM
                    </p>
                    <p className="mt-1 font-display text-[18px] font-bold text-inverse-on-surface">
                      {result.recommendedProgram}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      onApplyRecommendation(
                        result.recommendedPackageValue,
                        `My BMI is ${result.bmi.toFixed(1)} (${result.categoryLabel}). I am interested in the ${result.recommendedProgram}.`
                      )
                    }
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary-container px-6 py-3.5 font-display text-[14px] font-bold text-on-primary-container shadow-lg transition-all duration-200 hover:bg-primary"
                  >
                    <span>Book Assessment With This Result</span>
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-surface-container-high/10 px-3 py-1 font-display text-[12px] font-bold tracking-wider text-primary-fixed uppercase">
                    WHO Reference Categories
                  </span>
                  <h3 className="mt-4 font-display text-[28px] leading-[36px] font-bold text-inverse-on-surface">
                    Understand Your Starting Point
                  </h3>
                  <p className="mt-2 text-[15px] leading-[24px] text-surface-container-highest">
                    Enter your height and weight on the left to calculate your BMI score, healthy
                    weight range, and recommended women-only workout plan.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {BMI_CATEGORIES.map((cat) => (
                      <div
                        key={cat.id}
                        className="rounded-2xl bg-surface-container-high/10 p-4"
                      >
                        <p className="font-display text-[15px] font-bold text-inverse-on-surface">
                          {cat.label}
                        </p>
                        <p className="mt-0.5 text-[13px] tabular-nums text-primary-fixed">
                          BMI {cat.rangeText}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-surface-container-high/10 pt-5 text-[13px] leading-[20px] text-surface-container-highest">
                  100% private — your measurements stay strictly on your device and are never
                  stored unless you choose to share them with our female trainers.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
