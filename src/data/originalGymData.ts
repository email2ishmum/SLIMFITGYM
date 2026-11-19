export interface ProgrammeItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface BatchSlot {
  code: string;
  timeRange: string;
  title: string;
  selectValue: string;
}

export interface PackageOption {
  id: string;
  optionLabel: string;
  name: string;
  subtitle: string;
  price: string;
  unit: string;
  badgeText: string;
  badgeVariant: 'neutral' | 'blush' | 'dark';
  featured?: boolean;
  selectValue: string;
  features: string[];
}

export interface GalleryPhoto {
  id: string;
  category: string;
  title: string;
  src: string;
  fallbackSrc: string;
}

export interface MemberReview {
  id: string;
  initials: string;
  name: string;
  subtitle: string;
  quote: string;
  isBengali?: boolean;
  avatarVariant: 'light' | 'rose';
}

export const ORIGINAL_IMAGES = {
  logo: '/assets/aistudio/logo_dbbd2aed.jpg',
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH4gTTqKu12Su_RV2YUY7S4KrU_x8YDgXtqah3ALaZFB65TY799HByHmXxqAa19vd4z5DbWkhKPvvHN0Vx0LAiJn7h05Zn4edvB9uz273ghLyC7gkkVi9lPKRIbmG4JpG5Ascg-VpsdUJXYqPdt0m1mA6XMWmrOaPw_Pd321uZMW6LRZfYutB0pIdeCG4iAmOsil_Bj_dzwKr1WcRQY7sCx_FQ-W8F-eF8jxvPvjE',
  aboutCardio: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6NS0s-gMy3TZ0XaIL40SlkIYUKhr6UmIi-luNijfFHfl55QF3tZg6yHafYhEtkO9jvti6gyMbUFlD5UDgod206rylDoqEkC8OSV6YqZpxcyLSUuApkGZ70ki_qt4ljINl9QIs-cuyyBUa4u19QcQFGw70xfvcJMmjPrlIXgixiVEZRcFPwgLANqAgAQu_8maPlEUYun6RkTqnR1a8Qpv3M8AT6eZcnHY4SP_z3dU',
  aboutYoga: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBu02lCan6O7uxcQTFob7SpZdFtk5bObWgTPfnJEYf_oZamcHlmdV9CBTyxfCoqgVw0oWeqezjEnF3_Frp7ivZVuUBC_jNV9niGoVytbNYfmvOlwZ_EgSCfAbXgADBDZBQvtEWg1p0wV5yRAy8DUnqoA24-Cb-Eg-VO5M1I8qHlFyt9Xso0YCFHcCxK8cs-5oapguiUOVI2DZxMxQuvr-8Q_yo9Kx_Lu-MhtIHOoCY',
  fallbackStudio: '/src/assets/images/hero_sanctuary_studio_1795082023797.jpg',
  fallbackPilates: '/src/assets/images/zone_pilates_studio_1795082040504.jpg',
} as const;

export const STUDIO_CONTACT = {
  brand: 'SLIM FIT GYM',
  tagline: 'ONLY FOR LADIES',
  addressFull: 'House No. 4, Road No. 12, Block G1, Mirpur-2, Dhaka, Bangladesh, 1216',
  addressShort: 'House No. 4, Road No. 12, Block G1, Mirpur-2, Dhaka, 1216',
  mapLabel: 'Block G1, Road 12, Mirpur-2, Dhaka',
  phoneDisplay: '+880 1775-070398',
  phoneHref: 'tel:+8801775070398',
  whatsappNumber: '8801775070398',
  email: 'slimfitgym.bd@gmail.com',
  hoursMain: 'Saturday – Thursday: 7:30 AM – 10:00 PM',
  hoursOff: 'Friday: Weekly Off',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Road%2012%2C%20Block%20G%2C%20Mirpur%202%2C%20Dhaka%201216&t=&z=16&ie=UTF8&iwloc=&output=embed',
  mapOpenUrl: 'https://maps.google.com/?q=Road+12,+Block+G1,+Mirpur-2,+Dhaka+1216',
} as const;

