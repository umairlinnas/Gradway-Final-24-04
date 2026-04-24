import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Utensils, Briefcase, ShieldCheck, Plane, ArrowRight, Clock, Heart, Globe2, TrendingUp, MapPin, Trophy, Palette, Code, Beer, Euro, Zap, Ticket, TrainFront, MessageCircle, TreePine, GraduationCap, CarFront, Settings, Coffee, Croissant, Landmark, Brush, Sparkles, BookOpen, Home } from "lucide-react";

// Animation: Train moving across
function TrainAnimation() {
    return (
        <div className="relative w-full h-16 overflow-hidden rounded-xl bg-emerald-100/50 flex items-center">
            <motion.div
                className="absolute left-0 flex items-center text-emerald-600"
                initial={{ x: -50 }}
                animate={{ x: ["-20%", "120%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
                <TrainFront size={32} />
                <div className="ml-1 w-12 h-0.5 bg-emerald-400/50 blur-[1px]" />
            </motion.div>
            <div className="absolute bottom-2 w-full h-0.5 bg-emerald-300/30" />
            <div className="absolute bottom-2 w-full flex justify-between px-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-0.5 h-1 bg-emerald-300/50" />
                ))}
            </div>
        </div>
    );
}

// Animation: Rotating Gears
function RotatingGears() {
    return (
        <div className="relative w-12 h-12">
            <motion.div
                className="absolute top-0 right-0 text-blue-300"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
                <Settings size={28} />
            </motion.div>
            <motion.div
                className="absolute bottom-0 left-0 text-blue-400"
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
                <Settings size={20} />
            </motion.div>
        </div>
    );
}

