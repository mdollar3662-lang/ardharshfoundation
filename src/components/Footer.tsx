import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail, Twitter, X, Youtube } from 'lucide-react';
import { ASSETS } from '../data/initialData';

interface FooterProps {
  onOpenDonate: () => void;
  onOpenVolunteer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDonate,
  onOpenVolunteer,
}) => {
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <footer className="bg-[#231F1C] text-[#F7F1E5] pt-16 pb-12 border-t border-[#D9A441]/30 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 tribal-divider" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={ASSETS.logo}
                  alt="ARDASH FOUNDATION Logo"
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 object-cover rounded-full bg-white/10 p-0.5 border border-[#D9A441]/40"
                />
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-white leading-tight">
                    ARDASH FOUNDATION
                  </h3>
                  <p className="text-[11px] text-[#D9A441] tracking-wide font-medium">
                    Adivasi Rural Development Awareness Society for Humanity
                  </p>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed font-sans max-w-sm">
                Empowering tribal communities, transforming rural lives, and building an inclusive,
                educated, healthy, and sustainable future across Jharkhand, Odisha, and central
                India.
              </p>

              <div className="pt-2">
                <div className="text-sm italic font-serif text-[#D9A441]">
                  "Together for a Better Tomorrow"
                </div>
                <div className="text-[11px] text-stone-400 uppercase tracking-widest mt-1 font-semibold">
                  Service • Empowerment • Sustainable Future
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#home"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#A63D32] text-white flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#home"
                  aria-label="Twitter"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#A63D32] text-white flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#home"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#A63D32] text-white flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#home"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#A63D32] text-white flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="#home"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#A63D32] text-white flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#D9A441]">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs text-stone-300">
                <li>
                  <a href="#home" className="hover:text-[#D9A441] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#D9A441] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#mission" className="hover:text-[#D9A441] transition-colors">
                    Our Mission & Vision
                  </a>
                </li>
                <li>
                  <a href="#programs" className="hover:text-[#D9A441] transition-colors">
                    Our Programs
                  </a>
                </li>
                <li>
                  <a href="#impact" className="hover:text-[#D9A441] transition-colors">
                    Our Work & Impact
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-[#D9A441] transition-colors">
                    Photo & Video Gallery
                  </a>
                </li>
                <li>
                  <a href="#locations" className="hover:text-[#D9A441] transition-colors">
                    Our Locations
                  </a>
                </li>
                <li>
                  <a href="#get-involved" className="hover:text-[#D9A441] transition-colors">
                    Get Involved (Volunteer)
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#D9A441] transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#D9A441]">
                Head & Regional Offices
              </h4>
              <div className="space-y-3 text-xs text-stone-300">
                <div>
                  <strong className="text-white block font-medium">Head Office (Bhubaneswar):</strong>
                  <span>KIIT Campus, Patia, Bhubaneswar, Odisha – 751024</span>
                </div>
                <div>
                  <strong className="text-white block font-medium">Jharkhand Field Center:</strong>
                  <span>Mampita, Telco, Jamshedpur, East Singhbhum – 831004</span>
                </div>
                <div className="pt-2 flex flex-col gap-1.5 text-stone-200">
                  <a
                    href="mailto:headoffice@ardashfoundation.org"
                    className="flex items-center gap-2 hover:text-[#D9A441]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>headoffice@ardashfoundation.org</span>
                  </a>
                </div>
                <div className="pt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onOpenDonate}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#A63D32] hover:bg-[#8b2b22] rounded shadow-xs"
                  >
                    Support A Cause
                  </button>
                  <button
                    type="button"
                    onClick={onOpenVolunteer}
                    className="px-3.5 py-1.5 text-xs font-semibold text-stone-300 hover:text-white border border-white/20 hover:border-white/50 rounded"
                  >
                    Volunteer
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
            <div className="text-center sm:text-left">
              © {new Date().getFullYear()} ARDASH FOUNDATION. All Rights Reserved.
            </div>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setPolicyModal('privacy')}
                className="hover:text-stone-200 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setPolicyModal('terms')}
                className="hover:text-stone-200 transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {policyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white text-stone-800 rounded-2xl max-w-xl w-full p-6 relative max-h-[85vh] overflow-y-auto border border-stone-300 shadow-2xl">
            <button
              type="button"
              onClick={() => setPolicyModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-500"
              aria-label="Close policy dialog"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold font-display text-[#70452B] mb-4">
              {policyModal === 'privacy' ? 'Privacy Policy' : 'Terms & Ethical Framework'}
            </h3>
            <div className="text-xs text-stone-600 space-y-3 leading-relaxed">
              <p>
                <strong>
                  ARDASH FOUNDATION (Adivasi Rural Development Awareness Society for Humanity)
                </strong>{' '}
                is committed to preserving individual privacy, donor data integrity, and indigenous
                cultural protection.
              </p>
              <p>
                All personal information gathered via volunteer enrolment, contact enquiries, or
                donations is held strictly confidential and never shared or sold to third-party
                commercial marketing entities.
              </p>
              <p>
                Photographic and videographic documentation of tribal heritage and village
                activities is captured with the prior informed consent of village elders and
                community members, honoring traditional customary rights.
              </p>
              <p>
                Donation contributions directly support educational kits, diagnostic camp
                essentials, and rural community programs without unwarranted administrative overhead.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
              <button
                type="button"
                onClick={() => setPolicyModal(null)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#70452B] rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
