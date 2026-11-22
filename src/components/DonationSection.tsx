import React from 'react';
import { Heart, ShieldCheck, Users } from 'lucide-react';

interface DonationSectionProps {
  onOpenDonateModal: (cause?: string, amount?: number) => void;
}

const CAUSES = [
  {
    id: 'Support Rural Education',
    title: 'Support Rural Education',
    amount: 1000,
    impact:
      'Provides vernacular primers, slates, and library kits for 4 children in a forest learning circle.',
    tag: 'Education',
  },
  {
    id: 'Support Tribal Development',
    title: 'Support Tribal Development',
    amount: 2500,
    impact:
      'Sponsors natural earth pigments and village art symposiums preserving Sohrai & Khovar heritage.',
    tag: 'Culture',
  },
  {
    id: 'Support Healthcare Awareness',
    title: 'Support Healthcare Awareness',
    amount: 1500,
    impact:
      'Funds basic diagnostic supplies, hemoglobin tests, and first-aid kits for a forest hamlet health camp.',
    tag: 'Healthcare',
  },
  {
    id: 'Support Women Empowerment',
    title: 'Support Women Empowerment',
    amount: 5000,
    impact:
      'Equips 1 Self-Help Group (SHG) with organic lac cultivation or apiculture startup materials.',
    tag: 'Livelihood',
  },
  {
    id: 'Support Child Welfare',
    title: 'Support Child Welfare',
    amount: 1200,
    impact:
      'Provides supplementary ragi millet nutrition packages for 5 toddlers at a remote anganwadi.',
    tag: 'Child Nutrition',
  },
];

export const DonationSection: React.FC<DonationSectionProps> = ({ onOpenDonateModal }) => {
  return (
    <section id="donate" className="py-20 bg-[#F7F1E5] text-[#231F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#A63D32]">
            Stand With Rural Families
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#70452B] font-display mt-2">
            Support A Cause
          </h2>
          <div className="w-16 h-1 bg-[#A63D32] mx-auto mt-4 mb-4" />
          <p className="text-base sm:text-lg text-stone-700">
            Your voluntary generosity fuels bilingual village study circles, preventive medical
            units, and dignified tribal livelihoods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {CAUSES.map((cause) => (
            <div
              key={cause.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/90 hover:border-[#A63D32] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#70452B]">
                    {cause.tag}
                  </span>
                  <Heart className="w-4 h-4 text-[#A63D32] group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-[#70452B] font-display group-hover:text-[#A63D32] transition-colors">
                  {cause.title}
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">{cause.impact}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-semibold">
                    Suggested Gift
                  </span>
                  <span className="text-lg font-bold text-[#231F1C] tabular-nums font-display">
                    ₹{cause.amount.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenDonateModal(cause.title, cause.amount)}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#A63D32] hover:bg-[#8e2e24] rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>Contribute</span>
                </button>
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-br from-[#70452B] to-[#512f1b] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D9A441]">
                  Grassroots Priority
                </span>
                <Heart className="w-4 h-4 text-[#D9A441]" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Where Most Needed</h3>
              <p className="text-xs text-stone-200 mt-2 leading-relaxed">
                Empower our directors to deploy emergency resources towards remote monsoon health
                camps, bridge schools, and disaster relief.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-300 block uppercase font-semibold">
                  Flexible Choice
                </span>
                <span className="text-sm font-semibold text-[#D9A441]">Any Custom Amount</span>
              </div>
              <button
                type="button"
                onClick={() => onOpenDonateModal('General Rural Development')}
                className="px-4 py-2 text-xs font-bold text-[#70452B] bg-[#D9A441] hover:bg-[#c99534] rounded-lg transition-colors shadow-xs"
              >
                Custom Gift
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl border border-stone-200 text-xs text-stone-600 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#70452B] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong>Transparency & Legal Notice:</strong>
            <p>
              ARDASH FOUNDATION is committed to 100% ethical accounting. Contributions directly
              support field programs, learning materials, and medical supplies in tribal hamlets. In
              compliance with statutory guidelines, tax-exemption receipts (Section 80G) are issued
              only upon formal government approval; current acknowledgements serve as verified
              contribution vouchers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
