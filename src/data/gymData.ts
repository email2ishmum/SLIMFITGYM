export type DayOfWeek = 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday';
export type ClassCategory = 'Strength' | 'Pilates' | 'HIIT' | 'Yoga' | 'Zumba';
export type IntensityLevel = 'Gentle' | 'Moderate' | 'Athletic';
export type BillingCycle = 'monthly' | 'quarterly' | 'biannual' | 'annual';
export type AppScreen = 'overview' | 'schedule' | 'trainers' | 'memberships' | 'visit';

export interface GymClass {
  id: string;
  title: string;
  day: DayOfWeek;
  startTime: string;
  durationMin: number;
  category: ClassCategory;
  intensity: IntensityLevel;
  trainerId: string;
  trainerName: string;
  studio: string;
  capacity: number;
  baseBooked: number;
  description: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialty: 'Strength & Conditioning' | 'Pilates & Mobility' | 'Clinical Nutrition' | 'HIIT & Weight Loss';
  experienceYears: number;
  certifications: string[];
  languages: string[];
  bio: string;
  outcomeStat: string;
  availability: string;
  image: string;
  imageAlt: string;
}

export interface MembershipPlan {
  id: 'essential' | 'complete' | 'vip';
  name: string;
  subtitle: string;
  monthlyRate: number;
  admissionFee: number;
  featured?: boolean;
  highlightNote?: string;
  features: string[];
}

export interface MembershipAddOn {
  id: string;
  name: string;
  monthlyCost: number;
  description: string;
}

export interface MemberTestimonial {
  id: string;
  name: string;
  neighborhood: string;
  role: string;
  language: 'en' | 'bn';
  quote: string;
  englishMetric: string;
  program: string;
  duration: string;
}

export interface FacilityZone {
  id: string;
  number: string;
  title: string;
  area: string;
  summary: string;
  highlights: string[];
  image?: string;
  imageAlt?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const BRAND_ASSETS = {
  logo: '/assets/aistudio/logo_dbbd2aed.jpg',
  heroStudio: '/src/assets/images/hero_sanctuary_studio_1795082023797.jpg',
  pilatesZone: '/src/assets/images/zone_pilates_studio_1795082040504.jpg',
  coachFarhana: '/src/assets/images/coach_farhana_portrait_1795082012734.jpg',
  coachNusrat: '/src/assets/images/coach_nusrat_portrait_1795082014291.jpg',
  coachTahmina: '/src/assets/images/coach_tahmina_portrait_1795082012731.jpg',
} as const;

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
];

export const CLASS_CATEGORIES: ClassCategory[] = ['Strength', 'Pilates', 'HIIT', 'Yoga', 'Zumba'];

