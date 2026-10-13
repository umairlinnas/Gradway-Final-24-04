import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Navigation, Globe, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isEarthLand } from '@/data/earthLandMask';

export interface GlobeCountry {
    id: string;
    name: string;
    shortName?: string;
    flag: string;
    lat: number;
    lon: number;
    region: 'Europe' | 'Americas & Pacific' | 'Asia & Middle East';
    tag: string;
    highlights: string;
    visaPerk: string;
    unisCount: string;
    intakes: string;
    routeId: string;
    isHQ?: boolean;
    color: string;
    preferredOffset?: { x: number; y: number };
}

export const GLOBE_COUNTRIES: GlobeCountry[] = [
    {
        id: 'uk',
        name: 'United Kingdom',
        shortName: 'UK',
        flag: 'https://flagcdn.com/w80/gb.png',
        lat: 53.5,
        lon: -2.0,
        region: 'Europe',
        tag: 'Education Excellence',
        highlights: 'Graduate Route post-study work visa, 1-year fast-track Masters programs, and partnerships with prestigious UK universities.',
        visaPerk: '2-Year PSW',
        unisCount: '150+',
        intakes: 'Sep, Jan & May',
        routeId: 'destination-uk',
        color: '#d97706',
        preferredOffset: { x: 0, y: -28 }
    },
    {
        id: 'germany',
        name: 'Germany',
        shortName: 'Germany',
        flag: 'https://flagcdn.com/w80/de.png',
        lat: 51.2,
        lon: 10.4,
        region: 'Europe',
        tag: 'German Engineering',
        highlights: 'Free or low-cost tuition at world-renowned public universities, job seeker visa, and thriving industrial STEM hubs.',
        visaPerk: 'Job Seeker',
        unisCount: '80+',
        intakes: 'Oct & Apr',
        routeId: 'destination-germany',
        color: '#ea580c',
        preferredOffset: { x: 28, y: -16 }
    },
    {
        id: 'france',
        name: 'France',
        shortName: 'France',
        flag: 'https://flagcdn.com/w80/fr.png',
        lat: 46.5,
        lon: 2.5,
        region: 'Europe',
        tag: 'Bienvenue en France',
        highlights: 'English-taught Masters, Schengen mobility across Europe, subsidized student housing (CAF), and post-study work authorization.',
        visaPerk: 'APS Visa',
        unisCount: '60+',
        intakes: 'Sep & Feb',
        routeId: 'destination-france',
        color: '#e11d48',
        preferredOffset: { x: -22, y: 22 }
    },
    {
        id: 'ireland',
        name: 'Ireland',
        shortName: 'Ireland',
        flag: 'https://flagcdn.com/w80/ie.png',
        lat: 53.4,
        lon: -8.2,
        region: 'Europe',
        tag: 'European Tech Capital',
        highlights: 'English-speaking EU hub, home to Google, Meta, and Apple European headquarters. and Graduate Scheme work visa.',
        visaPerk: 'Graduate',
        unisCount: '35+',
        intakes: 'Sep & Jan',
        routeId: 'destination-ireland',
        color: '#059669',
        preferredOffset: { x: -34, y: -4 }
    },
    {
        id: 'switzerland',
        name: 'Switzerland',
        shortName: 'Switzerland',
        flag: 'https://flagcdn.com/w80/ch.png',
        lat: 46.8,
        lon: 8.2,
        region: 'Europe',
        tag: 'Hospitality & Banking',
        highlights: 'World-ranked hospitality management schools, paid internships during study, and world-class financial research centers.',
        visaPerk: 'Post-Study Permit',
        unisCount: '18+',
        intakes: 'Quarterly',
        routeId: 'destination-switzerland',
        color: '#dc2626',
        preferredOffset: { x: 24, y: 20 }
    },
    {
        id: 'malta',
        name: 'Malta',
        shortName: 'Malta',
        flag: 'https://flagcdn.com/w80/mt.png',
        lat: 35.9,
        lon: 14.4,
        region: 'Europe',
        tag: 'Affordable EU Education',
        highlights: 'English-speaking Mediterranean destination with affordable living, accredited UK-twinning degrees, and pathway visas.',
        visaPerk: 'EU Schengen Entry',
        unisCount: '13+',
        intakes: 'Oct & Feb',
        routeId: 'destination-malta',
        color: '#d97706',
        preferredOffset: { x: 0, y: 24 }
    },
    {
        id: 'canada',
        name: 'Canada',
        shortName: 'Canada',
        flag: 'https://flagcdn.com/w80/ca.png',
        lat: 52.0,
        lon: -100.0,
        region: 'Americas & Pacific',
        tag: 'Western Living',
        highlights: 'Designated Learning Institutions (DLI) offering co-op work experience, up to 3-year Post-Graduation Work Permits, and high safety standards.',
        visaPerk: 'Up to 3-Yr PGWP',
        unisCount: '100+',
        intakes: 'Sep, Jan, May',
        routeId: 'destination-canada',
        color: '#dc2626',
        preferredOffset: { x: 0, y: -26 }
    },
    {
        id: 'australia',
        name: 'Australia',
        shortName: 'Australia',
        flag: 'https://flagcdn.com/w80/au.png',
        lat: -25.2,
        lon: 133.7,
        region: 'Americas & Pacific',
        tag: 'Study in Australia',
        highlights: 'Subclass 500 visa pathways, post-study work rights, high minimum wage, and world-class universities in Sydney, Melbourne, and Brisbane.',
        visaPerk: '2-4Y PSW',
        unisCount: '40+',
        intakes: 'Feb & Jul',
        routeId: 'destination-australia',
        color: '#ca8a04',
        preferredOffset: { x: 0, y: -24 }
    },
    {
        id: 'new-zealand',
        name: 'New Zealand',
        shortName: 'New Zealand',
        flag: 'https://flagcdn.com/w80/nz.png',
        lat: -41.2,
        lon: 174.0,
        region: 'Americas & Pacific',
        tag: 'Innovation & Research',
        highlights: 'All 8 state universities ranked in the top 3% globally. Up to 3-year post-study work visa and exceptional quality of life.',
        visaPerk: '3-Year PSW',
        unisCount: '820+',
        intakes: 'Feb & Jul',
        routeId: 'destination-new-zealand',
        color: '#0d9488',
        preferredOffset: { x: 26, y: 20 }
    },
    {
        id: 'singapore',
        name: 'Singapore',
        shortName: 'Singapore',
        flag: 'https://flagcdn.com/w80/sg.png',
        lat: 1.35,
        lon: 103.8,
        region: 'Asia & Middle East',
        tag: 'Asian Financial Hub',
        highlights: 'Top global branch campuses, unparalleled safety, high employment rate in banking, tech, and international logistics.',
        visaPerk: 'Graduate Pass',
        unisCount: '25+',
        intakes: 'Mar, Jul, Nov',
        routeId: 'destination-singapore',
        color: '#7c3aed',
        preferredOffset: { x: -24, y: 16 }
    },
    {
        id: 'malaysia',
        name: 'Malaysia',
        shortName: 'Malaysia',
        flag: 'https://flagcdn.com/w80/my.png',
        lat: 4.2,
        lon: 101.9,
        region: 'Asia & Middle East',
        tag: 'Study in Malaysia',
        highlights: 'Low tuition and living expenses while graduating with identical British or Australian degrees from accredited branch campuses.',
        visaPerk: 'Graduate Pass',
        unisCount: '20+',
        intakes: 'Flexible',
        routeId: 'destination-malaysia',
        color: '#0891b2',
        preferredOffset: { x: -20, y: -18 }
    },
    {
        id: 'south-korea',
        name: 'South Korea',
        shortName: 'South Korea',
        flag: 'https://flagcdn.com/w80/kr.png',
        lat: 36.0,
        lon: 127.8,
        region: 'Asia & Middle East',
        tag: 'Study in South Korea',
        highlights: 'Leading STEM and innovation hubs, and cutting-edge robotics & AI programs.',
        visaPerk: 'D-2 & D-10 Visas',
        unisCount: '15+',
        intakes: 'Mar & Sep',
        routeId: 'destination-south-korea',
        color: '#9333ea',
        preferredOffset: { x: 24, y: -16 }
    },
    {
        id: 'uae',
        name: 'UAE (Dubai)',
        shortName: 'UAE',
        flag: 'https://flagcdn.com/w80/ae.png',
        lat: 25.2,
        lon: 55.3,
        region: 'Asia & Middle East',
        tag: 'Global Gateway & Tax-Free Hub',
        highlights: 'Study at top UK, US, and Australian universities in Dubai Knowledge Park with simplified visa processing and tax-free jobs.',
        visaPerk: 'NOC / Work Visa',
        unisCount: '30+',
        intakes: 'Sep & Jan',
        routeId: 'destination-uae',
        color: '#ea580c',
        preferredOffset: { x: 18, y: 18 }
    },
    {
        id: 'srilanka',
        name: 'Sri Lanka (HQ)',
        shortName: 'Sri Lanka (HQ)',
        flag: 'https://flagcdn.com/w80/lk.png',
        lat: 6.93,
        lon: 79.85,
        region: 'Asia & Middle East',
        tag: 'Colombo Headquarters',
        highlights: 'Gradway Corporate Head Office in Colombo 03. Direct student counseling, visa compliance audits, and global university liaisons.',
        visaPerk: 'Headquarters',
        unisCount: 'Colombo Office',
        intakes: 'Year-Round',
        routeId: 'contact',
        isHQ: true,
        color: '#f59e0b',
        preferredOffset: { x: 22, y: 20 }
    }
];

