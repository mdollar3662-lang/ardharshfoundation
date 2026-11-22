import React, { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import { Building2, Compass, Mail, MapPin, Navigation } from 'lucide-react';
import { LocationItem } from '../types';

interface LocationsSectionProps {
  locations: LocationItem[];
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ locations }) => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [focusedLocation, setFocusedLocation] = useState<LocationItem | null>(
    locations[0] || null
  );

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const states = useMemo(() => {
    const unique = Array.from(new Set(locations.map((l) => l.state)));
    return ['All', ...unique];
  }, [locations]);

  const filteredLocations = useMemo(() => {
    return selectedState === 'All'
      ? locations
      : locations.filter((l) => l.state === selectedState);
  }, [locations, selectedState]);

  const activeLoc = focusedLocation || filteredLocations[0] || locations[0];

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [20.3533, 84.5],
      zoom: 6,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;
    markersLayerRef.current = layerGroup;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = markersLayerRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    filteredLocations.forEach((loc) => {
      const isHead = loc.type === 'head';
      const isFocused = activeLoc?.id === loc.id;

      const marker = L.circleMarker([loc.lat, loc.lng], {
        radius: isHead ? 10 : isFocused ? 9 : 7,
        fillColor: isHead ? '#A63D32' : '#70452B',
        color: isFocused ? '#D9A441' : '#FFFFFF',
        weight: isFocused ? 3 : 2,
        opacity: 1,
        fillOpacity: 0.92,
      });

      marker.bindPopup(
        `<div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 190px;">
          <div style="font-weight: 700; color: #70452B; font-size: 13px;">${loc.name}</div>
          <div style="font-size: 11px; color: #57534E; margin-top: 2px;">${loc.address}, ${loc.city}, ${loc.state}</div>
          <div style="font-size: 11px; color: #244B35; font-weight: 600; margin-top: 4px;">${loc.contactPerson}</div>
        </div>`
      );

      marker.on('click', () => {
        setFocusedLocation(loc);
      });

      marker.addTo(layerGroup);
    });
  }, [filteredLocations, activeLoc]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activeLoc) return;
    map.setView([activeLoc.lat, activeLoc.lng], activeLoc.type === 'head' ? 6 : 7, {
      animate: true,
    });
  }, [activeLoc]);

  if (!activeLoc) return null;

  return (
    <section id="locations" className="py-20 bg-[#F7F1E5] text-[#231F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[#A63D32]">
            Multi-State Field Network
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#70452B] font-display mt-2">
            Our Locations
          </h2>
          <div className="w-16 h-1 bg-[#A63D32] mx-auto mt-4 mb-4" />
          <p className="text-base sm:text-lg text-stone-700">
            Coordinated from our Bhubaneswar Head Office across 11 Regional Centers serving rural and
            tribal corridors in Odisha, Jharkhand, Andhra Pradesh, Maharashtra, and Telangana.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {states.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => {
                setSelectedState(st);
                const first =
                  st === 'All' ? locations[0] : locations.find((l) => l.state === st);
                if (first) setFocusedLocation(first);
              }}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedState === st
                  ? 'bg-[#A63D32] text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-7 bg-white p-3 rounded-2xl border border-stone-300 shadow-md">
            <div className="mb-2 px-2 flex items-center justify-between text-xs text-stone-600">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-3 h-3 rounded-full bg-[#A63D32] inline-block border border-[#D9A441]" />
                <span>Head Office (Bhubaneswar)</span>
                <span className="w-3 h-3 rounded-full bg-[#70452B] inline-block ml-3 border border-white" />
                <span>Regional Centers</span>
              </div>
              <span className="text-[11px] text-stone-500">Interactive Map · Zoom & Pan</span>
            </div>

            <div
              ref={mapContainerRef}
              className="w-full h-[450px] rounded-xl overflow-hidden border border-stone-200 z-10"
            />

            <div className="mt-3 p-4 bg-[#F7F1E5] rounded-xl border border-[#70452B]/20 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#A63D32]">
                  Focused Office
                </div>
                <div className="text-base font-bold text-[#70452B] font-display">
                  {activeLoc.name}
                </div>
                <div className="text-xs text-stone-600 mt-0.5">
                  {activeLoc.address}, {activeLoc.city}, {activeLoc.state}
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activeLoc.lat},${activeLoc.lng}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#70452B] hover:bg-[#A63D32] rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions (Google Maps)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 max-h-[580px] overflow-y-auto pr-2">
            {filteredLocations.map((loc) => {
              const isSelected = activeLoc.id === loc.id;
              const isHead = loc.type === 'head';
              return (
                <div
                  key={loc.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setFocusedLocation(loc)}
                  onKeyDown={(e) => e.key === 'Enter' && setFocusedLocation(loc)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-[#A63D32] shadow-md ring-2 ring-[#A63D32]/20'
                      : isHead
                      ? 'bg-amber-50/70 border-amber-300 hover:bg-white'
                      : 'bg-white border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {isHead ? (
                        <Building2 className="w-5 h-5 text-[#A63D32] shrink-0" />
                      ) : (
                        <Compass className="w-5 h-5 text-[#70452B] shrink-0" />
                      )}
                      <div>
                        <h3 className="text-base font-bold text-[#70452B] font-display leading-tight">
                          {loc.name}
                        </h3>
                        <span className="text-[11px] font-semibold text-[#A63D32] uppercase tracking-wide">
                          {loc.district}, {loc.state}
                        </span>
                      </div>
                    </div>
                    {isHead && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#A63D32] text-white rounded">
                        Head Office
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 mt-3 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span>
                      {loc.address}, {loc.city} {loc.pincode ? `- ${loc.pincode}` : ''}
                    </span>
                  </p>

                  <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-700 gap-2">
                    <a
                      href={`mailto:${loc.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 font-semibold text-[#244B35] hover:text-[#A63D32] truncate"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{loc.email}</span>
                    </a>
                    <span className="text-[11px] text-stone-500">{loc.contactPerson}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#70452B] mb-3">
            Institutional Registry & Regional Jurisdiction
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
            <div>
              <strong className="text-stone-900 block mb-1">Central Directorate:</strong>
              KIIT Campus, Patia, Bhubaneswar, Odisha – coordinates multi-state funding,
              institutional partnerships, and academic research.
            </div>
            <div>
              <strong className="text-stone-900 block mb-1">Jharkhand Ground Hub:</strong>
              Mampita, Telco, Jamshedpur, East Singhbhum – commands direct field implementation in
              Kolhan, Santhal Pargana, and tribal belt hamlets.
            </div>
            <div>
              <strong className="text-stone-900 block mb-1">Southern & Western Centers:</strong>
              Kothavalasa, Sompeta (Andhra Pradesh), Siddipet (Telangana), Jamkhed (Maharashtra) –
              handles regional tribal migrant linkages and vocational programs.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
