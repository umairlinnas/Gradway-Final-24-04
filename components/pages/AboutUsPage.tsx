import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Target, Compass, Globe, ShieldCheck, Award, Users, CheckCircle2, 
    Sparkles, ArrowRight, Building2, MapPin, Phone, Mail, GraduationCap, 
    BookOpen, HeartHandshake, FileCheck, Layers, ExternalLink, ChevronRight,
    Star, Clock, Zap, Plane
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RotatingEarth, GLOBE_COUNTRIES, GlobeCountry } from '@/components/ui/rotating-earth';

interface AboutUsPageProps {
    onNavigate: (id: string) => void;
    onSetView?: (view: string) => void;
    onContact?: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate, onSetView, onContact }) => {
    const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);

    const handleCountryClick = (routeId: string) => {
        if (routeId === 'contact') {
            if (onContact) onContact();
            else onNavigate('contact');
            return;
        }
        if (onSetView) {
            onSetView(routeId);
        } else if (onNavigate) {
            onNavigate(routeId);
        }
    };

    // Organization Schema JSON-LD for /about-gradway-srilanka/
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "@id": "https://gradwayedu.com/about-gradway-srilanka/#organization",
        "name": "Gradway (Pvt) Ltd",
        "legalName": "Gradway (Pvt) Ltd",
        "alternateName": [
            "Gradway Education Consultancy",
            "Gradway Sri Lanka",
            "Gradway Study Abroad"
        ],
        "url": "https://gradwayedu.com/about-gradway-srilanka/",
        "logo": {
            "@type": "ImageObject",
            "url": "https://gradwayedu.com/gradway-logo.png",
            "caption": "Gradway Education Consultancy Logo"
        },
        "image": "https://gradwayedu.com/gradway-logo.png",
        "description": "Gradway (Pvt) Ltd is Sri Lanka's leading study abroad and education visa consultancy based in Colombo. We provide ethical, transparent, and personalized university admissions, student visas, scholarships, and post-study work guidance for the UK, Germany, Canada, Australia, France, USA, Ireland, and New Zealand.",
        "telephone": "+94775009929",
        "email": "info@gradwayedu.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Colombo",
            "addressCountry": "LK"
        },
        "areaServed": [
            "Sri Lanka",
            "Colombo",
            "Kandy",
            "Galle",
            "Jaffna",
            "Maldives",
            "South Asia"
        ],
        "sameAs": [
            "https://www.linkedin.com/company/gradway-pvt-ltd-sl/",
            "https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852",
            "https://www.instagram.com/gradway_education",
            "https://www.tiktok.com/@gradway_education"
        ]
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A]" id="about-gradway-page">
            {/* Inject Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            {/* HERO / HEADER SECTION - CLEAN, LUMINOUS & COHESIVE WITH MAIN SITE */}
            <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 bg-gradient-to-b from-amber-50/50 via-white to-slate-50/60 overflow-hidden" id="about-hero-section">
                {/* Gentle ambient gradient highlights reflecting Gradway logo colors */}
                <div className="absolute top-0 right-10 w-96 h-96 bg-amber-400/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-400/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 lg:px-12 relative z-10">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <button 
                            onClick={() => onNavigate('top')}
                            className="hover:text-amber-600 transition-colors focus-visible:ring-1 focus-visible:ring-amber-500 rounded px-1"
                        >
                            Home
                        </button>
                        <ChevronRight size={12} className="text-slate-400" />
                        <span className="text-amber-600 font-extrabold">About Gradway</span>
                    </nav>

                    <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 border bg-amber-100/70 border-amber-300 text-amber-900 shadow-xs">
                            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_6px_#f59e0b]" />
                            <span className="text-[11px] font-black uppercase tracking-widest">
                                Premier Education & Visa Consultancy • Colombo, Sri Lanka
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#1A1F2C] mb-8 leading-[1.06] text-center" id="about-main-heading">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500">Gradway</span>
                        </h1>

                        {/* INTRODUCTORY PARAGRAPH */}
                        <div className="w-full p-6 md:p-8 bg-amber-50/70 border border-amber-300/80 rounded-3xl relative group mb-8 shadow-sm text-center">
                            <div className="flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest text-amber-700 mb-3">
                                <Sparkles size={15} className="text-amber-500" />
                                <span>Our Story</span>
                            </div>
                            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium max-w-3xl mx-auto">
                                Founded in Colombo, Sri Lanka, Gradway (Pvt) Ltd is a premier international education and visa consultancy dedicated to helping ambitious students achieve world-class university placements. We provide comprehensive, personalized guidance across university selection, admissions processing, scholarship applications, and student visa facilitation. Our team of experienced advisors is committed to transparency, integrity, and empowering the next generation of global leaders.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => {
                                    const el = document.getElementById('world-map-destinations');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-400/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
                                id="btn-explore-map"
                            >
                                <Globe size={16} /> Explore Global Map
                            </button>
                            <button
                                onClick={() => onNavigate('contact')}
                                className="bg-white text-slate-900 border-2 border-slate-200 hover:border-amber-400 hover:bg-slate-50 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest active:scale-95 transition-all flex items-center gap-2.5 shadow-xs"
                                id="btn-book-assessment"
                            >
                                Book Free Assessment <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* COLORFUL STATS STRIP */}
            <section className="bg-white border-y border-slate-200/80 py-10 relative z-20 shadow-xs" id="about-stats-strip">
                <div className="container mx-auto px-4 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {/* Partner Unis */}
                    <div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-200/80 text-center space-y-1.5 shadow-xs hover:border-indigo-300 transition-colors">
                        <p className="text-3xl md:text-5xl font-black text-indigo-600 tracking-tight">450+</p>
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Global University Partners</p>
                    </div>
                    {/* Visa Success */}
                    <div className="bg-amber-50/60 p-6 rounded-3xl border border-amber-200 text-center space-y-1.5 shadow-xs hover:border-amber-400 transition-colors">
                        <p className="text-3xl md:text-5xl font-black text-amber-600 tracking-tight">98%</p>
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Visa Success Rate</p>
                    </div>
                    {/* Key Destinations */}
                    <div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-200/80 text-center space-y-1.5 shadow-xs hover:border-purple-300 transition-colors">
                        <p className="text-3xl md:text-5xl font-black text-purple-600 tracking-tight">10+</p>
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Key Study Destinations</p>
                    </div>
                    {/* Personalized Guidance */}
                    <div className="bg-emerald-50/60 p-6 rounded-3xl border border-emerald-200 text-center space-y-1.5 shadow-xs hover:border-emerald-400 transition-colors">
                        <p className="text-3xl md:text-5xl font-black text-emerald-600 tracking-tight">1 on 1</p>
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Personalized Guidance</p>
                    </div>
                </div>
            </section>

            {/* MISSION & VISION SECTION */}
            <section className="py-24 bg-gradient-to-b from-white via-slate-50/60 to-white relative overflow-hidden" id="mission-vision-section">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-4 border bg-amber-100/80 border-amber-300 text-amber-800 shadow-xs">
                            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-[11px] font-black uppercase tracking-widest">
                                Guiding Principles
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-[#1A1F2C] uppercase tracking-tight mb-4" id="heading-mission-vision">
                            Our Core Purpose & Aspirations
                        </h2>
                        <p className="text-slate-600 text-base font-medium leading-relaxed">
                            At Gradway, our foundational tenets guide every interaction with students, parents, and international academic institutions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* OUR MISSION CARD */}
                        <div 
                            className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border-2 border-amber-200/90 flex flex-col justify-between hover:shadow-xl hover:border-amber-400 transition-all duration-300 group" 
                            id="card-our-mission"
                        >
                            <div>
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 rounded-2xl flex items-center justify-center mb-8 shadow-md shadow-amber-400/20 group-hover:scale-110 transition-transform">
                                    <Target size={30} />
                                </div>
                                <h2 className="text-3xl font-black text-[#1A1F2C] uppercase tracking-tight mb-4">
                                    Our Mission
                                </h2>
                                <blockquote className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed mb-6 italic border-l-4 border-amber-500 pl-4 bg-amber-50/60 py-3 rounded-r-xl">
                                    "To provide ethical, transparent, and personalized guidance that turns global education dreams into reality."
                                </blockquote>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                                    We believe that every aspiring student deserves access to accurate, honest, and unbiased information. We eliminate the guesswork from international university admissions and ensure candidates receive custom academic roadmaps tailored to their career aspirations, financial parameters, and personal goals.
                                </p>
                            </div>
                            <div className="pt-6 border-t border-slate-100 space-y-3">
                                <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                                    <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
                                    <span>course matching and genuine fee advisement</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                                    <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
                                    <span>University liaison with fast-tracked offer turnaround</span>
                                </div>
                            </div>
                        </div>

                        {/* OUR VISION CARD */}
                        <div 
                            className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border-2 border-indigo-200/90 flex flex-col justify-between hover:shadow-xl hover:border-indigo-400 transition-all duration-300 group" 
                            id="card-our-vision"
                        >
                            <div>
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                                    <Compass size={30} />
                                </div>
                                <h2 className="text-3xl font-black text-[#1A1F2C] uppercase tracking-tight mb-4">
                                    Our Vision
                                </h2>
                                <blockquote className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed mb-6 italic border-l-4 border-indigo-600 pl-4 bg-indigo-50/60 py-3 rounded-r-xl">
                                    "To become the premier bridge between Sri Lankan talent and world-class academic institutions."
                                </blockquote>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                                    Our vision is to build an ecosystem where ambitious South Asian scholars are recognized and recruited by top-tier global institutions. We strive to be the standard-bearer for ethical migration and education consultancy in Sri Lanka, continuously expanding sustainable pathways, global careers, and innovation.
                                </p>
                            </div>
                            <div className="pt-6 border-t border-slate-100 space-y-3">
                                <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                                    <CheckCircle2 size={16} className="text-indigo-600 shrink-0" />
                                    <span>Equipping Sri Lankan youth with globally recognized degrees</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                                    <CheckCircle2 size={16} className="text-indigo-600 shrink-0" />
                                    <span>Sustainable migration pathways</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTERACTIVE GLOBAL FOOTPRINT - ROTATING EARTH GLOBE SECTION */}
            <section className="py-24 bg-[#F8FAFC] text-slate-900 relative overflow-hidden" id="world-map-destinations">
                <div className="container mx-auto px-4 lg:px-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-4 border bg-amber-100 border-amber-300 text-amber-900 shadow-xs">
                            <Globe size={14} className="text-amber-600" />
                            <span className="text-[11px] font-black uppercase tracking-widest">
                                Interactive Global Footprint
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1A1F2C] mb-4">
                            Our Global Destinations
                        </h2>
                        <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                            Drag in any direction to Explore our university destinations on the globe.  Click to inspect admission criteria, scholarships, Ect.
                        </p>
                    </div>

                    {/* ROTATING EARTH GLOBE CONTAINER (No duplication below) */}
                    <div className="relative bg-white rounded-[3rem] p-4 md:p-10 border border-slate-200/90 shadow-xl max-w-5xl mx-auto">
                        <RotatingEarth 
                            onSelectCountry={(c) => setSelectedCountryId(c.id)}
                            onExploreDestination={handleCountryClick}
                            selectedCountryId={selectedCountryId}
                        />
                    </div>
                </div>
            </section>

            {/* WHY STUDENTS CHOOSE GRADWAY - BENCHMARK PILLARS */}
            <section className="py-24 bg-white relative overflow-hidden" id="why-choose-gradway-section">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-4 border bg-amber-100 border-amber-300 text-amber-900 shadow-xs">
                            <Award size={15} className="text-amber-600" />
                            <span className="text-[11px] font-black uppercase tracking-widest">
                                The Gradway Advantage
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-[#1A1F2C] uppercase tracking-tight mb-4" id="heading-why-choose">
                            Why Students Choose Gradway
                        </h2>
                        <p className="text-slate-600 text-base font-medium leading-relaxed">
                            Modeled after international benchmark standards and industry best practices, we combine deep university intelligence with end-to-end visa and financial compliance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Building2 className="text-amber-600" size={26} />,
                                iconBg: 'bg-amber-100 text-amber-700',
                                borderColor: 'hover:border-amber-400',
                                title: "450+ Accredited Partner Universities",
                                desc: "Direct representation and close institutional ties with top Russell Group, Group of Eight, and German Public universities ensuring expedited application turnaround."
                            },
                            {
                                icon: <ShieldCheck className="text-emerald-600" size={26} />,
                                iconBg: 'bg-emerald-100 text-emerald-700',
                                borderColor: 'hover:border-emerald-400',
                                title: "98% Student Visa Success Rate",
                                desc: "Detailed documentation auditing, genuine student assessment, financial profiling, and 1 on 1 mock interview training."
                            },
                            {
                                icon: <HeartHandshake className="text-indigo-600" size={26} />,
                                iconBg: 'bg-indigo-100 text-indigo-700',
                                borderColor: 'hover:border-indigo-400',
                                title: "100% Ethical & Transparent Process",
                                desc: "No hidden charges, no false promises. We provide realistic, honest advice on actual tuition fees, living costs, and post-study work regulations."
                            },
                            {
                                icon: <GraduationCap className="text-rose-600" size={26} />,
                                iconBg: 'bg-rose-100 text-rose-700',
                                borderColor: 'hover:border-rose-400',
                                title: "Specialized Country Advisors",
                                desc: "Dedicated advisors specialized in complex destinations like Germany (APS certificates, blocked accounts, uni-assist) and the UK (CAS, Graduate Route)."
                            },
                            {
                                icon: <Sparkles className="text-purple-600" size={26} />,
                                iconBg: 'bg-purple-100 text-purple-700',
                                borderColor: 'hover:border-purple-400',
                                title: "Merit Scholarship Mapping",
                                desc: "Thorough profile assessments to unlock university merit discounts, early bird fee waivers, and international academic grants."
                            },
                            {
                                icon: <Plane className="text-teal-600" size={26} />,
                                iconBg: 'bg-teal-100 text-teal-700',
                                borderColor: 'hover:border-teal-400',
                                title: "Pre-Departure & After Arrival",
                                desc: "Guidance on international student bank accounts, SIM cards, flight booking assistance, accommodation search, and networking with fellow Sri Lankan scholars."
                            }
                        ].map((item, idx) => (
                            <div 
                                key={idx} 
                                className={cn(
                                    "bg-slate-50/70 p-8 md:p-10 rounded-[2.5rem] border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all duration-300 group flex flex-col justify-between",
                                    item.borderColor
                                )}
                            >
                                <div>
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xs group-hover:scale-110 transition-transform", item.iconBg)}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-black text-[#1A1F2C] uppercase tracking-tight mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION BANNER (PERFECTLY ALIGNED, HARMONIZED COLORS) */}
            <section className="py-20 bg-slate-50 relative overflow-hidden" id="about-cta-section">
                <div className="container mx-auto px-4 lg:px-12 relative z-10">
                    <div className="max-w-4xl mx-auto rounded-[3rem] p-10 md:p-16 text-center border-2 border-amber-300 bg-gradient-to-br from-amber-50/80 via-white to-amber-100/50 shadow-xl relative overflow-hidden">
                        {/* Subtle decorative glow */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/15 blur-[80px] rounded-full pointer-events-none" />
                        
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1A1F2C] mb-4">
                                Ready to Start Your Study Abroad Journey?
                            </h2>
                            <p className="text-slate-600 text-base md:text-lg mb-8 font-medium leading-relaxed">
                                Book a free one-to-one consultation with our senior education advisors in Colombo to evaluate your profile, explore course options, and plan your application roadmap.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={() => onNavigate('contact')}
                                    className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-400/25 hover:scale-105 active:scale-95 transition-all text-center"
                                    id="btn-about-contact-submit"
                                >
                                    Book Free Assessment
                                </button>
                                <a
                                    href="https://wa.me/94775009929?text=Hi%20Gradway%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20services%20and%20book%20an%20assessment."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                                    id="btn-about-whatsapp"
                                >
                                    <i className="fa-brands fa-whatsapp text-lg" /> WhatsApp Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
