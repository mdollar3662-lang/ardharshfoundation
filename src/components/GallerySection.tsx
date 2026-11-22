import React, { useState } from 'react';
import { Calendar, MapPin, Maximize2, X } from 'lucide-react';
import { ASSETS } from '../data/initialData';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
}

const GALLERY_CATEGORIES = [
  'All',
  'Tribal Culture',
  'Village Life',
  'Education Activities',
  'Health Awareness',
  'Women Empowerment',
  'Community Development',
  'Events & Campaigns',
];

export const GallerySection: React.FC<GallerySectionProps> = ({ galleryItems }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-[#F7F1E5] text-[#231F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#A63D32]">
            Visual Chronicles
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#70452B] font-display mt-2">
            Photo & Video Gallery
          </h2>
          <div className="w-16 h-1 bg-[#A63D32] mx-auto mt-4 mb-4" />
          <p className="text-base sm:text-lg text-stone-700">
            Glimpses into the vibrant spirit, ancient artistic heritage, and daily developmental
            realities of Adivasi and rural communities.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#70452B] text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-200/60 border border-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => setLightboxItem(item)}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxItem(item)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-stone-200 cursor-pointer transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-200">
                <img
                  src={item.imageUrl || ASSETS.mudHamlet}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = ASSETS.mudHamlet;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[11px] font-semibold text-[#D9A441] mb-0.5">
                    {item.category}
                  </div>
                  <h3 className="text-sm font-bold font-display line-clamp-1">{item.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-stone-300 mt-1">
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5 text-[#D9A441]" />
                      <span className="truncate max-w-[120px]">{item.location}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setLightboxItem(null)}
            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="bg-[#231F1C] text-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/20 shadow-2xl">
            <div className="relative max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={lightboxItem.imageUrl || ASSETS.mudHamlet}
                alt={lightboxItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="p-6 bg-[#231F1C] border-t border-white/10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="uppercase tracking-widest font-semibold text-[#D9A441]">
                  {lightboxItem.category}
                </span>
                <div className="flex items-center gap-4 text-stone-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#A63D32]" />
                    <span>{lightboxItem.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{lightboxItem.date}</span>
                  </span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                {lightboxItem.title}
              </h3>
              <p className="text-sm text-stone-300 font-sans leading-relaxed">
                {lightboxItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