interface GlobePoint {
    x: number;
    y: number;
    z: number;
    latDeg: number;
    lonDeg: number;
    colorType: number;
}

interface ProjectedPin {
    country: GlobeCountry;
    screenX: number;
    screenY: number;
    badgeX: number;
    badgeY: number;
    scale: number;
    opacity: number;
    depth: number;
    visible: boolean;
}

interface RotatingEarthProps {
    onSelectCountry?: (country: GlobeCountry) => void;
    onExploreDestination?: (routeId: string) => void;
    selectedCountryId?: string | null;
}

export const RotatingEarth: React.FC<RotatingEarthProps> = ({
    onSelectCountry,
    onExploreDestination,
    selectedCountryId
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [activeCountry, setActiveCountry] = useState<GlobeCountry>(GLOBE_COUNTRIES[0]);
    const [projectedPins, setProjectedPins] = useState<ProjectedPin[]>([]);
    const [filterRegion, setFilterRegion] = useState<string>('All');

    // Keep internal selection synced with prop
    useEffect(() => {
        if (selectedCountryId) {
            const found = GLOBE_COUNTRIES.find(c => c.id === selectedCountryId);
            if (found) setActiveCountry(found);
        }
    }, [selectedCountryId]);

    // Compute REAL Earth Land Dots using real Earth land bitmask
    const landPoints: GlobePoint[] = useMemo(() => {
        const CANDIDATES = 8200;
        const result: GlobePoint[] = [];

        // 1. Sample evenly across sphere using Fibonacci spiral
        for (let i = 0; i < CANDIDATES; i++) {
            const y = 1 - (i / CANDIDATES) * 2;
            const r = Math.sqrt(Math.max(0, 1 - y * y));
            const theta = (i * 2.39996323) % (Math.PI * 2);

            const lonRad = theta - Math.PI; // range [-PI, PI]
            const latRad = Math.asin(Math.max(-1, Math.min(1, y)));

            const lonDeg = (lonRad * 180) / Math.PI;
            const latDeg = (latRad * 180) / Math.PI;

            // Check against accurate Earth land bitmask
            if (isEarthLand(lonDeg, latDeg)) {
                // Spherical coordinates: East is +X, North is +Y, Prime Meridian is +Z
                const px = Math.sin(lonRad) * r;
                const py = y;
                const pz = Math.cos(lonRad) * r;

                const colorType = Math.abs(Math.sin(latRad * 3.5 + lonRad * 2.2)) * 3;
                result.push({
                    x: px,
                    y: py,
                    z: pz,
                    latDeg,
                    lonDeg,
                    colorType
                });
            }
        }

        // 2. Extra accurate dots for key island territories to ensure clear silhouette recognition
        const extraTerritories = [
            // Sri Lanka (Colombo, Kandy, Galle, Jaffna, Trincomalee)
            [79.86, 6.93], [80.64, 7.29], [80.22, 6.05], [80.01, 9.66], [81.23, 8.58],
            // New Zealand North & South Island
            [174.76, -36.85], [174.78, -41.29], [172.64, -43.53], [170.50, -45.87], [168.66, -45.03], [176.0, -38.5],
            // United Kingdom & Ireland
            [-0.12, 51.5], [-2.2, 53.5], [-3.2, 55.9], [-3.18, 51.5], [-5.9, 54.6], [-6.26, 53.3], [-8.47, 51.9],
            // Malta & Singapore
            [14.45, 35.90], [103.82, 1.35]
        ];

        for (const [lonDeg, latDeg] of extraTerritories) {
            const latRad = (latDeg * Math.PI) / 180;
            const lonRad = (lonDeg * Math.PI) / 180;
            const y = Math.sin(latRad);
            const r = Math.cos(latRad);
            const px = Math.sin(lonRad) * r;
            const py = y;
            const pz = Math.cos(lonRad) * r;

            result.push({
                x: px,
                y: py,
                z: pz,
                latDeg,
                lonDeg,
                colorType: 0.5
            });
        }

        return result;
    }, []);

    // 3D coordinates for all country pins using same geography
    const country3DPoints = useMemo(() => {
        return GLOBE_COUNTRIES.map(c => {
            const latRad = (c.lat * Math.PI) / 180;
            const lonRad = (c.lon * Math.PI) / 180;
            const y = Math.sin(latRad);
            const r = Math.cos(latRad);
            const x = Math.sin(lonRad) * r;
            const z = Math.cos(lonRad) * r;
            return {
                country: c,
                x,
                y,
                z
            };
        });
    }, []);

    // All-Axis Physics & Dragging state refs
    const animRef = useRef<{
        yaw: number;
        pitch: number;
        velocityX: number;
        velocityY: number;
        idleSpin: number;
        isDragging: boolean;
        lastX: number;
        lastY: number;
        targetYaw: number | null;
        targetPitch: number | null;
        isTargeting: boolean;
    }>({
        yaw: 1.4, // Centered near South Asia / Sri Lanka initially (lon ~ 80 deg)
        pitch: -0.18, // gentle realistic earth tilt
        velocityX: -0.002915,
        velocityY: 0,
        idleSpin: -0.002915, // Natural left-to-right planetary rotation
        isDragging: false,
        lastX: 0,
        lastY: 0,
        targetYaw: null,
        targetPitch: null,
        isTargeting: false
    });

    const handleSelectCountry = useCallback((country: GlobeCountry) => {
        setActiveCountry(country);
        if (onSelectCountry) onSelectCountry(country);

        // Smoothly rotate globe towards this country's longitude and latitude
        const lonRad = (country.lon * Math.PI) / 180;
        const latRad = (country.lat * Math.PI) / 180;

        // In our projection: country is front and center when lonRad - yaw = 0 -> yaw = lonRad
        const targetYaw = lonRad;
        const targetPitch = Math.max(-0.6, Math.min(0.6, -latRad * 0.4));

        animRef.current.targetYaw = targetYaw;
        animRef.current.targetPitch = targetPitch;
        animRef.current.isTargeting = true;
    }, [onSelectCountry]);

    // Canvas render & animation loop with ALL-AXIS ROTATION
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            const rect = container.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const dpr = window.devicePixelRatio || 1;

            if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
                canvas.width = Math.round(width * dpr);
                canvas.height = Math.round(height * dpr);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);
            }

            const radius = width * 0.36;
            const cx = width / 2;
            const cy = height / 2;

            const state = animRef.current;

            // Physics calculation
            if (state.isTargeting && state.targetYaw !== null && state.targetPitch !== null) {
                // Smooth easing towards target yaw
                let diffYaw = (state.targetYaw - state.yaw) % (Math.PI * 2);
                if (diffYaw > Math.PI) diffYaw -= Math.PI * 2;
                if (diffYaw < -Math.PI) diffYaw += Math.PI * 2;

                const diffPitch = state.targetPitch - state.pitch;

                if (Math.abs(diffYaw) < 0.01 && Math.abs(diffPitch) < 0.01) {
                    state.isTargeting = false;
                    state.targetYaw = null;
                    state.targetPitch = null;
                    state.velocityX = state.idleSpin;
                    state.velocityY = 0;
                } else {
                    state.yaw += diffYaw * 0.08;
                    state.pitch += diffPitch * 0.08;
                    state.velocityX = diffYaw * 0.08;
                    state.velocityY = 0;
                }
            } else if (!state.isDragging) {
                // Vertical momentum quickly stops so globe stays at the pitch user left it
                state.velocityY *= 0.85;
                state.pitch += state.velocityY;

                // Horizontal velocity smoothly returns to idle spin (left to right)
                state.velocityX += (state.idleSpin - state.velocityX) * 0.03;
                state.yaw += state.velocityX;
            }

            // Clamp pitch so poles do not invert upside down
            state.pitch = Math.max(-1.2, Math.min(1.2, state.pitch));

            const yaw = state.yaw;
            const pitch = state.pitch;

            const cosYaw = Math.cos(yaw);
            const sinYaw = Math.sin(yaw);
            const cosPitch = Math.cos(pitch);
            const sinPitch = Math.sin(pitch);

            ctx.clearRect(0, 0, width, height);

            // DRAW EARTH LAND DOTS: DEPTH IS COLOUR, NOT CULLING
            const len = landPoints.length;
            for (let i = 0; i < len; i++) {
                const p = landPoints[i];

                // 1. Rotate around Y (yaw)
                const x1 = p.x * cosYaw - p.z * sinYaw;
                const y1 = p.y;
                const z1 = p.x * sinYaw + p.z * cosYaw;

                // 2. Rotate around X (pitch)
                const x2 = x1;
                const y2 = y1 * cosPitch - z1 * sinPitch;
                const z2 = y1 * sinPitch + z1 * cosPitch;

                // 3. Depth = (z + 1) / 2
                const depth = (z2 + 1) / 2;

                // 4. Perspective factor
                const perspective = 0.86 + depth * 0.28;
                const screenX = cx + x2 * radius * perspective;
                const screenY = cy - y2 * radius * perspective;

                // 5. Dot radius
                const dotRadius = (0.50 + depth * 0.90) * (width / 520);

                ctx.beginPath();
                ctx.arc(screenX, screenY, Math.max(0.7, dotRadius), 0, Math.PI * 2);

                if (z2 >= 0) {
                    // NEAR SIDE: Warm golden amber & rich honey accents that match Gradway logo colors
                    const alpha = 0.22 + depth * 0.78;
                    if (p.colorType < 1.0) {
                        ctx.fillStyle = `rgba(217, 119, 6, ${alpha.toFixed(3)})`; // amber-600
                    } else if (p.colorType < 2.0) {
                        ctx.fillStyle = `rgba(245, 158, 11, ${alpha.toFixed(3)})`; // amber-500
                    } else {
                        ctx.fillStyle = `rgba(251, 191, 36, ${alpha.toFixed(3)})`; // amber-400
                    }
                } else {
                    // FAR SIDE: Soft, clean mist-slate dots so back volume is subtly visible without clutter
                    const alpha = 0.05 + depth * 0.20;
                    ctx.fillStyle = `rgba(148, 163, 184, ${alpha.toFixed(3)})`;
                }
                ctx.fill();
            }

            // Project Interactive SVG Country Pins
            const newPins: ProjectedPin[] = [];
            for (let i = 0; i < country3DPoints.length; i++) {
                const cp = country3DPoints[i];

                const x1 = cp.x * cosYaw - cp.z * sinYaw;
                const y1 = cp.y;
                const z1 = cp.x * sinYaw + cp.z * cosYaw;

                const x2 = x1;
                const y2 = y1 * cosPitch - z1 * sinPitch;
                const z2 = y1 * sinPitch + z1 * cosPitch;

                const depth = (z2 + 1) / 2;
                const perspective = 0.86 + depth * 0.28;
                const screenX = cx + x2 * radius * perspective;
                const screenY = cy - y2 * radius * perspective;

                // Pin is visible when facing the front hemisphere
                const isVisible = z2 > 0.05;
                const scale = 0.65 + depth * 0.45;
                const opacity = isVisible ? Math.min(1, Math.max(0, (z2 - 0.05) / 0.45)) : 0;

                const prefX = (cp.country.preferredOffset?.x ?? 0) * (scale / 0.85);
                const prefY = (cp.country.preferredOffset?.y ?? -22) * (scale / 0.85);

                newPins.push({
                    country: cp.country,
                    screenX,
                    screenY,
                    badgeX: screenX + prefX,
                    badgeY: screenY + prefY,
                    scale,
                    opacity,
                    depth,
                    visible: isVisible
                });
            }

            // DYNAMIC 2D COLLISION RESOLUTION TO PREVENT ANY PIN/LABEL OVERLAP
            // When countries in crowded regions (like UK, Ireland, France, Switzerland, Germany) are in view,
            // this relaxation solver pushes badge bounding boxes apart so all pins and labels stay 100% visible
            const visiblePins = newPins.filter(p => p.visible);
            const badgeBoxes = visiblePins.map(p => {
                const labelText = p.country.shortName || p.country.name;
                const w = Math.max(50, labelText.length * 7.2 + 22) * p.scale;
                const h = 24 * p.scale;
                return {
                    pin: p,
                    x: p.badgeX,
                    y: p.badgeY,
                    origX: p.badgeX,
                    origY: p.badgeY,
                    w,
                    h
                };
            });

            for (let iter = 0; iter < 12; iter++) {
                for (let i = 0; i < badgeBoxes.length; i++) {
                    for (let j = i + 1; j < badgeBoxes.length; j++) {
                        const b1 = badgeBoxes[i];
                        const b2 = badgeBoxes[j];

                        const dx = b1.x - b2.x;
                        const dy = b1.y - b2.y;
                        const minSpacingX = (b1.w + b2.w) * 0.5 + 8;
                        const minSpacingY = (b1.h + b2.h) * 0.5 + 6;

                        const overlapX = minSpacingX - Math.abs(dx);
                        const overlapY = minSpacingY - Math.abs(dy);

                        if (overlapX > 0 && overlapY > 0) {
                            if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
                                b1.y -= overlapY * 0.5;
                                b2.y += overlapY * 0.5;
                            } else if (overlapX / minSpacingX < overlapY / minSpacingY) {
                                const signX = dx >= 0 ? 1 : -1;
                                const pushX = signX * overlapX * 0.55;
                                b1.x += pushX;
                                b2.x -= pushX;
                            } else {
                                const signY = dy >= 0 ? 1 : -1;
                                const pushY = signY * overlapY * 0.55;
                                b1.y += pushY;
                                b2.y -= pushY;
                            }
                        }
                    }

                    // Gentle restitution force pulling toward preferred offset
                    const b = badgeBoxes[i];
                    b.x += (b.origX - b.x) * 0.08;
                    b.y += (b.origY - b.y) * 0.08;

                    // Clamp max offset distance from exact pin coordinate
                    const maxOffset = 64;
                    const diffX = b.x - b.pin.screenX;
                    const diffY = b.y - b.pin.screenY;
                    if (Math.abs(diffX) > maxOffset) b.x = b.pin.screenX + Math.sign(diffX) * maxOffset;
                    if (Math.abs(diffY) > maxOffset) b.y = b.pin.screenY + Math.sign(diffY) * maxOffset;
                }
            }

            // Sync relaxed positions to pins
            for (let i = 0; i < badgeBoxes.length; i++) {
                badgeBoxes[i].pin.badgeX = badgeBoxes[i].x;
                badgeBoxes[i].pin.badgeY = badgeBoxes[i].y;
            }

            setProjectedPins(newPins);
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [landPoints, country3DPoints]);

    // ALL-AXIS DRAG EVENT HANDLERS
    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const state = animRef.current;
        state.isDragging = true;
        state.isTargeting = false;
        state.targetYaw = null;
        state.targetPitch = null;
        state.lastX = e.clientX;
        state.lastY = e.clientY;
        state.velocityX = 0;
        state.velocityY = 0;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const state = animRef.current;
        if (!state.isDragging) return;

        const dx = e.clientX - state.lastX;
        const dy = e.clientY - state.lastY;
        state.lastX = e.clientX;
        state.lastY = e.clientY;

        // Horizontal rotation (yaw): drag right moves globe surface right, drag left moves globe surface left
        const dYaw = -dx * 0.005;
        state.yaw += dYaw;
        state.velocityX = dYaw;

        // Vertical tilt (pitch): drag down moves surface down, drag up moves surface up
        const dPitch = dy * 0.005;
        state.pitch = Math.max(-1.2, Math.min(1.2, state.pitch + dPitch));
        state.velocityY = dPitch;
    };

    const handlePointerUp = () => {
        animRef.current.isDragging = false;
    };

    const filteredCountries = (filterRegion === 'All'
        ? GLOBE_COUNTRIES
        : GLOBE_COUNTRIES.filter(c => c.region === filterRegion)
    ).filter(c => !c.isHQ && c.id !== 'srilanka');

    return (
        <div className="w-full flex flex-col items-center">
            {/* Regional Filter Chips */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {['All', 'Europe', 'Americas & Pacific', 'Asia & Middle East'].map((region) => (
                    <button
                        key={region}
                        onClick={() => setFilterRegion(region)}
                        className={cn(
                            "px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all",
                            filterRegion === region
                                ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-400/30 scale-105"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                        )}
                    >
                        {region}
                    </button>
                ))}
            </div>

            {/* Quick Country Buttons Bar (Integrated on the Globe Area) */}
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mb-6 px-4">
                {filteredCountries.map((c) => {
                    const isSelected = activeCountry.id === c.id;
                    return (
                        <button
                            key={c.id}
                            onClick={() => handleSelectCountry(c)}
                            className={cn(
                                "flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wide transition-all border",
                                isSelected
                                    ? "bg-amber-400 text-slate-950 border-amber-500 shadow-md shadow-amber-400/30 scale-105"
                                    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-400"
                            )}
                        >
                            <img src={c.flag} alt={c.name} className="w-4 h-3 object-cover rounded-sm shadow-xs" />
                            <span>{c.name}</span>
                        </button>
                    );
                })}
            </div>

            {/* GLOBE CANVAS STAGE & SVG PINS */}
            <div 
                ref={containerRef}
                className="relative w-full max-w-[600px] aspect-square flex items-center justify-center my-2 select-none touch-none"
            >
                {/* Luminous Warm Amber & Cyan Atmosphere behind Globe */}
                <div 
                    className="absolute w-[84%] h-[84%] rounded-full filter blur-[40px] pointer-events-none opacity-60"
                    style={{
                        background: 'radial-gradient(circle at 48% 45%, rgba(245, 158, 11, 0.25) 0%, rgba(251, 191, 36, 0.15) 45%, rgba(56, 189, 248, 0.10) 70%, transparent 85%)'
                    }}
                />

                {/* Subtle Spherical Horizon Ring */}
                <div 
                    className="absolute w-[73%] h-[73%] rounded-full border border-amber-300/40 pointer-events-none"
                    style={{
                        boxShadow: 'inset 0 0 45px rgba(245, 158, 11, 0.12), 0 0 30px rgba(245, 158, 11, 0.15)'
                    }}
                />

                {/* 2D Canvas with All-Axis Drag Physics */}
                <canvas
                    ref={canvasRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing"
                    title="Drag in any direction to rotate the globe"
                />

                {/* INTERACTIVE SVG PINS OVERLAY WITH CONNECTOR STEMS & SEPARATE CALLOUTS */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    {/* SVG Leader / Connector Lines from Pin Spot to Displaced Badges */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10">
                        {projectedPins.map((p) => {
                            if (!p.visible || (filterRegion !== 'All' && p.country.region !== filterRegion)) {
                                return null;
                            }
                            const isSelected = activeCountry.id === p.country.id;
                            const isHQ = p.country.isHQ;
                            const dx = p.badgeX - p.screenX;
                            const dy = p.badgeY - p.screenY;
                            const dist = Math.hypot(dx, dy);
                            if (dist < 10) return null;

                            return (
                                <line
                                    key={`leader-${p.country.id}`}
                                    x1={p.screenX}
                                    y1={p.screenY}
                                    x2={p.badgeX}
                                    y2={p.badgeY + (dy < 0 ? 11 : -11)}
                                    stroke={isSelected && !isHQ ? '#f59e0b' : isHQ ? '#d97706' : '#94a3b8'}
                                    strokeWidth={isSelected ? 1.75 : 1.25}
                                    strokeDasharray={isSelected ? undefined : '2 2'}
                                    opacity={p.opacity * 0.85}
                                />
                            );
                        })}
                    </svg>

                    {/* Accurate Pin Dots directly on the Globe Surface */}
                    {projectedPins.map((p) => {
                        if (!p.visible || (filterRegion !== 'All' && p.country.region !== filterRegion)) {
                            return null;
                        }

                        const isSelected = activeCountry.id === p.country.id;
                        const isHQ = p.country.isHQ;

                        return (
                            <div
                                key={`dot-${p.country.id}`}
                                className={cn(
                                    "absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity",
                                    isHQ 
                                        ? "pointer-events-none select-none cursor-default" 
                                        : "pointer-events-auto cursor-pointer group"
                                )}
                                style={{
                                    left: `${p.screenX}px`,
                                    top: `${p.screenY}px`,
                                    zIndex: Math.round(p.depth * 100) + 15,
                                    opacity: p.opacity
                                }}
                                onClick={isHQ ? undefined : (e) => {
                                    e.stopPropagation();
                                    handleSelectCountry(p.country);
                                }}
                                title={p.country.name}
                            >
                                {isSelected && !isHQ && (
                                    <span 
                                        className="absolute w-5 h-5 rounded-full animate-ping opacity-75 bg-amber-400"
                                    />
                                )}
                                <div className={cn(
                                    "rounded-full flex items-center justify-center transition-all duration-200",
                                    isSelected && !isHQ
                                        ? "w-4 h-4 bg-amber-400/40 ring-2 ring-amber-500" 
                                        : isHQ
                                            ? "w-3.5 h-3.5 bg-amber-500/20 ring-1 ring-amber-500"
                                            : "w-3 h-3 group-hover:scale-125"
                                )}>
                                    <div className={cn(
                                        "w-2 h-2 rounded-full border border-white shadow-xs",
                                        isSelected && !isHQ ? "bg-amber-500 scale-110" : isHQ ? "bg-amber-600" : "bg-slate-800"
                                    )} />
                                </div>
                            </div>
                        );
                    })}

                    {/* Country Badges (Dynamically Displaced to Guarantee Zero Overlap) */}
                    {projectedPins.map((p) => {
                        if (!p.visible || (filterRegion !== 'All' && p.country.region !== filterRegion)) {
                            return null;
                        }

                        const isSelected = activeCountry.id === p.country.id;
                        const isHQ = p.country.isHQ;

                        return (
                            <div
                                key={p.country.id}
                                className={cn(
                                    "absolute -translate-x-1/2 -translate-y-1/2",
                                    isHQ 
                                        ? "pointer-events-none select-none cursor-default" 
                                        : "pointer-events-auto cursor-pointer group"
                                )}
                                style={{
                                    left: `${p.badgeX}px`,
                                    top: `${p.badgeY}px`,
                                    transform: `translate(-50%, -50%) scale(${p.scale})`,
                                    opacity: p.opacity,
                                    zIndex: Math.round(p.depth * 100) + (isSelected ? 60 : 30),
                                    transition: 'transform 0.08s ease-out'
                                }}
                                onClick={isHQ ? undefined : (e) => {
                                    e.stopPropagation();
                                    handleSelectCountry(p.country);
                                }}
                            >
                                <div 
                                    className={cn(
                                        "flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-md transition-all duration-200 whitespace-nowrap",
                                        isSelected && !isHQ
                                            ? "bg-amber-400 text-slate-950 border-amber-500 scale-105 shadow-amber-400/50 font-black"
                                            : isHQ
                                                ? "bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black"
                                                : "bg-white text-slate-900 border-slate-300 hover:border-amber-400 hover:bg-amber-50"
                                    )}
                                >
                                    <img 
                                        src={p.country.flag} 
                                        alt={p.country.name} 
                                        className="w-3.5 h-2.5 object-cover rounded-xs shadow-xs" 
                                    />
                                    <span className="text-[10px] font-black tracking-tight uppercase">
                                        {p.country.shortName || p.country.name}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ACTIVE COUNTRY INFORMATION CARD */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCountry.id}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-w-4xl p-6 md:p-8 rounded-[2.5rem] border-2 border-amber-300 bg-white relative overflow-hidden shadow-xl"
                >
                    {/* Subtle ambient gradient aura inside card */}
                    <div 
                        className="absolute -top-24 -right-24 w-60 h-60 rounded-full filter blur-[70px] pointer-events-none opacity-20 bg-amber-400"
                    />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-start md:items-center gap-5">
                            <img 
                                src={activeCountry.flag} 
                                alt={activeCountry.name} 
                                className="w-16 h-12 object-cover rounded-xl shadow-md border border-slate-200 shrink-0" 
                            />
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                                        {activeCountry.name}
                                    </h3>
                                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                                        {activeCountry.tag}
                                    </span>
                                </div>
                                <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed max-w-2xl">
                                    {activeCountry.highlights}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
                            <button
                                onClick={() => {
                                    if (onExploreDestination) {
                                        onExploreDestination(activeCountry.routeId);
                                    }
                                }}
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 px-7 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-400/25 hover:scale-105 active:scale-95 transition-all"
                            >
                                <span>Explore {activeCountry.name} Guide</span>
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Key Metrics Strip for the Selected Country */}
                    <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6 pt-6 border-t border-slate-100">
                        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-center">
                            <p className="text-sm md:text-base font-black text-amber-700 tracking-tight">
                                {activeCountry.visaPerk}
                            </p>
                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-0.5">
                                Post-Study Visa
                            </p>
                        </div>
                        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-center">
                            <p className="text-sm md:text-base font-black text-emerald-700 tracking-tight">
                                {activeCountry.unisCount}
                            </p>
                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-0.5">
                                Partner Institutions
                            </p>
                        </div>
                        <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 text-center">
                            <p className="text-sm md:text-base font-black text-blue-700 tracking-tight">
                                {activeCountry.intakes}
                            </p>
                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-0.5">
                                University Intakes
                            </p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
