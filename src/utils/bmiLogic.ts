export type BmiCategoryId = 'underweight' | 'normal' | 'overweight' | 'obese';

export interface BmiInput {
  heightFeet: string;
  heightInches: string;
  weightKg: string;
}

export interface BmiValidationErrors {
  height?: string;
  weight?: string;
}

export interface BmiResult {
  bmi: number;
  categoryId: BmiCategoryId;
  categoryLabel: string;
  rangeText: string;
  summary: string;
  recommendedProgram: string;
  recommendedPackageValue: string;
  healthyWeightMinKg: number;
  healthyWeightMaxKg: number;
  scalePercent: number;
}

export interface BmiCalculationResponse {
  valid: boolean;
  errors: BmiValidationErrors;
  result?: BmiResult;
}

export const BMI_CATEGORIES: {
  id: BmiCategoryId;
  label: string;
  rangeText: string;
}[] = [
  { id: 'underweight', label: 'Underweight', rangeText: 'Below 18.5' },
  { id: 'normal', label: 'Normal Weight', rangeText: '18.5 – 24.9' },
  { id: 'overweight', label: 'Overweight', rangeText: '25.0 – 29.9' },
  { id: 'obese', label: 'Obese', rangeText: '30.0 & above' },
];

export function classifyBmi(bmi: number): {
  categoryId: BmiCategoryId;
  categoryLabel: string;
  rangeText: string;
  summary: string;
  recommendedProgram: string;
  recommendedPackageValue: string;
} {
  if (bmi < 18.5) {
    return {
      categoryId: 'underweight',
      categoryLabel: 'Underweight',
      rangeText: 'Below 18.5',
      summary:
        'Focus on building lean strength, bone density, and balanced caloric nourishment with guided resistance training.',
      recommendedProgram: 'Weightlifting + Customized Diet Plan',
      recommendedPackageValue: '2-Month Package (৳3,000 — Best Value)',
    };
  }
  if (bmi < 25) {
    return {
      categoryId: 'normal',
      categoryLabel: 'Normal Weight',
      rangeText: '18.5 – 24.9',
      summary:
        'Your BMI is within the healthy range. Maintain stamina, posture, and lean muscle definition with balanced training.',
      recommendedProgram: 'Body Tone Programme + Yoga & Aerobics',
      recommendedPackageValue: '1-Month Package (৳2,000)',
    };
  }
  if (bmi < 30) {
    return {
      categoryId: 'overweight',
      categoryLabel: 'Overweight',
      rangeText: '25.0 – 29.9',
      summary:
        'Steady metabolic conditioning paired with realistic home-cooked meal guidance can safely lower body fat and boost energy.',
      recommendedProgram: 'Fat Loss Programme + Zumba & Diet Plan',
      recommendedPackageValue: '2-Month Package (৳3,000 — Best Value)',
    };
  }
  return {
    categoryId: 'obese',
    categoryLabel: 'Obese',
    rangeText: '30.0 & above',
    summary:
      'Start with joint-friendly low-impact cardio, supervised strength circuits, and a structured Bangladeshi nutrition plan.',
    recommendedProgram: 'Supervised Fat Loss + Customized Diet Plan',
    recommendedPackageValue: '2-Month Package (৳3,000 — Best Value)',
  };
}

export function calculateBmi(input: BmiInput): BmiCalculationResponse {
  const errors: BmiValidationErrors = {};
  let heightMeters = 0;

  const rawFt = input.heightFeet.trim();
  const rawIn = input.heightInches.trim();
  const feet = Number(rawFt);
  const inches = rawIn === '' ? 0 : Number(rawIn);

  if (!rawFt) {
    errors.height = 'Please enter your height in feet and inches.';
  } else if (
    !Number.isFinite(feet) ||
    !Number.isFinite(inches) ||
    feet < 3 ||
    feet > 8 ||
    inches < 0 ||
    inches >= 12
  ) {
    errors.height = 'Enter feet between 3–8 and inches between 0–11.';
  } else {
    const totalInches = feet * 12 + inches;
    heightMeters = totalInches * 0.0254;
  }

  let weightKg = 0;
  const rawWeight = input.weightKg.trim();
  const parsedWeight = Number(rawWeight);
  if (!rawWeight) {
    errors.weight = 'Please enter your weight in kg.';
  } else if (!Number.isFinite(parsedWeight) || parsedWeight <= 0) {
    errors.weight = 'Please enter a valid positive weight.';
  } else if (parsedWeight < 25 || parsedWeight > 300) {
    errors.weight = 'Enter a weight between 25 kg and 300 kg.';
  } else {
    weightKg = parsedWeight;
  }

  if (errors.height || errors.weight) {
    return { valid: false, errors };
  }

  const rawBmi = weightKg / (heightMeters * heightMeters);
  const bmi = Math.round(rawBmi * 10) / 10;
  const classification = classifyBmi(bmi);

  const healthyWeightMinKg = Math.round(18.5 * heightMeters * heightMeters);
  const healthyWeightMaxKg = Math.round(24.9 * heightMeters * heightMeters);

  // Map BMI 14..40 onto 0..100% scale bar
  const clamped = Math.min(40, Math.max(14, bmi));
  const scalePercent = Math.round(((clamped - 14) / (40 - 14)) * 100);

  return {
    valid: true,
    errors: {},
    result: {
      bmi,
      ...classification,
      healthyWeightMinKg,
      healthyWeightMaxKg,
      scalePercent,
    },
  };
}