export const FACILITY_ZONES: FacilityZone[] = [
  {
    id: 'strength-floor',
    number: '01.',
    title: 'Strength & Conditioning Sanctuary',
    area: '2,100 sq ft · Matte Black & Brushed Chrome Fleet',
    summary:
      'Ergonomically proportioned free weights, selectorized glute & back stations, Olympic lifting platforms, and assisted squat racks designed around female biomechanics.',
    highlights: [
      'Dumbbells from 1 kg to 24 kg in 1 kg increments',
      'Frosted floor-to-ceiling architectural privacy glass',
      'Full-time female floor coaches for form guidance',
    ],
    image: BRAND_ASSETS.heroStudio,
    imageAlt: 'Sunlit private strength training floor with matte black dumbbells and frosted glass windows',
  },
  {
    id: 'pilates-loft',
    number: '02.',
    title: 'Reformer Pilates & Postnatal Loft',
    area: '1,200 sq ft · Oak Flooring & Acoustic Calm',
    summary:
      'Small-group reformer pilates, pelvic floor restoration, and deep mobility sessions capped at 8 women per class for individualized alignment cues.',
    highlights: [
      '8 clinical-grade balanced body reformers',
      'Dedicated postnatal diastasis & core recovery track',
      'Soft daylight diffusion with sheer drapery',
    ],
    image: BRAND_ASSETS.pilatesZone,
    imageAlt: 'Warm sunlit reformer pilates loft with wooden floors and arched plaster doorways',
  },
  {
    id: 'cardio-hiit',
    number: '03.',
    title: 'Cardio & Metabolic Conditioning Deck',
    area: '950 sq ft · Shock-Absorbent Acoustic Floor',
    summary:
      'Low-impact curved treadmills, rowers, stair climbers, and energetic Zumba & HIIT intervals calibrated for steady fat loss and cardiovascular stamina.',
    highlights: [
      'Hospital-grade HEPA air filtration across the floor',
      'Heart-rate zone boards without intrusive cameras',
      'Beginner-friendly joint-safe flooring system',
    ],
  },
  {
    id: 'vanity-prayer',
    number: '04.',
    title: 'Private Changing, Shower & Prayer Suite',
    area: '550 sq ft · Strict Zero-Camera Zone',
    summary:
      'Individual lockable changing cubicles, rain showers with organic amenities, a tranquil wudu & prayer nook, and biometric smart lockers.',
    highlights: [
      '100% female housekeeping & reception personnel',
      'Biometric turnstile entry exclusive to active members',
      'Quiet prayer space & cooled drinking water station',
    ],
  },
];

export const TRAINERS: Trainer[] = [
  {
    id: 'farhana',
    name: 'Farhana Akter',
    role: 'Head Strength & Conditioning Coach',
    specialty: 'Strength & Conditioning',
    experienceYears: 9,
    certifications: ['ACE Certified Personal Trainer', 'Pre & Postnatal Strength Specialist'],
    languages: ['Bengali', 'English'],
    bio: 'Former national collegiate track athlete who specializes in teaching women in Dhaka how to lift safely, build lean muscle, and overcome gym intimidation from day one.',
    outcomeStat: '320+ Mirpur members guided to first unassisted deadlift & sustained fat loss',
    availability: 'Sat–Thu · 7:00 AM – 3:00 PM',
    image: BRAND_ASSETS.coachFarhana,
    imageAlt: 'Coach Farhana Akter standing in the sunlit strength sanctuary at Slim Fit Gym',
  },
  {
    id: 'nusrat',
    name: 'Nusrat Jahan',
    role: 'Lead Reformer Pilates & Mobility Coach',
    specialty: 'Pilates & Mobility',
    experienceYears: 7,
    certifications: ['STOTT Pilates Certified Instructor', 'Pelvic Floor & Posture Rehab'],
    languages: ['Bengali', 'English'],
    bio: 'Helps busy mothers, students, and desk professionals rebuild deep core stability, resolve chronic lower-back stiffness, and restore posture after childbirth.',
    outcomeStat: '94% of postnatal clients report measurable core & back relief within 8 weeks',
    availability: 'Sat–Wed · 9:00 AM – 6:30 PM',
    image: BRAND_ASSETS.coachNusrat,
    imageAlt: 'Coach Nusrat Jahan in modest athletic attire inside the Reformer Pilates studio',
  },
  {
    id: 'tahmina',
    name: 'Dr. Tahmina Chowdhury',
    role: 'Clinical Sports Nutritionist',
    specialty: 'Clinical Nutrition',
    experienceYears: 11,
    certifications: ['M.Sc. Clinical Nutrition (DU)', 'PCOS & Insulin Resistance Specialist'],
    languages: ['Bengali', 'English'],
    bio: 'Designs realistic, family-friendly Bangladeshi meal plans built around everyday home cooking—dal, fish, seasonal greens, and portion balance—without crash diets or expensive imports.',
    outcomeStat: 'Average 6.4 kg healthy fat reduction in 12 weeks for PCOS & postpartum plans',
    availability: 'Sun, Tue, Thu · 11:00 AM – 7:30 PM',
    image: BRAND_ASSETS.coachTahmina,
    imageAlt: 'Dr. Tahmina Chowdhury in the private nutrition consultation lounge',
  },
  {
    id: 'sadia',
    name: 'Sadia Rahman',
    role: 'Metabolic HIIT & Rhythm Coach',
    specialty: 'HIIT & Weight Loss',
    experienceYears: 6,
    certifications: ['NASM Group Fitness Coach', 'Licensed Zumba & Athletic HIIT Instructor'],
    languages: ['Bengali', 'English'],
    bio: 'Leads high-energy, joint-conscious evening classes tailored for university students and working women returning home to Mirpur after office hours.',
    outcomeStat: '480+ group sessions led with 91% 6-month member attendance consistency',
    availability: 'Sat–Thu · 4:00 PM – 9:00 PM',
    image: BRAND_ASSETS.coachFarhana,
    imageAlt: 'Coach Sadia Rahman preparing for an evening conditioning session',
  },
];

