import React from 'react';
import { BookOpen, Handshake, HeartHandshake, Sprout, Users } from 'lucide-react';
import { ASSETS } from '../data/initialData';

const PILLARS = [
  {
    title: 'Grassroots Education',
    desc: 'Bilingual study circles, bridge schooling, and learning kits delivered directly to remote tribal hamlets.',
    icon: BookOpen,
  },
  {
    title: 'Preventive Healthcare',
    desc: 'Doorstep mobile health camps, maternal care guidance, anemia screening, and clean water awareness.',
    icon: HeartHandshake,
  },
  {
    title: 'Sustainable Livelihoods',
    desc: 'Minor Forest Produce (MFP) clustering, indigenous organic farming, apiculture, and lac processing to stem distress migration.',
    icon: Sprout,
  },
  {
    title: 'Community Participation',
    desc: 'Every project is planned, executed, and owned by village Gram Sabhas, respecting traditional Adivasi decision-making customs.',
    icon: Users,
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#F7F1E5] text-[#231F1C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#A63D32] mb-3">
            <span>Our Origin & Purpose</span>
            <span aria-hidden="true">·</span>
            <span>Est. Grassroots Initiative</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#70452B] font-display">
            Who We Are
          </h2>
          <div className="w-20 h-1 bg-[#A63D32] mt-4 mb-6" />
          <p className="text-lg text-stone-700 leading-relaxed font-sans">
            <strong className="text-[#A63D32] font-semibold">ARDASH FOUNDATION</strong> stands for{' '}
            <strong className="text-[#70452B] font-semibold">
              Adivasi Rural Development Awareness Society for Humanity
            </strong>
            . We are a registered society driven by dedicated grassroots social workers, tribal
            scholars, and rural youth ambassadors committed to holistic transformation across eastern
            India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-6 text-stone-700 leading-relaxed">
            <p>
              Rooted in the lush sal forests, red-soil plateaus, and sacred groves of Jharkhand and
              adjoining rural belts of Odisha, Andhra Pradesh, Maharashtra, and Telangana, ARDASH
              Foundation was born from a fundamental truth:{' '}
              <em>
                sustainable development begins by honoring indigenous wisdom and empowering village
                self-governance.
              </em>
            </p>
            <p>
              For generations, Adivasi communities have been the custodians of ecological harmony,
              organic agriculture, and vibrant folk arts such as Sohrai and Khovar. Yet,
              geographical isolation and socio-economic gaps often deny remote hamlets basic quality
              healthcare, bilingual primary education, clean drinking water, and dignified income.
            </p>
            <div className="p-6 bg-white rounded-xl border border-[#70452B]/20 shadow-xs">
              <blockquote className="text-base italic font-serif text-[#70452B]">
                "Our mission is neither charity nor patronage. It is genuine partnership: walking
                alongside village elders, mothers, and youth to co-create sustainable solutions that
                honor tribal dignity."
              </blockquote>
              <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold mt-3">
                — ARDASH Foundation Founding Collective
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={ASSETS.sohraiArt}
                alt="Tribal women painting Sohrai and Khovar folk art on village home walls"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D9A441] font-semibold">
                  <Handshake className="w-4 h-4" />
                  <span>Living Heritage</span>
                </div>
                <h3 className="text-xl font-bold font-display mt-1">
                  Sohrai & Khovar Cultural Preservation
                </h3>
                <p className="text-xs text-stone-200 mt-1 leading-relaxed">
                  Empowering Adivasi women artisans across Hazaribagh, Kolhan, and East Singhbhum
                  to sustain ancestral mud-wall art traditions with fair economic dignity.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white p-6 rounded-xl border border-stone-200/80 hover:border-[#A63D32]/50 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#F7F1E5] flex items-center justify-center text-[#A63D32] group-hover:bg-[#A63D32] group-hover:text-white transition-colors mb-4 border border-[#70452B]/15">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[#70452B] group-hover:text-[#A63D32] transition-colors font-display">
                  {item.title}
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed mt-2 font-sans">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
