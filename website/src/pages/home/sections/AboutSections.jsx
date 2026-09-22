import React, { useState, useCallback } from 'react';
import Container from '../../../components/common/Container';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Image from '../../../components/common/Image';

const leftCards = [
    {
        year: 'META',
        title: 'TARGETED SOCIAL CAMPAIGNS',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80',
        video: 'https://www.youtube.com/watch?v=kYJv_yP09Y8',
        tint: 'rgba(24,119,242,0.35)'
    },
    {
        year: 'META',
        title: 'HIGH-CONVERSION ADS & AUDIENCES',
        image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=600&q=80',
        video: 'https://www.youtube.com/watch?v=kYJv_yP09Y8',
        tint: 'rgba(20,90,190,0.40)'
    }
];

const leftCenterCards = [
    {
        year: 'WEBSITE',
        title: 'MODERN HIGH-PERFORMANCE WEB',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80',
        video: 'https://www.youtube.com/watch?v=VpnpBw73nlg',
        tint: 'rgba(40,65,95,0.40)'
    },
    {
        year: 'WEBSITE',
        title: 'RESPONSIVE & SCALABLE DESIGN',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
        video: 'https://www.youtube.com/watch?v=VpnpBw73nlg',
        tint: 'rgba(30,45,65,0.40)'
    }
];

const centerCards = [
    {
        year: 'DASHBOARD',
        title: 'REAL-TIME ANALYTICS & INSIGHTS',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
        video: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
        tint: 'rgba(35,60,50,0.40)'
    }
];

const rightCenterCards = [
    {
        year: 'CMS',
        title: 'HEADLESS CONTENT ARCHITECTURE',
        image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=600&q=80',
        video: 'https://www.youtube.com/watch?v=Yw9T3uYjD3I',
        tint: 'rgba(70,45,30,0.40)'
    },
    {
        year: 'CMS',
        title: 'SEAMLESS MULTI-CHANNEL PUBLISHING',
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80',
        video: 'https://www.youtube.com/watch?v=Yw9T3uYjD3I',
        tint: 'rgba(50,55,60,0.40)'
    }
];

const rightCards = [
    {
        year: 'DIGITAL',
        title: 'DATA-DRIVEN ORGANIC GROWTH',
        image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80',
        video: 'https://www.youtube.com/watch?v=y6120QOlsfU',
        tint: 'rgba(60,40,65,0.40)'
    },
    {
        year: 'DIGITAL',
        title: 'END-TO-END BRAND EXPANSION',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
        video: 'https://www.youtube.com/watch?v=y6120QOlsfU',
        tint: 'rgba(35,35,40,0.45)'
    }
];

const allMobileCards = [
    ...leftCards,
    ...leftCenterCards,
    ...centerCards,
    ...rightCenterCards,
    ...rightCards
];

const extractYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&/]+)/);
    return match ? match[1] : null;
};