export const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'programmes', label: 'Programmes' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
] as const;

export const CORE_PHILOSOPHY = [
  { icon: 'favorite', label: 'Be Fit Not Skinny' },
  { icon: 'verified', label: 'Health Is Wealth' },
  { icon: 'fitness_center', label: 'Strong Women' },
  { icon: 'groups', label: 'Support Each Other' },
] as const;

export const ABOUT_HIGHLIGHTS = [
  {
    icon: 'lock',
    title: '100% Ladies-Only Environment',
    description:
      'Complete seclusion, curtained private entryway, zero male access or staff, enabling complete freedom of movement and attire.',
  },
  {
    icon: 'exercise',
    title: 'Modern Fitness Machinery',
    description:
      'Calibrated cardio treadmills, cross-trainers, steppers, and targeted biomechanical resistance machines designed for women.',
  },
  {
    icon: 'nutrition',
    title: 'Individual Supervision & Diet Plans',
    description:
      'Expert female mentors providing culturally attuned Bangladeshi meal charts, posture corrections, and continuous motivation.',
  },
] as const;

export const PROGRAMMES: ProgrammeItem[] = [
  {
    id: 'zumba',
    icon: 'music_note',
    title: 'Zumba',
    description: 'High-energy Latin and world dance fitness to burn calories while having fun.',
  },
  {
    id: 'aerobic',
    icon: 'directions_run',
    title: 'Aerobic',
    description: 'Rhythmic cardiovascular workouts designed to boost endurance and stamina.',
  },
  {
    id: 'yoga',
    icon: 'self_improvement',
    title: 'Yoga',
    description: 'Restorative flexibility, core mindfulness, and spine care in a peaceful studio.',
  },
  {
    id: 'weightlifting',
    icon: 'fitness_center',
    title: 'Weightlifting',
    description: 'Safe, guided resistance training for lean muscle toning and bone density.',
  },
  {
    id: 'stepper',
    icon: 'stairs',
    title: 'Stepper Class',
    description: 'Targeted lower body conditioning, calf toning, and cardio power.',
  },
  {
    id: 'free-hand',
    icon: 'sports_gymnastics',
    title: 'Free Hand Class',
    description: 'Dynamic functional bodyweight exercises to enhance agility and stamina.',
  },
  {
    id: 'fat-loss',
    icon: 'local_fire_department',
    title: 'Fat Loss Programme',
    description: 'Calibrated metabolic conditioning and caloric burn to shed stubborn fat safely.',
  },
  {
    id: 'body-tone',
    icon: 'accessibility_new',
    title: 'Body Tone Programme',
    description: 'Sculpting and defining arms, core, and glutes with progressive resistance.',
  },
  {
    id: 'diet-plan',
    icon: 'restaurant_menu',
    title: 'Customized Diet Plan',
    description: 'Culturally attuned Bangladeshi meal planning tailored to your metabolic goals.',
  },
];

export const DAILY_BATCHES: BatchSlot[] = [
  {
    code: 'B1',
    timeRange: '9:00 AM – 10:00 AM',
    title: 'Morning Energy & Aerobics',
    selectValue: 'Morning (9:00 AM – 10:00 AM)',
  },
  {
    code: 'B2',
    timeRange: '12:00 PM – 1:00 PM',
    title: 'Mid-Day Cardio & Toning',
    selectValue: 'Mid-Day (12:00 PM – 1:00 PM)',
  },
  {
    code: 'B3',
    timeRange: '4:00 PM – 5:00 PM',
    title: 'Afternoon Free-Hand & Stepper',
    selectValue: 'Afternoon (4:00 PM – 5:00 PM)',
  },
  {
    code: 'B4',
    timeRange: '6:00 PM – 7:00 PM',
    title: 'Evening Zumba & Fat Loss',
    selectValue: 'Evening (6:00 PM – 7:00 PM)',
  },
  {
    code: 'B5',
    timeRange: '8:00 PM – 9:00 PM',
    title: 'Night Post-Work Sculpt & Yoga',
    selectValue: 'Night (8:00 PM – 9:00 PM)',
  },
];

