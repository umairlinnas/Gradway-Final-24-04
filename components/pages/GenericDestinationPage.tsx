import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { OfferCarousel } from '@/components/ui/offer-carousel';
import { 
    Globe, TrendingUp, Shield, MapPin, 
    BadgeCheck, UserCheck, Palette, Compass, Building2, Plane, Star, ArrowUpRight,
    ChevronLeft, ChevronRight, Phone, Mail, ChevronDown
} from 'lucide-react';

export const colorMap: Record<string, any> = {
    blue: {
        text: 'text-blue-600',
        textDark: 'text-blue-900',
        textLight: 'text-blue-100/60',
        bg: 'bg-blue-600',
        bgLight: 'bg-blue-50',
        bgLightest: 'bg-blue-50/50',
        bgLightestHover: 'hover:bg-blue-50/50',
        bgHover: 'hover:bg-blue-600',
        border: 'border-blue-200',
        borderLight: 'border-blue-100',
        borderFocus: 'border-blue-500/30',
        shadow: 'shadow-blue-500/30',
        shadowLarge: 'shadow-[0_40px_100px_rgba(37,99,235,0.25)]',
        shadowHover: 'group-hover:shadow-[0_50px_120px_rgba(37,99,235,0.4)]',
        blur: 'bg-blue-500/10',
        blurDark: 'bg-blue-600/5',
        fill: 'fill-blue-50',
        decoration: 'decoration-blue-200',
        gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    },
    red: {
        text: 'text-red-600',
        textDark: 'text-red-900',
        textLight: 'text-red-100/60',
        bg: 'bg-red-600',
        bgLight: 'bg-red-50',
        bgLightest: 'bg-red-50/50',
        bgLightestHover: 'hover:bg-red-50/50',
        bgHover: 'hover:bg-red-600',
        border: 'border-red-200',
        borderLight: 'border-red-100',
        borderFocus: 'border-red-500/30',
        shadow: 'shadow-red-500/30',
        shadowLarge: 'shadow-[0_40px_100px_rgba(220,38,38,0.25)]',
        shadowHover: 'group-hover:shadow-[0_50px_120px_rgba(220,38,38,0.4)]',
        blur: 'bg-red-500/10',
        blurDark: 'bg-red-600/5',
        fill: 'fill-red-50',
        decoration: 'decoration-red-200',
        gradient: 'from-orange-500 via-red-500 to-rose-500',
    },
    rose: {
        text: 'text-rose-600',
        textDark: 'text-rose-900',
        textLight: 'text-rose-100/60',
        bg: 'bg-rose-600',
        bgLight: 'bg-rose-50',
        bgLightest: 'bg-rose-50/50',
        bgLightestHover: 'hover:bg-rose-50/50',
        bgHover: 'hover:bg-rose-600',
        border: 'border-rose-200',
        borderLight: 'border-rose-100',
        borderFocus: 'border-rose-500/30',
        shadow: 'shadow-rose-500/30',
        shadowLarge: 'shadow-[0_40px_100px_rgba(225,29,72,0.25)]',
        shadowHover: 'group-hover:shadow-[0_50px_120px_rgba(225,29,72,0.4)]',
        blur: 'bg-rose-500/10',
        blurDark: 'bg-rose-600/5',
        fill: 'fill-rose-50',
        decoration: 'decoration-rose-200',
        gradient: 'from-pink-500 via-rose-500 to-amber-500',
    },
    green: {
        text: 'text-green-600',
        textDark: 'text-green-900',
        textLight: 'text-green-100/60',
        bg: 'bg-green-600',
        bgLight: 'bg-green-50',
        bgLightest: 'bg-green-50/50',
        bgLightestHover: 'hover:bg-green-50/50',
        bgHover: 'hover:bg-green-600',
        border: 'border-green-200',
        borderLight: 'border-green-100',
        borderFocus: 'border-green-500/30',
        shadow: 'shadow-green-500/30',
        shadowLarge: 'shadow-[0_40px_100px_rgba(22,163,74,0.25)]',
        shadowHover: 'group-hover:shadow-[0_50px_120px_rgba(22,163,74,0.4)]',
        blur: 'bg-green-500/10',
        blurDark: 'bg-green-600/5',
        fill: 'fill-green-50',
        decoration: 'decoration-green-200',
        gradient: 'from-emerald-500 via-green-500 to-teal-500',
    },
    orange: {
        text: 'text-orange-600',
        textDark: 'text-orange-900',
        textLight: 'text-orange-100/60',
        bg: 'bg-orange-600',
        bgLight: 'bg-orange-50',
        bgLightest: 'bg-orange-50/50',
        bgLightestHover: 'hover:bg-orange-50/50',
        bgHover: 'hover:bg-orange-600',
        border: 'border-orange-200',
        borderLight: 'border-orange-100',
        borderFocus: 'border-orange-500/30',
        shadow: 'shadow-orange-500/30',
        shadowLarge: 'shadow-[0_40px_100px_rgba(234,88,12,0.25)]',
        shadowHover: 'group-hover:shadow-[0_50px_120px_rgba(234,88,12,0.4)]',
        blur: 'bg-orange-500/10',
        blurDark: 'bg-orange-600/5',
        fill: 'fill-orange-50',
        decoration: 'decoration-orange-200',
        gradient: 'from-amber-500 via-orange-500 to-red-500',
    },
    pink: {
        text: 'text-pink-600',
        textDark: 'text-pink-900',
        textLight: 'text-pink-100/60',
        bg: 'bg-pink-600',
        bgLight: 'bg-pink-50',
        bgHover: 'hover:bg-pink-600',
        border: 'border-pink-200',
        borderLight: 'border-pink-100',
        borderFocus: 'border-pink-500/30',
        shadow: 'shadow-pink-500/30',
        shadowLarge: 'shadow-[0_40px_100px_rgba(219,39,119,0.25)]',
        shadowHover: 'group-hover:shadow-[0_50px_120px_rgba(219,39,119,0.4)]',
        blur: 'bg-pink-500/10',
        blurDark: 'bg-pink-600/5',
        fill: 'fill-pink-50',
        decoration: 'decoration-pink-200',
        gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
    },
    indigo: {
        text: 'text-indigo-600',
        textDark: 'text-indigo-900',
        textLight: 'text-indigo-100/60',
        bg: 'bg-indigo-600',
        bgLight: 'bg-indigo-50',
        bgHover: 'hover:bg-indigo-600',
        border: 'border-indigo-200',
        borderLight: 'border-indigo-100',
        borderFocus: 'border-indigo-500/30',
        shadow: 'shadow-indigo-500/30',
        shadowLarge: 'shadow-[0_40px_100px_rgba(79,70,229,0.25)]',
        shadowHover: 'group-hover:shadow-[0_50px_120px_rgba(79,70,229,0.4)]',
        blur: 'bg-indigo-500/10',
        blurDark: 'bg-indigo-600/5',
        fill: 'fill-indigo-50',
        decoration: 'decoration-indigo-200',
        gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    },
    gray: {
        text: 'text-gray-600',
        textDark: 'text-gray-900',
        textLight: 'text-gray-100/60',
        bg: 'bg-gray-600',
        bgLight: 'bg-gray-50',
        bgHover: 'hover:bg-gray-600',
        border: 'border-gray-200',
        borderLight: 'border-gray-100',
        borderFocus: 'border-gray-500/30',
        shadow: 'shadow-gray-500/30',
        shadowLarge: 'shadow-[0_40px_100px_rgba(75,85,99,0.25)]',
        shadowHover: 'group-hover:shadow-[0_50px_120px_rgba(75,85,99,0.4)]',
        blur: 'bg-gray-500/10',
        blurDark: 'bg-gray-600/5',
        fill: 'fill-gray-50',
        decoration: 'decoration-gray-200',
        gradient: 'from-slate-500 via-gray-500 to-zinc-500',
    },
    emerald: {
        text: 'text-emerald-600',
        textDark: 'text-emerald-900',
        textLight: 'text-emerald-100/60',
        bg: 'bg-emerald-600',
        bgLight: 'bg-emerald-50',
        bgHover: 'hover:bg-emerald-600',
        border: 'border-emerald-200',
        borderLight: 'border-emerald-100',
        borderFocus: 'border-emerald-500/30',
        shadow: 'shadow-emerald-500/30',
        shadowLarge: 'shadow-[0_40px_100px_rgba(16,185,129,0.25)]',
        shadowHover: 'group-hover:shadow-[0_50px_120px_rgba(16,185,129,0.4)]',
        blur: 'bg-emerald-500/10',
        blurDark: 'bg-emerald-600/5',
        fill: 'fill-emerald-50',
        decoration: 'decoration-emerald-200',
        gradient: 'from-teal-500 via-emerald-500 to-green-500',
    }
};