// Animation: Bouncing Ball
function BouncingBall() {
    return (
        <div className="relative w-16 h-16 flex items-end justify-center">
            <motion.div
                className="w-8 h-8 bg-white rounded-full border-2 border-slate-900 shadow-sm flex items-center justify-center relative z-10"
                animate={{ y: [0, -40, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
            >
                <Trophy size={14} className="text-slate-900" />
            </motion.div>
            <motion.div
                className="absolute bottom-0 w-8 h-1 bg-black/10 rounded-full blur-sm"
                animate={{ scaleX: [1, 0.5, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
            />
        </div>
    );
}

// Animation: Swaying Tree
function SwayingTree() {
    return (
        <motion.div
            className="origin-bottom"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
            <TreePine size={48} className="text-emerald-300 drop-shadow-lg" />
        </motion.div>
    );
}

// Animation: Spinning Euro
function SpinningEuro() {
    return (
        <div className="relative w-16 h-16 flex items-center justify-center">
            <motion.div
                className="w-12 h-12 rounded-full border-2 border-amber-400 flex items-center justify-center bg-amber-50 text-amber-600 shadow-sm"
                animate={{ rotateY: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
                <Euro size={24} />
            </motion.div>
        </div>
    );
}
import { cn } from "@/lib/utils";

// Animation: Counter for the student population
function Counter({ value }: { value: number }) {
    const [displayValue, setDisplayValue] = useState(0);
    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = value / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [value]);
    return <span>{displayValue.toLocaleString()}+</span>;
}

// Animation: Rotating Clock for Work Hours
function WorkClock() {
    return (
        <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-emerald-100">
            <Clock size={24} className="text-emerald-600" />
            <motion.div className="absolute w-0.5 h-3 bg-emerald-600 rounded-full origin-bottom mb-3" animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
        </div>
    );
}

// Animation: Realistic Flight Takeoff
function FlightPath() {
    return (
        <div className="relative w-full h-24 overflow-hidden rounded-2xl bg-slate-800 flex items-center justify-center">
            <Globe2 className="text-slate-700 w-32 h-32 absolute opacity-30" />
            <motion.div
                className="relative z-10 flex items-center text-blue-400"
                initial={{ x: -120, y: 35, rotate: 0, opacity: 0 }}
                animate={{
                    x: [-120, -50, 120], // Taxi -> Rotate -> Ascend
                    y: [35, 35, -50], // Flat runway -> Steep climb
                    rotate: [0, -15, -35], // Nose stays level then tilts up sharply
                    opacity: [0, 1, 1, 0]
                }}
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    times: [0, 0.3, 1], // Spend 30% of time on "runway"
                    ease: "easeInOut"
                }}
            >
                <Plane size={32} className="drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                <motion.div
                    className="absolute -left-14 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                        width: [0, 60, 100],
                        opacity: [0, 0.4, 0],
                        rotate: [0, 0, 15] // Contrail follows the climb angle
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        times: [0, 0.3, 1],
                        ease: "easeInOut"
                    }}
                    style={{ transformOrigin: 'right center' }}
                />
            </motion.div>
            {/* Runway lights */}
            <div className="absolute bottom-6 left-0 right-0 h-px bg-slate-700/50 dash-pattern" style={{ backgroundImage: 'linear-gradient(to right, #334155 50%, transparent 50%)', backgroundSize: '20px 1px' }}></div>
        </div>
    );
}

// Animation: Cycling Society Interests
function SocietyIcons() {
    const [index, setIndex] = useState(0);
    const icons = [<Trophy size={28} />, <Palette size={28} />, <Code size={28} />];
    useEffect(() => {
        const timer = setInterval(() => setIndex(prev => (prev + 1) % icons.length), 2000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-50">
            <AnimatePresence mode="wait">
                <motion.div key={index} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.3 }}>
                    {icons[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

const BentoCard = ({ children, className, onClick }: any) => (
    <motion.div
        whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)" }}
        onClick={onClick}
        className={cn("relative overflow-hidden rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 border border-slate-100 bg-white group", onClick && "cursor-pointer", className)}
    >
        {children}
    </motion.div>
);

export function BentoExperience({ onContact }: any) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
            {/* 1. Global Community (Large) */}
            <BentoCard className="col-span-2 md:col-span-8 md:row-span-2 bg-[#00247D] border-blue-800 text-white shadow-2xl flex flex-col justify-center min-h-[320px]">
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 blur-[100px] rounded-full" />
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <Users size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200">The Global Choice</span>
                    </div>
                    <div>
                        <h3 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                            <Counter value={400000} />
                        </h3>
                        <p className="text-xl md:text-2xl font-bold text-blue-100 mt-4 leading-tight">International students join UK campuses every year</p>
                    </div>
                    <p className="text-blue-100/60 text-sm font-medium leading-relaxed max-w-xl">
                        Representing 200+ nationalities, the UK offers an unparalleled multicultural academic ecosystem where you build connections that span the globe.
                    </p>
                </div>
            </BentoCard>

            {/* 2. Cost of Living */}
            <BentoCard className="col-span-2 md:col-span-4 md:row-span-3 flex flex-col justify-between shadow-sm bg-slate-50/50">
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                            <Utensils size={24} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Budget Guide</span>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Cost of Living</h4>
                        <p className="text-slate-500 text-xs font-medium leading-relaxed">Monthly estimates for a comfortable student life.</p>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center space-y-4">
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-4xl font-black text-blue-600 tracking-tighter">£1,171</span>
                            <span className="text-slate-300 font-bold">to</span>
                            <span className="text-4xl font-black text-slate-900 tracking-tighter">£1,529</span>
                        </div>
                        <div className="space-y-4">
                            <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                                <motion.div initial={{ width: "0%" }} whileInView={{ width: "70%" }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-gradient-to-r from-blue-400 to-blue-700 rounded-full shadow-lg" />
                            </div>
                            <div className="flex justify-between text-[8px] font-black uppercase text-slate-400 px-1">
                                <span>Regional</span>
                                <span>London</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 space-y-4 pt-8 border-t border-slate-100">
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">NHS healthcare access included with your student visa.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <Heart className="text-rose-500 shrink-0 mt-0.5" size={16} />
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Significant student discounts on groceries and dining.</p>
                    </div>
                </div>
            </BentoCard>

            {/* 3. Work Rights */}
            <BentoCard className="col-span-1 md:col-span-4 bg-emerald-50/50 border-emerald-100 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-6">
                    <WorkClock />
                    <h3 className="text-lg font-black text-emerald-900 uppercase tracking-tight">Work &amp; Earn</h3>
                    <p className="text-emerald-800/70 text-[11px] font-medium leading-relaxed">
                        Students can work <span className="font-black">20 hours/week</span> during term time and full-time in breaks. <span className="text-emerald-600/50">T&amp;C</span>
                    </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Rate: £11.44+ /hr</span>
                    <Briefcase size={16} className="text-emerald-300" />
                </div>
            </BentoCard>

            {/* 4. Travel Hub */}
            <BentoCard className="col-span-1 md:col-span-4 bg-slate-900 border-slate-800 text-white flex flex-col justify-between min-h-[240px]">
                <div className="flex-1">
                    <FlightPath />
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-black uppercase tracking-tight">Global Gateway</h3>
                    <p className="text-slate-400 text-[11px] font-medium leading-relaxed mt-2">UK acts as a central hub for seamless travel across Europe and the World.</p>
                </div>
            </BentoCard>

            {/* 5. Societies */}
            <BentoCard className="col-span-1 md:col-span-4 bg-blue-50 border-blue-100 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-6">
                    <SocietyIcons />
                    <h3 className="text-lg font-black text-blue-900 uppercase tracking-tight leading-tight">200+ Societies</h3>
                    <p className="text-blue-700/60 text-[11px] font-medium leading-relaxed">From cultural groups to advanced tech labs, find your niche and build lifelong networks.</p>
                </div>
                <div className="flex gap-1 mt-4">
                    <span className="px-2 py-1 bg-white text-[8px] font-black uppercase rounded-md text-blue-600 border border-blue-100">Clubs</span>
                    <span className="px-2 py-1 bg-white text-[8px] font-black uppercase rounded-md text-blue-600 border border-blue-100">Teams</span>
                </div>
            </BentoCard>

            {/* 6. Employability */}
            <BentoCard className="col-span-1 md:col-span-4 bg-slate-50 border-slate-200 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-800 shadow-sm border border-slate-100">
                        <TrendingUp size={24} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">Career Readiness</h3>
                    <p className="text-slate-500 text-[11px] font-medium leading-relaxed">Focus on industry placements and professional mentorship integrated into your curriculum.</p>
                </div>
                <motion.div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden" initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1 }}>
                    <div className="h-full w-2/3 bg-slate-800" />
                </motion.div>
            </BentoCard>

            {/* 7. Lankan Community */}
            <BentoCard className="col-span-2 md:col-span-4 bg-gradient-to-br from-rose-50 to-amber-50 border-rose-100 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <MapPin size={20} className="text-rose-600" />
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">The Lankan Spirit</h3>
                    </div>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">With 50,000+ Sri Lankans in the UK, find a vibrant community waiting to welcome you to your home away from home.</p>
                    <div className="flex -space-x-3 overflow-hidden pt-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center">
                                <Users size={14} className="text-slate-400" />
                            </div>
                        ))}
                        <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-rose-500 text-white text-[8px] font-bold">+50k</div>
                    </div>
                </div>
                <div className="text-[9px] font-black uppercase text-rose-600 tracking-[0.2em] flex items-center gap-2">
                    Strong Alumni Network <ArrowRight size={10} />
                </div>
            </BentoCard>
        </div>
    );
}

export function GermanyBentoExperience({ onContact }: any) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 auto-rows-auto">
            {/* 1. Innovation Hub (Land of Ideas) */}
            <BentoCard className="col-span-2 md:col-span-6 md:row-span-2 bg-[#1A1F2C] border-slate-800 text-white shadow-2xl flex flex-col justify-center min-h-[320px]">
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-red-600/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full" />
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                            <Zap size={24} className="text-amber-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500">Land of Ideas</span>
                    </div>
                    <div>
                        <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                            <Counter value={375000} />
                        </h3>
                        <p className="text-lg md:text-xl font-bold text-slate-300 mt-4 leading-tight">International students driving innovation</p>
                    </div>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl">
                        Germany is the undisputed tech and engineering capital of Europe. Join a system where academic theory meets rigorous industrial application.
                    </p>
                </div>
            </BentoCard>

            {/* 2. Startups & Tech */}
            <BentoCard className="col-span-1 md:col-span-3 bg-slate-50 border-slate-200 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-slate-100">
                        <Code size={24} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">Startup Hub</h3>
                    <p className="text-slate-500 text-[11px] font-medium leading-relaxed">Berlin and Munich are home to Europe's most vibrant startup ecosystems.</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    <motion.span 
                        animate={{ scale: [1, 1.1, 1] }} 
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-2 py-1 bg-white text-[8px] font-black uppercase rounded-md text-slate-600 border border-slate-200"
                    >
                        Tech
                    </motion.span>
                    <span className="px-2 py-1 bg-white text-[8px] font-black uppercase rounded-md text-slate-600 border border-slate-200">AI</span>
                </div>
            </BentoCard>

            {/* 3. Schengen Access */}
            <BentoCard className="col-span-1 md:col-span-3 bg-blue-50 border-blue-100 flex flex-col justify-between min-h-[240px]">
                <div className="flex-1 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <Globe2 size={120} className="text-blue-500" />
                    </div>
                    <div className="relative z-10 space-y-4 pt-4">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                            <Plane size={24} />
                        </div>
                        <h3 className="text-lg font-black text-blue-900 uppercase tracking-tight">Schengen Access</h3>
                    </div>
                </div>
                <div className="mt-4">
                     <p className="text-blue-800/70 text-[11px] font-medium leading-relaxed">
                        Visa free travel across 29 countries in the Schengen area.
                    </p>
                </div>
            </BentoCard>

            {/* 4. Deutschland Ticket */}
            <BentoCard className="col-span-1 md:col-span-3 bg-emerald-50 border-emerald-100 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-6">
                    <TrainAnimation />
                    <h3 className="text-lg font-black text-emerald-900 uppercase tracking-tight leading-tight">Deutschland Ticket</h3>
                    <p className="text-emerald-800/70 text-[11px] font-medium leading-relaxed">Travel across the entire country on regional trains with ease.</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Eco-Friendly</span>
                </div>
            </BentoCard>

            {/* 5. Bundesliga (Redesigned) */}
             <BentoCard className="col-span-1 md:col-span-3 bg-gradient-to-br from-yellow-400 to-amber-500 border-yellow-400 text-slate-900 flex flex-col justify-between min-h-[240px] overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <Trophy size={100} />
                 </div>
                 <div className="space-y-4 relative z-10">
                    <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Trophy size={20} className="text-slate-900" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight leading-none">Bundesliga<br/>Fever</h3>
                    <div className="flex gap-1.5">
                         <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.2 }} className="w-2 h-2 rounded-full bg-black" />
                         <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.2, delay: 0.1 }} className="w-2 h-2 rounded-full bg-red-600" />
                         <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.2, delay: 0.2 }} className="w-2 h-2 rounded-full bg-yellow-200" />
                    </div>
                 </div>
                 <div className="mt-2 relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">World Class Football</p>
                 </div>
            </BentoCard>

            {/* 6. Cultural Life (Redesigned - Warmth) */}
            <BentoCard className="col-span-1 md:col-span-4 bg-gradient-to-br from-orange-50 to-amber-100 border-orange-100 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-6">
                     <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm border border-orange-200">
                            <Beer size={24} />
                        </div>
                        <motion.div 
                            animate={{ rotate: [0, 10, -10, 0] }} 
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-white p-2 rounded-xl shadow-sm border border-orange-100"
                        >
                            <Ticket className="text-orange-400" size={20}/>
                        </motion.div>
                     </div>
                    <h3 className="text-xl font-black text-orange-900 uppercase tracking-tight leading-tight">Oktoberfest &<br/>Traditions</h3>
                    <p className="text-orange-800/70 text-[11px] font-medium leading-relaxed">Experience the warmth of German festivals, Christmas markets, and vibrant street culture.</p>
                </div>
            </BentoCard>

            {/* 7. Automotive Giants (Replacing Nature) */}
            <BentoCard className="col-span-1 md:col-span-4 bg-slate-900 border-slate-800 text-white flex flex-col justify-between min-h-[240px] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
                <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white shadow-sm border border-white/10 backdrop-blur-md">
                            <CarFront size={24} />
                        </div>
                        <motion.div 
                            animate={{ x: [0, 100], opacity: [1, 0] }} 
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}
                            className="flex gap-1 opacity-50"
                        >
                            <div className="w-8 h-0.5 bg-white/30 rounded-full" />
                            <div className="w-4 h-0.5 bg-white/30 rounded-full" />
                        </motion.div>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight leading-tight">Automotive<br/>Giants</h3>
                    <p className="text-slate-400 text-[11px] font-medium leading-relaxed">Home to Mercedes, BMW, Audi, and Porsche. The heart of global mobility.</p>
                </div>
                <div className="mt-4 flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest group-hover:text-white transition-colors">Precision Engineering</span>
                </div>
            </BentoCard>

            {/* 8. Engineering Powerhouse (Replacing Tuition Free) */}
            <BentoCard className="col-span-1 md:col-span-4 bg-blue-50 border-blue-100 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-200">
                            <Settings size={24} />
                        </div>
                        <RotatingGears />
                    </div>
                    <h3 className="text-xl font-black text-blue-900 uppercase tracking-tight leading-tight">Engineering<br/>Powerhouse</h3>
                    <p className="text-blue-800/70 text-[11px] font-medium leading-relaxed">World-leading TU9 universities defining the future of technology and innovation.</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className="px-2 py-1 bg-white text-[8px] font-black uppercase rounded-md text-blue-600 border border-blue-100">TU9 Excellence</span>
                </div>
            </BentoCard>
        </div>
    );
}