export const PACKAGE_OPTIONS: PackageOption[] = [
  {
    id: 'regular',
    optionLabel: 'Plan Option 01',
    name: 'Regular Monthly',
    subtitle: 'Flexible month-to-month routine with complete equipment access.',
    price: '৳1,500',
    unit: '/ month',
    badgeText: '৳3,000 one-time Admission Fee',
    badgeVariant: 'neutral',
    selectValue: 'Regular Monthly (৳1,500)',
    features: [
      'Full gym floor access (7:30 AM – 10:00 PM)',
      'Cardio and strength machinery use',
      'General female trainer guidance',
      'Clean private locker facilities',
      'Routine orientation on first visit',
    ],
  },
  {
    id: 'one-month',
    optionLabel: 'Plan Option 02',
    name: '1-Month Package',
    subtitle: 'All-inclusive 1-month package for quick starters.',
    price: '৳2,000',
    unit: '/ month',
    badgeText: 'Zero Admission Fee Commitment',
    badgeVariant: 'blush',
    selectValue: '1-Month Package (৳2,000)',
    features: [
      'Zero admission fee commitment',
      'Full gym & machinery access',
      'Group aerobic & stepper classes included',
      'Initial fitness & BMI assessment',
      'Locker room access',
    ],
  },
  {
    id: 'two-month',
    optionLabel: 'Plan Option 03',
    name: '2-Month Package',
    subtitle: 'Save more with 2 full months of complete access and classes.',
    price: '৳3,000',
    unit: '/ 2 months',
    badgeText: 'Only ৳1,500/month Effective Rate',
    badgeVariant: 'dark',
    featured: true,
    selectValue: '2-Month Package (৳3,000 — Best Value)',
    features: [
      'Highest savings & no admission charge',
      'Unlimited gym & all group classes (Zumba, Yoga, Aerobics)',
      '1 complimentary customized diet plan',
      'Priority female trainer supervision',
      'Full locker, dressing, & shower amenities',
    ],
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'main-floor',
    category: 'Cardio & Machinery',
    title: 'Main Workout Floor',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxBH9K_qkRyNGsmL18wBB5zw1i6zyV0nStin-K8A01fPZKvhCBTyuDSUXvokRzX9KY4EKLM8z52t09OZZDNiFQOqE3Ya8jkazMVM0Fiwbz1TSIRGBXCDdoCiLzXnfRR3GO1I55qs5WThJqfOBzrlE3ZMQ_zfERxW4WolC9Ni9i7fvyHTX8VIz5tYkCJ5VgocN2MZFqe9ccqh6K3-fRIwX6mBv31qdgMHG8WbYp7zU',
    fallbackSrc: ORIGINAL_IMAGES.fallbackStudio,
  },
  {
    id: 'free-weights',
    category: 'Strength',
    title: 'Free Weights Zone',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOSlb6A1tzBPZShxGpc7A3xRHJGqHMwMsz99CzyFuOG5c9faIhMTXZi-DMAUPU7Y8gYgn7npkewspI7UzQwpSUynIXLa3TuvybeAh0OIAaL0-ZK_zzSPUd9_v2k68Olp-cgz8X2XWErABUW4Uvn-NQiyGHaTqBI5ZmAjnP_oMG4DuP0O1U8CxESm0l7FZoy1LfOxrAp7pChcGwGdQLIIQBuvMnN2EujO_TVUFmQ0k',
    fallbackSrc: ORIGINAL_IMAGES.fallbackStudio,
  },
  {
    id: 'aerobic-stepper',
    category: 'Group Fitness',
    title: 'Aerobic & Stepper Studio',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3e76tvUiG_r3MHVWKTCacVX-fCMFp0oQNtuCRxe_-TGN4MXEtaEKYeizvsrd9e2UGCqVm2qrd77448TZzBsFmE-UWsLjI-wcibnlZltxuqx-NtNFRly3EEiJ1xtRm27Qtm-EHUKm84Yj37D0G4skc5HXWDm6jSQyCiZorIan3-Qwlv1IUYtRK4jZgDJ2Vv4cj1VWEqBsCaXyBxKuHKeG5Vgm7LyIWGa0dV0TGzA4',
    fallbackSrc: ORIGINAL_IMAGES.fallbackPilates,
  },
  {
    id: 'zumba-space',
    category: 'Rhythm & Fun',
    title: 'Zumba & Dance Space',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-X8Ik1KA5i5biSW62F-Wsm088k9xo7WTjd5_kDJRvxb_r0-_uoRUscqM1nWNh79TjJ_UCXtjkUChyr1YsooNYadVHy9nk5R5gjx4r2JV9xhVi9FAjJ-cosnlM8wVjWZqeAMMkZeNmD-03qPz9Ibq6ZopCiu_VlCjx2Z5zg6fE5dX45b5J2LRI2skruO_qG8pu229-Y_RfHLrZ8yuBaU6jYpc6BdAM4Kr_DKaauUw',
    fallbackSrc: ORIGINAL_IMAGES.fallbackPilates,
  },
  {
    id: 'yoga-studio',
    category: 'Mindfulness',
    title: 'Yoga & Mobility Studio',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC234EQPSohIqjyR94yXgGfxXftza8oGDYD-hBTwMRfRCtRcpGf-ZIcRDQhUSmboZswTcbYPMSjwoBxIHf67te01Lx9wDbavy2B4B3i-m8Tu6qT6RQNtILGQ5Op0xhyMXJnxMHyOz2p8zejDi9XZCsiNSB301KIdR9wKiHE_VutBUVyHc8NHQU8lFdtx7ZehIU0k46uYDmdfcmA9WopMwPJNoDELwmkP7t_bk_CazA',
    fallbackSrc: ORIGINAL_IMAGES.fallbackPilates,
  },
  {
    id: 'locker-lounge',
    category: 'Amenities',
    title: 'Locker & Rest Lounge',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMajKskID9MKtCOL2Sdr0FW5koTvPK74Fu2qQOJHtdZj6nGWoXTOf3sfS8lsIzgJ-YR-CoN68-YRClYTwkLnbEh9GshjuzWZV-FbCjyT3rJEHryxbj6226rwKzxHjRGsdhM0H-kpAR0cDrJzj7VkRksSZb6IckJ-I8BO5R04kiS9URuZUthxZ3VI65ZQj5Aq5qHmjcwN6u3jmcc6Nhn6d2mik6IDlWJFtuX5HDRUk',
    fallbackSrc: ORIGINAL_IMAGES.fallbackStudio,
  },
];

