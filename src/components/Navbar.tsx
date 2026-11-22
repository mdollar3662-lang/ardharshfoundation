import React, { useState } from 'react';
import { Heart, Mail, Menu, X } from 'lucide-react';
import { ASSETS } from '../data/initialData';

interface NavbarProps {
  onOpenDonate: () => void;
  onOpenVolunteer: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Mission', href: '#mission' },
  { label: 'Our Programs', href: '#programs' },
  { label: 'Our Work', href: '#impact' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Locations', href: '#locations' },
  { label: 'Get Involved', href: '#get-involved' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDonate,
  onOpenVolunteer,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="bg-[#244B35] text-[#F7F1E5] text-xs py-2 px-4 border-b border-[#D9A441]/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-medium tracking-wide">
              Adivasi Rural Development Awareness Society for Humanity
            </span>
            <span className="hidden sm:inline text-[#D9A441]">|</span>
            <span className="hidden sm:inline text-stone-200">
              Head Office: KIIT Campus, Bhubaneswar, Odisha
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-200">
            <a
              href="mailto:headoffice@ardashfoundation.org"
              className="flex items-center gap-1.5 hover:text-[#D9A441] transition-colors whitespace-nowrap shrink-0"
            >
              <Mail className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>info@ardashfoundation.org</span>
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-[#F7F1E5]/95 backdrop-blur-md border-b border-[#70452B]/15 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3 shrink-0 group">
            <img
              src={ASSETS.logo}
              alt="ARDASH FOUNDATION Official Logo"
              referrerPolicy="no-referrer"
              className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full border border-[#D9A441]/50 drop-shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#70452B] group-hover:text-[#A63D32] transition-colors leading-tight whitespace-nowrap">
                ARDASH FOUNDATION
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-[#244B35] tracking-wider uppercase whitespace-nowrap">
                Service • Empowerment • Sustainable Future
              </span>
            </div>
          </a>

          <nav className="hidden xl:flex items-center gap-4 text-[13px] font-semibold text-[#70452B]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#A63D32] transition-colors relative py-1 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#A63D32] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenVolunteer}
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-[#70452B] bg-[#F7F1E5] border border-[#70452B]/40 hover:bg-[#70452B] hover:text-white rounded-md transition-all shadow-xs whitespace-nowrap shrink-0"
            >
              Volunteer
            </button>
            <button
              type="button"
              onClick={onOpenDonate}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#A63D32] hover:bg-[#8d2c22] rounded-md transition-all shadow-sm whitespace-nowrap shrink-0"
            >
              <Heart className="w-3.5 h-3.5 fill-[#D9A441] text-[#D9A441]" />
              <span>Donate Now</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-md text-[#70452B] hover:bg-[#70452B]/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="xl:hidden bg-[#F7F1E5] border-t border-[#70452B]/15 px-4 py-4 shadow-lg">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-xs font-semibold text-[#70452B] hover:bg-white rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[#70452B]/15 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenVolunteer();
                }}
                className="flex-1 py-2 text-xs font-semibold text-[#70452B] border border-[#70452B]/40 rounded-md"
              >
                Volunteer
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenDonate();
                }}
                className="flex-1 py-2 text-xs font-bold text-white bg-[#A63D32] rounded-md"
              >
                Donate Now
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