const JourneyCard = React.memo(({ card, onCardClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="journey-card relative overflow-hidden rounded-10 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onCardClick(card.video, `${card.year} - ${card.title}`)}
        >
            <Image
                src={card.image}
                alt={`${card.year} - ${card.title}`}
                className="flex w-full h-300 object-cover"
                loading="lazy"
                decoding="async"
            />
            <div className="journey-card-gradient absolute" />

            <div className="absolute bottom-0 left-0 w-full py-20 text-center">
                <h4 className="mid-text text-white font-600">
                    {card.year}
                </h4>
                <p className="mini-text text-white font-400 mt-2">
                    {card.title}
                </p>
            </div>

            {/* Play indicator using Button component */}
            <Button
                version="icon"
                bg="primary"
                color="white"
                className={`journey-play-badge absolute flex items-center justify-center border-0 rounded-full cursor-pointer ${isHovered ? 'visible' : ''}`}
                aria-label="Play video"
                onClick={(e) => {
                    e.stopPropagation();
                    onCardClick(card.video, `${card.year} - ${card.title}`);
                }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                </svg>
            </Button>
        </div>
    );
});

const AboutSections = () => {
    const [activeVideo, setActiveVideo] = useState({ url: null, title: '' });

    const handleOpenVideo = useCallback((url, title) => {
        setActiveVideo({ url, title });
    }, []);

    const handleCloseVideo = useCallback(() => {
        setActiveVideo({ url: null, title: '' });
    }, []);

    const activeYoutubeId = extractYoutubeId(activeVideo.url);

    return (
        <Container>
            <div className='w-full py-60'>
                <div className="flex items-start w-full" style={{ gap: '20px' }}>
                    <div className="grid-cols-1 gap-12 pt-60 w-20">
                        {leftCards.map((card, i) => (
                            <JourneyCard key={`left-${i}`} card={card} onCardClick={handleOpenVideo} />
                        ))}
                    </div>

                    <div className="grid-cols-1 gap-12 w-20">
                        {leftCenterCards.map((card, i) => (
                            <JourneyCard key={`lc-${i}`} card={card} onCardClick={handleOpenVideo} />
                        ))}
                    </div>

                    <div className="w-20 mt-20">
                        <div className="grid-cols-1 gap-12">
                            {centerCards.map((card, i) => (
                                <JourneyCard key={`center-${i}`} card={card} onCardClick={handleOpenVideo} />
                            ))}
                        </div>

                        <div className="journey-heading-content text-center mt-20 flex flex-column items-center">
                            <h2 className="journey-main-title uppercase font-900 m-0">
                                DIGITAL EXCELLENCE<span>....</span>
                            </h2>
                            <p className="journey-subtitle uppercase font-700 mx-auto">
                                EMPOWERING BRANDS WITH CUTTING-EDGE WEBSITES, BESPOKE DASHBOARDS, SCALABLE CMS, META ADS, AND DATA-DRIVEN DIGITAL EXPERIENCES
                            </p>
                            <Button
                                text="Explore Solutions"
                                version="v2"
                                bg="primary"
                                color="white"
                                className="rounded-30 mt-14 cursor-pointer"
                                onClick={() => window.location.href = '/services'}
                            />
                        </div>
                    </div>

                    <div className="grid-cols-1 gap-12 w-20">
                        {rightCenterCards.map((card, i) => (
                            <JourneyCard key={`rc-${i}`} card={card} onCardClick={handleOpenVideo} />
                        ))}
                    </div>

                    <div className="grid-cols-1 gap-12 pt-60 w-20">
                        {rightCards.map((card, i) => (
                            <JourneyCard key={`right-${i}`} card={card} onCardClick={handleOpenVideo} />
                        ))}
                    </div>
                </div>

                <Modal
                    isOpen={Boolean(activeVideo.url && activeYoutubeId)}
                    onClose={handleCloseVideo}
                    title={activeVideo.title || "Showcase Video"}
                    size="full"
                    footer={null}
                >
                    <div className="w-full relative overflow-hidden rounded-8 my-10" style={{ aspectRatio: '16/9', background: '#000' }}>
                        <iframe
                            src={`https://www.youtube.com/embed/${activeYoutubeId}?autoplay=1&mute=0&rel=0&playsinline=1&modestbranding=1&fs=1`}
                            title={activeVideo.title || "Showcase Video"}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </Modal>

                <style>{`
                .journey-card-gradient {
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.88) 100%);
                    pointer-events: none;
                }

                .journey-card {
                    transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.35s ease;
                }

                .journey-card:hover {
                    transform: scale(1.03);
                    z-index: 10;
                    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
                }

                .journey-play-badge {
                    top: 10px;
                    right: 10px;
                    width: 32px !important;
                    height: 32px !important;
                    min-width: 32px !important;
                    border-radius: 50% !important;
                    padding: 0 !important;
                    background: var(--primary) !important;
                    color: #ffffff !important;
                    opacity: 0;
                    transform: scale(0.7);
                    transition: opacity 0.25s ease, transform 0.25s ease !important;
                    z-index: 6;
                }

                .journey-play-badge.visible {
                    opacity: 1;
                    transform: scale(1);
                }

                .journey-main-title {
                    font-size: 24px;
                    letter-spacing: 2px;
                    color: #e53935;
                    line-height: 1.2;
                    margin-bottom: 8px !important;
                }

                .journey-main-title span {
                    color: #e53935;
                    letter-spacing: 2px;
                }

                .journey-subtitle {
                    color: #1a1a1a;
                    line-height: 1.65;
                    font-size: 10.5px;
                    letter-spacing: 0.85px;
                    max-width: 440px;
                    margin-top: 4px;
                }
                `}</style>
            </div>
        </Container>
    );
};

export default React.memo(AboutSections);
