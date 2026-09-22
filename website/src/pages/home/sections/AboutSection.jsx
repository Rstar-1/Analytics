import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import Heading from '../../../components/layout/generic/Heading';
import LeftLayout from '../../../components/layout/sections/LeftLayout';
import RightLayout from '../../../components/layout/sections/RightLayout';
import { configData, aboutCMS } from '../../../utils/apiData';
import { resolveImagePath } from '../../../utils/imageResolver';

export const defaultAboutData = {
    experienceYears: "30+",
    experienceTagline: "Years of Proven Industry Excellence",
    description: "We are a results-driven IT consulting team helping businesses experience. Scalable commercial growth.",
    stats: [
        { value: "30+", label: "Years Experience", sublabel: "Leading digital evolution" },
        { value: "1.2k+", label: "Projects Completed", sublabel: "Delivered on schedule" },
        { value: "50+", label: "Countries Served", sublabel: "Across the globe" },
        { value: "99.8%", label: "Client Retention", sublabel: "Long-term partnership" }
    ],
    features: [
        {
            title: "Scalable Cloud Architecture",
            desc: "High-throughput cloud-native architectures engineered for automated scaling and sub-second global response.",
            icon: "Zap",
            accentColor: "#db5e1f",
            bgColor: "#fef3ee"
        },
        {
            title: "Enterprise Cybersecurity",
            desc: "Bank-grade protection, continuous vulnerability monitoring, and comprehensive regulatory compliance.",
            icon: "ShieldCheck",
            accentColor: "#1f5ac0",
            bgColor: "#eff6ff"
        },
        {
            title: "Dedicated Elite Squads",
            desc: "Senior engineering pods and strategic product managers operating seamlessly as your internal team.",
            icon: "Users",
            accentColor: "#10b981",
            bgColor: "#ecfdf5"
        }
    ],
    operationalCards: [
        { icon: "Zap", title: "Rapid Delivery", desc: "Agile sprint cycles reducing total time-to-market by 50%." },
        { icon: "ShieldCheck", title: "Enterprise Security", desc: "ISO-compliant security architecture and continuous audits." },
        { icon: "Users", title: "Dedicated Talent", desc: "Top-tier senior software engineers dedicated solely to your outcomes." },
        { icon: "Clock", title: "24/7 Support", desc: "Round-the-clock proactive monitoring and strict SLA guarantees." }
    ],
    partnerFeatures: [
        {
            icon: "Grow",
            title: "Strategic Financial Planning",
            description: "Comprehensive roadmaps designed to optimize capital allocation and scale business operations."
        },
        {
            icon: "ShieldCheck",
            title: "Risk Management & Compliance",
            description: "Proactive governance, regulatory adherence, and asset protection protocols."
        },
        {
            icon: "Users",
            title: "Dedicated Advisory Team",
            description: "Experienced industry consultants committed to your ongoing commercial success."
        }
    ],
    storeCollection: {
        tag: "Curated Store",
        title: "Delivering Innovative Furniture & Modern Living Spaces.",
        description: "Explore curated handcrafted furniture pieces designed for durability, comfort, and timeless aesthetics for contemporary interiors.",
        items: [
            {
                id: 102,
                name: "Loop Sofa Armrest",
                category: "SOFA",
                price: "$3,289",
                originalPrice: "$3,369",
                badge: "Sale",
                badgeColor: "var(--danger)",
                rating: "4.9",
                image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 103,
                name: "Spoke Sofa TonePlay",
                category: "SOFA",
                price: "$3,429",
                originalPrice: "$3,599",
                badge: "Hot",
                badgeColor: "#1D4ED8",
                rating: "5.0",
                image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 104,
                name: "Feast Minimal Chair",
                category: "CHAIR",
                price: "$390",
                originalPrice: "$450",
                badge: "Best",
                badgeColor: "var(--success)",
                rating: "4.8",
                image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 106,
                name: "Leather Dining Chair",
                category: "CHAIR",
                price: "$290",
                originalPrice: "$340",
                badge: "New",
                badgeColor: "#8b5cf6",
                rating: "4.9",
                image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80"
            }
        ]
    },
    officeCards: [
        {
            id: 'website-design',
            src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            alt: 'Website Design & Development Agency'
        },
        {
            id: 'marketing-agency',
            src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
            alt: 'Digital Marketing & Strategy Team',
            hasPlayBtn: false
        },
        {
            id: 'agency-strategy',
            src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
            alt: 'Creative Agency Website Strategy'
        }
    ],
    storeCollageImages: [
        { src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80", alt: "Modern Living Space" },
        { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", alt: "Artisanal Designer Chair", grayscale: true },
        { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80", alt: "Contemporary Luxury Living" }
    ],
    metrics: [
        { label: 'TOTAL REVENUE', value: '+$29 B' },
        { label: 'LOCATIONS SUPPORTED', value: '24 K+' },
        { label: 'TOTAL NEW CUSTOMER', value: '2.6 M+' }
    ],
    images: {
        team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        developer: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80",
        meeting: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
    }
};

const renderCodeTokens = (code) => {
    if (!code) return null;
    const parts = code.split(/(\b(?:val|let|const|await|new|auto|import|export|default|function|return|interface|type)\b|\b(?:ZegoExpressEngine|ZegoEngineProfile|ZegoCanvas|ZegoUser|StudioApp|CreativeEngine|DigitalAgency)\b|\([^)]*\))/g);
    return parts.map((part, i) => {
        if (/^(val|let|const|await|new|auto|import|export|default|function|return|interface|type)$/.test(part)) {
            return <span key={i} style={{ color: '#94a3b8' }}>{part} </span>;
        }
        if (/^(ZegoExpressEngine|ZegoEngineProfile|ZegoCanvas|ZegoUser|StudioApp|CreativeEngine|DigitalAgency)$/.test(part)) {
            return <span key={i} style={{ color: '#f43f5e' }}>{part}</span>;
        }
        if (part.startsWith('(') && part.endsWith(')')) {
            return (
                <span key={i} style={{ color: '#f1f5f9' }}>
                    (<span style={{ color: '#c084fc' }}>{part.slice(1, -1)}</span>)
                </span>
            );
        }
        return <span key={i} style={{ color: '#f1f5f9' }}>{part}</span>;
    });
};

const AboutVersion1 = React.memo(({ aboutSide = 'left', onLearnMore, data = defaultAboutData }) => {
    const isRight = aboutSide === 'right';

    return (
        <div
            className={`flex sm-grid-cols-1 items-start mt-40 sm-mt-14 ${isRight ? 'flex-row-reverse' : ''}`}
            style={{ gap: '24px' }}
        >
            <div className="w-40 sm-w-full">
                <h4 className="largehead-text font-700 text-dark">{data.experienceYears}</h4>
                <p className="text-gray small-text font-400 mt-2">
                    {data.description}
                </p>
            </div>

            <div className="w-30 sm-w-full relative overflow-hidden rounded-5">
                <Image
                    src={resolveImagePath(data?.images?.team)}
                    alt="Team Collaboration"
                    className="w-full h-250 object-cover flex"
                />
                <div
                    className="absolute top-0 right-0 p-8 bg-white rounded-5 flex items-center gap-6 m-6"
                >
                    <Icon name="Star" width="14" height="14" fill="var(--warning)" stroke="var(--warning)" />
                    <p className="mini-text font-600 text-dark">4.9 / 5 Rating (1.2k+ Reviews)</p>
                </div>
            </div>

            <div className="w-40 sm-w-full relative overflow-hidden rounded-5">
                <Image
                    src={resolveImagePath(data?.images?.developer)}
                    alt="Developer working on code"
                    className="w-full h-350 object-cover flex"
                />
                <div
                    className="absolute bottom-0 right-0 p-10 m-6 bg-white rounded-5 text-white"
                    style={{ minWidth: '110px' }}
                >
                    <p className="title-text font-600 text-dark text-center">1.2K+</p>
                    <p className="mini-text text-gray font-400 text-center">Projects Shipped</p>
                </div>
            </div>
        </div>
    );
});

const AboutVersion2 = React.memo(({ aboutSide = 'left', aboutLeft = 1, aboutRight = 1, AboutType = 1, onLearnMore, data = defaultAboutData }) => {
    const navigate = useNavigate();
    const isRight = aboutSide === 'right';
    const isStore = Number(aboutRight) === 4;

    const handleShopClick = useCallback(() => {
        if (onLearnMore) onLearnMore();
        else navigate('/product');
    }, [navigate, onLearnMore]);

    return (
        <>
            {AboutType === 2 && (
                <div className="grid-cols-4 sm-grid-cols-1 gap-12 mt-30 sm-mt-16">
                    {(data?.stats || []).map((stat, idx) => (
                        <div
                            key={idx}
                            className="flex items-start gap-12 border-ec p-15 rounded-5"
                        >
                            <div className="icon-lg bg-light-primary rounded-full">
                                <Icon
                                    name={idx === 0 ? "Award" : idx === 1 ? "Zap" : "ShieldCheck"}
                                    width="22"
                                    height="22"
                                    stroke="var(--primary)"
                                    strokeWidth="2"
                                />
                            </div>
                            <div>
                                <p className="mid-text font-700 text-dark uppercase">{stat.value}</p>
                                <p className="mini-text text-gray font-400">{stat.sublabel}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className={`flex sm-grid-cols-1 mt-30 sm-mt-14 gap-24 items-center ${isRight ? 'flex-row-reverse' : ''}`}>
                <div className={`w-50 sm-w-full ${isRight ? 'pl-15 sm-pl-0' : 'pr-15 sm-pr-0'}`}>
                    <LeftLayout variant={aboutLeft} data={data} isStore={isStore} />
                </div>
                <div className={`w-50 sm-w-full ${isRight ? 'pr-15 sm-pr-0' : 'pl-15 sm-pl-0'}`}>
                    <RightLayout
                        variant={aboutRight}
                        data={data}
                        onShopClick={handleShopClick}
                    />
                </div>
            </div>
        </>
    );
});

const AboutVersion3 = React.memo(({ aboutSide = 'left', onLearnMore, data = defaultAboutData }) => {
    const navigate = useNavigate();
    const [activePlatform, setActivePlatform] = useState(aboutCMS?.platforms?.[0] || 'Next.js');
    const isRight = aboutSide === 'right';

    return (
        <div className={`w-full flex sm-grid-cols-1 items-start gap-12 mt-30 sm-mt-14 ${isRight ? 'flex-row-reverse' : ''}`}>
            <div className="sticky sm-relative overflow-hidden top-0 left-0 w-65 sm-w-full">
                <div className="flex sm-grid-cols-1 items-end p-30 rounded-10 overflow-hidden bg-dark" style={{ gap: '20px' }}>
                    <div className='w-55 sm-w-full'>
                        <div className='icon-lg bg-white rounded-full'>
                            <Icon name="ArrowUpRight" width="16" height="16" stroke="var(--dark)" strokeWidth="2.5" />
                        </div>

                        <h3 className="text-white font-600 head-text uppercase mt-20">
                            {aboutCMS?.crafter?.title}
                        </h3>

                        <p className="text-white small-text text-muted font-400 mt-2">
                            {aboutCMS?.crafter?.subtitle}
                        </p>

                        <div className="mt-30 grid grid-cols-1" style={{ gap: '16px' }}>
                            {(aboutCMS?.crafter?.features || []).map((feat, i) => (
                                <div key={i} className="flex items-start gap-12 mb-10">
                                    <div className='w-10 mt-5 flex justify-center'>
                                        <div className='icon flex items-center justify-center bg-white rounded-full'>
                                            <Icon name="Check" width="16" height="16" stroke="var(--dark)" strokeWidth="3" />
                                        </div>
                                    </div>

                                    <div className='w-90'>
                                        <h4 className="text-white capitalize font-600 title-text">
                                            {feat.title}
                                        </h4>
                                        <p className="mt-8 text-muted mini-text text-white font-300">
                                            {feat.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            text={aboutCMS?.crafter?.buttonText}
                            version="v2"
                            bg="white"
                            color="dark"
                            className="rounded-6 font-600 mt-36"
                            onClick={() => navigate('/services')}
                        />
                    </div>

                    <div className='w-45 sm-w-full'>
                        <div className="relative w-full mx-auto overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                                alt="Video Caller"
                                className="w-full h-250 rounded-5 object-cover flex"
                            />

                            <div className="rounded-5 overflow-hidden absolute top-0 right-0 m-8">
                                <Image
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                                    alt="PIP Caller"
                                    width='50px'
                                    height='50px'
                                    className="flex object-cover"
                                />
                            </div>

                            <div className="absolute bottom-0 mb-10 w-full flex items-center justify-center gap-12">
                                <div className="rounded-full icon-lg bg-dark">
                                    <Icon name="Video" width="18" height="18" stroke="var(--white)" fill="var(--white)" />
                                </div>
                                <div className="rounded-full icon-lg bg-danger">
                                    <Icon name="Hangup" width="20" height="20" fill="var(--white)" />
                                </div>
                                <div className="rounded-full icon-lg bg-dark">
                                    <Icon name="Volume" width="18" height="18" stroke="var(--white)" fill="var(--white)" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full relative overflow-hidden bg-dark border-gray rounded-5 mt-12">
                            <div className="flex items-center gap-6 px-14 py-8 bordb">
                                {(aboutCMS?.platforms || []).map((plat) => {
                                    const isActive = activePlatform === plat;
                                    return (
                                        <p
                                            key={plat}
                                            onClick={() => setActivePlatform(plat)}
                                            className="cursor-pointer mini-text font-400 px-6"
                                            style={{
                                                color: isActive ? 'var(--white)' : 'var(--gray)',
                                            }}
                                        >
                                            {plat}
                                        </p>
                                    );
                                })}
                            </div>

                            {/* Code Snippet Box */}
                            <div
                                className="p-14"
                                style={{
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                    fontSize: '10.8px',
                                    lineHeight: '1.7',
                                    overflowX: 'hidden'
                                }}
                            >
                                {(aboutCMS?.codeSnippets?.[activePlatform] || aboutCMS?.codeSnippets?.Android || []).map((item) => (
                                    <div key={item.num} className="flex items-center gap-10 whitespace-nowrap overflow-hidden text-ellipsis">
                                        <span style={{ color: '#475569', width: '12px', textAlign: 'right', flexShrink: 0, userSelect: 'none' }}>
                                            {item.num}
                                        </span>
                                        <span className="overflow-hidden text-ellipsis">
                                            {renderCodeTokens(item.code)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-10px',
                        width: '180px',
                        height: '180px',
                        background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.7) 0%, rgba(236, 72, 153, 0.7) 50%, rgba(249, 115, 22, 0.7) 100%)',
                        filter: 'blur(32px)',
                        opacity: 0.65,
                        pointerEvents: 'none',
                        zIndex: 1
                    }}
                />
            </div>

            <div className="w-35 sm-w-full grid-cols-1 gap-12">
                {(aboutCMS?.racers || []).map((racer) => (
                    <div key={racer.id} className='p-25 bg-tertiary rounded-10 relative overflow-hidden'>
                        <div className='icon-lg bg-dark rounded-full'>
                            <Icon name="ArrowUpRight" width="16" height="16" stroke="var(--white)" strokeWidth="2.5" />
                        </div>

                        <h3 className="text-dark font-600 head-text uppercase mt-12">
                            {racer.title}
                        </h3>
                        <p className="text-gray small-text text-muted font-400 mt-4">
                            {racer.subtitle}
                        </p>
                        <p className="text-dark small-text text-muted font-400 mt-20">
                            {racer.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
});

const AboutVersion4 = React.memo(({ aboutSide = 'left', onLearnMore, data = defaultAboutData }) => {
    const navigate = useNavigate();
    const isRight = aboutSide === 'right';
    const [isHoveredBadge, setIsHoveredBadge] = useState(false);
    const cardsRef = useRef([]);

    useEffect(() => {
        let animId;
        let ticking = false;

        const handleScroll = () => {
            const winW = window.innerWidth || document.documentElement.clientWidth;
            if (winW <= 640) {
                cardsRef.current.forEach((card) => {
                    if (card) card.style.transform = 'none';
                });
                ticking = false;
                return;
            }

            const winH = window.innerHeight || document.documentElement.clientHeight;
            cardsRef.current.forEach((card, idx) => {
                if (!card) return;
                const rect = card.getBoundingClientRect();
                if (rect.top <= winH && rect.bottom >= 0) {
                    const totalDist = winH + rect.height;
                    const rawProgress = (winH - rect.top) / totalDist;
                    const progress = Math.max(0, Math.min(1, rawProgress));

                    const speedFactor = idx === 1 ? -90 : 90;
                    const offsetY = (progress - 0.5) * speedFactor;
                    card.style.transform = `translate3d(0, ${offsetY.toFixed(2)}px, 0)`;
                }
            });
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                animId = requestAnimationFrame(handleScroll);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (animId) cancelAnimationFrame(animId);
        };
    }, []);

    const metricsList = data?.metrics || defaultAboutData.metrics || [];
    const officeList = data?.officeCards || defaultAboutData.officeCards || [];

    return (
        <div className="relative">
            <p className="mini-text text-white bg-dark w-max px-18 py-8 rounded-20 flex items-center gap-8 font-500 uppercase">
                <Icon name="Settings" width="14" height="14" className="text-warning" />
                WHO WE ARE
            </p>
            <div className={`flex sm-grid-cols-1 items-start mt-20 ${isRight ? 'flex-row-reverse' : ''}`} style={{ gap: '30px' }}>
                <div className={`grid-cols-1 sm-grid-cols-2 w-25 sm-w-full ${isRight ? 'pl-20 sm-pl-0' : ''}`}>
                    <div style={{ position: 'relative', marginTop: '10px', marginLeft: '20px' }}>
                        <svg style={{ width: '90px', height: '60px', marginBottom: '-5px', marginLeft: '30px' }} viewBox="0 0 100 80" fill="none">
                            <path d="M10 10 C 60 10, 80 35, 75 70" stroke="#161616" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M68 62 L 75 70 L 82 62" stroke="#161616" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>

                        <div
                            onClick={() => (onLearnMore ? onLearnMore() : navigate('/about'))}
                            onMouseEnter={() => setIsHoveredBadge(true)}
                            onMouseLeave={() => setIsHoveredBadge(false)}
                            style={{
                                width: '140px',
                                height: '140px',
                                borderRadius: '50%',
                                backgroundColor: isHoveredBadge ? 'var(--warning)' : 'var(--tertiary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                transform: isHoveredBadge ? 'scale(1.08)' : 'scale(1)',
                                boxShadow: isHoveredBadge ? '0 12px 30px rgba(255, 81, 0, 0.35)' : 'none',
                                transition: 'all 0.4s ease'
                            }}
                        >
                            <div
                                style={{
                                    position: 'relative',
                                    zIndex: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    color: isHoveredBadge ? '#FFFFFF' : '#161616',
                                    lineHeight: 1.3,
                                    transition: 'color 0.35s ease'
                                }}
                            >
                                <span className="flex items-center gap-4">
                                    Know <Icon name="ArrowUpRight" width="14" height="14" stroke="currentColor" />
                                </span>
                                <span>More Here</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid-cols-1 gap-12 mt-60 w-80 sm-w-full sm-mt-1">
                        {metricsList.map((item, idx) => (
                            <div key={idx} className="p-10 bordb">
                                <p className="text-gray mini-text font-500">{item.label}</p>
                                <h3 className="head-text text-dark font-600 pt-4">{item.value}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`w-75 sm-w-full sm-mt-40 ${isRight ? 'pr-20 sm-pr-0' : ''}`}>
                    <h2 className="large-text text-dark font-600">
                        <span className="font-600 text-warning">Hello!</span> Focus On Branding, Purpose, And Impactful Websites.
                    </h2>

                    <p className="text-gray para-text mt-12">
                        With Over 8 Years Of Experience, In Your Interest, For You, For Your Customers And, Last But Not Least, For Us, We Do Everything We Can To Ensure That Our Work Makes Sense.
                    </p>

                    <div className="mt-62 sm-mt-30 grid-cols-3 sm-grid-cols-2 gap-12 relative">
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '10%',
                                left: '31%',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(235, 120, 110, 0.45)',
                                zIndex: 1,
                                pointerEvents: 'none'
                            }}
                        />

                        {officeList.map((card, idx) => (
                            <div key={card.id || idx} className={idx === 2 ? 'sm-col-span-2' : ''}>
                                <div
                                    ref={(el) => (cardsRef.current[idx] = el)}
                                    className="rounded-10 overflow-hidden relative w-full h-400 sm-h-200"
                                    style={{
                                        willChange: 'transform',
                                        transform: 'translate3d(0, 0, 0)'
                                    }}
                                >
                                    <Image
                                        src={card.src}
                                        alt={card.alt}
                                        className="w-full h-400 sm-h-200 object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

const VERSION_COMPONENTS = {
    1: AboutVersion1,
    2: AboutVersion2,
    3: AboutVersion3,
    4: AboutVersion4
};

const AboutSection = React.memo(() => {
    const navigate = useNavigate();
    const aboutConfig = Array.isArray(configData?.About) ? configData.About[0] : (configData?.About || {});
    const aboutVersion = aboutConfig?.AboutVersion ?? 1;
    const aboutSide = aboutConfig?.AboutSide || 'left';
    const AboutType = aboutConfig?.AboutType ?? 1;
    const aboutLeft = aboutConfig?.AboutLeft ?? 1;
    const aboutRight = aboutConfig?.AboutRight ?? 1;

    const handleLearnMore = useCallback(() => {
        navigate('/about');
    }, [navigate]);

    const ActiveVersionComponent = VERSION_COMPONENTS[aboutVersion] || AboutVersion1;

    const headingTag = aboutVersion === 4 ? (aboutCMS?.heading?.tag || "ABOUT US") : "ABOUT US";
    const headingTitle = aboutVersion === 4 ? (aboutCMS?.heading?.title || "Expert Innovative And Deliver Exceptional For NOT Solution Now.") : "Expert Innovative And Deliver Exceptional For NOT Solution Now.";

    return (
        <Container>
            <div className="w-full py-50">
                {!([5, 6].includes(aboutVersion)) && (
                    <Heading
                        version="v1"
                        tag={headingTag}
                        title={headingTitle}
                        align='left'
                    />
                )}
                <ActiveVersionComponent
                    aboutSide={aboutSide}
                    AboutType={AboutType}
                    aboutLeft={aboutLeft}
                    aboutRight={aboutRight}
                    onLearnMore={handleLearnMore}
                    data={defaultAboutData}
                />
            </div>
        </Container>
    );
});

export default AboutSection;