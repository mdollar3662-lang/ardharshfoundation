import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Compass,
  ExternalLink,
  Film,
  Heart,
  Info,
  MapPin,
  Maximize2,
  Pause,
  Play,
  Sprout,
  Trees,
  Users,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { ASSETS, HERO_FILM_SLIDES } from '../data/initialData';
import { ImpactStats } from '../types';

interface HeroProps {
  stats: ImpactStats;
  onExploreMission: () => void;
  onJoinMovement: () => void;
  onDonate: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  stats,
  onExploreMission,
  onJoinMovement,
  onDonate,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [ambientMotion, setAmbientMotion] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [filmModalOpen, setFilmModalOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const currentSlide = HERO_FILM_SLIDES[slideIndex];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.2) * 0.4,
      speedY: (Math.random() - 0.5) * 0.3 - 0.2,
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * 0.02 + 0.005,
    }));

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.opacity += p.pulse;
        if (p.opacity > 0.7 || p.opacity < 0.15) p.pulse = -p.pulse;
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 164, 65, ${p.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#D9A441';
        ctx.fill();
      });

      if (ambientMotion) {
        animFrame = requestAnimationFrame(renderFrame);
      }
    };

    if (ambientMotion) {
      renderFrame();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, [ambientMotion]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const toggleAmbientSound = () => {
    if (soundEnabled) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
        setTimeout(() => {
          audioCtxRef.current?.suspend().catch(() => {});
          setSoundEnabled(false);
        }, 200);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        const lowOsc = ctx.createOscillator();
        lowOsc.type = 'sine';
        lowOsc.frequency.setValueAtTime(140, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280, ctx.currentTime);
        lowOsc.connect(filter);
        filter.connect(masterGain);
        lowOsc.start();

        const harmonicOsc = ctx.createOscillator();
        harmonicOsc.type = 'triangle';
        harmonicOsc.frequency.setValueAtTime(440, ctx.currentTime);
        const harmGain = ctx.createGain();
        harmGain.gain.setValueAtTime(0.015, ctx.currentTime);
        harmonicOsc.connect(harmGain);
        harmGain.connect(masterGain);
        harmonicOsc.start();
      } else {
        audioCtxRef.current.resume().catch(() => {});
      }

      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0.035, audioCtxRef.current.currentTime, 0.35);
      }
      setSoundEnabled(true);
    } catch {
      setSoundEnabled(false);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h- flex flex-col justify-between overflow-hidden bg-[#231F1C]"
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#231F1C]">
        <img
          src={currentSlide.posterImage}
          alt={currentSlide.title}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
            ambientMotion ? 'animate-cinemagraph' : 'scale-105'
          }`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,164,65,0.22)_0%,transparent_60%)] animate-atmospheric-shimmer" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#244B35]/25 to-transparent animate-mist" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#231F1C] via-[#231F1C]/72 to-[#244B35]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(35,31,28,0.72)_100%)]" />
      </div>

      {/* Top Overlay Controls - 2nd LOGO HATA DIYA, SIRF NAVBAR WALA LOGO RAHEGA */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex flex-wrap items-center justify-end gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="hidden md:inline-flex items-center p-1 rounded-full bg-black/70 backdrop-blur-md border border-[#D9A441]/40 shadow-xl text-xs">
            <span className="px-2.5 py-1 text- font-semibold text-[#D9A441] flex items-center gap-1 uppercase tracking-wider whitespace-nowrap">
              <Film className="w-3 h-3" />
              झारखंड वीडियो:
            </span>
            {HERO_FILM_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setSlideIndex(idx)}
                className={`px-2.5 py-1 rounded-full text- font-medium transition-all whitespace-nowrap shrink-0 ${
                  slideIndex === idx
                    ? 'bg-[#A63D32] text-white shadow-xs'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
                title={slide.title}
              >
                {slide.shortLabel}
              </button>
            ))}
          </div>

          <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#D9A441]/50 shadow-xl text-xs text-white">
            <button
              type="button"
              onClick={() => setAmbientMotion(!ambientMotion)}
              className="p-1.5 rounded-full hover:bg-white/20 text-stone-200 transition-colors"
              title={ambientMotion ? 'Pause Ambient Motion' : 'Play Ambient Motion'}
              aria-label={ambientMotion ? 'Pause Ambient Motion' : 'Play Ambient Motion'}
            >
              {ambientMotion ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => setFilmModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text- text-[#D9A441] font-semibold transition-colors whitespace-nowrap shrink-0"
              title="Watch Full Jharkhand Rural Reality Documentary"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">वृत्तचित्र (Watch Film)</span>
            </button>
            <button
              type="button"
              onClick={toggleAmbientSound}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text- font-semibold transition-all whitespace-nowrap shrink-0 ${
                soundEnabled
                  ? 'bg-[#244B35] text-[#D9A441] border border-[#D9A441]'
                  : 'bg-white/10 text-stone-300 hover:text-white'
              }`}
              title="Toggle Forest Nature Sound"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span className="hidden sm:inline">ध्वनि चालू (Sound On)</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">प्रकृति ध्वनि (Audio)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Hero Copy & CTAs */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1 flex flex-col justify-center w-full">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#A63D32]/80 backdrop-blur-md border border-[#D9A441]/80 rounded-full text-xs font-semibold tracking-wider text-[#D9A441] shadow-lg">
            <Users className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>झारखंड की जमीनी हकीकत • आदिवासी बस्तियों का जीवन, संघर्ष व ग्रामीण उत्थान</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] text-balance font-display">
            Together for a{' '}
            <span className="text-[#D9A441] underline decoration-[#A63D32] decoration-wavy decoration-2">
              Better Tomorrow
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#F7F1E5]/95 leading-relaxed font-display">
            Empowering Tribal Communities, Transforming Rural Lives and Building a Sustainable Future.
          </h2>

          <p className="text-base sm:text-lg text-stone-200/90 leading-relaxed font-sans max-w-2xl">
            ARDASH FOUNDATION works towards rural development, education, healthcare awareness,
            women’s empowerment, sustainable livelihoods, and environmental protection for
            underserved communities.
          </p>

          <button
            type="button"
            onClick={() => setFilmModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md border border-[#D9A441]/40 text-xs text-stone-200 transition-colors text-left"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
            <span className="font-medium text-stone-300">
              लाइव दृश्य: <strong className="text-white">{currentSlide.title}</strong> ({currentSlide.location})
            </span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/50 backdrop-blur-md border border-[#D9A441]/40 text-stone-200">
              <span className="w-8 h-8 rounded-lg bg-[#244B35] text-[#D9A441] flex items-center justify-center shrink-0">
                <Trees className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-bold text-white">Environment Protection</div>
                <div className="text- text-[#D9A441]">पर्यावरण व वन संरक्षण</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/50 backdrop-blur-md border border-[#D9A441]/40 text-stone-200">
              <span className="w-8 h-8 rounded-lg bg-[#70452B] text-[#D9A441] flex items-center justify-center shrink-0">
                <Sprout className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-bold text-white">Sustainable Livelihood</div>
                <div className="text- text-[#D9A441]">सतत आजीविका व कौशल</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/50 backdrop-blur-md border border-[#D9A441]/40 text-stone-200">
              <span className="w-8 h-8 rounded-lg bg-[#A63D32] text-white flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-bold text-white">Women Empowerment</div>
                <div className="text- text-[#D9A441]">महिला स्वयं सहायता समूह</div>
              </div>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onExploreMission}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold text-[#231F1C] bg-[#D9A441] hover:bg-[#c99534] active:scale-95 rounded-xl shadow-xl transition-all border border-[#D9A441] whitespace-nowrap shrink-0"
            >
              <Compass className="w-4 h-4 text-[#70452B]" />
              <span>Explore Our Mission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onJoinMovement}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#F7F1E5] bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-xl transition-all whitespace-nowrap shrink-0"
            >
              <Users className="w-4 h-4 text-[#D9A441]" />
              <span>Join Our Movement</span>
            </button>
            <button
              type="button"
              onClick={onDonate}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#A63D32] hover:bg-[#8d2c22] active:scale-95 rounded-xl shadow-xl transition-all whitespace-nowrap shrink-0"
            >
              <Heart className="w-4 h-4 fill-[#D9A441] text-[#D9A441]" />
              <span>Donate Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Live Impact Strip */}
      <div className="relative z-10 border-t border-[#D9A441]/30 bg-black/55 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col pr-4">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#D9A441] tabular-nums font-display">
              {stats.villagesReached}+
            </span>
            <span className="text-xs uppercase tracking-wider text-stone-200 font-medium mt-1">
              Rural Villages Reached
            </span>
          </div>
          <div className="flex flex-col pr-4">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#F7F1E5] tabular-nums font-display">
              {stats.peopleSupported.toLocaleString()}+
            </span>
            <span className="text-xs uppercase tracking-wider text-stone-200 font-medium mt-1">
              People Directly Supported
            </span>
          </div>
          <div className="flex flex-col pr-4">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#D9A441] tabular-nums font-display">
              {stats.childrenReached.toLocaleString()}+
            </span>
            <span className="text-xs uppercase tracking-wider text-stone-200 font-medium mt-1">
              Children In Learning Circles
            </span>
          </div>
          <div className="flex flex-col pr-4">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#F7F1E5] tabular-nums font-display">
              {stats.awarenessPrograms}+
            </span>
            <span className="text-xs uppercase tracking-wider text-stone-200 font-medium mt-1">
              Grassroots Health & Awareness Camps
            </span>
          </div>
        </div>
      </div>

      {/* Documentary Film Modal */}
      {filmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setFilmModalOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center transition-colors"
            aria-label="Close documentary modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="bg-[#231F1C] rounded-2xl max-w-4xl w-full overflow-hidden border border-[#D9A441]/40 shadow-2xl flex flex-col max-h-">
            <div className="p-4 bg-black/60 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[#D9A441]" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  झारखंड ग्रामीण गरीबी वृत्तचित्र शृंखला (Jharkhand Poverty Documentary Series)
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
                {HERO_FILM_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setSlideIndex(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      slideIndex === idx
                        ? 'bg-[#A63D32] text-white shadow-xs font-bold'
                        : 'bg-white/10 text-stone-300 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    {slide.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative aspect-video w-full bg-stone-900 shrink-0">
              <iframe
                key={`modal-${currentSlide.youtubeId}`}
                src={`https://www.youtube.com/embed/${currentSlide.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
                title={currentSlide.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-5 sm:p-6 bg-[#231F1C] text-white overflow-y-auto">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#D9A441]">
                    Jharkhand Ground Reality
                  </span>
                  <span aria-hidden="true" className="text-stone-500">
                    ·
                  </span>
                  <span className="font-medium text-stone-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D9A441]" />
                    {currentSlide.location}
                  </span>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${currentSlide.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-[#D9A441] font-semibold transition-colors"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold font-display text-white">
                {currentSlide.title}
              </h3>
              <p className="text-sm text-stone-300 mt-2 leading-relaxed">
                {currentSlide.description}
              </p>
              <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-[#D9A441]/30 flex items-start gap-3">
                <Info className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                <p className="text-xs text-stone-300 leading-relaxed">
                  <strong className="text-white">ARDASH Foundation की जमीनी भूमिका:</strong> संस्था ऐसे
                  दूरस्थ वन ग्रामों में सामुदायिक पोषण केंद्र, शुद्ध पेयजल बावड़ी संरक्षण, बच्चों के लिए
                  द्विभाषी अध्ययनशालाएं और महिला स्वयं सहायता समूहों को स्वावलंबी बनाने हेतु निरंतर कार्यरत है।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};