export const WEEKLY_CLASSES: GymClass[] = [
  {
    id: 'sat-01',
    title: 'Foundations of Strength',
    day: 'Saturday',
    startTime: '07:30 AM',
    durationMin: 50,
    category: 'Strength',
    intensity: 'Moderate',
    trainerId: 'farhana',
    trainerName: 'Farhana Akter',
    studio: 'Strength Sanctuary',
    capacity: 12,
    baseBooked: 8,
    description: 'Progressive dumbbell & kettlebell mechanics focused on posture, glute activation, and upper-body strength.',
  },
  {
    id: 'sat-02',
    title: 'Reformer Core & Spine',
    day: 'Saturday',
    startTime: '10:00 AM',
    durationMin: 45,
    category: 'Pilates',
    intensity: 'Gentle',
    trainerId: 'nusrat',
    trainerName: 'Nusrat Jahan',
    studio: 'Pilates Loft',
    capacity: 8,
    baseBooked: 6,
    description: 'Controlled spring-resistance pilates targeting deep abdominal support and shoulder decompression.',
  },
  {
    id: 'sat-03',
    title: 'Evening Rhythm Zumba',
    day: 'Saturday',
    startTime: '06:00 PM',
    durationMin: 50,
    category: 'Zumba',
    intensity: 'Athletic',
    trainerId: 'sadia',
    trainerName: 'Sadia Rahman',
    studio: 'Cardio Deck',
    capacity: 18,
    baseBooked: 14,
    description: 'High-spirit dance cardio blending South Asian beats and Latin intervals in a closed, music-filled studio.',
  },
  {
    id: 'sun-01',
    title: 'Lower Body Sculpt & Glutes',
    day: 'Sunday',
    startTime: '08:00 AM',
    durationMin: 50,
    category: 'Strength',
    intensity: 'Athletic',
    trainerId: 'farhana',
    trainerName: 'Farhana Akter',
    studio: 'Strength Sanctuary',
    capacity: 12,
    baseBooked: 7,
    description: 'Structured hip thrusts, split squats, and resistance circuits to build lean lower-body power.',
  },
  {
    id: 'sun-02',
    title: 'Postnatal Core Restoration',
    day: 'Sunday',
    startTime: '11:00 AM',
    durationMin: 45,
    category: 'Pilates',
    intensity: 'Gentle',
    trainerId: 'nusrat',
    trainerName: 'Nusrat Jahan',
    studio: 'Pilates Loft',
    capacity: 8,
    baseBooked: 5,
    description: 'Breathwork, pelvic floor alignment, and safe diastasis recti recovery for new and experienced mothers.',
  },
  {
    id: 'sun-03',
    title: 'Metabolic Burn HIIT',
    day: 'Sunday',
    startTime: '06:30 PM',
    durationMin: 40,
    category: 'HIIT',
    intensity: 'Athletic',
    trainerId: 'sadia',
    trainerName: 'Sadia Rahman',
    studio: 'Cardio Deck',
    capacity: 14,
    baseBooked: 11,
    description: 'Short, scalable 40-second work blocks with low-impact modifications for every fitness level.',
  },
  {
    id: 'mon-01',
    title: 'Morning Flow & Mobility Yoga',
    day: 'Monday',
    startTime: '07:30 AM',
    durationMin: 50,
    category: 'Yoga',
    intensity: 'Gentle',
    trainerId: 'nusrat',
    trainerName: 'Nusrat Jahan',
    studio: 'Pilates Loft',
    capacity: 14,
    baseBooked: 9,
    description: 'Slow vinyasa flow focused on hip openers, thoracic mobility, and nervous system calm.',
  },
  {
    id: 'mon-02',
    title: 'Upper Body & Posture Strength',
    day: 'Monday',
    startTime: '05:30 PM',
    durationMin: 50,
    category: 'Strength',
    intensity: 'Moderate',
    trainerId: 'farhana',
    trainerName: 'Farhana Akter',
    studio: 'Strength Sanctuary',
    capacity: 12,
    baseBooked: 9,
    description: 'Targeted back, shoulder, and arm toning to counter desk posture and build everyday functional strength.',
  },
  {
    id: 'tue-01',
    title: 'Reformer Tone & Lengthen',
    day: 'Tuesday',
    startTime: '09:30 AM',
    durationMin: 45,
    category: 'Pilates',
    intensity: 'Moderate',
    trainerId: 'nusrat',
    trainerName: 'Nusrat Jahan',
    studio: 'Pilates Loft',
    capacity: 8,
    baseBooked: 7,
    description: 'Full-body reformer sequencing for lean muscular endurance, balance, and graceful control.',
  },
  {
    id: 'tue-02',
    title: 'Express 35-Min Fat Burn HIIT',
    day: 'Tuesday',
    startTime: '06:45 PM',
    durationMin: 35,
    category: 'HIIT',
    intensity: 'Athletic',
    trainerId: 'sadia',
    trainerName: 'Sadia Rahman',
    studio: 'Cardio Deck',
    capacity: 14,
    baseBooked: 10,
    description: 'Efficient after-office conditioning combining battle ropes, bodyweight complexes, and core finishers.',
  },
  {
    id: 'wed-01',
    title: 'Full-Body Kettlebell Flow',
    day: 'Wednesday',
    startTime: '08:00 AM',
    durationMin: 50,
    category: 'Strength',
    intensity: 'Athletic',
    trainerId: 'farhana',
    trainerName: 'Farhana Akter',
    studio: 'Strength Sanctuary',
    capacity: 12,
    baseBooked: 6,
    description: 'Dynamic kettlebell swings, goblet squats, and carries for simultaneous strength and cardio conditioning.',
  },
  {
    id: 'wed-02',
    title: 'Candlelit Restorative Yoga',
    day: 'Wednesday',
    startTime: '07:00 PM',
    durationMin: 50,
    category: 'Yoga',
    intensity: 'Gentle',
    trainerId: 'nusrat',
    trainerName: 'Nusrat Jahan',
    studio: 'Pilates Loft',
    capacity: 14,
    baseBooked: 11,
    description: 'Unwind mid-week stress with supported stretches, guided pranayama, and deep muscle release.',
  },
  {
    id: 'thu-01',
    title: 'Strength Circuit & Core',
    day: 'Thursday',
    startTime: '08:30 AM',
    durationMin: 50,
    category: 'Strength',
    intensity: 'Moderate',
    trainerId: 'farhana',
    trainerName: 'Farhana Akter',
    studio: 'Strength Sanctuary',
    capacity: 12,
    baseBooked: 8,
    description: 'Balanced full-body resistance circuit to wrap up the Dhaka workweek feeling energized and strong.',
  },
  {
    id: 'thu-02',
    title: 'Weekend Kickoff Zumba',
    day: 'Thursday',
    startTime: '06:00 PM',
    durationMin: 55,
    category: 'Zumba',
    intensity: 'Athletic',
    trainerId: 'sadia',
    trainerName: 'Sadia Rahman',
    studio: 'Cardio Deck',
    capacity: 18,
    baseBooked: 15,
    description: 'Our signature Thursday celebration—high-energy choreography and supportive community vibes.',
  },
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'essential',
    name: 'Essential Sanctuary',
    subtitle: 'Full floor access for independent training in complete privacy.',
    monthlyRate: 3000,
    admissionFee: 2000,
    features: [
      'Unlimited access to Strength Sanctuary & Cardio Deck',
      'Biometric female-only entry (Sat–Fri full operating hours)',
      '1 complimentary onboarding orientation with a female coach',
      'Private changing cubicles, lockers, shower & prayer suite',
    ],
  },
  {
    id: 'complete',
    name: 'Complete Studio',
    subtitle: 'Floor access plus unlimited group classes including Zumba, HIIT & Yoga.',
    monthlyRate: 4500,
    admissionFee: 2000,
    features: [
      'Everything in Essential Sanctuary',
      'Unlimited weekly Strength, HIIT, Yoga & Zumba group classes',
      '2 Reformer Pilates loft sessions every month',
      'Quarterly InBody 570 body-composition assessment',
    ],
  },
  {
    id: 'vip',
    name: 'VIP Transformation',
    subtitle: 'Dedicated coaching, unlimited Reformer Pilates, and clinical Bengali nutrition.',
    monthlyRate: 8500,
    admissionFee: 0,
    featured: true,
    highlightNote: 'Most Popular · Admission Fee Waived',
    features: [
      'Everything in Complete Studio + Unlimited Reformer Pilates',
      '4 private 1-on-1 personal training sessions every month',
      'Bi-weekly nutrition review & custom home-meal plan with Dr. Tahmina',
      'Monthly InBody 570 scan, priority class booking & 14-day travel freeze',
    ],
  },
];

