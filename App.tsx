import React, { useState, useEffect, useRef } from 'react';
import { DESTINATIONS, SERVICES, SUCCESS_STORIES, MAIN_FAQ, FULL_FAQ, UK_UNIVERSITIES } from '@/constants';
import { ScrollNavigation } from '@/components/ui/scroll-navigation-menu';
import { OfferCarousel } from '@/components/ui/offer-carousel';
import { StudentSuccessCarousel } from '@/components/ui/student-success-carousel';
import { BentoExperience, GermanyBentoExperience, FranceBentoExperience, IrelandBentoExperience } from '@/components/ui/bento-grid-experience';
import { CanadaBentoExperience } from '@/components/ui/canada-bento-grid';
import { GenericDestinationPage } from '@/components/pages/GenericDestinationPage';
import { GenericBentoExperience } from '@/components/pages/GenericBentoExperience';
import { otherDestinationsData } from '@/data/destinations';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Telescope, Linkedin, Instagram, Facebook, Mail, Phone, MessageSquare, 
    Layers, CheckCircle2, Check, Zap, Heart, X, 
    FileText, ShieldAlert, ArrowUp, RefreshCcw, Shield, MapPin, Clock, 
    TrendingUp, Target, BookOpen, ChevronDown, ChevronLeft, ChevronRight, 
    Loader2, Compass, Train, BadgeCheck, UserCheck, Headset, Handshake, 
    BarChart3, Network, ShieldCheck, Building2, Globe2, Briefcase, ArrowRight, Star, Globe, Plane,
    ArrowUpRight, GraduationCap, CircleCheck, Users, Euro, Play, Palette, History, Utensils
} from 'lucide-react';
import { cn } from '@/lib/utils';
import gradwayLogo from './src/assets/images/gradway-logo.png';

const LOGO_URL = gradwayLogo;
const TIKTOK_URL = "https://www.tiktok.com/@gradway_education?_r=1&_t=ZS-92huBpIVt6y";
const WA_PHONE = "94775009929";
const PHONE_DISPLAY = "+94 77 500 9929";
const WA_PREFILLED_MSG = encodeURIComponent("Hi, I’m interested in studying abroad.\n\nName:\nPreferred Study Country:\nIntended Program / Level:\n\nThank you.");
const WA_LINK = `https://wa.me/${WA_PHONE}?text=${WA_PREFILLED_MSG}`;

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe0osLal3ZHqpy3mMBrtIvA0Xf0TkEFJ8aieLX3bFefI-8pAQ/formResponse";
const FORM_ENTRIES = {
    name: "entry.2104636556",
    phone: "entry.1820781302",
    email: "entry.1675582797",
    programLevel: "entry.1976373844",
    countries: "entry.1757388082",
    fieldOfStudy: "entry.1764432255",
    intake: "entry.957759174",
    message: "entry.1508256747"
};

const GOOGLE_PARTNER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfe7ey8DPdmtWbedIFKxJYBxqTncoLSbrp6vYgYf4zO2sJ3Iw/formResponse";
const PARTNER_FORM_ENTRIES = {
    agencyName: "entry.68479215",
    website: "entry.1681270789",
    contactName: "entry.1216033871",
    jobTitle: "entry.52047501",
    email: "entry.897416871",
    phone: "entry.390589167",
    address: "entry.601026757",
    regions: "entry.2051213170",
    message: "entry.1323148708"
};

const NEWSLETTER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfqVHdpFMQYrR5mdHDuMIkcryqN-V42DIA7W72bJ5AJihGbiw/formResponse";
const NEWSLETTER_ENTRY_ID = "entry.1657033578";