export function FranceBentoExperience({ onContact }: any) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 auto-rows-auto">
            {/* 1. Academic Excellence (Large) */}
            <BentoCard className="col-span-2 md:col-span-8 md:row-span-2 bg-[#1D3557] border-slate-800 text-white shadow-2xl flex flex-col justify-center min-h-[320px]">
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-rose-600/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full" />
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                            <GraduationCap size={24} className="text-rose-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-400">Academic Excellence</span>
                    </div>
                    <div>
                        <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                            <Counter value={440000} />
                        </h3>
                        <p className="text-lg md:text-xl font-bold text-slate-300 mt-4 leading-tight">International students in France</p>
                    </div>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl">
                        France offers a world-class education system, home to prestigious Grandes Écoles and universities that dominate global rankings in business, engineering, and arts.
                    </p>
                </div>
            </BentoCard>

            {/* 2. Cost of Living */}
            <BentoCard className="col-span-2 md:col-span-4 md:row-span-3 flex flex-col justify-between shadow-sm bg-slate-50/50">
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 shadow-sm border border-rose-100">
                            <Euro size={24} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Budget Guide</span>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Cost of Living</h4>
                        <p className="text-slate-500 text-xs font-medium leading-relaxed">Monthly estimates for a comfortable student life.</p>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center space-y-4">
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-4xl font-black text-rose-600 tracking-tighter">€800</span>
                            <span className="text-slate-300 font-bold">to</span>
                            <span className="text-4xl font-black text-slate-900 tracking-tighter">€1,200</span>
                        </div>
                        <div className="space-y-4">
                            <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                                <motion.div initial={{ width: "0%" }} whileInView={{ width: "70%" }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full shadow-lg" />
                            </div>
                            <div className="flex justify-between text-[8px] font-black uppercase text-slate-400 px-1">
                                <span>Regional</span>
                                <span>Paris</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 space-y-4 pt-8 border-t border-slate-100">
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">CVEC covers mandatory health insurance and campus services.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <Heart className="text-rose-500 shrink-0 mt-0.5" size={16} />
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Significant student discounts on transport, museums, and dining.</p>
                    </div>
                </div>
            </BentoCard>

            {/* 3. Work Rights */}
            <BentoCard className="col-span-1 md:col-span-4 bg-emerald-50/50 border-emerald-100 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-6">
                    <WorkClock />
                    <h3 className="text-lg font-black text-emerald-900 uppercase tracking-tight">Work &amp; Earn</h3>
                    <p className="text-emerald-800/70 text-[11px] font-medium leading-relaxed">
                        International students can work up to <span className="font-black">964 hours/year</span> (approx. 20 hours/week) during their studies.
                    </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">SMIC: €11.65/hr</span>
                    <Briefcase size={16} className="text-emerald-300" />
                </div>
            </BentoCard>

            {/* 4. Housing Subsidy (CAF) */}
            <BentoCard className="col-span-1 md:col-span-4 bg-blue-50 border-blue-100 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-200">
                        <Home size={24} />
                    </div>
                    <h3 className="text-lg font-black text-blue-900 uppercase tracking-tight leading-tight">Housing Subsidy (CAF)</h3>
                    <p className="text-blue-800/70 text-[11px] font-medium leading-relaxed">France is unique in offering international students financial aid for accommodation through the CAF system.</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Save up to 30% on rent <span className="text-[8px] opacity-70 ml-1">*T&C Apply</span></span>
                </div>
            </BentoCard>

            {/* 5. Culture & Arts */}
            <BentoCard className="col-span-1 md:col-span-4 bg-rose-50 border-rose-100 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-600 shadow-sm border border-rose-200">
                        <Palette size={24} />
                    </div>
                    <h3 className="text-lg font-black text-rose-900 uppercase tracking-tight leading-tight">Culture & Arts</h3>
                    <p className="text-rose-800/70 text-[11px] font-medium leading-relaxed">Enjoy free or discounted access to over 1,200 museums, galleries, and world-class gastronomy across France.</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-rose-600 tracking-widest">Cultural Capital</span>
                </div>
            </BentoCard>

            {/* 6. Elite Business Schools */}
            <BentoCard className="col-span-1 md:col-span-4 bg-slate-900 border-slate-800 text-white flex flex-col justify-between min-h-[240px] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
                <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white shadow-sm border border-white/10 backdrop-blur-md">
                            <BookOpen size={24} />
                        </div>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight leading-tight">Elite Business<br/>Schools</h3>
                    <p className="text-slate-400 text-[11px] font-medium leading-relaxed">France is home to some of the world's most prestigious Grandes Écoles, dominating global top 10 rankings.</p>
                </div>
                <div className="mt-4 flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest group-hover:text-white transition-colors">Top Ranked MBAs</span>
                </div>
            </BentoCard>

            {/* 7. Travel & Connectivity */}
            <BentoCard className="col-span-1 md:col-span-4 bg-amber-50 border-amber-100 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm border border-amber-200">
                            <TrainFront size={24} />
                        </div>
                    </div>
                    <h3 className="text-xl font-black text-amber-900 uppercase tracking-tight leading-tight">Seamless<br/>Travel</h3>
                    <p className="text-amber-800/70 text-[11px] font-medium leading-relaxed">Explore Europe easily with the TGV high-speed trains and Schengen visa access to 29 countries.</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className="px-2 py-1 bg-white text-[8px] font-black uppercase rounded-md text-amber-600 border border-amber-100">Connected Europe</span>
                </div>
            </BentoCard>
        </div>
    );
}