export const GenericDestinationPage = ({ data, onContact }: { data: any, onContact: any }) => {
    const [selectedCity, setSelectedCity] = useState(0);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const mousePos = useRef({ x: 0, y: 0 });
    const viewMoreBtnRef = useRef<HTMLButtonElement>(null);
    const fourthCategoryRef = useRef<HTMLDivElement>(null);

    const handleToggleExpand = () => {
        if (isExpanded) {
            setIsExpanded(false);
            // Smoothly scroll so the button is pinned at the bottom of the screen
            setTimeout(() => {
                if (viewMoreBtnRef.current) {
                    const rect = viewMoreBtnRef.current.getBoundingClientRect();
                    const absoluteTop = window.pageYOffset + rect.top;
                    const targetScroll = absoluteTop - window.innerHeight + rect.height + 40; // 40px offset for "not bad looking"
                    window.scrollTo({
                        top: targetScroll,
                        behavior: 'smooth'
                    });
                }
            }, 100); // Shorter timeout for more immediate response
        } else {
            setIsExpanded(true);
        }
    };

    useEffect(() => {
        setIsExpanded(false);
    }, [data.id]);

    const c = colorMap[data.colorTheme] || colorMap.blue;

    const handleNext = () => setSelectedCity((prev) => (prev + 1) % data.cities.length);
    const handlePrev = () => setSelectedCity((prev) => (prev - 1 + data.cities.length) % data.cities.length);

    useEffect(() => {
        const handleMove = (e: PointerEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            checkHit();
        };
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) {
                mousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                checkHit();
            }
        };
        const checkHit = () => {
            const element = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
            const hitCard = element?.closest('[data-scroll-hit]');
            if (hitCard) {
                setHoveredId(hitCard.getAttribute('data-scroll-hit'));
            } else {
                setHoveredId(null);
            }
        };
        window.addEventListener('pointermove', handleMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('scroll', checkHit, { passive: true });
        return () => {
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('scroll', checkHit);
        };
    }, []);

    return (
        <main className="animate-[fadeIn_0.5s_ease-out]">
            {/* Hero Section */}
            <section id="destination" className="relative min-h-[100vh] flex flex-col items-center justify-center text-center overflow-hidden bg-white px-6">
                <div className="absolute inset-0 z-0 bg-white">
                    <img src={data.heroImage} className="w-full h-full object-cover opacity-30 scale-105" alt={`${data.name} Skyline`} />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white" />
                </div>
                <div className="relative z-10 max-w-4xl w-full flex flex-col items-center pt-[117px] pb-10">
                    <div className={cn("inline-flex items-center gap-2 px-4 py-2 border rounded-full text-[10px] font-black uppercase tracking-widest mb-8 shadow-sm", c.bgLight, c.border, c.textDark)}>
                        <Globe size={14} /> {data.heroBadge}
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none uppercase mb-8 text-slate-950">
                        {data.heroTitle1} <br /><span className={c.text}>{data.heroTitle2}</span>
                    </h1>
                    <p className="text-slate-700 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-sm">
                        {data.heroDesc}
                    </p>
                    <div className="flex flex-col items-center gap-12">
                        <button onClick={onContact} className={cn("text-white px-14 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl", c.bg, c.shadow)}>
                            Start Your Journey
                        </button>
                        <div className="flex flex-col items-center gap-4 animate-bounce mt-16">
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Scroll to explore</span>
                            <ChevronDown size={14} className="text-slate-400" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapter I: The Appeal */}
            <section className="pt-16 pb-12 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className={cn("text-[10px] font-black uppercase tracking-[0.4em]", c.text)}>Chapter I: The Appeal</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">{data.chapter1Title}</h2>
                        <p className="text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: data.chapter1Desc }}></p>
                    </div>
                </div>
                <div className={cn("grid grid-cols-1 gap-4 lg:gap-6 mt-16 max-w-7xl mx-auto", data.chapter1Cards.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : data.chapter1Cards.length === 5 ? "md:grid-cols-3 lg:grid-cols-5" : "md:grid-cols-3")}>
                    {data.chapter1Cards.map((card: any, i: number) => (
                        <div key={i} data-scroll-hit={card.id} className={cn("p-6 lg:p-8 border rounded-[2.5rem] shadow-sm transition-all duration-300 group cursor-default", c.borderLight, hoveredId === card.id ? `scale-[1.03] shadow-xl ${c.border} ${c.bgLight} -translate-y-2` : `${c.bgLightest} hover:scale-[1.03] hover:shadow-xl hover:-translate-y-2 hover:${c.bgLight}`)}>
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300", hoveredId === card.id ? `scale-110 shadow-sm ${c.bg}` : `${c.bgLight} group-hover:scale-110 group-hover:shadow-sm group-hover:${c.bg}`)}>
                                {React.cloneElement(card.icon as React.ReactElement, { 
                                    className: cn("w-6 h-6 transition-colors duration-300", hoveredId === card.id ? "text-white opacity-100" : `${c.text} opacity-60 group-hover:text-white group-hover:opacity-100`)
                                })}
                            </div>
                            <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight mb-4 text-[#1A1F2C] leading-tight">{card.title}</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Chapter II: Living */}
            <section id="living" className="pt-12 pb-12 px-6 md:px-12 bg-[#FAFAFA] overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 relative z-10">
                        <span className={cn("text-[10px] font-black uppercase tracking-[0.4em]", c.text)}>Chapter II: Living</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">{data.chapter2Title}</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">{data.chapter2Desc}</p>
                        <div className="hidden lg:flex flex-col gap-2">
                            {data.cities.map((city: any, i: number) => (
                                <button key={i} onClick={() => setSelectedCity(i)} className={cn("text-left px-6 py-4 rounded-2xl font-bold transition-all", selectedCity === i ? `${c.bg} text-white shadow-lg` : "text-slate-500 hover:bg-slate-100")}>
                                    {city.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group">
                        <div className={cn("absolute -inset-4 blur-3xl rounded-full", c.blur)} />
                        <img src={data.cities[selectedCity].image} alt={data.cities[selectedCity].name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
                        <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={cn("px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest", c.bg)}>{data.cities[selectedCity].rating}</span>
                            </div>
                            <h3 className="text-4xl font-black uppercase tracking-tight mb-4">{data.cities[selectedCity].name}</h3>
                            <p className="text-slate-200 font-medium leading-relaxed mb-6">{data.cities[selectedCity].desc}</p>
                            <div className="flex items-center gap-6 text-xs font-bold text-slate-300">
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className={cn("shrink-0", c.text)} /> {data.cities[selectedCity].stats.split('•')[0]}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe size={14} className={cn("shrink-0", c.text)} /> {data.cities[selectedCity].stats.split('•')[1]}
                                </div>
                            </div>
                            <button 
                                onClick={onContact} 
                                className={cn("w-full mt-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-black uppercase tracking-widest text-[10px] text-white hover:bg-white hover:text-black transition-all shadow-lg")}
                            >
                                Start Application
                            </button>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between">
                            <button onClick={handlePrev} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-lg border border-white/10"><ChevronLeft size={24} /></button>
                            <button onClick={handleNext} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-lg border border-white/10"><ChevronRight size={24} /></button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapter III: The Institutions */}
            <section id="institutions" className="pt-12 pb-4 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <span className={cn("text-[10px] font-black uppercase tracking-[0.4em]", c.text)}>Chapter III: The Institutions</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]" dangerouslySetInnerHTML={{ __html: data.chapter3Title }}></h2>
                    <p className="text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                        {data.chapter3Desc}
                    </p>
                </div>
                <div className="flex flex-col gap-12 md:gap-16">
                    {Object.entries(data.universities).slice(0, 4).map(([category, unis]: [string, any], idx) => {
                        const offers = unis.map((uni: any, i: number) => ({
                            id: `${category}-${i}`,
                            imageSrc: uni.image,
                            imageAlt: uni.name,
                            tag: uni.tag,
                            title: uni.name,
                            description: `Core Fields: ${uni.fields}`,
                            brandLogoSrc: '',
                            brandName: uni.location,
                            href: uni.url
                        }));

                        return (
                            <div key={idx} ref={idx === 3 ? fourthCategoryRef : null} className="relative z-10">
                                <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4 px-2">
                                    <h3 className={cn("text-xl md:text-2xl font-black uppercase tracking-tight", c.textDark)}>{category}</h3>
                                </div>
                                <OfferCarousel offers={offers} hoveredId={hoveredId} colorTheme={data.colorTheme} />
                            </div>
                        );
                    })}

                    <AnimatePresence mode="wait">
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className={cn(
                                    "flex flex-col gap-12 md:gap-16",
                                    isExpanded ? "overflow-visible" : "overflow-hidden"
                                )}
                            >
                                {Object.entries(data.universities).slice(4).map(([category, unis]: [string, any], idx) => {
                                    const offers = unis.map((uni: any, i: number) => ({
                                        id: `expanded-${category}-${i}`,
                                        imageSrc: uni.image,
                                        imageAlt: uni.name,
                                        tag: uni.tag,
                                        title: uni.name,
                                        description: `Core Fields: ${uni.fields}`,
                                        brandLogoSrc: '',
                                        brandName: uni.location,
                                        href: uni.url
                                    }));

                                    return (
                                        <div key={idx} className="relative z-10">
                                            <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4 px-2">
                                                <h3 className={cn("text-xl md:text-2xl font-black uppercase tracking-tight", c.textDark)}>{category}</h3>
                                            </div>
                                            <OfferCarousel offers={offers} hoveredId={hoveredId} colorTheme={data.colorTheme} />
                                        </div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {Object.entries(data.universities).length > 4 && (
                        <div className="flex justify-center mt-8">
                            <button
                                ref={viewMoreBtnRef}
                                onClick={handleToggleExpand}
                                className={cn(
                                    "group flex items-center gap-2 px-10 py-5 rounded-full font-black uppercase tracking-widest text-[11px] transition-all shadow-xl hover:scale-105 active:scale-95 z-20 relative",
                                    isExpanded ? "bg-slate-900 text-white" : `${c.bg} text-white`
                                )}
                            >
                                {isExpanded ? 'View Less' : 'View More'}
                                <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown size={14} />
                                </motion.div>
                            </button>
                        </div>
                    )}
                    <div className={cn("mt-6 p-10 rounded-[3rem] border text-center transition-all duration-500", c.bgLight, c.borderLight)}>
                        <p className={cn("text-sm font-black uppercase tracking-widest", c.textDark)}>Discover more with Gradway</p>
                        <p className={cn("text-xs font-medium mt-2 max-w-3xl mx-auto leading-relaxed opacity-60", c.textDark)}>
                            These represent just a few of our represented institutions. Contact us to explore personalized top-tier university options across {data.name} and find the best match for your academic profile.
                        </p>
                    </div>
                </div>
            </section>

            {/* Chapter IV: Essentials */}
            <section id="essentials" className="pt-12 pb-24 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className={cn("text-[10px] font-black uppercase tracking-[0.4em]", c.text)}>Chapter IV: Essentials</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]" dangerouslySetInnerHTML={{ __html: data.chapter4Title }}></h2>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-md">{data.chapter4Desc}</p>
                        
                        <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] space-y-4 shadow-sm">
                            <div className={cn("flex items-center gap-3", c.text)}>
                                <Shield size={20} /> <span className="text-xs font-black uppercase tracking-widest">Did you know?</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed italic" dangerouslySetInnerHTML={{ __html: data.didYouKnow }}></p>
                        </div>
                    </div>
                    <div className="space-y-12 relative">
                        <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-200" />
                        {data.essentials.map((item: any, i: number) => (
                            <div key={i} data-scroll-hit={item.id} className={cn("relative pl-16 group cursor-default transition-all duration-300", hoveredId === item.id ? "translate-x-4" : "")}>
                                <div className={cn("absolute left-0 top-0 w-12 h-12 rounded-full bg-white border flex items-center justify-center font-black z-10 transition-all shadow-lg", c.borderFocus, c.text, hoveredId === item.id && `${c.bg} text-white`)}>
                                    {item.step}
                                </div>
                                <h4 className={cn("text-xl font-black uppercase tracking-tight mb-2 text-[#1A1F2C] transition-colors", hoveredId === item.id && c.text)}>{item.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Chapter V: Experience */}
            {data.bentoGrid && (
                <section id="experience" className="pt-12 pb-6 px-6 md:px-12 bg-[#FAFAFA]">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <span className={cn("text-[10px] font-black uppercase tracking-[0.4em]", c.text)}>Chapter V: Experience</span>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">{data.chapter5Title}</h2>
                            <p className="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">{data.chapter5Desc}</p>
                        </div>
                        {data.bentoGrid}
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="pt-8 pb-32 px-6 md:px-12 bg-white relative overflow-hidden border-t border-slate-100">
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="space-y-12">
                        <div>
                            <span className={cn("font-black text-xs uppercase tracking-[0.2em] mb-4 block", c.text)}>TAKE THE FIRST STEP</span>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-[#1A1F2C] mb-8" dangerouslySetInnerHTML={{ __html: data.ctaTitle }}></h2>
                            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">{data.ctaDesc}</p>
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className={cn("w-14 h-14 rounded-full flex items-center justify-center shadow-sm shrink-0 transition-transform group-hover:scale-110", c.bgLight, c.text)}>
                                    <BadgeCheck size={28} className={c.fill} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-[#1A1F2C] mb-2">Expert Guidance</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed">Our seasoned counselors provide personalized strategies to maximize your admission chances.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6 group">
                                <div className={cn("w-14 h-14 rounded-full flex items-center justify-center shadow-sm shrink-0 transition-transform group-hover:scale-110", c.bgLight, c.text)}>
                                    <UserCheck size={28} className={c.fill} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-[#1A1F2C] mb-2">End-to-End Support</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed">From university selection to visa processing and accommodation, we've got you covered.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className={cn("absolute -inset-4 blur-[100px] rounded-full", c.blurDark)} />
                        <div className={cn("relative rounded-[4rem] p-10 md:p-14 text-white overflow-hidden transition-all duration-500", c.bg, c.shadowLarge, c.shadowHover)}>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">Start Your <br /> Journey</h3>
                                <p className="text-white/80 text-base md:text-lg font-medium leading-relaxed max-w-sm">Our expert counselors offer a personalized 1:1 strategy session to find your perfect university match.</p>
                                
                                <div className="mt-12 space-y-6">
                                    <div className="flex items-center gap-6 group/item cursor-default">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-white/20 transition-colors">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Phone Support</p>
                                            <p className="text-xl font-black tracking-tight group-hover/item:underline underline-offset-4 decoration-white/30">+94 77 500 9929</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 group/item cursor-default">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-white/20 transition-colors">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Email Inquiries</p>
                                            <p className="text-xl font-black tracking-tight group-hover/item:underline underline-offset-4 decoration-white/30">info@gradwayedu.com</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                                    <button onClick={onContact} className={cn("flex-1 bg-white py-6 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-black hover:text-white transition-all shadow-xl active:scale-95", c.text)}>Book Session</button>
                                    <button onClick={onContact} className="flex-1 bg-black/20 backdrop-blur-md border border-white/20 py-6 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-white hover:text-black transition-all shadow-xl active:scale-95 text-white">Start Journey</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
