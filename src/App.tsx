import { useEffect, useRef, useState } from 'react';
import { DAILY_BATCHES, PACKAGE_OPTIONS } from './data/originalGymData';
import { BmiCalculator } from './components/BmiCalculator';
import { Header } from './components/Header';
import { HeroAndAbout } from './components/HeroAndAbout';
import { PricingAndGallery } from './components/PricingAndGallery';
import { ProgrammesAndSchedule } from './components/ProgrammesAndSchedule';
import { ReviewsAndContact } from './components/ReviewsAndContact';

const SECTION_IDS = [
  'hero',
  'about',
  'programmes',
  'schedule',
  'bmi',
  'pricing',
  'gallery',
  'reviews',
  'contact',
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem('slimfit-theme') === 'dark';
    } catch {
      return false;
    }
  });
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedPackage, setSelectedPackage] = useState<string>(PACKAGE_OPTIONS[2].selectValue);
  const [selectedBatch, setSelectedBatch] = useState<string>(DAILY_BATCHES[0].selectValue);
  const [inquiryMessage, setInquiryMessage] = useState<string>('');
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    try {
      window.localStorage.setItem('slimfit-theme', isDarkMode ? 'dark' : 'light');
    } catch {
      // ignore storage errors in restricted iframes
    }
  }, [isDarkMode]);

  useEffect(() => {
    const onScroll = () => {
      let current = 'hero';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id === 'gallery' ? 'pricing' : id === 'bmi' ? 'schedule' : id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToContactAndFocus = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 500);
  };

  const handleSelectPackage = (pkgValue: string) => {
    setSelectedPackage(pkgValue);
    scrollToContactAndFocus();
  };

  const handleSelectBatch = (batchValue: string) => {
    setSelectedBatch(batchValue);
    scrollToContactAndFocus();
  };

  const handleApplyBmiRecommendation = (packageValue: string, prefillMessage: string) => {
    setSelectedPackage(packageValue);
    setInquiryMessage(prefillMessage);
    scrollToContactAndFocus();
  };

  return (
    <div className="min-h-screen w-full bg-surface text-on-surface transition-colors duration-200">
      <Header
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
      />
      <main className="w-full bg-surface">
        <div className="flex w-full flex-col">
          <HeroAndAbout />
          <ProgrammesAndSchedule
            selectedBatch={selectedBatch}
            onSelectBatch={handleSelectBatch}
          />
          <BmiCalculator onApplyRecommendation={handleApplyBmiRecommendation} />
          <PricingAndGallery onSelectPackage={handleSelectPackage} />
          <ReviewsAndContact
            selectedPackage={selectedPackage}
            selectedBatch={selectedBatch}
            message={inquiryMessage}
            onChangePackage={setSelectedPackage}
            onChangeBatch={setSelectedBatch}
            onChangeMessage={setInquiryMessage}
            nameInputRef={nameInputRef}
          />
        </div>
      </main>
    </div>
  );
}