export function IrelandBentoExperience({ onContact }: any) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
            {/* 1. Global Community (Large) */}
            <BentoCard className="col-span-2 md:col-span-8 md:row-span-2 bg-[#003300] border-green-800 text-white shadow-2xl flex flex-col justify-center min-h-[320px]">
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 blur-[100px] rounded-full" />
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <Users size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-green-200">The Emerald Choice</span>
                    </div>
                    <div>
                        <h3 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                            <Counter value={35000} />
                        </h3>
                        <p className="text-xl md:text-2xl font-bold text-green-100 mt-4 leading-tight">International students join Irish campuses every year</p>
                    </div>
                    <p className="text-green-100/60 text-sm font-medium leading-relaxed max-w-xl">
                        Ireland is renowned for its friendly atmosphere and world-class education, attracting students from across the globe to its vibrant academic community.
                    </p>
                </div>
            </BentoCard>

            {/* 2. Cost of Living */}
            <BentoCard className="col-span-2 md:col-span-4 md:row-span-3 flex flex-col justify-between shadow-sm bg-slate-50/50">
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-green-100">
                            <Utensils size={24} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Budget Guide</span>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Cost of Living</h4>
                        <p className="text-slate-500 text-xs font-medium leading-relaxed">Monthly estimates for a comfortable student life.</p>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center space-y-4">
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-4xl font-black text-green-600 tracking-tighter">€1,000</span>
                            <span className="text-slate-300 font-bold">to</span>
                            <span className="text-4xl font-black text-slate-900 tracking-tighter">€1,500</span>
                        </div>
                        <div className="space-y-4">
                            <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                                <motion.div initial={{ width: "0%" }} whileInView={{ width: "70%" }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-gradient-to-r from-green-400 to-green-700 rounded-full shadow-lg" />
                            </div>
                            <div className="flex justify-between text-[8px] font-black uppercase text-slate-400 px-1">
                                <span>Regional</span>
                                <span>Dublin</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 space-y-4 pt-8 border-t border-slate-100">
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">High-quality healthcare and safe environment for all students.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <Heart className="text-rose-500 shrink-0 mt-0.5" size={16} />
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Vibrant social scene with plenty of student-friendly discounts.</p>
                    </div>
                </div>
            </BentoCard>

            {/* 3. Work Rights */}
            <BentoCard className="col-span-1 md:col-span-4 bg-emerald-50/50 border-emerald-100 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-6">
                    <WorkClock />
                    <h3 className="text-lg font-black text-emerald-900 uppercase tracking-tight">Work &amp; Earn</h3>
                    <p className="text-emerald-800/70 text-[11px] font-medium leading-relaxed">
                        Students can work <span className="font-black">20 hours/week</span> during term time and <span className="font-black">40 hours/week</span> during holidays.
                    </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Min Wage: €12.70+ /hr</span>
                    <Briefcase size={16} className="text-emerald-300" />
                </div>
            </BentoCard>

            {/* 4. Travel Hub */}
            <BentoCard className="col-span-1 md:col-span-4 bg-slate-900 border-slate-800 text-white flex flex-col justify-between min-h-[240px]">
                <div className="flex-1">
                    <FlightPath />
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-black uppercase tracking-tight">Gateway to Europe</h3>
                    <p className="text-slate-400 text-[11px] font-medium leading-relaxed mt-2">Ireland is a perfect hub for exploring Europe and the USA with ease.</p>
                </div>
            </BentoCard>

            {/* 5. Societies */}
            <BentoCard className="col-span-1 md:col-span-4 bg-green-50 border-green-100 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-6">
                    <SocietyIcons />
                    <h3 className="text-lg font-black text-green-900 uppercase tracking-tight leading-tight">Student Life</h3>
                    <p className="text-green-700/60 text-[11px] font-medium leading-relaxed">From traditional music sessions to tech societies, find your community in Ireland.</p>
                </div>
                <div className="flex gap-1 mt-4">
                    <span className="px-2 py-1 bg-white text-[8px] font-black uppercase rounded-md text-green-600 border border-green-100">Arts</span>
                    <span className="px-2 py-1 bg-white text-[8px] font-black uppercase rounded-md text-green-600 border border-green-100">Tech</span>
                </div>
            </BentoCard>

            {/* 6. Employability */}
            <BentoCard className="col-span-1 md:col-span-4 bg-slate-50 border-slate-200 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-800 shadow-sm border border-slate-100">
                        <TrendingUp size={24} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">Tech Capital</h3>
                    <p className="text-slate-500 text-[11px] font-medium leading-relaxed">Home to the European HQs of Google, Meta, and Apple. Unmatched career opportunities.</p>
                </div>
                <motion.div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden" initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1 }}>
                    <div className="h-full w-3/4 bg-slate-800" />
                </motion.div>
            </BentoCard>

            {/* 7. Lankan Community */}
            <BentoCard className="col-span-2 md:col-span-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 flex flex-col justify-between min-h-[240px]">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <MapPin size={20} className="text-green-600" />
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Lankan Network</h3>
                    </div>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">A growing and supportive Sri Lankan community in Ireland, making you feel right at home.</p>
                    <div className="flex -space-x-3 overflow-hidden pt-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center">
                                <Users size={14} className="text-slate-400" />
                            </div>
                        ))}
                        <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-green-600 text-white text-[8px] font-bold">+5k</div>
                    </div>
                </div>
                <div className="text-[9px] font-black uppercase text-green-600 tracking-[0.2em] flex items-center gap-2">
                    Growing Community <ArrowRight size={10} />
                </div>
            </BentoCard>
        </div>
    );
}