// GERMANY SPECIFIC DATA
const GERMANY_UNIVERSITIES = [
    // Private Business & Management Schools
    { name: "Gisma Business School", location: "Hannover/Berlin", tag: "Global Business", fields: "MBA • Data Science", url: "https://www.gisma.com/", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800", category: "Private Business & Management Schools" },
    { name: "EU Business School", location: "Munich", tag: "International", fields: "Business • Marketing", url: "https://www.euruni.edu/", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800", category: "Private Business & Management Schools" },
    { name: "University of Applied Sciences for Economics and Management (FOM)", location: "Nationwide", tag: "Economics", fields: "Management • Economics", url: "https://www.fom.de/", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800", category: "Private Business & Management Schools" },
    { name: "International School of Management (ISM)", location: "Dortmund", tag: "Management", fields: "Intl Management", url: "https://en.ism.de/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800", category: "Private Business & Management Schools" },
    { name: "CBS International Business School", location: "Cologne", tag: "Business School", fields: "Business Psychology", url: "https://www.cbs.de/en/", image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=800", category: "Private Business & Management Schools" },
    { name: "Munich Business School", location: "Munich", tag: "Leadership", fields: "MBA • DBA", url: "https://www.munich-business-school.de/international", image: "https://images.unsplash.com/photo-1607237138185-efd9571f9d99?q=80&w=800", category: "Private Business & Management Schools" },
    { name: "Berlin School of Business and Innovation (BSBI)", location: "Berlin", tag: "Enterprise", fields: "Tourism • Health", url: "https://www.berlinsbi.com/", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800", category: "Private Business & Management Schools" },
    { name: "New European College", location: "Munich", tag: "Modern", fields: "Business Admin", url: "https://www.new-european-college.com/", image: "https://images.unsplash.com/photo-1506370822645-6a56a10528d2?q=80&w=800", category: "Private Business & Management Schools" },
    { name: "ICN Business School", location: "Berlin Campus", tag: "Creative", fields: "Creative Mgmt", url: "https://www.icn-artem.com/en/campuses/berlin", image: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=800", category: "Private Business & Management Schools" },
    { name: "Karlshochschule International University", location: "Karlsruhe", tag: "Cultural", fields: "Intl Relations", url: "https://karlshochschule.de/en/", image: "https://images.unsplash.com/photo-1498243639351-683ec3f0ad0a?q=80&w=800", category: "Private Business & Management Schools" },
    { name: "EBS University of Business and Law", location: "Wiesbaden", tag: "Elite Business", fields: "Law • Finance", url: "https://www.ebs.edu/en", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800", category: "Private Business & Management Schools" },

    // Specialized Universities of Applied Sciences (Tech, Media & General)
    { name: "Fresenius University of Applied Sciences", location: "Various", tag: "Science", fields: "Chemistry • Bio", url: "https://www.hs-fresenius.com/", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800", category: "Specialized Universities of Applied Sciences (Tech, Media & General)" },
    { name: "Macromedia University of Applied Sciences", location: "Munich", tag: "Media", fields: "Film • Design", url: "https://www.macromedia-university.com/", image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800", category: "Specialized Universities of Applied Sciences (Tech, Media & General)" },
    { name: "SRH University", location: "Heidelberg/Berlin", tag: "Applied", fields: "Engineering • IT", url: "https://www.srh-universities.com/", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800", category: "Specialized Universities of Applied Sciences (Tech, Media & General)" },
    { name: "University of Europe for Applied Sciences (UE)", location: "Berlin/Iserlohn", tag: "Innovation", fields: "Art • Business • Tech", url: "https://www.ue-germany.com/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800", category: "Specialized Universities of Applied Sciences (Tech, Media & General)" },
    { name: "Media Design University of Applied Sciences", location: "Munich", tag: "Digital", fields: "Media Mgmt", url: "https://www.mediadesign.de/", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800", category: "Specialized Universities of Applied Sciences (Tech, Media & General)" },
    { name: "Fachhochschule des Mittelstands (FHM)", location: "Bielefeld", tag: "SME Focus", fields: "Mid-sized Biz", url: "https://www.fh-mittelstand.de/international", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800", category: "Specialized Universities of Applied Sciences (Tech, Media & General)" },
    { name: "Steinbeis University", location: "Berlin", tag: "Transfer", fields: "Tech Mgmt", url: "https://www.steinbeis-hochschule.de/en", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800", category: "Specialized Universities of Applied Sciences (Tech, Media & General)" },
    { name: "Northern Institute of Technology Management (NIT)", location: "Hamburg", tag: "Tech Mgmt", fields: "Technology Management", url: "https://www.nithh.de/", image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800", category: "Specialized Universities of Applied Sciences (Tech, Media & General)" },
    { name: "Munich University of Digital Technology & Applied Sciences", location: "Munich", tag: "Digital Tech", fields: "Digital Technology", url: "https://www.md-h.de/", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800", category: "Specialized Universities of Applied Sciences (Tech, Media & General)" },
    { name: "Constructor University", location: "Bremen", tag: "Research", fields: "Robotics • Physics", url: "https://constructor.university/", image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800", category: "Specialized Universities of Applied Sciences (Tech, Media & General)" },

    // International Universities & Foreign Branch Campuses
    { name: "Arden University", location: "Berlin", tag: "Flexible", fields: "Blended Learning", url: "https://arden.ac.uk/berlin", image: "https://images.unsplash.com/photo-1524178232363-1fb28f74b671?q=80&w=800", category: "International Universities & Foreign Branch Campuses" },
    { name: "Lancaster University", location: "Leipzig", tag: "UK Degree", fields: "Computing • Biz", url: "https://www.lancasterleipzig.de/", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800", category: "International Universities & Foreign Branch Campuses" },
    { name: "Schiller International University", location: "Leipzig", tag: "American", fields: "Intl Relations", url: "https://www.schiller.edu/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800", category: "International Universities & Foreign Branch Campuses" },
    { name: "University Targu Mures Medical Campus", location: "Hamburg", tag: "Medical", fields: "Medicine", url: "https://edu.umch.de/en/", image: "https://images.unsplash.com/photo-1516549655169-df83a0833860?q=80&w=800", category: "International Universities & Foreign Branch Campuses" },
    { name: "Rahn Education Studienkolleg", location: "Leipzig", tag: "Pathway", fields: "Studienkolleg", url: "https://rahn.education/en/", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800", category: "International Universities & Foreign Branch Campuses" },
];


// Program Levels & Fields matching the form requirements
const PROGRAM_LEVELS = ["Foundation", "Undergraduate", "Pre Master", "Post Graduate"];
const FIELDS_OF_STUDY = [
    "Medicine & Health Sciences", "Engineering & Technology", "Business & Management",
    "Information Technology & Computer Science", "Law & Legal Studies", "Arts & Humanities",
    "Social Sciences", "Natural Sciences", "Architecture & Design", "Education & Teaching",
    "Hospitality & Tourism", "Other"
];

const StudentsFirstIcon = ({ className }: { className?: string }) => (
    <Heart className={cn("w-full h-full text-[#FF4D4D] fill-[#FF4D4D]", className)} strokeWidth={1} />
);

const SectionBadge = ({ text, lightVariant, amberOutline }: any) => (
    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 border ${lightVariant
        ? 'bg-white/10 border-white/10'
        : amberOutline
            ? 'bg-amber-100 border-amber-200'
            : 'bg-slate-100 border-slate-200'}`}>
        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
        <span className={`text-[10px] font-black uppercase tracking-widest ${lightVariant
            ? 'text-white'
            : amberOutline
                ? 'text-amber-600'
                : 'text-[#1A1F2C]'}`}>
            {text}
        </span>
    </div>
);

const CustomDropdown = ({ label, value, options, onChange, placeholder, className }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownId = React.useId();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node))
                setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={cn("space-y-1 relative", className)} ref={containerRef}>
            <label id={`${dropdownId}-label`} className="text-[9px] font-black uppercase tracking-widest text-slate-600 ml-4">{label}</label>
            <button 
                type="button" 
                id={`${dropdownId}-btn`}
                aria-haspopup="listbox" 
                aria-expanded={isOpen} 
                aria-labelledby={`${dropdownId}-label ${dropdownId}-btn`}
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none text-left text-sm font-medium flex items-center justify-between hover:bg-slate-100 transition-all focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500 focus-visible:bg-white"
            >
                <span className={!value ? "text-slate-500" : "text-slate-800 font-semibold"}>{value || placeholder || "Select option"}</span>
                <ChevronDown size={14} className={cn("transition-transform duration-300", isOpen && "rotate-180")} aria-hidden="true" />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        role="listbox" 
                        aria-labelledby={`${dropdownId}-label`}
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: 10 }} 
                        className="absolute z-[100] left-0 right-0 top-[110%] bg-white border border-slate-100 rounded-3xl shadow-2xl p-2 max-h-[200px] overflow-y-auto custom-scrollbar"
                    >
                        {options.map((opt: string) => (
                            <button 
                                key={opt} 
                                type="button" 
                                role="option"
                                aria-selected={value === opt}
                                onClick={() => { onChange(opt); setIsOpen(false); }} 
                                className={cn("flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-left group hover:bg-amber-50 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none", value === opt ? "bg-amber-50 text-amber-700 font-bold" : "text-slate-700")}
                            >
                                <span className="text-xs font-bold uppercase tracking-wider">{opt}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQAccordion = ({ items }: any) => {
    const [openId, setOpenId] = useState<number | null>(null);
    return (
        <div className="space-y-4" role="region" aria-label="FAQ Accordion">
            {items.map((faq: any) => {
                const btnId = `faq-btn-${faq.id}`;
                const panelId = `faq-panel-${faq.id}`;
                const isExpanded = openId === faq.id;
                return (
                    <div key={faq.id} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm transition-all hover:shadow-md">
                        <button 
                            id={btnId}
                            aria-expanded={isExpanded}
                            aria-controls={panelId}
                            onClick={() => setOpenId(isExpanded ? null : faq.id)} 
                            className="w-full px-8 py-6 flex items-center justify-between text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                        >
                            <span className="font-black text-slate-800 text-sm md:text-base leading-tight pr-4 tracking-tight">{faq.question}</span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isExpanded ? 'bg-amber-500 text-white rotate-45' : 'bg-slate-100 text-slate-600 group-hover:bg-amber-100 group-hover:text-amber-700'}`}>
                                <i className="fa-solid fa-plus text-xs" aria-hidden="true" />
                            </div>
                        </button>
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div 
                                    id={panelId}
                                    role="region"
                                    aria-labelledby={btnId}
                                    initial={{ height: 0, opacity: 0 }} 
                                    animate={{ height: 'auto', opacity: 1 }} 
                                    exit={{ height: 0, opacity: 0 }} 
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    <div className="px-8 pb-8 text-slate-600 text-sm font-medium leading-relaxed border-t border-slate-50 pt-6">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};

const NumberedSection = ({ num, title, color = 'amber' }: any) => (
    <h4 className="font-black text-[#1A1F2C] text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
        <span className={cn("w-8 h-8 rounded-lg text-white flex items-center justify-center text-[10px] shrink-0 transition-colors", color === 'amber' ? "bg-amber-500" :
            color === 'blue' ? "bg-blue-600" :
                color === 'emerald' ? "bg-emerald-600" :
                    color === 'red' ? "bg-red-600" :
                        "bg-indigo-500")}>{num}</span>
        {title}
    </h4>
);

const ServiceCardRenderer = ({ service, scrollToId }: any) => {
    const renderContent = () => {
        switch (service.id) {
            case 1:
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {[
                            { icon: <Target className="text-blue-500" />, label: "Academic Audit", text: "In-depth analysis of your academics for global mapping." },
                            { icon: <BookOpen className="text-amber-500" />, label: "English Language Proficiency", text: "Guidance on meeting Language requirements for top institutions." },
                            { icon: <TrendingUp className="text-emerald-500" />, label: "Strategic Roadmap", text: "A future-proof road to academic and professional success in your dream destination" }
                        ].map((pillar: any, i) => (
                            <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col gap-4 hover:scale-105 transition-all duration-300 hover:shadow-lg active:scale-95 cursor-default group/pillar">
                                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover/pillar:bg-white transition-colors">{pillar.icon}</div>
                                <h4 className="font-black text-[#1A1F2C] text-xs uppercase tracking-widest">{pillar.label}</h4>
                                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{pillar.text}</p>
                            </div>
                        ))}
                    </div>
                );
            case 2:
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl">
                                <h4 className="font-black text-amber-600 uppercase text-[10px] tracking-widest Global Matching Index">Global Matching Index</h4>
                                <p className="text-slate-600 text-xs font-medium leading-relaxed">We provide cross-destination intelligence, comparing UK, Canada, Australia and many more based on your specific budget and career path.</p>
                            </div>
                            <ul className="grid grid-cols-1 gap-3">
                                {["Scholarship Eligibility Checks", "Post-Study Work Opportunity Audits", "Campus Environment Assessments"].map((point) => (
                                    <li key={point} className="flex items-center gap-3 text-[11px] font-bold text-slate-700">
                                        <Check size={14} className="text-amber-500" /> {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-[#1A1F2C] p-8 rounded-[3rem] text-white flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 blur-[80px] rounded-full" />
                            <h5 className="text-2xl font-black uppercase tracking-tight mb-4">Precision Matching</h5>
                            <p className="text-slate-400 text-[11px] leading-relaxed italic">"Our goal is to ensure you don't just get a degree, but the right platform for your future professional life."</p>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="flex flex-col gap-8">
                        <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                            <div className="flex items-start justify-between mb-8">
                                <h4 className="font-black text-[#1A1F2C] uppercase tracking-widest text-xs">Submission Quality Standards</h4>
                                <CheckCircle2 className="text-emerald-500" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stage 01</span>
                                    <p className="text-sm font-bold text-slate-800 tracking-tight">Document Audit</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stage 02</span>
                                    <p className="text-sm font-bold text-slate-800 tracking-tight">SOP Making/Editing</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stage 03</span>
                                    <p className="text-sm font-bold text-slate-800 tracking-tight">Verification</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stage 04</span>
                                    <p className="text-sm font-bold text-slate-800 tracking-tight">Submission and Tracking</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="bg-emerald-500 text-white p-10 rounded-[3rem] shadow-lg">
                            <Zap className="mb-6" />
                            <h4 className="text-3xl font-black uppercase tracking-tight mb-4 leading-tight">Live Confidence Simulation</h4>
                            <p className="text-emerald-50 text-sm leading-relaxed font-medium">We conduct mock interviews for both university admission boards and visa officers, giving you the edge in communication and poise.</p>
                        </div>
                        <div className="space-y-6 px-4">
                            <div className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                    <Clock size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-[#1A1F2C]">Intensive Drill Sessions</p>
                                    <p className="text-[11px] text-slate-500">Master frequently asked visa questions.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                    <MessageSquare size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-[#1A1F2C]">Expert Feedback</p>
                                    <p className="text-[11px] text-slate-500">Direct critique on the answers and tips to improve.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="bg-[#1A1F2C] text-white p-10 md:p-14 rounded-[4rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[100px] rounded-full" />
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <Shield className="text-rose-500" />
                                    <h4 className="text-2xl font-black uppercase tracking-tight">Migration Compliance</h4>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">We offer end-to-end visa application and preparation guidance, covering Sri Lankan banking requirements, documentation, and compliance with student visa regulations across global destinations.</p>
                            </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors">
                                    <span className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-black">1</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Financial Check</span>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors">
                                    <span className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-black">2</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Immigration Check</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Foundation & Pathway", text: "Ideal for students looking for alternative entry points into top-tier global campuses." },
                            { title: "Direct Undergraduate", text: "Direct admission support for students across multiple global destinations." },
                            { title: "Direct Post-Graduate", text: "Strategic guidance for professionals and graduates aiming for Master's degree and graduate Programs globally." }
                        ].map((route, idx) => (
                            <div key={idx} className="p-8 bg-violet-50 rounded-[2.5rem] border border-violet-100 hover:scale-105 transition-transform duration-300">
                                <Layers className="text-violet-500 mb-4" size={24} />
                                <h5 className="font-black text-[#1A1F2C] text-xs uppercase tracking-widest mb-2">{route.title}</h5>
                                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{route.text}</p>
                            </div>
                        ))}
                    </div>
                );
            case 7:
                return (
                    <div className="space-y-10">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1 space-y-4">
                                <h4 className="text-xl font-black uppercase tracking-widest text-[#1A1F2C]">The 360° Arrival Promise</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">Transitioning from Colombo to global capitals shouldn't be scary. We manage the details so you focus on your first week of lectures.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-16 h-16 bg-teal-500 text-white rounded-2xl flex items-center justify-center shadow-lg"><MapPin /></div>
                                <div className="w-16 h-16 bg-teal-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><Globe /></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Flight Booking', 'Sim Cards', 'Bank Opening', 'accommodation'].map((item) => (
                                <div key={item} className="px-2 md:px-4 py-4 bg-white border border-slate-100 rounded-2xl text-[8px] sm:text-[9px] font-black uppercase tracking-tight text-slate-400 text-center shadow-sm flex items-center justify-center overflow-hidden whitespace-nowrap">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <div id={`service-${service.id}`} className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-xl border border-slate-100 flex flex-col md:flex-row gap-12 items-start hover:shadow-2xl transition-all overflow-hidden group scroll-mt-24">
            <div className={`w-24 h-24 ${service.iconBg} ${service.iconColor} rounded-[2.5rem] flex items-center justify-center text-5xl shrink-0 shadow-lg border border-white group-hover:scale-110 transition-transform`}>
                <i className={service.icon} />
            </div>
            <div className="flex-1 space-y-10">
                <div>
                    <h2 className="text-4xl font-black text-[#1A1F2C] mb-4 uppercase tracking-tight">{service.title}</h2>
                    <div className="h-1.5 w-24 bg-amber-500 rounded-full mb-8" />
                </div>
                {renderContent()}
                <button onClick={() => scrollToId('contact')} className="bg-[#1A1F2C] text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-amber-500 active:scale-95 transition-all inline-flex items-center gap-3">
                    Book a Consultation <i className="fa-solid fa-arrow-right" />
                </button>
            </div>
        </div>
    );
};

const LegalModal = ({ type, onClose }: any) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape')
                onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);
    if (type === 'none')
        return null;
    const LegalFooter = ({ colorClass = 'text-amber-500', sectionNum = "12", sectionColor = "blue" }: any) => (
        <section className="pt-10 border-t border-slate-100 text-center space-y-8 pb-16">
            <div>
                <NumberedSection num={sectionNum} title="Contact Information" color={sectionColor} />
                <p className={cn("font-black uppercase tracking-tight text-2xl mb-1", sectionColor === 'amber' ? "text-amber-500" :
                    sectionColor === 'emerald' ? "text-emerald-600" :
                        "text-[#1A1F2C]")}>Gradway (Pvt) Limited</p>
                <p className="font-bold text-slate-600 text-[13px] mb-8">Reach us at info@gradwayedu.com</p>
            </div>
            <hr className="border-slate-100 w-full mx-auto" />
            <div className="flex flex-row justify-center items-center gap-6 md:gap-10 px-4">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-whatsapp" /></a>
                <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-facebook" /></a>
                <a href="https://www.instagram.com/gradway_education" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-instagram" /></a>
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="text-black hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-tiktok" /></a>
                <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-linkedin" /></a>
            </div>
            <div className="flex flex-col items-center leading-tight pt-4">
                <span className="text-[10px] font-black text-[#1A1F2C] uppercase tracking-[0.3em]">Migration</span>
                <span className={cn("text-[10px] font-black uppercase tracking-[0.3em]", colorClass)}>Simplified!!</span>
            </div>
        </section>
    );
    const privacyBody = (
        <div className="space-y-12 text-slate-600 text-[13px] md:text-sm leading-relaxed font-medium">
            <div className="text-center border-b border-slate-100 pb-10">
                <h4 className="text-4xl font-black text-[#1A1F2C] uppercase tracking-tight mb-2">Privacy Policy</h4>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Gradway (Private) Limited</p>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Education Consultancy Services – Sri Lanka</p>
                <p className="text-[10px] font-bold text-slate-400 mt-6 bg-slate-50 inline-block px-4 py-1.5 rounded-full">Last Updated: 01/01/2026</p>
            </div>
            <p className="text-sm font-medium text-slate-600">Gradway (Private) Limited (“Gradway”, “we”, “our”, or “us”) is committed to protecting the privacy, confidentiality, and security of personal data entrusted to us. This Privacy Policy explains how personal data is collected, used, disclosed, stored, and protected in accordance with the Personal Data Protection Act No. 9 of 2022 of Sri Lanka, and in line with internationally accepted data protection principles.</p>
            <p className="text-sm font-medium text-slate-600">By accessing our website, submitting enquiries, or engaging our services, you acknowledge that you have read and understood this Privacy Policy and consent to the practices described herein.</p>

            <section>
                <NumberedSection num="1" title="Information Collection" color="amber" />
                <p className="mb-4">We collect personal data only where it is lawful, necessary, and proportionate for the provision of education consultancy services.</p>
                <p className="mb-4">The categories of personal data we may collect include:</p>
                <div className="space-y-4 ml-4">
                    <div>
                        <p className="font-bold text-[#1A1F2C] text-xs uppercase mb-1">Personal and Contact Information</p>
                        <p>Full name, date of birth, nationality, residential address, email address, phone number, passport and identification details (where required).</p>
                    </div>
                    <div>
                        <p className="font-bold text-[#1A1F2C] text-xs uppercase mb-1">Academic and Professional Information</p>
                        <p>Academic history, qualifications, transcripts, certificates, English language test results (IELTS, TOEFL, etc.), employment history, curriculum vitae, portfolios, and references (where applicable).</p>
                    </div>
                    <div>
                        <p className="font-bold text-[#1A1F2C] text-xs uppercase mb-1">Financial and Compliance Information</p>
                        <p>Proof of financial capacity, sponsorship details, payment records, visa and immigration documentation, police clearance certificates, and health-related information strictly where required for applications.</p>
                    </div>
                    <div>
                        <p className="font-bold text-[#1A1F2C] text-xs uppercase mb-1">Communication and Technical Information</p>
                        <p>Records of consultations and correspondence, IP address, browser and device details, website usage data, cookies, and analytics information used to ensure functionality, security, and service improvement.</p>
                    </div>
                </div>
                <p className="mt-4">We do not collect personal data that is unrelated to the delivery of our services.</p>
            </section>

            <section>
                <NumberedSection num="2" title="Consent" color="amber" />
                <p className="mb-4">Personal data is collected and processed with your explicit and informed consent, except where processing is otherwise permitted or required by law.</p>
                <p className="mb-4">Consent is deemed to be provided when you:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Submit enquiry or application forms</li>
                    <li>Contact us via email, phone, or messaging platforms</li>
                    <li>Book or attend consultations</li>
                    <li>Provide documentation for academic or visa processing</li>
                    <li>Proceed with or confirm engagement of our services</li>
                </ul>
                <p className="mb-4">You acknowledge that:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Certain personal data is essential to assess eligibility and process applications</li>
                    <li>Processing is required to comply with institutional, immigration, and regulatory obligations</li>
                    <li>Withdrawal of consent may restrict or prevent continuation of services where processing is necessary to fulfil those obligations</li>
                </ul>
                <p>You may withdraw consent at any time by contacting us in writing. Withdrawal will not affect processing already lawfully carried out.</p>
            </section>

            <section>
                <NumberedSection num="3" title="Use of Personal Data" color="amber" />
                <p className="mb-4">Personal data collected by Gradway is used solely for lawful and specified purposes, including:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Academic assessment and education pathway planning</li>
                    <li>Course, institution, and destination recommendations</li>
                    <li>Preparation and submission of applications</li>
                    <li>Visa and immigration guidance and documentation support</li>
                    <li>Communication of updates, requirements, and outcomes</li>
                    <li>Internal record-keeping for compliance, quality assurance, and dispute resolution</li>
                </ul>
                
                <div className="mt-8">
                    <p className="font-bold text-[#1A1F2C] text-sm mb-4">3.1 Use of Information for Marketing and Success Announcements</p>
                    <p className="mb-4">Gradway may share general success updates related to admissions or visa outcomes for informational and promotional purposes, to demonstrate service experience and track record.</p>
                    <p className="mb-4">Such disclosures are limited, proportionate, and handled responsibly.</p>
                    <p className="mb-4">Without additional consent, Gradway may share only general, non-sensitive information, including:</p>
                    <ul className="list-disc ml-8 mb-4 space-y-1 text-xs">
                        <li>Name of applicant</li>
                        <li>Confirmation that a visa or admission has been granted</li>
                        <li>Destination country</li>
                        <li>Name of the institution and programme applied for</li>
                        <li>Type or level of programme or visa</li>
                        <li>Date on which the visa or admission was granted</li>
                        <li>Validity period of the visa, where applicable</li>
                    </ul>
                    <p className="mb-4">With explicit prior consent from the student, Gradway may additionally share:</p>
                    <ul className="list-disc ml-8 mb-4 space-y-1 text-xs">
                        <li>Photographs or videos taken for promotional or marketing purposes</li>
                        <li>Testimonials or statements provided voluntarily by the student</li>
                    </ul>
                    <p className="mb-4">Gradway does not publish passport numbers, identification numbers, full dates of birth, contact details, financial information, academic records, immigration documents, or any other sensitive personal data.</p>
                    <p>Consent for promotional use is obtained separately and may be withdrawn at any time. Withdrawal will apply only to future promotional use and will not affect content already lawfully published.</p>
                </div>
                <p className="mt-4">Personal data is not used for purposes incompatible with those stated above.</p>
            </section>

            <section>
                <NumberedSection num="4" title="Disclosure to Third Parties" color="amber" />
                <p className="mb-4">Personal data is disclosed only where necessary and lawful, and only to authorized parties directly involved in the study abroad process, including:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Universities, colleges, and education providers</li>
                    <li>Embassies, visa offices, and immigration authorities</li>
                    <li>Official application, verification, and compliance platforms</li>
                    <li>Authorized service providers supporting documentation or processing</li>
                </ul>
                <p>Gradway does not sell, rent, trade, or disclose personal data to marketing agencies, advertisers, or unrelated third parties.</p>
            </section>

            <section>
                <NumberedSection num="5" title="Cross-Border Data Transfers" color="amber" />
                <p className="mb-4">As an international education consultancy, personal data may be transferred outside Sri Lanka to institutions or authorities in destination countries.</p>
                <p className="mb-4">Such transfers:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Occur only where required for admissions or visa processing</li>
                    <li>Are limited to recognized institutions and authorities</li>
                    <li>Are carried out with appropriate safeguards to ensure data protection</li>
                </ul>
            </section>

            <section>
                <NumberedSection num="6" title="Data Retention" color="amber" />
                <p className="mb-4">Personal data is retained only for as long as necessary to:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Deliver consultancy services</li>
                    <li>Meet institutional, regulatory, or legal requirements</li>
                    <li>Maintain records for compliance and dispute resolution</li>
                </ul>
                <p>Once no longer required, data is securely deleted, anonymised, or archived in accordance with lawful retention practices.</p>
            </section>

            <section>
                <NumberedSection num="7" title="Data Security" color="amber" />
                <p className="mb-4">We implement appropriate technical and administrative to protect personal data, including controlled document handling, and access limited to authorised personnel only.</p>
                <p>While reasonable measures are taken, no system can be guaranteed to be entirely secure.</p>
            </section>

            <section>
                <NumberedSection num="8" title="Cookies and Website Usage" color="amber" />
                <p>Our website may use cookies and analytics tools to improve performance, understand user interaction, and enhance user experience. Users may manage cookie preferences through their browser settings.</p>
            </section>

            <section>
                <NumberedSection num="9" title="Rights of Data Subjects" color="amber" />
                <p className="mb-4">In accordance with applicable law, you may request:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Access to personal data held by us</li>
                    <li>Correction of inaccurate or incomplete data</li>
                    <li>Deletion of personal data, subject to legal and service obligations</li>
                    <li>Restriction of certain processing activities</li>
                </ul>
                <p>Requests may be made using the contact details below. Identity verification may be required.</p>
            </section>

            <section>
                <NumberedSection num="10" title="Children and Minors" color="amber" />
                <p>Where services are provided to individuals under 18 years of age, verifiable parental or guardian consent is required. Only personal data necessary for service delivery is processed, and parents or guardians may request access to or correction of the minor’s data.</p>
            </section>

            <section>
                <NumberedSection num="11" title="Third-Party Websites" color="amber" />
                <p>Our website may contain links to external websites. Gradway is not responsible for the content, security, or privacy practices of third-party sites.</p>
            </section>

            <section>
                <NumberedSection num="12" title="Changes to This Policy" color="amber" />
                <p>This Privacy Policy may be updated periodically to reflect legal, regulatory, or operational changes. Updated versions will be published on our website. Continued use of our services constitutes acceptance of the revised policy.</p>
            </section>

            <LegalFooter colorClass="text-amber-500" sectionNum="13" sectionColor="amber" />
        </div>
    );
    const tosBody = (
        <div className="space-y-12 text-slate-600 text-[13px] md:text-sm leading-relaxed font-medium">
            <div className="text-center border-b border-slate-100 pb-10">
                <h4 className="text-4xl font-black text-[#1A1F2C] uppercase tracking-tight mb-2">Terms of Service</h4>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Gradway (Private) Limited</p>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Education Consultancy Services – Sri Lanka</p>
                <p className="text-[10px] font-bold text-slate-400 mt-6 bg-slate-50 inline-block px-4 py-1.5 rounded-full">Effective Date: 01/01/2026</p>
            </div>
            <p className="text-base font-semibold text-[#1A1F2C]">These Terms of Service (“Terms”) govern the access to and use of services provided by Gradway (Private) Limited (“Gradway”, “we”, “our”, or “us”). By accessing our website, engaging in consultations, submitting information, or using any of our services, you agree to be bound by these Terms in their entirety.</p>

            <section>
                <NumberedSection num="1" title="Scope of Services" color="blue" />
                <p className="mb-4">Gradway provides professional education consultancy services, which may include:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Academic profile assessment and counselling</li>
                    <li>Course, institution, and destination guidance</li>
                    <li>Application preparation and submission support</li>
                    <li>Student visa and migration-related documentation guidance</li>
                    <li>Pre-departure and post-arrival advisory support</li>
                </ul>
                <p className="mb-4">Gradway acts solely as an advisory and facilitation service provider. All final decisions regarding admissions, visas, immigration approvals, scholarships, enrolment conditions, or timelines are made exclusively by universities, colleges, embassies, and immigration authorities.</p>
                <p>Gradway does not have the authority to influence, guarantee, or override such decisions.</p>
            </section>

            <section>
                <NumberedSection num="2" title="Client Responsibilities and Accuracy of Information" color="blue" />
                <p className="mb-4">Clients are solely responsible for ensuring that all information and documentation provided to Gradway is:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Accurate, complete, and truthful</li>
                    <li>Authentic and verifiable</li>
                    <li>Submitted within the timelines communicated</li>
                </ul>
                <p className="mb-4">This includes, but is not limited to, academic records, financial documents, identity documents, and visa-related information.</p>
                <p className="mb-4">Submission of false, misleading, altered, or fraudulent information may result in immediate termination of services without refund, and Gradway reserves the right to withdraw representation without further obligation.</p>
                <p>Gradway shall not be liable for outcomes arising from inaccurate, incomplete, or delayed information provided by the client.</p>
            </section>

            <section>
                <NumberedSection num="3" title="No Guarantee of Outcomes" color="blue" />
                <p className="mb-4">While Gradway provides professional guidance and maintains quality standards, no guarantees are made or implied regarding:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Admission Outcome</li>
                    <li>Visa approvals</li>
                    <li>Processing timelines</li>
                    <li>Scholarships or funding</li>
                    <li>Employment or post-study outcomes</li>
                </ul>
                <p>Outcomes are subject to external factors beyond Gradway’s control, including institutional criteria, immigration regulations, policy changes, and individual applicant profiles.</p>
            </section>

            <section>
                <NumberedSection num="4" title="Fees and Third-Party Costs" color="blue" />
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Consultancy fees, where applicable, will be communicated separately</li>
                    <li>Fees paid to Gradway are generally non-refundable unless explicitly stated in writing</li>
                    <li>Third-party costs (including application fees, visa fees, medical tests, courier charges, and institutional deposits) are payable by the client and are not controlled by Gradway</li>
                </ul>
                <p>Gradway is not responsible for changes in third-party fees, refund policies, or payment timelines.</p>
            </section>

            <section>
                <NumberedSection num="5" title="Limitation of Liability" color="blue" />
                <p className="mb-4">To the fullest extent permitted by law:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Gradway shall not be liable for indirect, incidental, consequential, or economic losses</li>
                    <li>Gradway’s liability, if any, shall be limited to the amount paid to Gradway for consultancy services</li>
                </ul>
                <p className="mb-4">Gradway shall not be responsible for losses arising from:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Visa refusals or delays</li>
                    <li>Admission denials</li>
                    <li>Policy or regulatory changes</li>
                    <li>Decisions or actions of universities, embassies, or authorities</li>
                </ul>
            </section>

            <section>
                <NumberedSection num="6" title="Confidentiality and Data Use" color="blue" />
                <p className="mb-4">Gradway handles personal information in accordance with its Privacy Policy. Client data is used strictly for service delivery, compliance, communication, and lawful operational purposes.</p>
                <p>Clients consent to the sharing of necessary information with relevant institutions and authorities as required to provide services.</p>
            </section>

            <section>
                <NumberedSection num="7" title="Intellectual Property" color="blue" />
                <p className="mb-4">All original content created by Gradway, including website text, service descriptions, layouts, branding elements, graphics, process explanations, and proprietary materials, is the intellectual property of Gradway (Private) Limited unless otherwise stated.</p>
                <p className="mb-6">Unauthorized reproduction, distribution, or misuse of Gradway’s original content is prohibited.</p>
                
                <div className="mt-8 bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100">
                    <p className="font-bold text-[#1A1F2C] text-sm mb-4">7.1 Logo Usage and Fair Use Disclaimer</p>
                    <p className="mb-4">University names, institutional names, logos, trademarks, crests, and brand identifiers displayed on this website are the property of their respective owners.</p>
                    <p className="mb-4">Such logos and identifiers are used by Gradway solely for informational and reference purposes, including identifying study destinations, institutions, and publicly available academic pathways.</p>
                    <p className="mb-4 font-semibold uppercase text-[10px] tracking-widest text-blue-600">Use of such logos does not imply:</p>
                    <ul className="list-disc ml-8 mb-4 space-y-1">
                        <li>Any official partnership, sponsorship, or endorsement</li>
                        <li>Exclusive representation or authority to act on behalf of the institution</li>
                    </ul>
                    <p>Gradway does not alter or misrepresent third-party logos. All usage is intended to fall within accepted principles of fair use and nominative reference. Rights holders may contact Gradway to request review or removal where appropriate.</p>
                </div>
            </section>

            <section>
                <NumberedSection num="8" title="Suspension or Termination of Services" color="blue" />
                <p className="mb-4">Gradway reserves the right to suspend or terminate services without liability where:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1 text-xs uppercase font-bold tracking-wider">
                    <li>False or misleading information is provided</li>
                    <li>Required documentation is withheld</li>
                    <li>These Terms or ethical standards are violated</li>
                    <li>Client conduct is abusive, unlawful, or obstructive</li>
                </ul>
                <p className="mt-4">Termination does not relieve the client of any outstanding obligations.</p>
            </section>

            <section>
                <NumberedSection num="9" title="Amendments to Terms" color="blue" />
                <p className="mb-4">Gradway reserves the right to modify these Terms at any time. Updated Terms will be published on our website and take effect immediately upon publication.</p>
                <p>Continued use of our services constitutes acceptance of the revised Terms.</p>
            </section>

            <section>
                <NumberedSection num="10" title="Governing Law and Jurisdiction" color="blue" />
                <p className="mb-4">These Terms shall be governed by and construed in accordance with the laws of the Democratic Socialist Republic of Sri Lanka.</p>
                <p>Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Colombo, Sri Lanka.</p>
            </section>

            <section>
                <NumberedSection num="11" title="Acceptance of Terms" color="blue" />
                <p>Engaging with Gradway staff, booking consultations, submitting documents, proceeding with profile reviews or receiving any services from us constitutes full and unconditional acceptance of these Terms of Service.</p>
            </section>

            <LegalFooter colorClass="text-blue-600" sectionNum="12" sectionColor="blue" />
        </div>
    );
    const refundBody = (
        <div className="space-y-12 text-slate-600 text-[13px] md:text-sm leading-relaxed font-medium">
            <div className="text-center border-b border-slate-100 pb-10">
                <h4 className="text-4xl font-black text-[#1A1F2C] uppercase tracking-tight mb-2">Refund & Cancellation</h4>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Gradway (Private) Limited</p>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Education Consultancy Services – Sri Lanka</p>
                <p className="text-[10px] font-bold text-slate-400 mt-6 bg-slate-50 inline-block px-4 py-1.5 rounded-full">Effective Date: 01/01/2026</p>
            </div>
            <p className="text-base font-semibold text-[#1A1F2C]">This Refund & Cancellation Policy outlines the conditions under which refunds, cancellations, and service withdrawals are handled by Gradway (Private) Limited (“Gradway”, “we”, “our”, or “us”). By engaging our services, you acknowledge and agree to the terms set out below.</p>
            
            <section>
                <NumberedSection num="1" title="Nature of Consultancy Services" color="emerald" />
                <p className="mb-4">Gradway provides professional education consultancy and advisory services. These services involve time, expertise, planning, document review, communication with institutions, and strategic guidance.</p>
                <p className="mb-4 font-semibold text-[#1A1F2C]">As such:</p>
                <ul className="list-disc ml-8 space-y-1">
                    <li>Consultancy services are intangible and time-based</li>
                    <li>Value is delivered progressively from the commencement of engagement</li>
                    <li>Outcomes are influenced by third parties such as universities and embassies</li>
                </ul>
            </section>

            <section>
                <NumberedSection num="2" title="Refund Policy" color="emerald" />
                <div className="mt-4">
                    <p className="font-bold text-[#1A1F2C] text-sm mb-2">2.1 General Rule</p>
                    <p className="mb-4">Unless explicitly agreed in writing, fees paid to Gradway are non-refundable once services have commenced.</p>
                    <p className="mb-4">This includes, but is not limited to:</p>
                    <ul className="list-disc ml-8 mb-4 space-y-1 text-xs">
                        <li>Profile evaluations and counselling sessions</li>
                        <li>Course and university mapping</li>
                        <li>Application preparation or submission</li>
                        <li>Visa guidance and documentation support</li>
                        <li>Communication with institutions or authorities</li>
                    </ul>
                </div>
                <div className="mt-8">
                    <p className="font-bold text-[#1A1F2C] text-sm mb-2">2.2 Non-Refundable Circumstances</p>
                    <p className="mb-4">Refunds will not be issued in the following situations:</p>
                    <ul className="list-disc ml-8 mb-4 space-y-1 text-xs">
                        <li>Change of mind by the client</li>
                        <li>Visa refusal or application rejection</li>
                        <li>Admission denial by an institution</li>
                        <li>Delays caused by third parties</li>
                        <li>Changes in immigration or institutional policies</li>
                        <li>Client’s failure to provide accurate, complete, or timely information</li>
                        <li>Client withdrawal after services have commenced</li>
                        <li>Termination due to submission of false or misleading documents</li>
                    </ul>
                </div>
                <div className="mt-8">
                    <p className="font-bold text-[#1A1F2C] text-sm mb-2">2.3 Exceptional Refunds</p>
                    <p className="mb-4">In limited and exceptional circumstances, Gradway may consider a refund at its sole discretion, provided that:</p>
                    <ul className="list-disc ml-8 mb-4 space-y-1 text-xs">
                        <li>The request is submitted in writing</li>
                        <li>Services have not commenced</li>
                        <li>No third-party costs have been incurred</li>
                        <li>Approval is provided explicitly by Gradway management</li>
                    </ul>
                    <p className="mt-4 font-bold text-emerald-600 uppercase text-[10px] tracking-widest">Any approved refund:</p>
                    <p className="ml-4 italic text-xs">Will be processed within a reasonable timeframe</p>
                </div>
            </section>

            <section>
                <NumberedSection num="3" title="Third-Party Fees and Payments" color="emerald" />
                <p className="mb-4">Fees paid to third parties are non-refundable and are governed by the policies of those entities.</p>
                <p className="mb-4">This includes:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>University or college application fees</li>
                    <li>Visa application fees</li>
                    <li>Medical examination fees</li>
                    <li>Courier, translation, or certification charges</li>
                </ul>
                <p>Gradway does not control third-party refund decisions and bears no liability for such costs.</p>
            </section>

            <section>
                <NumberedSection num="4" title="Cancellation by the Client" color="emerald" />
                <p className="mb-4">Clients may cancel services by providing written notice to Gradway.</p>
                <p className="mb-4 font-semibold text-[#1A1F2C]">However:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Cancellation does not automatically entitle the client to a refund</li>
                    <li>Outstanding balances, if any, remain payable</li>
                </ul>
            </section>

            <section>
                <NumberedSection num="5" title="Cancellation or Termination by Gradway" color="emerald" />
                <p className="mb-4">Gradway reserves the right to suspend or terminate services without refund where:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1 text-xs uppercase font-bold tracking-wider">
                    <li>False, fraudulent, or misleading information is provided</li>
                    <li>Required documentation is withheld or delayed</li>
                    <li>Client conduct is abusive, unethical, or unlawful</li>
                    <li>Terms of Service or policies are breached</li>
                </ul>
                <p className="mt-4">Such termination does not waive any outstanding payment obligations.</p>
            </section>

            <section>
                <NumberedSection num="6" title="No Guarantee Clause" color="emerald" />
                <p className="mb-4">Refunds are not linked to outcomes. Gradway does not guarantee:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Admission outcomes</li>
                    <li>Visa approvals</li>
                    <li>Processing timelines</li>
                    <li>Scholarships or funding</li>
                </ul>
                <p className="mt-4">Unfavourable outcomes do not constitute grounds for refunds.</p>
            </section>

            <section>
                <NumberedSection num="7" title="Refund Processing Method" color="emerald" />
                <p className="mb-4">Where a refund is approved:</p>
                <ul className="list-disc ml-8 mb-4 space-y-1">
                    <li>Refunds will be issued using the original payment method where possible</li>
                    <li>Processing timelines may vary depending on banks or payment providers</li>
                    <li>Administrative or transaction fees may be deducted</li>
                </ul>
            </section>

            <section>
                <NumberedSection num="8" title="Policy Amendments" color="emerald" />
                <p className="mb-4">Gradway reserves the right to update or modify this Refund & Cancellation Policy at any time. Updated versions will be published on our website and will take effect immediately.</p>
                <p>Continued use of our services constitutes acceptance of the updated policy.</p>
            </section>

            <LegalFooter colorClass="text-emerald-600" sectionNum="9" sectionColor="emerald" />
        </div>
    );
    const content = type === 'privacy' ? {
        title: "Privacy Policy",
        icon: <ShieldAlert className="text-amber-500" size={32} />,
        body: privacyBody
    } : type === 'terms' ? {
        title: "Terms of Service",
        icon: <FileText className="text-blue-600" size={32} />,
        body: tosBody
    } : {
        title: "Refund Policy",
        icon: <RefreshCcw className="text-emerald-600" size={32} />,
        body: refundBody
    };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-[#0a0d14]/80 backdrop-blur-xl cursor-pointer">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-3xl rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] cursor-default">
                <div className="p-8 border-b border-slate-50 flex items-center gap-4 bg-white relative z-10 shrink-0">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">{content.icon}</div>
                    <div className="flex-1 flex items-center justify-between">
                        <h3 className="text-2xl font-black text-[#1A1F2C] uppercase tracking-tight">{content.title}</h3>
                        <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                            <X size={20} className="text-slate-400" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-8 md:p-14 custom-scrollbar mb-4">
                    {content.body}
                    <div className="h-12 w-full shrink-0" />
                </div>
            </motion.div>
        </motion.div>
    );
};

const Footer = ({ onModal, onNavigate, onSetView }: any) => {
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [newsletterLoading, setNewsletterLoading] = useState(false);
    const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
    const newsletterFormRef = useRef<HTMLFormElement>(null);
    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsletterEmail.trim())
            return;
        setNewsletterLoading(true);
        if (newsletterFormRef.current) {
            newsletterFormRef.current.submit();
            setTimeout(() => {
                setNewsletterLoading(false);
                setNewsletterSubmitted(true);
                setNewsletterEmail("");
            }, 1000);
        }
    };
    const handleRefill = () => {
        setNewsletterSubmitted(false);
    };
    return (
        <footer className="bg-[#111520] text-white pt-24 pb-12 relative overflow-hidden">
            <iframe name="newsletter_target" style={{ display: 'none' }} />
            <form ref={newsletterFormRef} action={NEWSLETTER_FORM_URL} method="POST" target="newsletter_target" style={{ display: 'none' }}>
                <input type="hidden" name={NEWSLETTER_ENTRY_ID} value={newsletterEmail} />
            </form>
            <div className="container mx-auto px-4 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white rounded-2xl p-2 flex items-center justify-center shadow-lg">
                            <img src={LOGO_URL} alt="Gradway Logo" className="w-full h-full object-contain" />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight leading-none uppercase">Gradway (Pvt) Ltd.</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-xs">Empowering the next generation of Sri Lankan leaders through world-class global education pathways and ethical migration consultancy.</p>
                    <div className="space-y-2 pt-2">
                        <a href={`tel:${WA_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-3 text-amber-500 hover:scale-105 transition-transform origin-left group">
                            <Phone size={16} />
                            <span className="text-sm font-black tracking-widest">{PHONE_DISPLAY}</span>
                        </a>
                    </div>
                    <div className="flex flex-row items-center gap-5 text-2xl flex-nowrap overflow-visible">
                        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-whatsapp" /></a>
                        <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-facebook" /></a>
                        <a href="https://www.instagram.com/gradway_education" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-instagram" /></a>
                        <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="text-white hover:scale-125 transition-all"><i className="fa-brands fa-tiktok" /></a>
                        <a href="mailto:info@gradwayedu.com" className="text-[#EA4335] hover:scale-125 transition-all"><i className="fa-solid fa-at" /></a>
                        <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-linkedin" /></a>
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-white">Quick Links</h4>
                    <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-wide">
                        <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onNavigate('aboutus')}>About Us</li>
                        <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onNavigate('destinations')}>Destinations</li>
                        <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onSetView('faq-full')}>FAQ</li>
                        <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onSetView('careers')}>Careers</li>
                        <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onSetView('partner')}>Partner With Us</li>
                    </ul>
                </div>
                <div className="space-y-8">
                    <div className="bg-slate-800/30 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Stay Updated</h4>
                        {!newsletterSubmitted ? (
                            <form onSubmit={handleNewsletterSubmit} className="flex bg-white/5 p-1 rounded-full border border-white/10 overflow-hidden group">
                                <input type="email" required value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="Email address" className="bg-transparent border-0 px-4 py-2 text-xs outline-none flex-1 text-white placeholder:text-slate-600" />
                                <button type="submit" disabled={newsletterLoading} className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors shrink-0 disabled:opacity-50">
                                    {newsletterLoading ? (<Loader2 className="animate-spin text-[10px]" size={12} />) : (<i className="fa-solid fa-arrow-right text-[10px]" />)}
                                </button>
                            </form>
                        ) : (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                                <div className="flex items-center gap-2 text-amber-500">
                                    <Check size={14} strokeWidth={3} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Subscribed!</span>
                                </div>
                                <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] leading-relaxed">Thank you, you have been subscribed to our updates.</p>
                                <button onClick={handleRefill} className="text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors underline underline-offset-4">Click to re-fill</button>
                            </motion.div>
                        )}
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest leading-tight">Service updates & Announcements</p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 lg:px-12 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-1 text-center md:text-left">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">© 2025 Gradway (Pvt) Ltd. All rights reserved.</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Site made by -{" "}
                        <a
                            href="https://www.instagram.com/powerhouse360.marketing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            Powerhouse360.Marketing
                        </a>
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <button onClick={() => onModal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
                    <button onClick={() => onModal('terms')} className="hover:text-white transition-colors">Terms of Service</button>
                    <button onClick={() => onModal('refund')} className="hover:text-white transition-colors">Refund & Cancellation</button>
                </div>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:scale-110 active:scale-95 transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(244,63,94,0.3)] group">
                    Back to the Top <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </footer>
    );
};

const UKDestinationPage = ({ onContact }: any) => {
    const [selectedCity, setSelectedCity] = useState(0);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const cities = [
        {
            name: "London",
            desc: "Home to 30+ universities, London offers unparalleled access to culture, internships, and global networks.",
            stats: "Premium Living Standards • Global Transit Access",
            rating: "#1 Student City",
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200"
        },
        {
            name: "Manchester",
            desc: "A dynamic powerhouse of innovation and student life, Manchester is the heart of the UK's 'Northern Powerhouse'.",
            stats: "Dynamic Urban Living • Northern Transit Hub",
            rating: "The Powerhouse",
            image: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?q=80&w=1200"
        },
        {
            name: "Edinburgh",
            desc: "A stunning capital blending historic prestige with modern academic rigor in one of the world's most scenic cities.",
            stats: "Historic Center Living • Scenic Walkable Hub",
            rating: "Academic Jewel",
            image: "https://images.unsplash.com/photo-1506370822645-6a56a10528d2?q=80&w=1200"
        },
        {
            name: "Cardiff",
            desc: "The friendly Welsh capital offering a high quality of life, affordable living, and major research institutions.",
            stats: "Optimal Living Value • Integrated Rail Link",
            rating: "Welsh Capital",
            image: "https://images.unsplash.com/photo-1582236318357-1901b0f5be87?q=80&w=1200"
        },
        {
            name: "Bristol",
            desc: "A creative and vibrant city known for its engineering heritage, artistic soul, and top-tier employability.",
            stats: "Creative Hub Value • Green Transit Options",
            rating: "Creative Core",
            image: "https://images.unsplash.com/photo-1563816738981-b558509069bc?q=80&w=1200"
        }
    ];

    const handleNext = () => setSelectedCity((prev) => (prev + 1) % cities.length);
    const handlePrev = () => setSelectedCity((prev) => (prev - 1 + cities.length) % cities.length);

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
        <main className="animate-[fadeIn_0.5s_ease-out] bg-[#FAFAFA] text-[#1A1F2C] overflow-hidden">
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden bg-white px-6">
                <div className="absolute inset-0 z-0 bg-white">
                    <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070" className="w-full h-full object-cover opacity-25 scale-105" alt="London Skyline" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[#FAFAFA]" />
                </div>
                <div className="relative z-10 max-w-4xl w-full flex flex-col items-center pt-[117px] pb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-900 mb-8 shadow-sm">
                        <Globe size={14} /> UK Education Excellence
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none uppercase mb-8 text-slate-950">
                        Uncover Your <br /><span className="text-blue-900">Potential</span>
                    </h1>
                    <p className="text-slate-700 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-sm">
                        Embark on a journey through centuries of academic heritage and vibrant modern culture. The UK awaits your ambition.
                    </p>
                    <div className="flex flex-col items-center gap-8">
                        <button onClick={onContact} className="bg-blue-900 text-white px-14 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/30">
                            Start Your Journey +
                        </button>
                        <div className="flex flex-col items-center gap-2 animate-bounce">
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Scroll to explore</span>
                            <ChevronDown size={14} className="text-slate-500" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-4 pb-8 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Chapter I: Heritage</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">A Legacy of Learning</h2>
                    <p className="text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                        From the historic cobblestones of <span className="text-[#1A1F2C] border-b-2 border-blue-100">Oxford</span> to the bustling innovation hubs of <span className="text-[#1A1F2C] border-b-2 border-blue-100">London</span>, the United Kingdom offers an education system respected worldwide.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {[
                        { id: 'h1', icon: <GraduationCap />, title: "World-Class Education", desc: "Access to pioneering research facilities and libraries that house centuries of knowledge." },
                        { id: 'h2', icon: <Globe />, title: "Global Community", desc: "Join a diverse student body from over 200 countries, creating a truly global network." },
                        { id: 'h3', icon: <TrendingUp />, title: "Career Acceleration", desc: "Benefit from strong industry links and the Graduate Route post study work visa." },
                        { id: 'h4', icon: <History />, title: "History & Culture", desc: "Immerse yourself in a rich cultural heritage that spans centuries." }
                    ].map((card, i) => (
                        <div key={i} data-scroll-hit={card.id} className={cn("p-6 lg:p-8 border rounded-[2.5rem] shadow-sm transition-all duration-300 group cursor-default", hoveredId === card.id ? "scale-[1.03] shadow-xl border-blue-200 bg-blue-50 -translate-y-2" : "bg-blue-50/50 border-blue-100 hover:scale-[1.03] hover:shadow-xl hover:-translate-y-2 hover:bg-blue-50")}>
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300", hoveredId === card.id ? "scale-110 shadow-sm bg-blue-600" : "bg-blue-50 group-hover:scale-110 group-hover:shadow-sm group-hover:bg-blue-600")}>
                                {React.cloneElement(card.icon as React.ReactElement, { 
                                    className: cn("w-6 h-6 transition-colors duration-300", hoveredId === card.id ? "text-white opacity-100" : "text-blue-600 opacity-60 group-hover:text-white group-hover:opacity-100")
                                })}
                            </div>
                            <h3 className="text-lg lg:text-xl font-black uppercase mb-4 tracking-tight text-[#1A1F2C]">{card.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="pt-8 pb-24 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Chapter II: Living</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Explore <br /> Iconic Cities</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">The UK is a tapestry of cultures. Choose the environment that inspires you.</p>
                        <div className="hidden lg:flex flex-col gap-2">
                            {cities.map((city, i) => (
                                <button key={i} onClick={() => setSelectedCity(i)} className={cn("w-full px-8 py-5 rounded-2xl text-left font-black uppercase tracking-widest text-xs flex justify-between items-center transition-all", selectedCity === i ? "bg-blue-600 text-white shadow-lg" : "bg-slate-50 text-slate-400 hover:bg-slate-100")}>
                                    {city.name}
                                    <ChevronDown className={cn("transition-transform", selectedCity === i ? "-rotate-90" : "")} size={16} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group">
                        <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full" />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCity}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <img src={cities[selectedCity].image} alt={cities[selectedCity].name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
                                <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-4 py-1.5 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-sm">{cities[selectedCity].rating}</span>
                                    </div>
                                    <h3 className="text-4xl font-black uppercase tracking-tight mb-4">{cities[selectedCity].name}</h3>
                                    <p className="text-slate-200 font-medium leading-relaxed mb-6">{cities[selectedCity].desc}</p>
                                    <div className="flex items-center gap-6 text-xs font-bold text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-blue-500 shrink-0" /> {cities[selectedCity].stats.split('•')[0]}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Train size={14} className="text-blue-500 shrink-0" /> {cities[selectedCity].stats.split('•')[1]}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={onContact} 
                                        className="w-full mt-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-black uppercase tracking-widest text-[10px] text-white hover:bg-white hover:text-black transition-all shadow-lg"
                                    >
                                        Start Application
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-20">
                            <button onClick={handlePrev} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-lg border border-white/10"><ChevronLeft size={24} /></button>
                            <button onClick={handleNext} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-lg border border-white/10"><ChevronRight size={24} /></button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-24 pb-4 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Chapter III: Institutions</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Partner Universities</h2>
                </div>
                {['Research Led Institutions', 'Industry Aligned Universities', 'London Study Destinations', 'Specialist & Regional Universities'].map((category) => {
                    const filteredUnis = UK_UNIVERSITIES.filter(u => u.category === category);
                    const offers = filteredUnis.map((uni, idx) => ({
                        id: `${category}-${idx}`,
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
                        <div key={category} className="mb-10">
                            <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4 px-2">
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-blue-900">{category}</h3>
                            </div>
                            <OfferCarousel offers={offers} />
                        </div>
                    );
                })}
                <div className="mt-4 p-10 bg-blue-50 rounded-[3rem] border border-blue-100 text-center">
                    <p className="text-sm font-black uppercase tracking-widest text-blue-900">Discover more with Gradway</p>
                    <p className="text-xs font-medium mt-2 max-w-3xl mx-auto leading-relaxed text-blue-700/60 opacity-60">These represent just a few of our represented institutions. Contact us to explore personalized top-tier university options across the UK and find the best match for your academic profile.</p>
                </div>
            </section>

            <section className="pt-24 pb-24 bg-slate-50 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Chapter IV: Essentials</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Your Path <br /> to the UK</h2>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-md">Navigating the visa process shouldn't be stressful. We simplify the journey into four clear stages.</p>
                        <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] space-y-4 shadow-sm">
                            <div className="flex items-center gap-3 text-blue-600">
                                <Shield size={20} /> <span className="text-xs font-black uppercase tracking-widest">Did you know?</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed italic">The UK offers a <span className="text-blue-600 font-bold">Graduate Route</span> visa allowing you to stay and work 1.8 years after graduation.</p>
                        </div>
                    </div>
                    <div className="space-y-12 relative">
                        <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-200" />
                        {[
                            { id: 's1', step: "1", title: "Secure Your Offer", desc: "Apply to universities and receive an unconditional offer letter." },
                            { id: 's2', step: "2", title: "Get Your CAS", desc: "Receive your Confirmation of Acceptance for Studies (CAS) number." },
                            { id: 's3', step: "3", title: "Visa Application", desc: "Submit your application online and book biometrics." },
                            { id: 's4', step: "4", title: "Biometrics & Travel", desc: "Attend your appointment and await your travel vignette." },
                        ].map((item, i) => (
                            <div key={i} data-scroll-hit={item.id} className={cn("relative pl-16 group cursor-default transition-all duration-300", hoveredId === item.id ? "translate-x-4" : "")}>
                                <div className={cn("absolute left-0 top-0 w-12 h-12 rounded-full bg-white border border-blue-500/30 text-blue-600 flex items-center justify-center font-black z-10 transition-all shadow-lg", hoveredId === item.id && "bg-blue-600 text-white")}>
                                    {item.step}
                                </div>
                                <h4 className={cn("text-xl font-black uppercase tracking-tight mb-2 text-[#1A1F2C] transition-colors", hoveredId === item.id && "text-blue-600")}>{item.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pt-24 pb-6 px-4 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Chapter V: Experience</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Life Beyond Study</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Explore the academic heritage, global connectivity, and vibrant student community that defines the UK experience.</p>
                </div>
                <BentoExperience onContact={onContact} />
            </section>

            <section className="pt-8 pb-32 px-6 md:px-12 bg-white relative overflow-hidden border-t border-slate-100">
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="space-y-12">
                        <div>
                            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">TAKE THE FIRST STEP</span>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-[#1A1F2C] mb-8">Ready to Write <br /> Your Story?</h2>
                            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">Pursue your UK study dreams through our expert guidance and personalized strategic pathways.</p>
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-sm shrink-0 transition-transform group-hover:scale-110">
                                    <BadgeCheck size={28} className="fill-blue-50" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-[#1A1F2C] uppercase tracking-tight">Certified Experts</h4>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed">British Council certified education consultants.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-sm shrink-0 transition-transform group-hover:scale-110">
                                    <UserCheck size={28} className="fill-blue-50" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-[#1A1F2C] uppercase tracking-tight">End-to-End Support</h4>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed">From application to pre-departure briefing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-blue-600/5 blur-[100px] rounded-full" />
                        <div className="relative bg-blue-600 rounded-[4rem] p-10 md:p-14 text-white shadow-[0_40px_100px_rgba(37,99,235,0.25)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_50px_120px_rgba(37,99,235,0.4)]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 blur-[50px] rounded-full translate-y-1/2 -translate-x-1/2" />
                            <div className="relative z-10 space-y-10">
                                <div className="space-y-4">
                                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">Let's Map Your Success.</h3>
                                    <p className="text-blue-50 text-base md:text-lg font-medium leading-relaxed max-w-sm">Our expert counselors offer a personalized 1:1 strategy session to find your perfect university match.</p>
                                </div>
                                <div className="space-y-6">
                                    <a href={`tel:${WA_PHONE}`} className="flex items-center gap-6 group/item">
                                        <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg shrink-0 group-hover/item:bg-white/30 transition-colors">
                                            <Headset className="text-white" size={24} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/60">Phone Support</p>
                                            <p className="text-xl font-black tracking-tight group-hover/item:underline underline-offset-4 decoration-blue-200">{PHONE_DISPLAY}</p>
                                        </div>
                                    </a>
                                    <a href="mailto:info@gradwayedu.com" className="flex items-center gap-6 group/item">
                                        <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg shrink-0 group-hover/item:bg-white/30 transition-colors">
                                            <Mail className="text-white" size={24} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/60">Email Inquiries</p>
                                            <p className="text-xl font-black tracking-tight group-hover/item:underline underline-offset-4 decoration-blue-200">info@gradwayedu.com</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                                    <button onClick={onContact} className="flex-1 bg-white py-6 rounded-full font-black uppercase tracking-widest text-[11px] text-blue-600 hover:bg-black hover:text-white transition-all shadow-xl active:scale-95">Book Session</button>
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

const PartnerPage = ({ onNavigate }: any) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [agencyName, setAgencyName] = useState("");
    const [website, setWebsite] = useState("");
    const [contactName, setContactName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
    const regionDropdownRef = useRef<HTMLDivElement>(null);
    const partnerHiddenFormRef = useRef<HTMLFormElement>(null);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (regionDropdownRef.current && !regionDropdownRef.current.contains(event.target as Node)) {
                setIsRegionDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleRegionSelection = (countryName: string) => {
        setSelectedRegions(prev => prev.includes(countryName) ? prev.filter(c => c !== countryName) : [...prev, countryName]);
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (partnerHiddenFormRef.current) {
            partnerHiddenFormRef.current.submit();
            setTimeout(() => {
                setIsSubmitting(false);
                setFormSubmitted(true);
                setAgencyName(""); setWebsite(""); setContactName(""); setJobTitle(""); setEmail(""); setPhone(""); setAddress(""); setSelectedRegions([]); setMessage("");
            }, 1500);
        }
    };

    const SocialRow = ({ emailOverride }: any) => (
        <div className="flex flex-row items-center gap-5 text-2xl flex-nowrap overflow-visible">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-whatsapp" /></a>
            <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-facebook" /></a>
            <a href="https://www.instagram.com/gradway_education" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-instagram" /></a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="text-black hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-tiktok" /></a>
            <a href={`mailto:${emailOverride || 'info@gradwayedu.com'}`} className="text-[#EA4335] hover:scale-125 transition-all"><i className="fa-solid fa-at" /></a>
            <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-linkedin" /></a>
        </div>
    );

    return (
        <main className="animate-[fadeIn_0.5s_ease-out] bg-[#FAFAFA] text-[#1A1F2C] overflow-hidden">
            <iframe name="partner_form_target" style={{ display: 'none' }} />
            <form ref={partnerHiddenFormRef} action={GOOGLE_PARTNER_FORM_URL} method="POST" target="partner_form_target" style={{ display: 'none' }}>
                <input type="hidden" name={PARTNER_FORM_ENTRIES.agencyName} value={agencyName} />
                <input type="hidden" name={PARTNER_FORM_ENTRIES.website} value={website} />
                <input type="hidden" name={PARTNER_FORM_ENTRIES.contactName} value={contactName} />
                <input type="hidden" name={PARTNER_FORM_ENTRIES.jobTitle} value={jobTitle} />
                <input type="hidden" name={PARTNER_FORM_ENTRIES.email} value={email} />
                <input type="hidden" name={PARTNER_FORM_ENTRIES.phone} value={phone} />
                <input type="hidden" name={PARTNER_FORM_ENTRIES.address} value={address} />
                {selectedRegions.map((region, index) => (
                    <input key={index} type="hidden" name={PARTNER_FORM_ENTRIES.regions} value={region} />
                ))}
                <input type="hidden" name={PARTNER_FORM_ENTRIES.message} value={message} />
            </form>
            <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-indigo-50/30" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/20 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 blur-[120px] rounded-full animate-pulse" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 shadow-sm">
                        <Handshake size={14} /> B2B Collaboration
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.05] uppercase">
                        Let's Scale <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-indigo-600">Together.</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Gradway partners with elite agents and institutions worldwide to create ethical, high-quality migration pathways for international talent.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button onClick={() => {
                            const el = document.getElementById('partner-form-section');
                            el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }} className="w-full sm:w-auto bg-[#1A1F2C] text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] shadow-2xl hover:scale-105 active:scale-95 transition-all">
                            Become a Partner
                        </button>
                        <a href="mailto:admin@gradwayedu.com" className="w-full sm:w-auto bg-white border border-slate-200 text-[#1A1F2C] px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] shadow-sm hover:bg-slate-50 active:scale-95 transition-all">
                            Contact
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-12 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <SectionBadge text="Value Proposition" amberOutline />
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Why Gradway?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <BarChart3 className="text-amber-500" />, title: "Optimized Processing", desc: "Our rigorous documentation standards and deep institutional knowledge ensure your hard-earned leads transition seamlessly into successful global enrollments." },
                            { icon: <ShieldCheck className="text-indigo-500" />, title: "Operational Trust", desc: "We provide complete process transparency and ethical handling, acting as a reliable extension of your own brand." },
                            { icon: <Network className="text-emerald-500" />, title: "Global Network", desc: "Access 450+ universities across the UK, Canada, Australia, and beyond through a single partnership." }
                        ].map((feature, i) => (
                            <div key={i} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-50">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{feature.title}</h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="partner-form-section" className="py-32 px-6 md:px-12 bg-slate-50">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2 space-y-10">
                        <div className="space-y-4">
                            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em]">PARTNERSHIP INQUIRY</span>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight">Apply for <br /> Collaboration</h2>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md">Fill out the form to get started.</p>
                        </div>
                        <div className="space-y-6">
                            {[
                                "Faster Commission Settlements",
                                "Regional Marketing Support",
                                "B2B Support and training"
                            ].map(item => (
                                <div key={item} className="flex items-center gap-4 text-slate-800 font-bold uppercase text-[11px] tracking-widest">
                                    <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="pt-8 space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Connect With Us</p>
                            <SocialRow emailOverride="admin@gradwayedu.com" />
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-slate-100">
                            {!formSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2"><Building2 size={10} /> Agency / Institution Name</label>
                                            <input required value={agencyName} onChange={e => setAgencyName(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" placeholder="e.g. Global Education Hub" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2"><Globe2 size={10} /> Website (If Available)</label>
                                            <input value={website} onChange={e => setWebsite(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" placeholder="https://..." />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Primary Contact Name</label>
                                            <input required value={contactName} onChange={e => setContactName(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" placeholder="Full Name" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2"><Briefcase size={10} /> Job Title</label>
                                            <input required value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" placeholder="e.g. Director" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Business Email</label>
                                            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" placeholder="info@company.com" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">WhatsApp / Phone</label>
                                            <input required value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" placeholder="+xxx xxxxxxxx" />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Address</label>
                                        <input required value={address} onChange={e => setAddress(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" placeholder="Street, City, Country" />
                                    </div>

                                    <div className="space-y-1 relative" ref={regionDropdownRef}>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Recruitment Region / Countries</label>
                                        <button type="button" onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none text-left text-sm font-medium flex items-center justify-between hover:bg-slate-100 transition-all focus:border-amber-500 focus:bg-white">
                                            <span className={selectedRegions.length === 0 ? "text-slate-400" : "text-slate-800 line-clamp-1"}>{selectedRegions.length > 0 ? selectedRegions.join(", ") : "Select targeted destinations"}</span>
                                            <ChevronDown size={14} className={cn("transition-transform duration-300", isRegionDropdownOpen && "rotate-180")} />
                                        </button>
                                        <AnimatePresence>
                                            {isRegionDropdownOpen && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute z-[100] left-0 right-0 top-[110%] bg-white border border-slate-100 rounded-3xl shadow-2xl p-4 max-h-[250px] overflow-y-auto custom-scrollbar">
                                                    <div className="grid grid-cols-1 gap-1">
                                                        {DESTINATIONS.map(d => (
                                                            <button key={d.id} type="button" onClick={() => toggleRegionSelection(d.name)} className={cn("flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-left group", selectedRegions.includes(d.name) ? "bg-amber-50 text-amber-600" : "hover:bg-slate-50 text-slate-600")}>
                                                                <div className={cn("w-4 h-4 rounded border flex items-center justify-center transition-all", selectedRegions.includes(d.name) ? "bg-amber-500 border-amber-500 text-white" : "border-slate-200 group-hover:border-amber-500")}>
                                                                    {selectedRegions.includes(d.name) && <Check size={10} strokeWidth={3} />}
                                                                </div>
                                                                <span className="text-[10px] font-bold uppercase tracking-wider">{d.name}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Your Inquiry / Message</label>
                                        <textarea rows={4} value={message} onChange={e => setMessage(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm resize-none" placeholder="Tell us about your current student flow and goals..." />
                                    </div>

                                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#1A1F2C] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-3">
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : "Request Collaboration"}
                                    </button>
                                </form>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                                    <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                                        <Check size={32} strokeWidth={4} />
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-4">Request Sent!</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed mb-10">Our B2B management team will review your application and contact you as soon as possible.</p>
                                    <div className="flex flex-col items-center gap-6 border-t border-slate-50 pt-10">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Reach Us Instantly</p>
                                        <SocialRow emailOverride="admin@gradwayedu.com" />
                                    </div>
                                    <button onClick={() => setFormSubmitted(false)} className="mt-12 text-indigo-600 font-black uppercase text-[10px] tracking-widest hover:underline">Send another request</button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

const GermanyDestinationPage = ({ onContact }: any) => {
    const [selectedCity, setSelectedCity] = useState(0);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const cities = [
        {
            name: "Berlin",
            desc: "The startup capital. Creative, affordable, and vibrant. Berlin offers a unique blend of history and modern innovation.",
            stats: "Startup Hub • Cultural Center",
            rating: "Innovation Capital",
            image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=1200"
        },
        {
            name: "Munich",
            desc: "Tech & Engineering hub. Home to TUM and BMW. Munich combines Bavarian tradition with high-tech industry.",
            stats: "High Tech • Quality of Life",
            rating: "Tech Giant",
            image: "https://images.unsplash.com/photo-1595867865334-08dad092f98e?q=80&w=1200"
        },
        {
            name: "Hamburg",
            desc: "Logistics & Media. Germany's gateway to the world, famous for its port and media landscape.",
            stats: "Global Trade • Media Hub",
            rating: "Gateway to World",
            image: "https://images.unsplash.com/photo-1481525046200-a63901b54a0f?q=80&w=1200"
        },
        {
            name: "Frankfurt",
            desc: "Finance & Business. The Eurozone's heart, offering unparalleled opportunities in banking and commerce.",
            stats: "Finance Hub • Global Connectivity",
            rating: "Euro City",
            image: "https://images.unsplash.com/photo-1565592865239-0d33e5c7a0c9?q=80&w=1200"
        },
        {
            name: "Cologne",
            desc: "Media & Culture. Friendly, historic, and lively. Known for its cathedral and open-minded atmosphere.",
            stats: "Media City • Vibrant Culture",
            rating: "Cultural Heart",
            image: "https://images.unsplash.com/photo-1563831613993-8759d5718228?q=80&w=1200"
        }
    ];

    const handleNext = () => setSelectedCity((prev) => (prev + 1) % cities.length);
    const handlePrev = () => setSelectedCity((prev) => (prev - 1 + cities.length) % cities.length);

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
        <main className="animate-[fadeIn_0.5s_ease-out] bg-[#FAFAFA] text-[#1A1F2C] overflow-hidden">
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden bg-white px-6">
                <div className="absolute inset-0 z-0 bg-white">
                    <img src="https://images.unsplash.com/photo-1534313314376-a72289b6181e?q=80&w=2070" className="w-full h-full object-cover opacity-25 scale-105" alt="Munich Skyline" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[#FAFAFA]" />
                </div>
                <div className="relative z-10 max-w-4xl w-full flex flex-col items-center pt-[117px] pb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-yellow-600 mb-8 shadow-sm">
                        <Zap size={14} /> Witness the German Engineering
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none uppercase mb-8 text-slate-950 drop-shadow-sm">
                        Engineer Your <br /> Future in <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-yellow-500">Germany</span>
                    </h1>
                    <p className="text-slate-700 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-sm">
                        Experience world-class education and unparalleled career opportunities in the heart of Europe's industrial powerhouse.
                    </p>
                    <div className="flex flex-col items-center gap-8">
                        <button onClick={onContact} className="bg-gradient-to-r from-red-700 to-red-600 text-white px-14 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-900/30">
                            Begin Evaluation +
                        </button>
                        <div className="flex flex-col items-center gap-2 animate-bounce mt-8">
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Scroll to explore</span>
                            <ChevronDown size={14} className="text-slate-500" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-4 pb-8 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Chapter I: Overview</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Popular Academic Streams</h2>
                    <p className="text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                        Leading fields where German excellence meets global industry standards.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {[
                        { id: 'h1', icon: <Zap />, title: "Engineering & Tech Hub", desc: "World-renowned programs in Automotive, Mechanical, and Sustainable Tech." },
                        { id: 'h2', icon: <MapPin />, title: "Central European Location", desc: "Innovation-led management and entrepreneurship in the heart of the EU." },
                        { id: 'h3', icon: <Globe />, title: "Growing English-Taught Programmes", desc: "Pioneering medical research and clinical excellence at historic hospitals." }
                    ].map((card, i) => (
                        <div key={i} data-scroll-hit={card.id} className={cn("p-6 lg:p-8 border rounded-[2.5rem] shadow-sm transition-all duration-300 group cursor-default", hoveredId === card.id ? "scale-[1.03] shadow-xl border-red-200 bg-red-50 -translate-y-2" : "bg-red-50/50 border-red-100 hover:scale-[1.03] hover:shadow-xl hover:-translate-y-2 hover:bg-red-50")}>
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300", hoveredId === card.id ? "scale-110 shadow-sm bg-red-600" : "bg-red-50 group-hover:scale-110 group-hover:shadow-sm group-hover:bg-red-600")}>
                                {React.cloneElement(card.icon as React.ReactElement, { 
                                    className: cn("w-6 h-6 transition-colors duration-300", hoveredId === card.id ? "text-white opacity-100" : "text-red-600 opacity-60 group-hover:text-white group-hover:opacity-100")
                                })}
                            </div>
                            <h3 className="text-lg lg:text-xl font-black uppercase mb-4 tracking-tight text-[#1A1F2C]">{card.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="cities" className="pt-16 pb-24 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Chapter II: Living</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Explore <br /> Iconic Cities</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">Germany is a tapestry of cultures. Choose the environment that inspires you.</p>
                        <div className="hidden lg:flex flex-col gap-2">
                            {cities.map((city, i) => (
                                <button key={i} onClick={() => setSelectedCity(i)} className={cn("w-full px-8 py-5 rounded-2xl text-left font-black uppercase tracking-widest text-xs flex justify-between items-center transition-all", selectedCity === i ? "bg-slate-900 text-white shadow-lg" : "bg-slate-50 text-slate-400 hover:bg-slate-100")}>
                                    {city.name}
                                    <ChevronDown className={cn("transition-transform", selectedCity === i ? "-rotate-90" : "")} size={16} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group">
                        <div className="absolute -inset-4 bg-red-500/10 blur-3xl rounded-full" />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCity}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <img src={cities[selectedCity].image} alt={cities[selectedCity].name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
                                <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-4 py-1.5 bg-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-sm">{cities[selectedCity].rating}</span>
                                    </div>
                                    <h3 className="text-4xl font-black uppercase tracking-tight mb-4">{cities[selectedCity].name}</h3>
                                    <p className="text-slate-200 font-medium leading-relaxed mb-6">{cities[selectedCity].desc}</p>
                                    <div className="flex items-center gap-6 text-xs font-bold text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-red-500 shrink-0" /> {cities[selectedCity].stats.split('•')[0]}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Globe size={14} className="text-red-500 shrink-0" /> {cities[selectedCity].stats.split('•')[1]}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={onContact} 
                                        className="w-full mt-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-black uppercase tracking-widest text-[10px] text-white hover:bg-white hover:text-black transition-all shadow-lg"
                                    >
                                        Explore Programs
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-20">
                            <button onClick={handlePrev} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-lg border border-white/10"><ChevronLeft size={24} /></button>
                            <button onClick={handleNext} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-lg border border-white/10"><ChevronRight size={24} /></button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-24 pb-4 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Chapter III: Institutions</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Partner Universities</h2>
                </div>
                {['Private Business & Management Schools', 'Specialized Universities of Applied Sciences (Tech, Media & General)', 'International Universities & Foreign Branch Campuses'].map((category) => {
                    const filteredUnis = GERMANY_UNIVERSITIES.filter(u => u.category === category);
                    const offers = filteredUnis.map((uni, idx) => ({
                        id: `${category}-${idx}`,
                        imageSrc: uni.image,
                        imageAlt: uni.name,
                        tag: uni.tag,
                        title: uni.name,
                        description: `Focus: ${uni.fields}`,
                        brandLogoSrc: '',
                        brandName: uni.location,
                        href: uni.url
                    }));
                    return (
                        <div key={category} className="mb-10">
                            <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4 px-2">
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900">{category}</h3>
                            </div>
                            <OfferCarousel offers={offers} hoveredId={hoveredId} colorTheme="red" />
                        </div>
                    );
                })}
                <div className="mt-4 p-10 bg-red-50 rounded-[3rem] border border-red-100 text-center">
                    <p className="text-sm font-black uppercase tracking-widest text-red-900">Discover more with Gradway</p>
                    <p className="text-xs font-medium mt-2 max-w-3xl mx-auto leading-relaxed text-red-700/60 opacity-60">These represent just a few of our represented institutions. Contact us to explore personalized top-tier university options across Germany and find the best match for your academic profile.</p>
                </div>
            </section>

            <section className="pt-24 pb-6 bg-slate-50 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
                    <div className="space-y-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Chapter IV: Essentials</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Germany <br /> Essentials Hub</h2>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-md">A comprehensive overview of your journey to Europe's innovation engine.</p>
                        <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] space-y-4 shadow-sm">
                            <div className="flex items-center gap-3 text-red-600">
                                <Check size={20} /> <span className="text-xs font-black uppercase tracking-widest">Did you know?</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed italic">Get up to €0.25 back for every plastic bottle you recycle. It’s not just eco-friendly; it’s pocket money! Smart recycling is a part of daily German life (Pfand System).</p>
                        </div>
                    </div>
                    <div className="space-y-12 relative">
                        <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-200" />
                        {[
                            { id: 's1', step: "1", title: "University Admission", desc: "Secure your Offer Letter from your chosen German university." },
                            { id: 's2', step: "2", title: "Blocked Account", desc: "Open a blocked account (Expatrio/Fintiba) and deposit ~€11,208 for living expenses." },
                            { id: 's3', step: "3", title: "Health Insurance", desc: "Secure Public or Private health insurance coverage for your stay." },
                            { id: 's4', step: "4", title: "Visa Appointment", desc: "Book and attend your interview at the German Embassy in Colombo." },
                            { id: 's5', step: "5", title: "Residence Registration", desc: "Complete your 'Anmeldung' (Residence Registration) at the local office upon arrival." },
                        ].map((item, i) => (
                            <div key={i} data-scroll-hit={item.id} className={cn("relative pl-16 group cursor-default transition-all duration-300", hoveredId === item.id ? "translate-x-4" : "")}>
                                <div className={cn("absolute left-0 top-0 w-12 h-12 rounded-full bg-white border border-red-500/30 text-red-600 flex items-center justify-center font-black z-10 transition-all shadow-lg", hoveredId === item.id && "bg-red-600 text-white")}>
                                    {item.step}
                                </div>
                                <h4 className={cn("text-xl font-black uppercase tracking-tight mb-2 text-[#1A1F2C] transition-colors", hoveredId === item.id && "text-red-600")}>{item.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pt-6 pb-6 px-4 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Chapter V: Experience</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Life Beyond Study</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Real stories and vibrant lifestyle from the heart of Europe.</p>
                </div>
                <GermanyBentoExperience onContact={onContact} />
            </section>

            <section className="pt-8 pb-32 px-6 md:px-12 bg-white relative overflow-hidden border-t border-slate-100">
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="space-y-12">
                        <div>
                            <span className="text-red-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">TAKE THE FIRST STEP</span>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-[#1A1F2C] mb-8">Ready to Master <br /> Your Future?</h2>
                            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">Join thousands of students we've helped migrate to Germany. Get a personalized admission strategy today.</p>
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-600 shadow-sm shrink-0 transition-transform group-hover:scale-110">
                                    <BadgeCheck size={28} className="fill-red-50" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-[#1A1F2C] uppercase tracking-tight">Certified Experts</h4>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed">Expert consultants for foreign higher education.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-600 shadow-sm shrink-0 transition-transform group-hover:scale-110">
                                    <UserCheck size={28} className="fill-red-50" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-[#1A1F2C] uppercase tracking-tight">End-to-End Support</h4>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed">From university application to visa processing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-red-600/5 blur-[100px] rounded-full" />
                        <div className="relative bg-[#1A1F2C] rounded-[4rem] p-10 md:p-14 text-white shadow-[0_40px_100px_rgba(220,38,38,0.25)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_50px_120px_rgba(220,38,38,0.4)]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/10 blur-[50px] rounded-full translate-y-1/2 -translate-x-1/2" />
                            <div className="relative z-10 space-y-10">
                                <div className="space-y-4">
                                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">Let's Map Your Success.</h3>
                                    <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-sm">Our expert counselors offer a personalized 1:1 strategy session to find your perfect university match.</p>
                                </div>
                                <div className="space-y-6">
                                    <a href={`tel:${WA_PHONE}`} className="flex items-center gap-6 group/item">
                                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-lg shrink-0 group-hover/item:bg-white/20 transition-colors">
                                            <Headset className="text-white" size={24} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Phone Support</p>
                                            <p className="text-xl font-black tracking-tight group-hover/item:underline underline-offset-4 decoration-red-500">{PHONE_DISPLAY}</p>
                                        </div>
                                    </a>
                                    <a href="mailto:info@gradwayedu.com" className="flex items-center gap-6 group/item">
                                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-lg shrink-0 group-hover/item:bg-white/20 transition-colors">
                                            <Mail className="text-white" size={24} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Email Inquiries</p>
                                            <p className="text-xl font-black tracking-tight group-hover/item:underline underline-offset-4 decoration-red-500">info@gradwayedu.com</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                                    <button onClick={onContact} className="flex-1 bg-white py-6 rounded-full font-black uppercase tracking-widest text-[11px] text-red-600 hover:bg-black hover:text-white transition-all shadow-xl active:scale-95">Book Session</button>
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

const FranceDestinationPage = ({ onContact }: any) => {
    const [selectedCity, setSelectedCity] = useState(0);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const mousePos = useRef({ x: 0, y: 0 });

    const cities = [
        {
            name: "Paris",
            desc: "The capital of fashion, art, and gastronomy. Home to world-renowned universities and a vibrant cultural scene.",
            stats: "Cultural Capital • Fashion Hub",
            rating: "Global Icon",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200"
        },
        {
            name: "Lyon",
            desc: "The gastronomic capital of France. A major center for business, technology, and culinary arts.",
            stats: "Gastronomy • Tech Hub",
            rating: "Culinary Heart",
            image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1200"
        },
        {
            name: "Bordeaux",
            desc: "World-famous for its wine industry and stunning architecture. A growing hub for business and innovation.",
            stats: "Wine Capital • Business Growth",
            rating: "Historic Elegance",
            image: "https://images.unsplash.com/photo-1558000143-a60715112659?q=80&w=1200"
        },
        {
            name: "Toulouse",
            desc: "The 'Pink City' and Europe's aerospace capital. A dynamic student city with a rich history.",
            stats: "Aerospace Hub • Student City",
            rating: "Tech & Space",
            image: "https://images.unsplash.com/photo-1563514755-6c1672611720?q=80&w=1200"
        },
        {
            name: "Lille",
            desc: "A vibrant cultural crossroads near the Belgian border. Known for its youthful energy and historic charm.",
            stats: "Cultural Crossroads • Youthful",
            rating: "Northern Star",
            image: "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=1200"
        }
    ];

    const franceUniversities = {
        "Top-Tier & Grande École Business Schools": [
            { name: "SKEMA Business School", location: "Multiple", url: "https://www.skema.edu/", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800", tag: "Global Business", fields: "Business, Management" },
            { name: "Kedge Business School", location: "Multiple", url: "https://student.kedge.edu/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800", tag: "Triple-Accredited", fields: "Business, Management" },
            { name: "NEOMA Business School", location: "Multiple", url: "https://neoma-bs.com/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800", tag: "Grande École", fields: "Business, Management" },
            { name: "Montpellier Business School", location: "Montpellier", url: "https://www.montpellier-bs.com/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800", tag: "Grande École", fields: "Business, Management" },
            { name: "Excelia Group", location: "Multiple", url: "https://www.excelia-group.com/", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800", tag: "Triple-Accredited", fields: "Business, Management" },
            { name: "ICN Business School", location: "Multiple", url: "https://www.icn-artem.com/", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800", tag: "Grande École", fields: "Business, Management" },
            { name: "ESSCA School of Management", location: "Multiple", url: "https://www.essca.fr/en", image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=800", tag: "Grande École", fields: "Business, Management" },
            { name: "EM Normandie Business School", location: "Multiple", url: "https://www.em-normandie.com/en", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800", tag: "Grande École", fields: "Business, Management" },
            { name: "Rennes School of Business", location: "Rennes", url: "https://www.rennes-sb.com/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800", tag: "Global Business", fields: "Business, Management" },
            { name: "Burgundy School of Business", location: "Dijon", url: "https://www.bsb-education.com/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800", tag: "Triple-Accredited", fields: "Business, Management" }
        ],
        "Specialized & Professional Schools": [
            { name: "ECE Engineering School", location: "Paris", url: "https://www.ece.fr/en/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800", tag: "Engineering", fields: "Engineering, Digital Tech" },
            { name: "ISEP", location: "Paris", url: "https://en.isep.fr/", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800", tag: "Digital Tech", fields: "Digital Tech, Electronics" },
            { name: "EPITA", location: "Paris", url: "https://www.epita.fr/en/", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800", tag: "Computer Science", fields: "Computer Science, Software" },
            { name: "Le Cordon Bleu", location: "Paris", url: "https://www.cordonbleu.edu/paris/en", image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=800", tag: "Culinary Arts", fields: "Culinary Arts, Hospitality" },
            { name: "SupdePub", location: "Multiple", url: "https://www.supdepub.com/en/", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800", tag: "Media & Comm", fields: "Advertising, Communication" },
            { name: "HEIP", location: "Multiple", url: "https://www.heip.fr/en/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800", tag: "Political Science", fields: "Intl. Relations, Political Science" },
            { name: "Instituto Marangoni", location: "Paris", url: "https://www.istitutomarangoni.com/en/campus/paris", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800", tag: "Fashion & Design", fields: "Fashion, Luxury Design" }
        ],
        "International & Private Career Schools": [
            { name: "INSEEC Business School", location: "Multiple", url: "https://www.inseec.com/en/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800", tag: "Private Business", fields: "Business, Management" },
            { name: "ESCE International Business School", location: "Paris", url: "https://www.esce.fr/en/", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800", tag: "International Business", fields: "International Business" },
            { name: "The American Business School of Paris", location: "Paris", url: "https://www.absparis.com/", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800", tag: "American University", fields: "Business, Management" },
            { name: "Paris School of Business", location: "Paris", url: "https://www.psbedu.paris/en", image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=800", tag: "Private Business", fields: "Business, Management" },
            { name: "Berlin School of Business and Innovation (BSBI)", location: "Paris", url: "https://www.berlinsbi.com/", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800", tag: "International Business", fields: "Business, Innovation" },
            { name: "Schiller International University", location: "Paris", url: "https://schiller.edu/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800", tag: "American University", fields: "International Relations, Business" },
            { name: "École de Management Appliqué (EMA)", location: "Paris", url: "https://ema.paris/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800", tag: "Applied Management", fields: "Applied Management" },
            { name: "ESDES School of Business and Management", location: "Lyon", url: "https://www.esdes.fr/en/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800", tag: "Private Business", fields: "Business, Management" },
            { name: "De Vinci Higher Education", location: "Paris", url: "https://www.devinci.fr/en/", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800", tag: "Higher Education", fields: "Higher Education" },
            { name: "College de Paris", location: "Multiple", url: "https://www.collegedeparis.com/", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800", tag: "Higher Education", fields: "Business, Arts" },
            { name: "Queen Mary University of London", location: "Paris", url: "https://www.qmul.ac.uk/paris/", image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=800", tag: "Public Research", fields: "Law, International Relations" }
        ]
    };

    const handleNext = () => setSelectedCity((prev) => (prev + 1) % cities.length);
    const handlePrev = () => setSelectedCity((prev) => (prev - 1 + cities.length) % cities.length);

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
        <main className="animate-[fadeIn_0.5s_ease-out] bg-[#FAFAFA] text-[#1A1F2C] overflow-hidden">

            <section id="destination" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden bg-white px-6">
                <div className="absolute inset-0 z-0 bg-white">
                    <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200" className="w-full h-full object-cover opacity-25 scale-105" alt="Paris Skyline" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[#FAFAFA]" />
                </div>
                <div className="relative z-10 max-w-4xl w-full flex flex-col items-center pt-[117px] pb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 rounded-full text-[10px] font-black uppercase tracking-widest text-rose-900 mb-8 shadow-sm">
                        <Globe size={14} /> Bienvenue en France
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none uppercase mb-8 text-slate-950">
                        Study in the <br /><span className="text-rose-600">Heart of Culture</span>
                    </h1>
                    <p className="text-slate-700 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-sm">
                        Unlock your future in France. Experience world-class education amidst art, history, and innovation in the heart of Europe.
                    </p>
                    <div className="flex flex-col items-center gap-8">
                        <button onClick={onContact} className="bg-rose-600 text-white px-14 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-rose-500/30">
                            Start Your Journey +
                        </button>
                        <div className="flex flex-col items-center gap-2 animate-bounce">
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Scroll to explore</span>
                            <ChevronDown size={14} className="text-slate-500" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="appeal" className="pt-4 pb-8 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-600">Chapter I: The Appeal</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">A Legacy of Culture</h2>
                    <p className="text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                        From the historic avenues of <span className="text-[#1A1F2C] border-b-2 border-rose-100">Paris</span> to the bustling innovation hubs of <span className="text-[#1A1F2C] border-b-2 border-rose-100">Lyon</span>, France offers an education system respected worldwide.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                    {[
                        { id: 'h1', icon: <Palette />, title: "Culture & Lifestyle", desc: "Immerse yourself in a rich cultural heritage that spans centuries." },
                        { id: 'h2', icon: <Utensils />, title: "Food & Wine", desc: "Experience the world-renowned gastronomy and viticulture of France." },
                        { id: 'h3', icon: <Palette />, title: "Art & Fashion", desc: "Access to pioneering creative facilities and institutions." },
                        { id: 'h4', icon: <Globe />, title: "Global Community", desc: "Join a diverse student body from over 200 countries." },
                        { id: 'h5', icon: <TrendingUp />, title: "Career Acceleration", desc: "Benefit from strong industry links and the post study work visa." }
                    ].map((card, i) => (
                        <div key={i} data-scroll-hit={card.id} className={cn("p-6 lg:p-8 border rounded-[2.5rem] shadow-sm transition-all duration-300 group cursor-default", hoveredId === card.id ? "scale-[1.03] shadow-xl border-rose-200 bg-rose-50 -translate-y-2" : "bg-rose-50/50 border-rose-100 hover:scale-[1.03] hover:shadow-xl hover:-translate-y-2 hover:bg-rose-50")}>
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300", hoveredId === card.id ? "scale-110 shadow-sm bg-rose-600" : "bg-rose-50 group-hover:scale-110 group-hover:shadow-sm group-hover:bg-rose-600")}>
                                {React.cloneElement(card.icon as React.ReactElement, { 
                                    className: cn("w-6 h-6 transition-colors duration-300", hoveredId === card.id ? "text-white opacity-100" : "text-rose-600 opacity-60 group-hover:text-white group-hover:opacity-100")
                                })}
                            </div>
                            <h3 className="text-sm font-black uppercase mb-4 tracking-tight text-[#1A1F2C] leading-tight">{card.title}</h3>
                            <p className="text-slate-500 text-[11px] leading-relaxed font-medium">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="pt-16 pb-12 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-600">Chapter II: Living</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Explore <br /> Iconic Cities</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">France is a tapestry of cultures. Choose the environment that inspires you.</p>
                        <div className="hidden lg:flex flex-col gap-2">
                            {cities.map((city, i) => (
                                <button key={i} onClick={() => setSelectedCity(i)} className={cn("w-full px-8 py-5 rounded-2xl text-left font-black uppercase tracking-widest text-xs flex justify-between items-center transition-all", selectedCity === i ? "bg-slate-900 text-white shadow-lg" : "bg-slate-50 text-slate-400 hover:bg-slate-100")}>
                                    {city.name}
                                    <ChevronDown className={cn("transition-transform", selectedCity === i ? "-rotate-90" : "")} size={16} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group">
                        <div className="absolute -inset-4 bg-rose-500/10 blur-3xl rounded-full" />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCity}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <img src={cities[selectedCity].image} alt={cities[selectedCity].name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
                                <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-4 py-1.5 bg-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-sm">{cities[selectedCity].rating}</span>
                                    </div>
                                    <h3 className="text-4xl font-black uppercase tracking-tight mb-4">{cities[selectedCity].name}</h3>
                                    <p className="text-slate-200 font-medium leading-relaxed mb-6">{cities[selectedCity].desc}</p>
                                    <div className="flex items-center gap-6 text-xs font-bold text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-rose-500 shrink-0" /> {cities[selectedCity].stats.split('•')[0]}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Globe size={14} className="text-rose-500 shrink-0" /> {cities[selectedCity].stats.split('•')[1]}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={onContact} 
                                        className="w-full mt-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-black uppercase tracking-widest text-[10px] text-white hover:bg-white hover:text-black transition-all shadow-lg"
                                    >
                                        Start Application
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-20">
                            <button onClick={handlePrev} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-lg border border-white/10"><ChevronLeft size={24} /></button>
                            <button onClick={handleNext} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-lg border border-white/10"><ChevronRight size={24} /></button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="institutions" className="pt-12 pb-4 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-600">Chapter III: The Institutions</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">World-Class <br /> Education</h2>
                    <p className="text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                        France is home to some of the world's most prestigious Grandes Écoles and creative institutes.
                    </p>
                </div>
                {Object.entries(franceUniversities).map(([category, unis]) => {
                        const offers = unis.map((uni, idx) => ({
                            id: `${category}-${idx}`,
                            title: uni.name,
                            description: `Core Fields: ${uni.fields}`,
                            imageSrc: uni.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800',
                            brandLogoSrc: '',
                            brandName: uni.location,
                            tag: uni.tag,
                            href: uni.url
                        }));
                        return (
                            <div key={category} className="mb-10">
                                <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900">{category}</h3>
                                </div>
                                <OfferCarousel offers={offers} hoveredId={hoveredId} colorTheme="rose" />
                            </div>
                        );
                    })}
                    <div className="mt-4 p-10 bg-rose-50 rounded-[3rem] border border-rose-100 text-center">
                        <p className="text-sm font-black uppercase tracking-widest text-rose-900">Discover more with Gradway</p>
                        <p className="text-xs font-medium mt-2 max-w-3xl mx-auto leading-relaxed text-rose-700/60 opacity-60">These represent just a few of our represented institutions. Contact us to explore personalized top-tier university options across France and find the best match for your academic profile.</p>
                    </div>
            </section>

            <section id="essentials" className="pt-24 pb-6 bg-slate-50 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
                    <div className="space-y-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-600">Chapter IV: Essentials</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">France <br /> Essentials Hub</h2>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-md">A comprehensive overview of your journey to studying in the heart of Europe.</p>
                        
                        <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] space-y-4 shadow-sm">
                            <div className="flex items-center gap-3 text-rose-600">
                                <Check size={20} /> <span className="text-xs font-black uppercase tracking-widest">Did you know?</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed italic">France offers a <span className="text-rose-600 font-bold">1-year post-study work visa</span> (APS) for students who complete a Master's degree or higher, allowing you to gain valuable European work experience.</p>
                        </div>
                    </div>
                    <div className="space-y-12 relative">
                        <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-200" />
                        {[
                            { id: 'f1', step: "1", title: "University Admission", desc: "Secure your Offer Letter from your chosen French university or Grande École." },
                            { id: 'f2', step: "2", title: "Campus France", desc: "Complete the 'Etudes en France' procedure and attend your academic interview." },
                            { id: 'f3', step: "3", title: "Financial Proof", desc: "Show proof of funds, typically around €615 per month for living expenses." },
                            { id: 'f4', step: "4", title: "Visa Application", desc: "Submit your long-stay student visa (VLS-TS) application at VFS Global." },
                            { id: 'f5', step: "5", title: "CVEC & Registration", desc: "Pay the CVEC fee and complete your final university registration upon arrival." },
                        ].map((item, i) => (
                            <div key={i} data-scroll-hit={item.id} className={cn("relative pl-16 group cursor-default transition-all duration-300", hoveredId === item.id ? "translate-x-4" : "")}>
                                <div className={cn("absolute left-0 top-0 w-12 h-12 rounded-full bg-white border border-rose-500/30 text-rose-600 flex items-center justify-center font-black z-10 transition-all shadow-lg", hoveredId === item.id && "bg-rose-600 text-white")}>
                                    {item.step}
                                </div>
                                <h4 className={cn("text-xl font-black uppercase tracking-tight mb-2 text-[#1A1F2C] transition-colors", hoveredId === item.id && "text-rose-600")}>{item.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="experience" className="pt-12 pb-6 px-6 md:px-12 bg-[#FAFAFA]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-600">Chapter V: Experience</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Life Beyond Study</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Real stories and vibrant lifestyle from the heart of Europe.</p>
                    </div>
                    <FranceBentoExperience onContact={onContact} />
                </div>
            </section>

            <section className="pt-8 pb-32 px-6 md:px-12 bg-white relative overflow-hidden border-t border-slate-100">
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="space-y-12">
                        <div>
                            <span className="text-rose-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">TAKE THE FIRST STEP</span>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-[#1A1F2C] mb-8">Ready to say <br /> <span className="text-rose-500 italic">Bonjour?</span></h2>
                            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">Our team of experts will guide you through university selection, applications, visas, and finding your perfect home in France.</p>
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 shadow-sm shrink-0 transition-transform group-hover:scale-110">
                                    <BadgeCheck size={28} className="fill-rose-50" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-[#1A1F2C] uppercase tracking-tight">Certified Experts</h4>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed">Expert counselors for French higher education.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 shadow-sm shrink-0 transition-transform group-hover:scale-110">
                                    <UserCheck size={28} className="fill-rose-50" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-[#1A1F2C] uppercase tracking-tight">End-to-End Support</h4>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed">From university application to visa processing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-rose-600/5 blur-[100px] rounded-full" />
                        <div className="relative bg-rose-600 rounded-[4rem] p-10 md:p-14 text-white shadow-[0_40px_100px_rgba(225,29,72,0.25)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_50px_120px_rgba(225,29,72,0.4)]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 blur-[50px] rounded-full translate-y-1/2 -translate-x-1/2" />
                            <div className="relative z-10 space-y-10">
                                <div className="space-y-4">
                                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">Let's Map Your Success.</h3>
                                    <p className="text-rose-50 text-base md:text-lg font-medium leading-relaxed max-w-sm">Our expert counselors offer a personalized 1:1 strategy session to find your perfect university match.</p>
                                </div>
                                <div className="space-y-6">
                                    <a href={`tel:${WA_PHONE}`} className="flex items-center gap-6 group/item">
                                        <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg shrink-0 group-hover/item:bg-white/30 transition-colors">
                                            <Headset className="text-white" size={24} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-100/60">Phone Support</p>
                                            <p className="text-xl font-black tracking-tight group-hover/item:underline underline-offset-4 decoration-rose-200">{PHONE_DISPLAY}</p>
                                        </div>
                                    </a>
                                    <a href="mailto:info@gradwayedu.com" className="flex items-center gap-6 group/item">
                                        <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg shrink-0 group-hover/item:bg-white/30 transition-colors">
                                            <Mail className="text-white" size={24} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-100/60">Email Inquiries</p>
                                            <p className="text-xl font-black tracking-tight group-hover/item:underline underline-offset-4 decoration-rose-200">info@gradwayedu.com</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                                    <button onClick={onContact} className="flex-1 bg-white py-6 rounded-full font-black uppercase tracking-widest text-[11px] text-rose-600 hover:bg-black hover:text-white transition-all shadow-xl active:scale-95">Book Session</button>
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

const PopUpInquiryForm = ({ isOpen, onClose, countryPrefix }: any) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    // Updated State for Full Form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [intake, setIntake] = useState("");
    const [message, setMessage] = useState("");
    const [programLevel, setProgramLevel] = useState("");
    const [fieldOfStudy, setFieldOfStudy] = useState("");
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    
    const popFormRef = useRef<HTMLFormElement>(null);
    const countryDropdownRef = useRef<HTMLDivElement>(null);

    // Initial load logic for countries if coming from a specific page like UK
    useEffect(() => {
        if (isOpen && countryPrefix) {
            const countryName = countryPrefix === 'UK' ? 'UNITED KINGDOM' : countryPrefix.toUpperCase();
            if (!selectedCountries.includes(countryName)) {
                setSelectedCountries(prev => [...prev, countryName]);
            }
        }
    }, [isOpen, countryPrefix]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
                setIsCountryDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleCountrySelection = (countryName: string) => {
        setSelectedCountries(prev => {
            const upperName = countryName.toUpperCase();
            if (prev.includes(upperName)) {
                return prev.filter(c => c !== upperName);
            }
            if (prev.length < 4) {
                return [...prev, upperName];
            }
            return prev;
        });
    };

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (popFormRef.current) {
             popFormRef.current.submit();
             setTimeout(() => {
                 setSubmitted(true);
                 setIsSubmitting(false);
             }, 1500);
        }
    };

    // Message Prepend Logic for UK Page
    const finalMessage = countryPrefix
        ? `(Filled from ${countryPrefix} Page) ${message || ""}`
        : message;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <iframe name="uk_pop_target" style={{ position: 'absolute', left: '-9999px' }} />
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors z-20">
                    <X size={20} className="text-slate-500" />
                </button>
                
                {!submitted ? (
                    <div className="relative z-10">
                        <div className="mb-8 text-center md:text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2 block">{countryPrefix} ADMISSIONS</span>
                            <h3 className="text-3xl font-black text-[#1A1F2C] uppercase tracking-tight">Start Your Journey</h3>
                            <p className="text-slate-500 text-sm font-medium mt-2">Complete the form below to get expert guidance.</p>
                        </div>
                        <form ref={popFormRef} action={GOOGLE_FORM_URL} method="POST" target="uk_pop_target" onSubmit={handleSubmit} className="space-y-6">
                            {/* Hidden Country Inputs */}
                            {selectedCountries.map((c, i) => (
                                <input key={i} type="hidden" name={FORM_ENTRIES.countries} value={c} />
                            ))}
                            {/* If no countries selected, send default based on page or empty */}
                            {selectedCountries.length === 0 && countryPrefix === 'UK' && (
                                <input type="hidden" name={FORM_ENTRIES.countries} value="UNITED KINGDOM" />
                            )}
                            {selectedCountries.length === 0 && countryPrefix === 'Germany' && (
                                <input type="hidden" name={FORM_ENTRIES.countries} value="GERMANY" />
                            )}
                            {selectedCountries.length === 0 && countryPrefix === 'France' && (
                                <input type="hidden" name={FORM_ENTRIES.countries} value="FRANCE" />
                            )}
                            
                            <input type="hidden" name={FORM_ENTRIES.message} value={finalMessage} />
                            <input type="hidden" name={FORM_ENTRIES.programLevel} value={programLevel} />
                            <input type="hidden" name={FORM_ENTRIES.fieldOfStudy} value={fieldOfStudy} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-3">Full Name</label>
                                    <input required name={FORM_ENTRIES.name} value={name} onChange={e => setName(e.target.value)} className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" placeholder="John Doe" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-3">Phone Number</label>
                                    <input required name={FORM_ENTRIES.phone} value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" placeholder="+94 77 ..." />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-3">Email Address</label>
                                    <input required type="email" name={FORM_ENTRIES.email} value={email} onChange={e => setEmail(e.target.value)} className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" placeholder="john@example.com" />
                                </div>
                                <CustomDropdown label="Program Level" value={programLevel} options={PROGRAM_LEVELS} onChange={setProgramLevel} placeholder="Select level" className="w-full" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 {/* Country Dropdown */}
                                 <div className="space-y-1 relative" ref={countryDropdownRef}>
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-3">Preferred Countries</label>
                                    <button type="button" onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)} className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all flex justify-between items-center text-left">
                                        <span className={selectedCountries.length === 0 ? "text-slate-400" : "text-slate-800 line-clamp-1"}>
                                            {selectedCountries.length > 0 ? selectedCountries.join(", ") : "Select countries"}
                                        </span>
                                        <ChevronDown size={14} className={cn("transition-transform", isCountryDropdownOpen && "rotate-180")} />
                                    </button>
                                    <AnimatePresence>
                                        {isCountryDropdownOpen && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute z-[100] left-0 right-0 top-[110%] bg-white border border-slate-100 rounded-3xl shadow-2xl p-2 max-h-[180px] overflow-y-auto custom-scrollbar">
                                                {DESTINATIONS.map(d => (
                                                    <button key={d.id} type="button" onClick={() => toggleCountrySelection(d.name)} className={cn("flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-left group hover:bg-blue-50", selectedCountries.includes(d.name.toUpperCase()) ? "bg-blue-50 text-blue-600" : "text-slate-600")}>
                                                        <div className={cn("w-4 h-4 rounded border flex items-center justify-center transition-all", selectedCountries.includes(d.name.toUpperCase()) ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 group-hover:border-blue-500")}>
                                                            {selectedCountries.includes(d.name.toUpperCase()) && <Check size={10} strokeWidth={3} />}
                                                        </div>
                                                        <span className="text-xs font-bold uppercase tracking-wider">{d.name}</span>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <CustomDropdown label="Field of Study" value={fieldOfStudy} options={FIELDS_OF_STUDY} onChange={setFieldOfStudy} placeholder="Select field" className="w-full" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-3">Target Intake</label>
                                <input required name={FORM_ENTRIES.intake} value={intake} onChange={e => setIntake(e.target.value)} className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" placeholder="e.g. Sept 2026" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-3">Message</label>
                                <textarea required value={message} onChange={e => setMessage(e.target.value)} rows={3} className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-none" placeholder="Tell us about your goals..." />
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all mt-4 flex items-center justify-center gap-2 shadow-xl active:scale-95">
                                {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Application"}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="text-center py-12 relative z-10">
                        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <Check size={32} strokeWidth={4} />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-[#1A1F2C] mb-2">Request Received</h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">Our team will contact you shortly to discuss your {countryPrefix} study plans.</p>
                        <button onClick={onClose} className="text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-[#1A1F2C]">Close Window</button>
                    </div>
                )}
            </div>
        </div>
    );
}

const App = () => {
    const [view, setView] = useState('main');
    const [modal, setModal] = useState('none');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ukFormOpen, setUkFormOpen] = useState(false);
    const [germanyFormOpen, setGermanyFormOpen] = useState(false);
    const [franceFormOpen, setFranceFormOpen] = useState(false);
    const [genericFormOpen, setGenericFormOpen] = useState(false);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const pointerPos = useRef({ x: 0, y: 0 });
    const [selectedRegion, setSelectedRegion] = useState("Europe");

    // FORM STATES
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [intake, setIntake] = useState("");
    const [message, setMessage] = useState("");
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState("");
    const [selectedProgramLevel, setSelectedProgramLevel] = useState("");
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const countryDropdownRef = useRef<HTMLDivElement>(null);
    const hiddenFormRef = useRef<HTMLFormElement>(null);

    // Interaction Engine: Unified hit-testing for scroll, touch, and move
    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            pointerPos.current = { x: e.clientX, y: e.clientY };
            checkHit();
        };
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) {
                pointerPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                checkHit();
            }
        };
        const checkHit = () => {
            const element = document.elementFromPoint(pointerPos.current.x, pointerPos.current.y);
            const hitCard = element?.closest('[data-scroll-hit]');
            if (hitCard) {
                setHoveredId(hitCard.getAttribute('data-scroll-hit'));
            } else {
                setHoveredId(null);
            }
        };
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('scroll', checkHit, { passive: true });
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('scroll', checkHit);
        };
    }, []);

    // --- HASH ROUTING LOGIC ---
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === '#uk')
                setView('destination-uk');
            else if (hash === '#germany')
                setView('destination-germany');
            else if (hash === '#france')
                setView('destination-france');
            else if (hash.startsWith('#destination-'))
                setView(hash.substring(1));
            else if (hash === '#careers')
                setView('careers');
            else if (hash === '#faq-full')
                setView('faq-full');
            else if (hash === '#services-full')
                setView('services-full');
            else if (hash === '#partner')
                setView('partner');
            else
                setView('main');
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        let title = "Gradway | Study Abroad & Visa Consultancy - Colombo, Sri Lanka";
        let desc = "Gradway (Pvt) Ltd is Sri Lanka's leading study abroad consultancy. Get expert guidance for university admissions, student visas, scholarships, and post-study work in the UK, Germany, Canada, Australia, France, and the USA and many more.";
        let canonical = "https://gradwayedu.com/";

        if (view === 'destination-uk') {
            title = "Study in the UK - Universities, Visas & Scholarships | Gradway";
            desc = "Explore top UK universities, With post-study work visas (Graduate Route), admission criteria, and scholarship guidance from Gradway Colombo.";
            canonical = "https://gradwayedu.com/#uk";
        } else if (view === 'destination-germany') {
            title = "Study in Germany - Free Tuition & English Programs | Gradway";
            desc = "Discover tuition-free public universities in Germany, English-taught STEM courses, APS guidance, and 18-month post-study work rights with Gradway.";
            canonical = "https://gradwayedu.com/#germany";
        } else if (view === 'destination-france') {
            title = "Study in France - Affordable European Degrees | Gradway";
            desc = "Apply for English-taught bachelor's and master's degrees in France with Schengen access, work rights, and visa support from Gradway.";
            canonical = "https://gradwayedu.com/#france";
        } else if (view === 'faq-full') {
            title = "Frequently Asked Questions (FAQ) - Study Abroad & Visas | Gradway";
            desc = "Get clear, authoritative answers to top questions on studying abroad, visa processing times, university requirements, and costs.";
            canonical = "https://gradwayedu.com/#faq-full";
        } else if (view === 'services-full') {
            title = "Our Services - Admissions, Visas, Scholarships & Briefings | Gradway";
            desc = "End-to-end international education services: university mapping, SOP review, financial filing, scholarship discovery, and mock visa interviews.";
            canonical = "https://gradwayedu.com/#services-full";
        } else if (view === 'partner') {
            title = "Partner With Us - Institutional Collaborations | Gradway";
            desc = "Partner with Gradway (Pvt) Ltd to recruit high-achieving Sri Lankan and South Asian students for global universities and colleges.";
            canonical = "https://gradwayedu.com/#partner";
        } else if (view === 'careers') {
            title = "Careers at Gradway - Join Our Colombo Education Team";
            desc = "Explore exciting career and counselor opportunities at Gradway Colombo. Help students achieve global academic dreams.";
            canonical = "https://gradwayedu.com/#careers";
        } else if (view.startsWith('destination-')) {
            const countryId = view.replace('destination-', '');
            const countryData = otherDestinationsData[countryId];
            if (countryData) {
                title = `Study in ${countryData.name} - University Admissions & Visas | Gradway`;
                desc = `Comprehensive guide to studying in ${countryData.name}. Get personalized university application and visa processing support from Gradway Colombo.`;
                canonical = `https://gradwayedu.com/#destination-${countryId}`;
            }
        }

        document.title = title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", desc);
        }
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute("content", title);
        }
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            ogDesc.setAttribute("content", desc);
        }
        const canonicalTag = document.querySelector('link[rel="canonical"]');
        if (canonicalTag) {
            canonicalTag.setAttribute("href", canonical);
        }
    }, [view]);

    useEffect(() => {
        if (modal !== 'none' || ukFormOpen || germanyFormOpen || franceFormOpen || genericFormOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
    }, [modal, ukFormOpen, germanyFormOpen, franceFormOpen, genericFormOpen]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
                setIsCountryDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Add manual validation since these custom inputs don't trigger native HTML validation correctly on submit
        if (!name || !phone || !email || !selectedProgramLevel || selectedCountries.length === 0 || !selectedFieldOfStudy || !intake || !message) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        setIsSubmitting(true);
        if (hiddenFormRef.current) {
            hiddenFormRef.current.submit();
            setTimeout(() => {
                setFormSubmitted(true);
                setIsSubmitting(false);
                // We keep the fields populated or clear them as needed? 
                // Let's clear them for a fresh submission.
                setName("");
                setPhone("");
                setEmail("");
                setIntake("");
                setMessage("");
                setSelectedCountries([]);
                setSelectedFieldOfStudy("");
                setSelectedProgramLevel("");
            }, 1500);
        }
    };

    const toggleCountrySelection = (countryName: string) => {
        setSelectedCountries(prev => {
            if (prev.includes(countryName)) {
                return prev.filter(c => c !== countryName);
            }
            if (prev.length < 4) {
                return [...prev, countryName];
            }
            return prev;
        });
    };

    const scrollToId = (id: string) => {
        if (view !== 'main' && ['top', 'aboutus', 'services', 'destinations', 'stories', 'contact', 'faq'].includes(id)) {
            setView('main');
            window.location.hash = '';
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const offset = 20;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    window.scrollTo({
                        top: id === 'top' ? 0 : elementPosition - offset,
                        behavior: 'smooth'
                    });
                }
            }, 100);
            return;
        }
        if (id === 'careers') {
            window.location.hash = '#careers';
            return;
        }
        if (id === 'faq-full') {
            window.location.hash = '#faq-full';
            return;
        }
        if (id === 'services-full') {
            window.location.hash = '#services-full';
            return;
        }
        if (id === 'destination-uk') {
            window.location.hash = '#uk';
            return;
        }
        if (id === 'destination-germany') {
            window.location.hash = '#germany';
            return;
        }
        if (id === 'destination-france') {
            window.location.hash = '#france';
            return;
        }
        if (id.startsWith('destination-')) {
            window.location.hash = '#' + id;
            return;
        }
        if (id === 'partner') {
            window.location.hash = '#partner';
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            const offset = 20;
            window.scrollTo({
                top: id === 'top' ? 0 : element.getBoundingClientRect().top + window.scrollY - offset,
                behavior: 'smooth'
            });
        }
    };

    const navigateToServiceDetail = (id: number) => {
        window.location.hash = '#services-full';
        setTimeout(() => {
            const el = document.getElementById(`service-${id}`);
            if (el) {
                const offset = 100;
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }, 150);
    };

    if (view === 'careers') {
        return (
            <div className="min-h-screen bg-[#FAFAFA]">
                <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
                <main className="pt-40 pb-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
                    <div className="relative mb-16">
                        <div className="absolute inset-0 bg-amber-400 blur-3xl opacity-20 animate-pulse rounded-full" />
                        <Telescope size={120} strokeWidth={1} className="text-amber-500 relative z-10" />
                    </div>
                    <SectionBadge text="Careers" amberOutline />
                    <h1 className="text-5xl md:text-7xl font-black text-[#1A1F2C] leading-tight tracking-tight mb-12 uppercase">Exploring New Talent.</h1>
                    <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-16">We are always looking for visionary consultants and creative thinkers to join our mission in Colombo.</p>
                    <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 max-w-lg w-full mb-20">
                        <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-400">Current Opportunities</h3>
                        <p className="text-slate-800 font-bold text-xl mb-8 leading-tight tracking-tight">Currently, there are no open positions.</p>
                        <p className="text-slate-500 mb-8 font-medium">All future openings will be announced first on our LinkedIn page.</p>
                        <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#1A1F2C] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:scale-105 transition-all">Visit LinkedIn Page</a>
                    </div>
                    <div className="w-full max-w-5xl pt-20 border-t border-slate-200">
                        <h2 className="text-3xl font-black mb-12 text-[#1A1F2C] uppercase tracking-tight">Join the Community</h2>
                        <div className="flex flex-row flex-wrap justify-center gap-6 md:gap-10">
                            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all"><i className="fa-brands fa-whatsapp text-3xl" /></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">WhatsApp</span>
                            </a>
                            <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all"><Linkedin /></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">LinkedIn</span>
                            </a>
                            <a href="https://www.instagram.com/gradway_education" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all"><Instagram /></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Instagram</span>
                            </a>
                            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all"><i className="fa-brands fa-tiktok text-3xl" /></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">TikTok</span>
                            </a>
                            <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all"><Facebook /></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Facebook</span>
                            </a>
                        </div>
                    </div>
                </main>
                <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
                <AnimatePresence>{modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}</AnimatePresence>
            </div>
        );
    }
    if (view === 'services-full') {
        return (
            <div className="min-h-screen bg-slate-50">
                <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
                <main className="pt-32 pb-24 animate-[fadeIn_0.5s_ease-out]">
                    <div className="container mx-auto px-4 lg:px-12">
                        <div className="max-w-4xl mx-auto mb-20 text-center">
                            <SectionBadge text="Full Expertise" amberOutline />
                            <h1 className="text-5xl md:text-7xl font-black text-[#1A1F2C] leading-tight tracking-tight mb-8 uppercase">Our Full Support.</h1>
                            <p className="text-slate-500 text-xl font-medium leading-relaxed">A comprehensive guide to the professional services we provide for Sri Lankan students seeking world-class education.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
                            {SERVICES.map((s) => (
                                <ServiceCardRenderer key={s.id} service={s} scrollToId={scrollToId} />
                            ))}
                        </div>
                    </div>
                </main>
                <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
                <AnimatePresence>{modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}</AnimatePresence>
            </div>
        );
    }
    if (view === 'faq-full') {
        const groupedFaqs = FULL_FAQ.reduce((acc: any, faq) => {
            if (!acc[faq.category])
                acc[faq.category] = [];
            acc[faq.category].push(faq);
            return acc;
        }, {});
        return (
            <div className="min-h-screen bg-slate-50">
                <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
                <main className="pt-32 pb-24 animate-[fadeIn_0.5s_ease-out]">
                    <div className="container mx-auto px-4 lg:px-12">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-20">
                                <SectionBadge text="Comprehensive Guide" amberOutline />
                                <h1 className="text-5xl md:text-7xl font-black text-[#1A1F2C] mb-8 leading-tight uppercase tracking-tight">Your Knowledge Hub.</h1>
                                <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">Everything you need to know about starting your international education journey from Sri Lanka.</p>
                            </div>
                            <div className="grid grid-cols-1 gap-16">
                                {Object.entries(groupedFaqs).map(([category, items]: any) => (
                                    <section key={category} className="space-y-8">
                                        <div className="flex items-center gap-4">
                                            <div className="h-px flex-1 bg-slate-200" />
                                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">{category}</h2>
                                            <div className="h-px flex-1 bg-slate-200" />
                                        </div>
                                        <FAQAccordion items={items} />
                                    </section>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
                <AnimatePresence>{modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}</AnimatePresence>
            </div>
        );
    }
    if (view === 'destination-uk') {
        return (
            <div className="min-h-screen">
                <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
                <PopUpInquiryForm isOpen={ukFormOpen} onClose={() => setUkFormOpen(false)} countryPrefix="UK" />
                <UKDestinationPage onContact={() => setUkFormOpen(true)} />
                <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
                <AnimatePresence>{modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}</AnimatePresence>
            </div>
        );
    }
    if (view === 'destination-germany') {
        return (
            <div className="min-h-screen">
                <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
                <PopUpInquiryForm isOpen={germanyFormOpen} onClose={() => setGermanyFormOpen(false)} countryPrefix="Germany" />
                <GermanyDestinationPage onContact={() => setGermanyFormOpen(true)} />
                <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
                <AnimatePresence>{modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}</AnimatePresence>
            </div>
        );
    }
    if (view === 'destination-france') {
        return (
            <div className="min-h-screen">
                <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
                <PopUpInquiryForm isOpen={franceFormOpen} onClose={() => setFranceFormOpen(false)} countryPrefix="France" />
                <FranceDestinationPage onContact={() => setFranceFormOpen(true)} />
                <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
                <AnimatePresence>{modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}</AnimatePresence>
            </div>
        );
    }
    if (view.startsWith('destination-') && view !== 'destination-uk' && view !== 'destination-germany' && view !== 'destination-france') {
        const countryId = view.replace('destination-', '');
        const countryData = otherDestinationsData[countryId];
        
        if (countryData) {
            let bentoComponent = <GenericBentoExperience onContact={() => setGenericFormOpen(true)} colorTheme={countryData.colorTheme} />;
            
            if (countryId === 'ireland') {
                bentoComponent = <IrelandBentoExperience onContact={() => setGenericFormOpen(true)} />;
            } else if (countryId === 'canada') {
                bentoComponent = <CanadaBentoExperience onContact={() => setGenericFormOpen(true)} />;
            }

            const dataWithBento = {
                ...countryData,
                bentoGrid: bentoComponent
            };

            return (
                <div className="min-h-screen">
                    <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
                    <PopUpInquiryForm isOpen={genericFormOpen} onClose={() => setGenericFormOpen(false)} countryPrefix={countryData.name} />
                    <GenericDestinationPage data={dataWithBento} onContact={() => setGenericFormOpen(true)} />
                    <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
                    <AnimatePresence>{modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}</AnimatePresence>
                </div>
            );
        }
    }
    if (view === 'partner') {
         return (
            <div className="min-h-screen">
                <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
                <PartnerPage onNavigate={scrollToId} />
                <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
                <AnimatePresence>{modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}</AnimatePresence>
            </div>
        );
    }
    // Main View
    return (
        <div className="min-h-screen bg-[#FAFAFA]" id="top">
            <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
            <main id="main-content" tabIndex={-1} className="outline-none">
            <iframe name="google_form_target" id="google_form_target" style={{ position: 'absolute', left: '-9999px' }} />
            <section id="home" className="relative min-h-[100svh] flex flex-col items-center pt-32 lg:pt-0 lg:flex-row overflow-hidden">
                <div className="absolute inset-0 hero-pattern opacity-10 pointer-events-none" />
                <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 relative z-10 flex-1 lg:flex-none">
                    <div className="lg:w-1/2 text-center lg:text-left mt-8 md:mt-0">
                         <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 border bg-slate-100 border-slate-200">
                             <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1F2C]">your Experts in Education</span>
                         </div>
                         <h1 className="text-5xl md:text-8xl font-black leading-[1.05] mb-6"><span className="text-[#1A1F2C] block tracking-tight">Migration</span><span className="text-amber-500 block tracking-tight">Simplified!!</span></h1>
                         <p className="text-base md:text-lg text-slate-600 mb-12 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">Empowering students to achieve global academic success with tailored strategies and dedicated support from our Colombo headquarters.</p>
                         <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                             <button onClick={() => scrollToId('destinations')} className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-12 py-5 rounded-full font-black shadow-2xl shadow-amber-200/50 hover:scale-105 active:scale-95 transition-all text-[11px] uppercase tracking-widest">Explore Destinations</button>
                             <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#25D366] text-white px-12 py-5 rounded-full font-black shadow-xl hover:scale-105 transition-all text-[11px] uppercase tracking-widest flex items-center justify-center gap-2"><i className="fa-brands fa-whatsapp text-xl" /> WhatsApp Us</a>
                         </div>
                    </div>
                    {/* Hero Image Section */}
                    <div className="lg:w-1/2 relative h-[500px] md:h-[650px] w-full flex items-center justify-center">
                        <div className="relative w-full h-full max-w-[600px]">
                            <div className="hero-bubble absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] md:w-[260px] md:h-[260px] bg-white z-20 flex flex-col items-center justify-center shadow-2xl animate-float-center hero-bubble-center p-8 text-slate-900">
                                <StudentsFirstIcon className="mb-2 md:mb-4 w-12 h-12 md:w-20 md:h-20" />
                                <span className="text-[12px] md:text-xl font-black uppercase tracking-widest leading-none">Students</span>
                                <span className="text-[12px] md:text-xl font-black uppercase tracking-widest leading-none">First</span>
                            </div>
                            <div className="hero-bubble absolute top-[15%] left-[5%] lg:top-[8%] lg:left-[2%] w-[100px] h-[100px] md:w-[170px] md:h-[170px] bg-[#FFB800] z-30 animate-float-tl p-4 text-[#1A1F2C]">
                                <GraduationCap size={40} className="mb-2 hidden md:block" />
                                <GraduationCap size={20} className="mb-1 md:hidden" />
                                <span className="text-xl md:text-4xl font-black leading-none">450+</span>
                                <span className="text-[7px] md:text-[11px] font-black uppercase tracking-widest opacity-80 text-black">UNIVERSITIES</span>
                            </div>
                            
                            <div className="hero-bubble absolute top-[10%] right-[5%] lg:top-[5%] lg:right-[2%] w-[110px] h-[110px] md:w-[180px] md:h-[180px] bg-white z-10 animate-float-tr p-4 border border-slate-100">
                                <Globe size={40} className="mb-2 hidden md:block text-[#FFB800]" />
                                <Globe size={20} className="mb-1 md:hidden text-[#FFB800]" />
                                <span className="text-xl md:text-4xl font-black text-[#1A1F2C] leading-none">10+</span>
                                <span className="text-[7px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">COUNTRIES</span>
                            </div>

                            <div className="hero-bubble absolute bottom-[15%] left-[2%] lg:bottom-[15%] lg:left-[-10%] w-[110px] h-[110px] md:w-[180px] md:h-[180px] bg-[#4F46E5] z-30 animate-float-bl p-4 text-white">
                                <Layers size={40} className="mb-2 hidden md:block" />
                                <Layers size={20} className="mb-1 md:hidden" />
                                <span className="text-xl md:text-4xl font-black leading-none">10k+</span>
                                <span className="text-[7px] md:text-[11px] font-black uppercase tracking-widest opacity-80">PROGRAMS</span>
                            </div>

                            <div className="hero-bubble absolute bottom-[5%] right-[2%] lg:bottom-[15%] lg:right-[-10%] w-[110px] h-[110px] md:w-[200px] md:h-[200px] bg-black z-20 animate-float-br p-6 text-white text-center">
                                <CircleCheck size={40} className="mb-2 hidden md:block text-white" />
                                <CircleCheck size={20} className="mb-1 md:hidden text-white" />
                                <div className="flex flex-col items-center">
                                    <span className="text-[6px] md:text-[9px] font-black uppercase tracking-widest leading-tight">END TO END</span>
                                    <span className="text-[6px] md:text-[9px] font-black uppercase tracking-widest leading-tight">APPLICATION</span>
                                    <span className="text-[6px] md:text-[9px] font-black uppercase tracking-widest leading-tight">MANAGEMENT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="aboutus" className="py-24 bg-white relative overflow-hidden scroll-mt-[76px]">
                <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                         <div className="relative">
                             <div className="absolute -inset-4 bg-amber-500/10 blur-3xl rounded-full" />
                             <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" className="rounded-[3rem] shadow-2xl border-8 border-white relative z-10 object-cover aspect-video" alt="Gradway Community" />
                         </div>
                    </div>
                    <div className="lg:w-1/2">
                         <SectionBadge text="About us" amberOutline />
                         <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] mb-8 leading-tight tracking-tight">Guiding Ambitions Beyond Borders</h2>
                         <p className="text-slate-600 text-lg leading-relaxed mb-12 font-medium">Gradway (Pvt) Limited is a premier education consultancy based in Colombo. We bridge the gap between ambitious Sri Lankan students and world-class international institutions through transparent and expert partnerships.</p>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <motion.div 
                                data-scroll-hit="mission-card" 
                                className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 cursor-default"
                                whileHover={{ 
                                    scale: 1.05, 
                                    backgroundColor: "#ffffff",
                                    borderColor: "rgb(251 191 36)", // amber-400
                                    boxShadow: "0 0 20px rgba(251, 191, 36, 0.4)" // Amber glow
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                             >
                                 <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg">
                                     <Target size={20} />
                                 </div>
                                 <h4 className="font-black text-[#1A1F2C] mb-2 uppercase text-xs tracking-widest">Our Mission</h4>
                                 <p className="text-xs text-slate-500 leading-relaxed font-medium italic">"To provide ethical, transparent, and personalized guidance that turns global education dreams into reality."</p>
                             </motion.div>
                             
                             <motion.div 
                                data-scroll-hit="vision-card" 
                                className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 cursor-default"
                                whileHover={{ 
                                    scale: 1.05, 
                                    backgroundColor: "#ffffff",
                                    borderColor: "rgb(79 70 229)", // indigo-600
                                    boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)" // Indigo glow
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                             >
                                 <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg">
                                     <Compass size={20} />
                                 </div>
                                 <h4 className="font-black text-[#1A1F2C] mb-2 uppercase text-xs tracking-widest">Our Vision</h4>
                                 <p className="text-xs text-slate-500 leading-relaxed font-medium italic">"To become the premier bridge between Sri Lankan talent and world-class academic institutions."</p>
                             </motion.div>
                         </div>
                    </div>
                </div>
            </section>
            
            <section id="services" className="py-24 bg-slate-50 scroll-mt-[76px]">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <SectionBadge text="Our Expertise" />
                        <h2 className="text-3xl md:text-5xl font-black text-[#1A1F2C] uppercase tracking-tight">Our Services</h2>
                        <p className="mt-4 text-slate-500 font-medium text-sm md:text-base leading-relaxed">We take you from confusion to clarity, with our comprehensive support tailored to your academic goals, ensuring smooth transition from application to arrival at your dream destination.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SERVICES.map((service) => (
                            <div 
                                key={service.id} 
                                onClick={() => navigateToServiceDetail(service.id)}
                                className={cn(
                                    "bg-white p-8 rounded-[2.5rem] shadow-sm transition-all duration-300 border border-slate-100 flex flex-col cursor-pointer relative overflow-hidden group hover:shadow-md hover:-translate-y-1",
                                    service.id === 7 ? "md:col-span-2 lg:col-span-2" : ""
                                )}
                            >
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform relative z-10 group-hover:scale-110", service.iconBg, service.iconColor)}>
                                     <i className={cn(service.icon, "text-xl")} />
                                </div>
                                <h3 className="text-lg font-black text-[#1A1F2C] mb-4 leading-tight relative z-10 uppercase whitespace-nowrap lg:whitespace-normal tracking-tight">{service.title}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-1 font-medium relative z-10">{service.description}</p>
                                <div className="text-[9px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-2 transition-transform relative z-10 group-hover:translate-x-2">
                                    Learn More <i className="fa-solid fa-arrow-right" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="destinations" className="py-24 bg-white scroll-mt-[76px]">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="mb-10 text-center lg:text-left">
                        <SectionBadge text="World Map" />
                        <h2 className="text-3xl md:text-6xl font-black text-[#1A1F2C] tracking-tight uppercase">Our Global Destinations</h2>
                    </div>

                    {["Europe", "Americas & Pacific", "Asia & Other"].map(region => (
                        <div key={region} className="mb-16">
                            <div className="flex justify-between items-center mb-4 border-l-4 border-amber-500 pl-6">
                                <h3 className="text-2xl font-black text-[#1A1F2C] uppercase tracking-widest text-sm">{region}</h3>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"><ChevronLeft size={12} /></button>
                                    <button className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"><ChevronRight size={12} /></button>
                                </div>
                            </div>
                            <div className="flex overflow-x-auto scrollbar-hide space-x-6 pt-6 pb-8 px-4 snap-x snap-mandatory">
                                {DESTINATIONS.filter(d => d.region === region).map((dest) => {
                                    const hitId = `dest-card-${dest.id}`;
                                    return (
                                        <div key={dest.id} className="min-w-[75vw] md:min-w-[340px] snap-center" onClick={() => scrollToId('destination-' + dest.id)}>
                                            <div className="relative h-full rounded-[3.5rem] border-[1px] border-transparent p-4 overflow-visible" data-scroll-hit={hitId}>
                                                <GlowingEffect spread={60} glow={true} disabled={false} proximity={300} inactiveZone={0.01} borderWidth={4} />
                                                <div className={cn("relative flex h-[380px] flex-col justify-between overflow-hidden rounded-[3.25rem] border bg-white p-10 shadow-sm transition-all duration-300 border-slate-100 group cursor-pointer", hoveredId === hitId ? "shadow-2xl -translate-y-2" : "")}>
                                                     <div className="flex justify-between items-start mb-8 relative z-10">
                                                        <div className={cn("w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-transform border border-slate-50", hoveredId === hitId && "scale-110")}>
                                                            <i className={`${dest.icon} text-4xl`} style={{ color: dest.color }} />
                                                        </div>
                                                        <img src={dest.image} alt={dest.name} className={cn("w-16 h-10 rounded shadow-md border-[0.5px] border-black/10", dest.id === 'switzerland' ? "object-contain bg-[#FF0000] p-1" : "object-cover")} />
                                                    </div>
                                                    <h3 className="text-3xl font-black text-[#1A1F2C] mb-4 relative z-10 uppercase tracking-tight">{dest.name}</h3>
                                                    <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 font-medium relative z-10">{dest.description}</p>
                                                    <button className={cn("text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-2 transition-transform relative z-10", hoveredId === hitId && "translate-x-2")}>
                                                        Learn More <i className="fa-solid fa-arrow-right" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="stories" className="py-24 bg-[#0a0d14] text-white scroll-mt-[76px]">
                 <div className="container mx-auto px-4 lg:px-12 text-center mb-12">
                    <SectionBadge text="Real Stories" lightVariant />
                    <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">Student Success Stories</h2>
                    <p className="text-slate-400 text-sm md:text-base font-medium max-w-xl mx-auto">
                        Discover inspiring journeys from students who achieved their study and migration dreams with Gradway.
                    </p>
                 </div>
                 <StudentSuccessCarousel />
            </section>

            <section id="contact" className="py-24 bg-slate-50 scroll-mt-[76px]">
                <div className="container mx-auto px-4 lg:px-12 text-center flex flex-col items-center">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 border bg-amber-100 border-amber-200">
                         <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Contact Hub</span>
                     </div>
                    <h2 className="text-4xl md:text-7xl font-black text-[#1A1F2C] tracking-tight mb-12 leading-tight uppercase max-w-4xl">Start Your Journey.</h2>
                    <div className="w-full max-w-3xl bg-white p-10 md:p-14 rounded-[4rem] shadow-2xl text-left border border-slate-100 mb-16 relative overflow-visible">
                         {!formSubmitted ? (
                             <form onSubmit={handleContactSubmit} className="space-y-8" aria-label="Study Abroad Assessment Inquiry Form">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label htmlFor="inquiry-name" className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Full Name *</label>
                                        <input id="inquiry-name" required placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus:border-amber-500 focus:bg-white transition-all font-medium text-sm text-slate-800" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="inquiry-phone" className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Phone Number *</label>
                                        <input id="inquiry-phone" required type="tel" placeholder="+94 xx xxx xxxx" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus:border-amber-500 focus:bg-white transition-all font-medium text-sm text-slate-800" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label htmlFor="inquiry-email" className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Email Address *</label>
                                        <input id="inquiry-email" required type="email" placeholder="info@gradwayedu.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus:border-amber-500 focus:bg-white transition-all font-medium text-sm text-slate-800" />
                                    </div>
                                    <CustomDropdown label="Program Level" value={selectedProgramLevel} options={PROGRAM_LEVELS} onChange={setSelectedProgramLevel} placeholder="Select program level" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-1 relative" ref={countryDropdownRef}>
                                        <label id="pref-countries-label" className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Preferred Countries (Select up to 4)</label>
                                        <button 
                                            type="button" 
                                            aria-labelledby="pref-countries-label"
                                            aria-haspopup="listbox"
                                            aria-expanded={isCountryDropdownOpen}
                                            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)} 
                                            className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none text-left text-sm font-medium flex items-center justify-between hover:bg-slate-100 transition-all focus-visible:ring-2 focus-visible:ring-amber-500 focus:border-amber-500 focus:bg-white"
                                        >
                                            <span className={selectedCountries.length === 0 ? "text-slate-500" : "text-slate-800 font-semibold line-clamp-1"}>{selectedCountries.length > 0 ? selectedCountries.join(", ") : "Select destinations"}</span>
                                            <ChevronDown size={16} className={cn("transition-transform duration-300", isCountryDropdownOpen && "rotate-180")} aria-hidden="true" />
                                        </button>
                                        <AnimatePresence>
                                            {isCountryDropdownOpen && (
                                                <motion.div role="listbox" aria-labelledby="pref-countries-label" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute z-[100] left-0 right-0 top-[110%] bg-white border border-slate-100 rounded-3xl shadow-2xl p-4 max-h-[250px] overflow-y-auto custom-scrollbar">
                                                    <div className="grid grid-cols-1 gap-1">
                                                        {DESTINATIONS.map(d => (
                                                            <button key={d.id} type="button" role="option" aria-selected={selectedCountries.includes(d.name)} onClick={() => toggleCountrySelection(d.name)} className={cn("flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-left group focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none", selectedCountries.includes(d.name) ? "bg-amber-50 text-amber-700 font-bold" : "hover:bg-slate-50 text-slate-700")}>
                                                                <div className={cn("w-4 h-4 rounded border flex items-center justify-center transition-all", selectedCountries.includes(d.name) ? "bg-amber-500 border-amber-500 text-white" : "border-slate-300 group-hover:border-amber-500")}>
                                                                    {selectedCountries.includes(d.name) && <Check size={10} strokeWidth={3} />}
                                                                </div>
                                                                <span className="text-[10px] font-bold uppercase tracking-wider">{d.name}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <CustomDropdown label="Field of study" value={selectedFieldOfStudy} options={FIELDS_OF_STUDY} onChange={setSelectedFieldOfStudy} placeholder="Select field of study" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="inquiry-intake" className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Preferred Intake (Month / Year) *</label>
                                    <input id="inquiry-intake" required placeholder="Eg - September 2026" value={intake} onChange={e => setIntake(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus:border-amber-500 focus:bg-white transition-all font-medium text-sm text-slate-800" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="inquiry-message" className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Message *</label>
                                    <textarea id="inquiry-message" required rows={4} placeholder="Tell us about your Goals, Budget or if you have any questions" value={message} onChange={e => setMessage(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus:border-amber-500 focus:bg-white transition-all font-medium text-sm resize-none text-slate-800" />
                                </div>
                                <div className="pt-4">
                                    <button type="submit" disabled={isSubmitting} className="btn-submit w-full bg-[#1A1F2C] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Submit Inquiry"}
                                    </button>
                                </div>
                             </form>
                         ) : (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                                <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                                    <Check size={48} strokeWidth={4} />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-4">Inquiry Received!</h3>
                                <p className="text-slate-600 font-medium leading-relaxed mb-10">Thank you for reaching out. Your details have been recorded, and a Gradway consultant will call you shortly.</p>
                                <button onClick={() => setFormSubmitted(false)} className="mt-8 text-amber-600 font-black uppercase text-[10px] tracking-widest hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">Send another inquiry</button>
                            </motion.div>
                         )}
                         {/* Hidden Form for Submission Logic */}
                         <form ref={hiddenFormRef} action={GOOGLE_FORM_URL} method="POST" target="google_form_target" style={{ display: 'none' }}>
                            <input type="hidden" name={FORM_ENTRIES.name} value={name} />
                            <input type="hidden" name={FORM_ENTRIES.phone} value={phone} />
                            <input type="hidden" name={FORM_ENTRIES.email} value={email} />
                            <input type="hidden" name={FORM_ENTRIES.programLevel} value={selectedProgramLevel} />
                            {selectedCountries.map((country, index) => (
                                <input 
                                    key={index} 
                                    type="hidden" 
                                    name={FORM_ENTRIES.countries} 
                                    value={country.toUpperCase()} 
                                />
                            ))}
                            <input type="hidden" name={FORM_ENTRIES.fieldOfStudy} value={selectedFieldOfStudy} />
                            <input type="hidden" name={FORM_ENTRIES.intake} value={intake} />
                            <input type="hidden" name={FORM_ENTRIES.message} value={message} />
                        </form>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full max-w-5xl px-4 pb-4">
                        <a href={`https://wa.me/${WA_PHONE}?text=${WA_PREFILLED_MSG}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp with Gradway Colombo" className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg flex items-center gap-4 group hover:border-[#25D366] transition-all w-full md:w-auto md:flex-1 min-w-[220px] focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:outline-none">
                            <div className="w-12 h-12 bg-[#25D366] text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md group-hover:scale-110 transition-transform">
                                <MessageSquare size={24} aria-hidden="true" />
                            </div>
                            <div className="text-left">
                                <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest">WhatsApp</span>
                                <span className="block text-xs font-black text-[#1A1F2C] tracking-tight">{PHONE_DISPLAY}</span>
                            </div>
                        </a>
                        <a href={`tel:${WA_PHONE}`} aria-label="Call Gradway office directly" className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg flex items-center gap-4 group hover:border-amber-500 transition-all w-full md:w-auto md:flex-1 min-w-[220px] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                            <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md group-hover:scale-110 transition-transform">
                                <Phone size={24} aria-hidden="true" />
                            </div>
                            <div className="text-left">
                                <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest">Call Us</span>
                                <span className="block text-xs font-black text-[#1A1F2C] tracking-tight">{PHONE_DISPLAY}</span>
                            </div>
                        </a>
                        <a href="mailto:info@gradwayedu.com" aria-label="Send email to info@gradwayedu.com" className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg flex items-center gap-4 group hover:border-indigo-600 transition-all w-full md:w-auto md:flex-1 min-w-[220px] focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none">
                            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md group-hover:scale-110 transition-transform">
                                <Mail size={24} aria-hidden="true" />
                            </div>
                            <div className="text-left">
                                <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest">Email</span>
                                <span className="block text-xs font-black text-[#1A1F2C] tracking-tight truncate leading-tight">info@gradwayedu.com</span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <section id="faq" className="py-24 bg-white scroll-mt-[76px]">
                <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/3">
                        <SectionBadge text="Knowledge Base" amberOutline />
                        <h2 className="text-4xl font-black mb-6 uppercase tracking-tight leading-tight">Frequently Asked Questions</h2>
                        <p className="text-slate-600 font-medium mb-10">Clear, student-focused answers for your migration concerns.</p>
                        <button onClick={() => scrollToId('faq-full')} className="bg-[#1A1F2C] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                            View Full FAQ
                        </button>
                    </div>
                    <div className="lg:w-2/3">
                        <FAQAccordion items={MAIN_FAQ} />
                    </div>
                </div>
            </section>
            </main>
            
            <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
            <AnimatePresence>{modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}</AnimatePresence>
        </div>
    );
};

export default App;