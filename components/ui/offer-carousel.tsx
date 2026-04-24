import * as React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight, Tag, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const OfferCard = React.forwardRef(({ offer, hoveredId, colorTheme = "blue" }: any, ref: any) => {
    const isHovered = hoveredId === offer.id;
    
    const themeColors: Record<string, any> = {
        blue: { bg: "bg-blue-600", text: "text-blue-600", groupHoverText: "group-hover:text-blue-600", groupHoverBg: "group-hover:bg-blue-600" },
        red: { bg: "bg-red-600", text: "text-red-600", groupHoverText: "group-hover:text-red-600", groupHoverBg: "group-hover:bg-red-600" },
        rose: { bg: "bg-rose-600", text: "text-rose-600", groupHoverText: "group-hover:text-rose-600", groupHoverBg: "group-hover:bg-rose-600" },
        green: { bg: "bg-green-600", text: "text-green-600", groupHoverText: "group-hover:text-green-600", groupHoverBg: "group-hover:bg-green-600" },
        orange: { bg: "bg-orange-600", text: "text-orange-600", groupHoverText: "group-hover:text-orange-600", groupHoverBg: "group-hover:bg-orange-600" },
        indigo: { bg: "bg-indigo-600", text: "text-indigo-600", groupHoverText: "group-hover:text-indigo-600", groupHoverBg: "group-hover:bg-indigo-600" },
        gray: { bg: "bg-gray-600", text: "text-gray-600", groupHoverText: "group-hover:text-gray-600", groupHoverBg: "group-hover:bg-gray-600" },
        emerald: { bg: "bg-emerald-600", text: "text-emerald-600", groupHoverText: "group-hover:text-emerald-600", groupHoverBg: "group-hover:bg-emerald-600" },
        pink: { bg: "bg-pink-600", text: "text-pink-600", groupHoverText: "group-hover:text-pink-600", groupHoverBg: "group-hover:bg-pink-600" }
    };
    
    const theme = themeColors[colorTheme] || themeColors.blue;

    return (
        <motion.a
            ref={ref}
            id={offer.id}
            data-scroll-hit={offer.id}
            href={offer.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex-shrink-0 w-[280px] sm:w-[300px] h-[380px] rounded-[2.5rem] overflow-hidden group snap-start bg-white border border-slate-100 shadow-sm"
            variants={{
                rest: { y: 0, scale: 1 },
                hover: { y: -8, scale: 1.02 }
            }}
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
            whileHover="hover"
            transition={{ type: "spring", stiffness: 600, damping: 30, mass: 0.5 }}
            style={{ perspective: "1000px" }}
        >
            <div className="h-2/5 overflow-hidden relative">
                <img src={offer.imageSrc} alt={offer.imageAlt} className={cn("absolute inset-0 w-full h-full object-cover transition-transform duration-500", isHovered ? "scale-110" : "group-hover:scale-110")} />
                <div className={cn("absolute inset-0 bg-black/20 transition-opacity", isHovered ? "opacity-0" : "group-hover:opacity-0")} />
            </div>
            <div className={cn("absolute bottom-0 left-0 right-0 h-3/5 bg-white p-6 flex flex-col justify-between transition-colors duration-300", isHovered ? "border-t-0" : "")}>
                <div className="space-y-4">
                    <div className="flex">
                        <div className={cn("inline-flex items-center px-3 py-1 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm", theme.bg)}>
                            <Tag className="w-3 h-3 mr-1.5 fill-white text-white" />
                            <span>{offer.tag}</span>
                        </div>
                    </div>
                    <div>
                        <h3 className={cn("text-xl font-black text-[#1A1F2C] leading-tight uppercase tracking-tight transition-colors", isHovered ? theme.text : theme.groupHoverText)}>
                            {offer.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2 mt-2">
                            {offer.description}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-1.5">
                        <MapPin size={12} className={theme.text} />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            {offer.brandName}
                        </p>
                    </div>
                    <div className={cn("w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 transform transition-all duration-300 shadow-sm", isHovered ? `rotate-[-45deg] ${theme.bg} text-white` : `group-hover:rotate-[-45deg] ${theme.groupHoverBg} group-hover:text-white`)}>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </motion.a>
    );
});
OfferCard.displayName = "OfferCard";

const OfferCarousel = React.forwardRef(({ offers, className, hoveredId, colorTheme = "blue", ...props }: any, ref: any) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = current.clientWidth * 0.8;
            current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };
    
    const themeHoverBgs: Record<string, string> = {
        blue: 'hover:bg-blue-600',
        red: 'hover:bg-red-600',
        rose: 'hover:bg-rose-600',
        green: 'hover:bg-green-600',
        orange: 'hover:bg-orange-600',
        indigo: 'hover:bg-indigo-600',
        gray: 'hover:bg-gray-600',
        emerald: 'hover:bg-emerald-600',
        pink: 'hover:bg-pink-600'
    };
    const themeHoverBg = themeHoverBgs[colorTheme] || themeHoverBgs.blue;
    
    return (
        <div ref={ref} className={cn("relative w-full group/carousel", className)} {...props}>
            <button onClick={() => scroll("left")} className={cn("absolute top-1/2 -translate-y-1/2 -left-2 md:-left-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-xl hover:text-white hover:scale-110 active:scale-95 transition-all duration-300", themeHoverBg)} aria-label="Scroll Left">
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory px-2 pt-4">
                {offers.map((offer: any) => (
                    <OfferCard key={offer.id} offer={offer} hoveredId={hoveredId} colorTheme={colorTheme} />
                ))}
            </div>
            <button onClick={() => scroll("right")} className={cn("absolute top-1/2 -translate-y-1/2 -right-2 md:-right-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-xl hover:text-white hover:scale-110 active:scale-95 transition-all duration-300", themeHoverBg)} aria-label="Scroll Right">
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
        </div>
    );
});
OfferCarousel.displayName = "OfferCarousel";
export { OfferCarousel, OfferCard };