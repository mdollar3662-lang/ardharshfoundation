import React from 'react';
import {
  BookOpen,
  HeartHandshake,
  Info,
  MapPin,
  Sparkles,
  UserPlus,
  Users,
} from 'lucide-react';
import { ImpactStats } from '../types';

interface ImpactSectionProps {
  stats: ImpactStats;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ stats }) => {
  const cards = [
    {
      label: 'Villages Reached',
      value: stats.villagesReached,
      suffix: '+',
      desc: 'Remote forest hamlets and rural settlements covered',
      icon: MapPin,
      accent: 'text-[#A63D32]',
    },
    {
      label: 'People Supported',
      value: stats.peopleSupported,
      suffix: '+',
      desc: 'Community members receiving direct program benefits',
      icon: Users,
      accent: 'text-[#70452B]',
    },
    {
      label: 'Children Reached',
      value: stats.childrenReached,
      suffix: '+',
      desc: 'Enrolled in study circles and bridge learning programs',
      icon: BookOpen,
      accent: 'text-[#244B35]',
    },
    {
      label: 'Awareness Camps',
      value: stats.awarenessPrograms,
      suffix: '+',
      desc: 'Preventive health, nutrition, and legal rights drives',
      icon: HeartHandshake,
      accent: 'text-[#A63D32]',
    },
    {
      label: 'Women Empowered',
      value: stats.womenEmpowered,
      suffix: '+',
      desc: 'Active SHG leaders, Sohrai artisans, and cultivators',
      icon: Sparkles,
      accent: 'text-[#70452B]',
    },
    {
      label: 'Active Volunteers',
      value: stats.volunteers,
      suffix: '+',
      desc: 'Grassroots social workers and tribal youth fellows',
      icon: UserPlus,
      accent: 'text-[#244B35]',
    },
  ];

  return (
    <section id="impact" className="py-20 bg-[#F7F1E5] text-[#231F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest uppercase text-[#A63D32]">
              Measured Field Transformation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#70452B] font-display mt-2">
              Our Work & Impact
            </h2>
            <div className="w-20 h-1 bg-[#A63D32] mt-4 mb-4" />
            <p className="text-base sm:text-lg text-stone-700">
              Every statistic represents real families empowered with clean water, early literacy,
              preventive diagnostics, and sustainable forest livelihoods.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F7F1E5] border border-[#70452B]/15 flex items-center justify-center shrink-0">
                  <Icon className={`w-6 h-6 ${card.accent}`} />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#231F1C] tabular-nums font-display">
                    {card.value.toLocaleString()}
                    <span className="text-[#A63D32]">{card.suffix}</span>
                  </div>
                  <div className="text-sm font-bold text-[#70452B] mt-1">{card.label}</div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5-State Geographic Presence Banner */}
        <div className="bg-[#244B35] text-white rounded-2xl p-6 sm:p-8 border border-[#D9A441]/30 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D9A441]">
                Geographic Presence
              </span>
              <h3 className="text-2xl font-bold font-display mt-1">Active Across 5 States</h3>
              <p className="text-xs text-stone-200 mt-2 leading-relaxed">
                Operating through 1 Head Office in Bhubaneswar and 11 Regional Centers across key
                tribal corridors in eastern and central India.
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                <div className="text-base font-bold text-[#D9A441] font-display">Jharkhand</div>
                <div className="text-[11px] text-stone-300">East & West Singhbhum</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                <div className="text-base font-bold text-[#D9A441] font-display">Odisha</div>
                <div className="text-[11px] text-stone-300">Ganjam, Angul, Balangir</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                <div className="text-base font-bold text-[#D9A441] font-display">Andhra Pradesh</div>
                <div className="text-[11px] text-stone-300">Vizianagaram, Srikakulam</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                <div className="text-base font-bold text-[#D9A441] font-display">Maharashtra</div>
                <div className="text-[11px] text-stone-300">Jamkhed, Ahmednagar</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                <div className="text-base font-bold text-[#D9A441] font-display">Telangana</div>
                <div className="text-[11px] text-stone-300">Siddipet District</div>
              </div>
              <a
                href="#get-involved"
                className="bg-[#A63D32] hover:bg-[#8d2c22] p-3 rounded-lg border border-[#D9A441]/40 flex flex-col justify-center transition-colors"
              >
                <div className="text-xs font-bold text-white uppercase tracking-wider">Join Us</div>
                <div className="text-[10px] text-stone-200">Expand Outreach</div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-2.5 text-xs text-stone-500 bg-white/60 p-3 rounded-lg border border-stone-200">
          <Info className="w-4 h-4 text-[#70452B] shrink-0 mt-0.5" />
          <span>
            <strong>Transparency Notice:</strong> All metrics displayed above reflect verifiable
            ground activities recorded across village registers. Foundation directors periodically
            audit and update these figures through our field reporting console (Last verified:{' '}
            {stats.lastUpdated}).
          </span>
        </div>
      </div>
    </section>
  );
};
