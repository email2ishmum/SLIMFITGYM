import {
  BillingCycle,
  ClassCategory,
  DayOfWeek,
  GymClass,
  IntensityLevel,
  MEMBERSHIP_ADDONS,
  MEMBERSHIP_PLANS,
  MembershipPlan,
} from '../data/gymData';

export interface CycleConfig {
  id: BillingCycle;
  label: string;
  months: number;
  discountRate: number;
  badgeText: string;
}

export const BILLING_CYCLES: Record<BillingCycle, CycleConfig> = {
  monthly: {
    id: 'monthly',
    label: 'Monthly',
    months: 1,
    discountRate: 0,
    badgeText: 'Flexible',
  },
  quarterly: {
    id: 'quarterly',
    label: '3 Months',
    months: 3,
    discountRate: 0.1,
    badgeText: 'Save 10%',
  },
  biannual: {
    id: 'biannual',
    label: '6 Months',
    months: 6,
    discountRate: 0.15,
    badgeText: 'Save 15%',
  },
  annual: {
    id: 'annual',
    label: 'Annual',
    months: 12,
    discountRate: 0.22,
    badgeText: 'Save 22%',
  },
};

export interface PricingBreakdown {
  plan: MembershipPlan;
  cycle: CycleConfig;
  discountedMonthlyPlanRate: number;
  addOnsMonthlyTotal: number;
  effectiveMonthlyTotal: number;
  baseCycleTotal: number;
  discountedCycleTotal: number;
  savingsAmount: number;
  savingsPercent: number;
  admissionFee: number;
  grandTotalFirstPayment: number;
}

export function calculateMembershipPricing(
  planId: MembershipPlan['id'],
  cycleId: BillingCycle,
  selectedAddOnIds: string[] = []
): PricingBreakdown {
  const plan = MEMBERSHIP_PLANS.find((p) => p.id === planId) ?? MEMBERSHIP_PLANS[1];
  const cycle = BILLING_CYCLES[cycleId];

  const uniqueAddOnIds = new Set(selectedAddOnIds);
  const addOnsMonthlyTotal = MEMBERSHIP_ADDONS.filter((addon) =>
    uniqueAddOnIds.has(addon.id)
  ).reduce((sum, addon) => sum + addon.monthlyCost, 0);

  const discountedMonthlyPlanRate = Math.round(plan.monthlyRate * (1 - cycle.discountRate));
  const basePlanCycleTotal = plan.monthlyRate * cycle.months;
  const discountedPlanCycleTotal = discountedMonthlyPlanRate * cycle.months;
  const addOnsCycleTotal = addOnsMonthlyTotal * cycle.months;

  const baseCycleTotal = basePlanCycleTotal + addOnsCycleTotal;
  const discountedCycleTotal = discountedPlanCycleTotal + addOnsCycleTotal;

  // Annual plans and VIP waive admission fee
  const admissionFee = cycleId === 'annual' ? 0 : plan.admissionFee;
  const admissionSavings = cycleId === 'annual' ? plan.admissionFee : 0;
  const savingsAmount = basePlanCycleTotal - discountedPlanCycleTotal + admissionSavings;
  const savingsPercent = Math.round(cycle.discountRate * 100);

  return {
    plan,
    cycle,
    discountedMonthlyPlanRate,
    addOnsMonthlyTotal,
    effectiveMonthlyTotal: discountedMonthlyPlanRate + addOnsMonthlyTotal,
    baseCycleTotal,
    discountedCycleTotal,
    savingsAmount,
    savingsPercent,
    admissionFee,
    grandTotalFirstPayment: discountedCycleTotal + admissionFee,
  };
}

export function formatBDT(amount: number): string {
  const rounded = Math.round(amount);
  return `৳${rounded.toLocaleString('en-US')}`;
}

export interface ClassFilterOptions {
  day?: DayOfWeek | 'All';
  category?: ClassCategory | 'All';
  intensity?: IntensityLevel | 'All';
  query?: string;
}

export function filterClasses(classes: GymClass[], options: ClassFilterOptions): GymClass[] {
  const normalizedQuery = (options.query ?? '').trim().toLowerCase();

  return classes.filter((cls) => {
    if (options.day && options.day !== 'All' && cls.day !== options.day) {
      return false;
    }
    if (options.category && options.category !== 'All' && cls.category !== options.category) {
      return false;
    }
    if (options.intensity && options.intensity !== 'All' && cls.intensity !== options.intensity) {
      return false;
    }
    if (normalizedQuery) {
      const haystack = `${cls.title} ${cls.trainerName} ${cls.category} ${cls.studio} ${cls.description}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }
    return true;
  });
}

export function getRemainingSpots(cls: GymClass, reservedIds: string[]): number {
  const isUserReserved = reservedIds.includes(cls.id);
  const booked = cls.baseBooked + (isUserReserved ? 1 : 0);
  return Math.max(0, cls.capacity - booked);
}

export function toggleReservationId(
  reservedIds: string[],
  cls: GymClass
): { nextReservedIds: string[]; action: 'reserved' | 'cancelled' | 'full' } {
  if (reservedIds.includes(cls.id)) {
    return {
      nextReservedIds: reservedIds.filter((id) => id !== cls.id),
      action: 'cancelled',
    };
  }
  const remaining = getRemainingSpots(cls, reservedIds);
  if (remaining <= 0) {
    return {
      nextReservedIds: reservedIds,
      action: 'full',
    };
  }
  return {
    nextReservedIds: [...reservedIds, cls.id],
    action: 'reserved',
  };
}

export interface BookingFormInput {
  fullName: string;
  phone: string;
  preferredSlot: string;
  goal: string;
  notes?: string;
}

export interface BookingValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof BookingFormInput, string>>;
  normalizedPhone?: string;
}

export function normalizeBangladeshPhone(raw: string): string {
  const digitsOnly = raw.replace(/[\s\-()+]/g, '');
  if (digitsOnly.startsWith('8801') && digitsOnly.length === 13) {
    return digitsOnly.slice(2);
  }
  return digitsOnly;
}

export function validateBookingForm(input: BookingFormInput): BookingValidationResult {
  const errors: Partial<Record<keyof BookingFormInput, string>> = {};

  const trimmedName = input.fullName.trim();
  if (!trimmedName) {
    errors.fullName = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Name must be at least 2 characters.';
  }

  const normalizedPhone = normalizeBangladeshPhone(input.phone);
  if (!input.phone.trim()) {
    errors.phone = 'Please enter your mobile number.';
  } else if (!/^01[3-9]\d{8}$/.test(normalizedPhone)) {
    errors.phone = 'Enter a valid Bangladesh mobile number (e.g., 01712-345678).';
  }

  if (!input.preferredSlot.trim()) {
    errors.preferredSlot = 'Please select a preferred visit time.';
  }

  if (!input.goal.trim()) {
    errors.goal = 'Please select your primary fitness goal.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    normalizedPhone: Object.keys(errors).length === 0 ? `+88${normalizedPhone}` : undefined,
  };
}

export function generatePassCode(normalizedPhone: string, seedNumber = 482): string {
  const digits = normalizedPhone.replace(/\D/g, '');
  const tail = digits.slice(-4).padStart(4, '0');
  const suffix = String(Math.abs(seedNumber) % 900 + 100);
  return `SFG-M2-${tail}-${suffix}`;
}
