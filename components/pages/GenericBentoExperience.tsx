import React from 'react';
import { ArrowUpRight, MapPin, Building2, Users, Briefcase, GraduationCap } from 'lucide-react';
import { cn } from '../../lib/utils';

export const GenericBentoExperience = ({ onContact, colorTheme = 'blue' }: { onContact: () => void, colorTheme?: string }) => {
    const c = {
        blue: { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-100', hover: 'hover:border-blue-300', lightBg: 'bg-blue-50' },
        red: { bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-100', hover: 'hover:border-red-300', lightBg: 'bg-red-50' },
        green: { bg: 'bg-green-600', text: 'text-green-600', border: 'border-green-100', hover: 'hover:border-green-300', lightBg: 'bg-green-50' },
        rose: { bg: 'bg-rose-600', text: 'text-rose-600', border: 'border-rose-100', hover: 'hover:border-rose-300', lightBg: 'bg-rose-50' },
        orange: { bg: 'bg-orange-600', text: 'text-orange-600', border: 'border-orange-100', hover: 'hover:border-orange-300', lightBg: 'bg-orange-50' },
        indigo: { bg: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-100', hover: 'hover:border-indigo-300', lightBg: 'bg-indigo-50' },
        gray: { bg: 'bg-gray-600', text: 'text-gray-600', border: 'border-gray-100', hover: 'hover:border-gray-300', lightBg: 'bg-gray-50' },
        emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-100', hover: 'hover:border-emerald-300', lightBg: 'bg-emerald-50' },
        pink: { bg: 'bg-pink-600', text: 'text-pink-600', border: 'border-pink-100', hover: 'hover:border-pink-300', lightBg: 'bg-pink-50' },
    }[colorTheme] || { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-100', hover: 'hover:border-blue-300', lightBg: 'bg-blue-50' };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[240px]">
            {/* Large Feature */}
            <div className={cn("md:col-span-2 md:row-span-2 rounded-[2.5rem] p-8 flex flex-col justify-between group relative overflow-hidden bg-white border transition-all duration-300", c.border, c.hover)}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-6", c.lightBg, c.text)}>
                        <GraduationCap size={24} />
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tight text-[#1A1F2C] mb-4">World-Class<br />Education</h3>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                        Experience a globally recognized education system with top-tier universities and innovative teaching methods.
                    </p>
                </div>
                <div className="relative z-10 flex items-center justify-between mt-8">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Student" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                        Join 10,000+ <ArrowUpRight size={16} />
                    </div>
                </div>
            </div>

            {/* Stat Box 1 */}
            <div className={cn("rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center bg-white border transition-all duration-300", c.border, c.hover)}>
                <div className={cn("text-5xl font-black tracking-tighter mb-2", c.text)}>Top 10</div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Global Ranking</p>
            </div>

            {/* Image Box */}
            <div className="rounded-[2.5rem] overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800" alt="Campus Life" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <p className="font-black uppercase tracking-widest text-xs mb-1">Campus Life</p>
                    <p className="text-sm font-medium text-white/80">Vibrant Communities</p>
                </div>
            </div>

            {/* Feature Box */}
            <div className={cn("md:col-span-2 rounded-[2.5rem] p-8 flex items-center gap-8 bg-white border transition-all duration-300", c.border, c.hover)}>
                <div className={cn("w-16 h-16 rounded-full shrink-0 flex items-center justify-center", c.lightBg, c.text)}>
                    <Briefcase size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-[#1A1F2C] mb-2">Post-Study Work</h3>
                    <p className="text-slate-500 font-medium leading-relaxed text-sm">
                        Gain valuable international work experience with generous post-study work visa opportunities after graduation.
                    </p>
                </div>
            </div>

            {/* Action Box */}
            <div className={cn("rounded-[2.5rem] p-8 flex flex-col justify-between text-white relative overflow-hidden group cursor-pointer", c.bg)} onClick={onContact}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Start Your<br />Application</h3>
                    <p className="text-white/80 text-sm font-medium">Get expert guidance today.</p>
                </div>
                <div className="relative z-10 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <ArrowUpRight size={24} />
                </div>
            </div>
        </div>
    );
};
