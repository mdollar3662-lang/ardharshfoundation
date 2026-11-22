import React from 'react';
import { Compass, Eye, Heart, ShieldCheck, Sprout, Users } from 'lucide-react';

export const MissionVisionSection: React.FC = () => {
  return (
    <section
      id="mission"
      className="py-20 bg-gradient-to-b from-[#244B35] to-[#1a3827] text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none sohrai-border-top" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#D9A441]">
            Guiding Philosophy & Purpose
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display mt-2">
            Our Mission & Vision
          </h2>
          <div className="w-16 h-1 bg-[#D9A441] mx-auto mt-4 mb-4" />
          <p className="text-stone-200 text-base sm:text-lg">
            Guiding every village campaign, health drive, and educational center with unyielding
            respect for tribal sovereignty and rural human dignity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#2a553c]/90 rounded-2xl p-8 lg:p-10 border border-[#D9A441]/30 shadow-xl relative overflow-hidden group hover:border-[#D9A441] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D9A441]/10 rounded-bl-full pointer-events-none" />
            <div className="w-14 h-14 rounded-xl bg-[#D9A441] text-[#244B35] flex items-center justify-center mb-6 shadow-md">
              <Compass className="w-7 h-7" />
            </div>
            <div className="text-xs uppercase tracking-widest text-[#D9A441] font-semibold mb-2">
              Action-Oriented Goal
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-stone-100 leading-relaxed font-serif italic mb-6">
              "To empower Adivasi and rural communities through education, awareness, healthcare
              initiatives, livelihood development and social participation."
            </p>
            <ul className="space-y-3 text-sm text-stone-200 pt-4 border-t border-white/10">
              <li className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                <span>Deliver vernacular bridge education to every remote child.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                <span>Provide proactive preventive healthcare at the village doorstep.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                <span>Foster economic sovereignty through sustainable minor forest produce.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#2a553c]/90 rounded-2xl p-8 lg:p-10 border border-[#D9A441]/30 shadow-xl relative overflow-hidden group hover:border-[#D9A441] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#A63D32]/20 rounded-bl-full pointer-events-none" />
            <div className="w-14 h-14 rounded-xl bg-[#A63D32] text-white flex items-center justify-center mb-6 shadow-md border border-[#D9A441]/40">
              <Eye className="w-7 h-7" />
            </div>
            <div className="text-xs uppercase tracking-widest text-[#D9A441] font-semibold mb-2">
              Enduring Aspiration
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mb-4">
              Our Vision
            </h3>
            <p className="text-lg text-stone-100 leading-relaxed font-serif italic mb-6">
              "To create an inclusive, educated, healthy and sustainable society where every
              individual has equal opportunities and dignity."
            </p>
            <ul className="space-y-3 text-sm text-stone-200 pt-4 border-t border-white/10">
              <li className="flex items-start gap-2.5">
                <Sprout className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                <span>A future where tribal children achieve dreams without losing cultural roots.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Sprout className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                <span>Zero infant and maternal mortality across rural and forest belts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Sprout className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                <span>Vibrant, self-reliant rural economies thriving in harmony with nature.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#1f422e] rounded-xl p-6 border border-[#D9A441]/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center p-3">
              <Heart className="w-8 h-8 text-[#D9A441] mb-2" />
              <h4 className="text-lg font-bold text-white font-display">Service</h4>
              <p className="text-xs text-stone-300 mt-1 max-w-xs">
                Selfless, grassroots solidarity rooted in empathy, respect, and direct community
                companionship.
              </p>
            </div>
            <div className="flex flex-col items-center p-3 border-y md:border-y-0 md:border-x border-white/10">
              <ShieldCheck className="w-8 h-8 text-[#D9A441] mb-2" />
              <h4 className="text-lg font-bold text-white font-display">Empowerment</h4>
              <p className="text-xs text-stone-300 mt-1 max-w-xs">
                Equipping Gram Sabhas, women, and youth with tools, rights knowledge, and economic
                independence.
              </p>
            </div>
            <div className="flex flex-col items-center p-3">
              <Sprout className="w-8 h-8 text-[#D9A441] mb-2" />
              <h4 className="text-lg font-bold text-white font-display">Sustainable Future</h4>
              <p className="text-xs text-stone-300 mt-1 max-w-xs">
                Protecting forests, traditional agriculture, sacred groves, and generational tribal
                harmony.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