export const MEMBERSHIP_ADDONS: MembershipAddOn[] = [
  {
    id: 'pt-pack',
    name: 'Personal Training 8-Pack',
    monthlyCost: 4800,
    description: 'Eight 50-minute private sessions with your assigned female coach.',
  },
  {
    id: 'bengali-diet',
    name: 'Custom Bengali Diet Plan',
    monthlyCost: 1500,
    description: 'PCOS, postpartum, or fat-loss meal planning tailored to your kitchen.',
  },
  {
    id: 'inbody-monthly',
    name: 'Monthly InBody 570 Tracking',
    monthlyCost: 600,
    description: 'Segmental muscle, visceral fat, and metabolic rate printout each month.',
  },
];

export const TESTIMONIALS: MemberTestimonial[] = [
  {
    id: 't1',
    name: 'Nadia Sultana',
    neighborhood: 'Mirpur-2, Block B',
    role: 'Bank Officer & Mother of One',
    language: 'bn',
    quote:
      'মিরপুর-২ এ মেয়েদের জন্য এত সুন্দর, পরিষ্কার আর পুরোপুরি প্রাইভেট জিম পাব ভাবিনি। ফরহানা আপুর গাইডেন্সে এবং তাহমিনা আপুর ঘরোয়া ডায়েট চার্ট মেনে ৪ মাসে ৮.৫ কেজি ওজন কমিয়েছি—কোনো স্ট্রেস ছাড়াই।',
    englishMetric: '-8.5 kg fat loss in 4 months · Postpartum strength restored',
    program: 'VIP Transformation',
    duration: 'Member for 7 months',
  },
  {
    id: 't2',
    name: 'Tasnim Haque',
    neighborhood: 'Mirpur-1, Sony Square',
    role: 'Architect',
    language: 'en',
    quote:
      'I avoided mixed gyms in Dhaka for years because I never felt comfortable lifting weights in public. At Slim Fit Gym, every coach, receptionist, and member is a woman. The frosted daylight studio feels like a calm sanctuary after a chaotic commute.',
    englishMetric: 'Back pain eliminated · 35 kg deadlift achieved in 10 weeks',
    program: 'Complete Studio',
    duration: 'Member for 11 months',
  },
  {
    id: 't3',
    name: 'Maliha Rahman',
    neighborhood: 'Pallabi, Mirpur',
    role: 'Medical Student',
    language: 'bn',
    quote:
      'পিসিওএস-এর কারণে অনেক দিন ধরে ক্লান্ত লাগতো আর ওজন বাড়ছিল। নুসরাত আপুর রিফর্মার পিলাটিস আর সাদিয়া আপুর সন্ধ্যার জুম্বা ক্লাস আমার এনার্জি পুরো বদলে দিয়েছে। নামাজের জায়গা আর পরিচ্ছন্ন ওয়াশরুম থাকায় নিশ্চিন্তে সময় দিতে পারি।',
    englishMetric: 'PCOS cycle stabilized · +40% stamina in 12 weeks',
    program: 'Complete Studio',
    duration: 'Member for 6 months',
  },
  {
    id: 't4',
    name: 'Sabrina Karim',
    neighborhood: 'Kazipara, Mirpur',
    role: 'University Lecturer',
    language: 'en',
    quote:
      'Dr. Tahmina never asked me to give up rice or cook separate meals from my family. Pairing realistic portion guidance with three morning strength sessions a week gave me sustainable results I have kept off for a year.',
    englishMetric: '-11.2 kg sustained over 12 months · +2.1 kg lean muscle',
    program: 'VIP Transformation',
    duration: 'Member for 14 months',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Is Slim Fit Gym truly 100% female-only, including staff and reception?',
    answer:
      'Yes—strictly 100%. Every trainer, nutritionist, front-desk host, and housekeeping team member inside our Mirpur-2 sanctuary is female. Access is controlled via biometric turnstiles at the entrance, and all exterior windows feature architectural frosted privacy glazing.',
  },
  {
    id: 'faq-2',
    question: 'What can I wear while working out? Are hijabs and modest attire welcome?',
    answer:
      'You are welcome to wear whatever feels most comfortable and empowering—from modest long-sleeve activewear and athletic hijabs to standard gym attire. Because no men or cameras are permitted on the studio floor, members train with complete peace of mind.',
  },
  {
    id: 'faq-3',
    question: 'I have never lifted weights before. Will a trainer guide me?',
    answer:
      'Absolutely. Most of our Mirpur-2 members start as complete beginners. Every membership includes a complimentary 1-on-1 onboarding session with a female coach, plus floor coaches are always available to check posture and demonstrate equipment.',
  },
  {
    id: 'faq-4',
    question: 'Can I pause my membership during Eid holidays or family travel?',
    answer:
      'Yes. Quarterly and 6-month plans include up to 10 freeze days, and Annual or VIP Transformation memberships include 14 freeze days per cycle at no extra charge—just inform our Mirpur-2 reception desk 48 hours in advance.',
  },
  {
    id: 'faq-5',
    question: 'How does the Free 1-Day Trial Pass work?',
    answer:
      'Book your preferred morning, midday, or evening slot online. When you arrive at our Mirpur-2 studio, a female host will give you a private tour, a complimentary body-composition check, and full access to either the studio floor or a guided class.',
  },
];

export const BRANCH_INFO = {
  branchName: 'Mirpur-2 Sanctuary',
  addressLine1: 'House 14, Road 2, Block B, Section 2',
  addressLine2: 'Mirpur, Dhaka-1216 (2 mins from Mirpur Stadium Gate 2)',
  phone: '+880 1711-004829',
  whatsapp: '+880 1711-004829',
  email: 'hello@slimfitgymdhaka.com',
  hoursWeekdays: 'Sat – Thu: 6:30 AM – 9:30 PM',
  hoursFriday: 'Friday: 8:00 AM – 12:00 PM & 3:00 PM – 8:00 PM',
} as const;
