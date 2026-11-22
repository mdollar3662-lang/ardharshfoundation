import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Coins,
  Heart,
  Sparkles,
  Trees,
  Users,
  X,
} from 'lucide-react';
import { ASSETS } from '../data/initialData';
import { ProgramItem } from '../types';

interface ProgramsSectionProps {
  programs: ProgramItem[];
  onDonateToProgram: (programTitle: string) => void;
}

const CATEGORIES = [
  'All',
  'Women Empowerment',
  'Livelihood',
  'Environment',
  'Education',
  'Healthcare',
  'Tribal Culture',
];

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  programs,
  onDonateToProgram,
}) => {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredPrograms =
    activeCategory === 'All'
      ? programs
      : programs.filter((p) => {
          const catLower = p.category.toLowerCase();
          const titleLower = p.title.toLowerCase();
          const target = activeCategory.toLowerCase();
          return catLower === target || titleLower.includes(target.split(' ')[0]);
        });

  return (
    <section id="programs" className="py-20 bg-[#F7F1E5] text-[#231F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#A63D32]">
            Holistic Grassroots Action
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#70452B] font-display mt-2">
            Our Core Programs
          </h2>
          <div className="w-16 h-1 bg-[#A63D32] mx-auto mt-4 mb-4" />
          <p className="text-base sm:text-lg text-stone-700">
            Targeted community initiatives uplifting rural families through self-help collectives,
            forest livelihoods, ecological restoration, and tribal dignity.
          </p>
        </div>

        {/* 3 Featured Focus Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setActiveCategory('Women Empowerment')}
            onKeyDown={(e) => e.key === 'Enter' && setActiveCategory('Women Empowerment')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              activeCategory === 'Women Empowerment'
                ? 'bg-white border-[#A63D32] ring-2 ring-[#A63D32]/20 shadow-md'
                : 'bg-white/80 border-stone-200 hover:border-[#A63D32] hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#A63D32] text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#A63D32]">
                  Featured Focus
                </span>
                <h3 className="text-base font-bold text-[#70452B] font-display">
                  Women Empowerment
                </h3>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              210+ Self-Help Groups (SHGs), micro-savings, Sohrai & Khovar artisan collectives, and
              village leadership.
            </p>
            <div className="mt-3 text-[11px] font-bold text-[#A63D32] flex items-center gap-1">
              <span>View Women Initiatives</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setActiveCategory('Livelihood')}
            onKeyDown={(e) => e.key === 'Enter' && setActiveCategory('Livelihood')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              activeCategory === 'Livelihood'
                ? 'bg-white border-[#D9A441] ring-2 ring-[#D9A441]/30 shadow-md'
                : 'bg-white/80 border-stone-200 hover:border-[#D9A441] hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#D9A441] text-[#244B35] flex items-center justify-center shadow-xs">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#70452B]">
                  Featured Focus
                </span>
                <h3 className="text-base font-bold text-[#70452B] font-display">
                  Sustainable Livelihood
                </h3>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Minor forest produce value addition: wild organic honey, lac harvesting, vocational
              craft hubs, and fair market linkage.
            </p>
            <div className="mt-3 text-[11px] font-bold text-[#70452B] flex items-center gap-1">
              <span>View Livelihood Programs</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setActiveCategory('Environment')}
            onKeyDown={(e) => e.key === 'Enter' && setActiveCategory('Environment')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              activeCategory === 'Environment'
                ? 'bg-white border-[#244B35] ring-2 ring-[#244B35]/20 shadow-md'
                : 'bg-white/80 border-stone-200 hover:border-[#244B35] hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#244B35] text-white flex items-center justify-center shadow-xs">
                <Trees className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#244B35]">
                  Featured Focus
                </span>
                <h3 className="text-base font-bold text-[#70452B] font-display">
                  Environment Protection
                </h3>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              75,000+ native Sal, Mahua and Neem trees planted, Jaher Than sacred grove revival, and
              rainwater conservation trenches.
            </p>
            <div className="mt-3 text-[11px] font-bold text-[#244B35] flex items-center gap-1">
              <span>View Ecological Actions</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#70452B] text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-200/70 border border-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-[#A63D32]/40 shadow-xs hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-stone-200">
                <img
                  src={program.imageUrl || ASSETS.mudHamlet}
                  alt={program.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = ASSETS.mudHamlet;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="font-semibold text-[#D9A441]">{program.category}</span>
                  <span className="font-medium tabular-nums flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{program.beneficiariesCount}</span>
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#70452B] group-hover:text-[#A63D32] transition-colors font-display">
                    {program.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2 italic font-serif">
                    {program.tagline}
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-stone-700">
                    {program.bulletPoints.slice(0, 3).map((bp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#244B35] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProgram(program)}
                    className="text-xs font-bold text-[#70452B] hover:text-[#A63D32] flex items-center gap-1 transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDonateToProgram(program.title)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#A63D32] hover:bg-[#8d2c22] rounded-md transition-colors shadow-xs"
                  >
                    <Heart className="w-3 h-3 fill-white" />
                    <span>Support</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#F7F1E5] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#70452B]/30 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedProgram(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black flex items-center justify-center transition-colors"
              aria-label="Close program modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative h-64 overflow-hidden bg-stone-900">
              <img
                src={selectedProgram.imageUrl || ASSETS.mudHamlet}
                alt={selectedProgram.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#D9A441]">
                  {selectedProgram.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display mt-1">
                  {selectedProgram.title}
                </h3>
                <p className="text-sm text-stone-200 italic font-serif mt-1">
                  {selectedProgram.tagline}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#70452B] font-display">
                  Overview & Field Approach
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed mt-2">
                  {selectedProgram.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#70452B] font-display">
                  Key Action Pillars
                </h4>
                <ul className="mt-3 space-y-2.5 text-sm text-stone-700">
                  {selectedProgram.bulletPoints.map((bp, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#A63D32] shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider">Field Impact</div>
                  <div className="text-sm font-bold text-[#244B35] font-display mt-0.5">
                    {selectedProgram.impactHighlight}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-stone-500 uppercase tracking-wider">Beneficiaries</div>
                  <div className="text-sm font-bold text-[#A63D32] tabular-nums mt-0.5">
                    {selectedProgram.beneficiariesCount}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-300">
                <button
                  type="button"
                  onClick={() => setSelectedProgram(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedProgram.title;
                    setSelectedProgram(null);
                    onDonateToProgram(title);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#A63D32] hover:bg-[#8d2c22] rounded-lg shadow-sm transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 fill-[#D9A441] text-[#D9A441]" />
                  <span>Support {selectedProgram.title}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