export const MEMBER_REVIEWS: MemberReview[] = [
  {
    id: 'sabila',
    initials: 'SR',
    name: 'Sabila Rawshan',
    subtitle: 'Verified Member • Mirpur-2',
    isBengali: true,
    avatarVariant: 'light',
    quote:
      '“শরীর মনকে সুস্থ রাখার জন্য আমাদের প্রত্যেকের উচিৎ শরীর টাকে ফিট রাখা এবং জিম করা। শুধু স্লিম হওয়ার জন্য জিম নয়। সুস্থ থাকার জন্য আসলে জিম প্রয়োজন। ভালো একটা পরিবেশে জিম করতে হলে চলে আসুন Slim Fit Gym এ। এখানে উন্নত মানের মেশিনারি রয়েছে। চমৎকার পরিবেশ। এখানে প্রশিক্ষণ দেয়া হয়। প্রশিক্ষক আছেন কয়েকজন। যারা আমাদের সকল সমস্যার পাশে আছেন।”',
  },
  {
    id: 'shamima',
    initials: 'SH',
    name: 'Shamima Haque',
    subtitle: 'Verified Member • Mirpur',
    isBengali: false,
    avatarVariant: 'rose',
    quote:
      '“Whoever wants to get fit & healthy under a proper supervision through individual exercise & diet plan then in my experience & opinion, this is the most suitable place in Mirpur which is dedicated only for the girls/ladies.”',
  },
];
