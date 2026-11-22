import React, { useCallback, useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { DonationModal } from './components/DonationModal';
import { DonationSection } from './components/DonationSection';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Hero } from './components/Hero';
import { ImpactSection } from './components/ImpactSection';
import { LocationsSection } from './components/LocationsSection';
import { MissionVisionSection } from './components/MissionVisionSection';
import { Navbar } from './components/Navbar';
import { ProgramsSection } from './components/ProgramsSection';
import { VolunteerSection } from './components/VolunteerSection';
import {
  INITIAL_GALLERY,
  INITIAL_LOCATIONS,
  INITIAL_PROGRAMS,
  INITIAL_STATS,
} from './data/initialData';
import { api } from './services/api';
import {
  GalleryItem,
  ImpactStats,
  LocationItem,
  ProgramItem,
} from './types';

export default function App() {
  const [stats, setStats] = useState<ImpactStats>(INITIAL_STATS);
  const [programs, setPrograms] = useState<ProgramItem[]>(INITIAL_PROGRAMS);
  const [locations, setLocations] = useState<LocationItem[]>(INITIAL_LOCATIONS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);

  const [donateOpen, setDonateOpen] = useState(false);
  const [donateCause, setDonateCause] = useState('Support Rural Education');
  const [donateAmount, setDonateAmount] = useState(1000);

  const refreshData = useCallback(async () => {
    try {
      const [sRes, pRes, lRes, gRes] = await Promise.allSettled([
        api.getStats(),
        api.getPrograms(),
        api.getLocations(),
        api.getGallery(),
      ]);

      if (sRes.status === 'fulfilled' && typeof sRes.value?.villagesReached === 'number') {
        setStats(sRes.value);
      }
      if (pRes.status === 'fulfilled' && Array.isArray(pRes.value) && pRes.value.length > 0) {
        setPrograms(pRes.value);
      }
      if (lRes.status === 'fulfilled' && Array.isArray(lRes.value) && lRes.value.length > 0) {
        setLocations(lRes.value);
      }
      if (gRes.status === 'fulfilled' && Array.isArray(gRes.value) && gRes.value.length > 0) {
        setGalleryItems(gRes.value);
      }
    } catch {
      // Fallback gracefully to initial seed state
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const openDonation = (cause?: string, amount?: number) => {
    if (cause) setDonateCause(cause);
    if (amount) setDonateAmount(amount);
    setDonateOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F1E5] text-[#231F1C]">
      <Navbar
        onOpenDonate={() => openDonation('General Rural Development')}
        onOpenVolunteer={() => scrollToSection('get-involved')}
      />

      <Hero
        stats={stats}
        onExploreMission={() => scrollToSection('mission')}
        onJoinMovement={() => scrollToSection('get-involved')}
        onDonate={() => openDonation('Support Rural Education')}
      />

      <main className="flex-1">
        <AboutSection />
        <MissionVisionSection />
        <ProgramsSection
          programs={programs}
          onDonateToProgram={(programTitle) => openDonation(programTitle)}
        />
        <ImpactSection stats={stats} />
        <GallerySection galleryItems={galleryItems} />
        <LocationsSection locations={locations} />
        <VolunteerSection onSuccessSubmit={refreshData} />
        <DonationSection onOpenDonateModal={openDonation} />
        <ContactSection />
      </main>

      <Footer
        onOpenDonate={() => openDonation('General Rural Development')}
        onOpenVolunteer={() => scrollToSection('get-involved')}
      />

      <DonationModal
        isOpen={donateOpen}
        onClose={() => setDonateOpen(false)}
        defaultCause={donateCause}
        defaultAmount={donateAmount}
        onSuccess={refreshData}
      />
    </div>
  );
}
