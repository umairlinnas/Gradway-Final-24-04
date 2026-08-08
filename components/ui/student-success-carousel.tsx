import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { SUCCESS_STORIES } from '@/constants';

export const StudentSuccessCarousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const total = SUCCESS_STORIES.length;

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % total);
    }, [total]);

    const prevSlide = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + total) % total);
    }, [total]);

    // Autoplay with duration based on review length
    useEffect(() => {
        if (isPaused) return;

        const currentStory = SUCCESS_STORIES[activeIndex];
        // Give longer reviews like Anne Nethra's more time to read
        const isLongReview = currentStory.quote.length > 250;
        const duration = isLongReview ? 11000 : 7000;

        const timer = setTimeout(() => {
            nextSlide();
        }, duration);

        return () => clearTimeout(timer);
    }, [activeIndex, isPaused, nextSlide]);

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (diff > minSwipeDistance) {
            nextSlide();
        } else if (diff < -minSwipeDistance) {
            prevSlide();
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    // Index math for left, active, right
    const leftIndex = (activeIndex - 1 + total) % total;
    const rightIndex = (activeIndex + 1) % total;

    const leftStory = SUCCESS_STORIES[leftIndex];
    const activeStory = SUCCESS_STORIES[activeIndex];
    const rightStory = SUCCESS_STORIES[rightIndex];

    return (
        <div
            className="relative w-full overflow-hidden py-6 select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Ambient Background Glow behind Active Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Main Horizontal Plane Container */}
            <div className="container mx-auto px-4 max-w-7xl">
                {/* 3-Card Row on the Same Horizontal Plane */}
                <div className="flex items-center justify-center gap-4 lg:gap-8 w-full min-h-[380px]">
                    
                    {/* LEFT PREVIEW CARD */}
                    <div
                        onClick={prevSlide}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && prevSlide()}
                        tabIndex={0}
                        role="button"
                        aria-label={`View previous testimonial by ${leftStory.name}`}
                        className="hidden md:flex flex-col justify-between flex-[0_0_240px] lg:flex-[0_0_290px] bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-amber-500/40 rounded-[2rem] p-6 lg:p-8 cursor-pointer opacity-60 hover:opacity-90 filter blur-[0.5px] scale-95 transition-all duration-700 ease-in-out hover:scale-98 shadow-lg group self-stretch min-h-[320px]"
                    >
                        <div>
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-slate-300 text-xs lg:text-sm leading-relaxed font-medium line-clamp-4 italic">
                                "{leftStory.quote.replace(/\n\n/g, ' ')}"
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/10 mt-6">
                            <h4 className="font-bold text-white text-sm tracking-tight group-hover:text-amber-400 transition-colors">
                                {leftStory.name}
                            </h4>
                            <p className="text-amber-400/90 text-[10px] font-bold uppercase tracking-wider mt-0.5">
                                {leftStory.tag}
                            </p>
                            <p className="text-slate-400 text-[10px] font-medium">
                                {leftStory.university}
                            </p>
                        </div>
                    </div>

                    {/* CENTER ACTIVE CARD */}
                    <div className="flex-1 max-w-2xl min-w-0 w-full z-10 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/95 backdrop-blur-xl border border-amber-500/30 rounded-[2.5rem] p-8 md:p-11 shadow-[0_20px_50px_rgba(0,0,0,0.6)] shadow-amber-500/10 relative overflow-hidden transition-all duration-700 ease-in-out scale-100 flex flex-col justify-between">
                        {/* Glass Accent Highlights */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute top-6 right-6 text-amber-500/15 pointer-events-none">
                            <Quote size={56} strokeWidth={1} />
                        </div>

                        {/* Top Rating */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex gap-1.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} className="fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial Quote - Fully expand height for paragraphs */}
                            <div className="text-slate-100 text-sm md:text-base leading-relaxed font-medium space-y-3 mb-8">
                                {activeStory.quote.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx} className="relative z-10 italic">
                                        {idx === 0 ? `"${paragraph}` : paragraph}
                                        {idx === activeStory.quote.split('\n\n').length - 1 ? '"' : ''}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Card Footer - Student Meta */}
                        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto relative z-10">
                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                    {activeStory.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                                        {activeStory.tag}
                                    </span>
                                    <span className="text-slate-500 text-xs">•</span>
                                    <span className="text-slate-300 text-xs font-semibold">
                                        {activeStory.university}
                                    </span>
                                </div>
                            </div>

                            {/* Side Nav Arrows inside active card context */}
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={prevSlide}
                                    aria-label="Previous story"
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-amber-500 hover:text-slate-950 border border-white/10 hover:border-amber-500 text-white flex items-center justify-center transition-all duration-300 active:scale-95"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    aria-label="Next story"
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-amber-500 hover:text-slate-950 border border-white/10 hover:border-amber-500 text-white flex items-center justify-center transition-all duration-300 active:scale-95"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PREVIEW CARD */}
                    <div
                        onClick={nextSlide}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && nextSlide()}
                        tabIndex={0}
                        role="button"
                        aria-label={`View next testimonial by ${rightStory.name}`}
                        className="hidden md:flex flex-col justify-between flex-[0_0_240px] lg:flex-[0_0_290px] bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-amber-500/40 rounded-[2rem] p-6 lg:p-8 cursor-pointer opacity-60 hover:opacity-90 filter blur-[0.5px] scale-95 transition-all duration-700 ease-in-out hover:scale-98 shadow-lg group self-stretch min-h-[320px]"
                    >
                        <div>
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-slate-300 text-xs lg:text-sm leading-relaxed font-medium line-clamp-4 italic">
                                "{rightStory.quote.replace(/\n\n/g, ' ')}"
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/10 mt-6">
                            <h4 className="font-bold text-white text-sm tracking-tight group-hover:text-amber-400 transition-colors">
                                {rightStory.name}
                            </h4>
                            <p className="text-amber-400/90 text-[10px] font-bold uppercase tracking-wider mt-0.5">
                                {rightStory.tag}
                            </p>
                            <p className="text-slate-400 text-[10px] font-medium">
                                {rightStory.university}
                            </p>
                        </div>
                    </div>

                </div>

                {/* DOTS NAVIGATION - Positioned Directly Below the Active Card */}
                <div className="flex items-center justify-center gap-3 mt-8">
                    {SUCCESS_STORIES.map((story, i) => {
                        const isActive = i === activeIndex;
                        return (
                            <button
                                key={story.id}
                                onClick={() => setActiveIndex(i)}
                                aria-label={`Go to testimonial ${i + 1} - ${story.name}`}
                                className={`transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                                    isActive
                                        ? 'w-9 h-3 bg-amber-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.7)]'
                                        : 'w-3 h-3 bg-white/20 hover:bg-white/40 rounded-full'
                                }`}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
