import React, { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../../../components/common/Container';
import Badge from '../../../components/common/Badge';
import Image from '../../../components/common/Image';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: 1,
        serviceName: 'Web Development and Designing',
        description:
            'We create responsive, secure, and high-performing websites that showcase your brand and engage your audience. From corporate sites, one-page websites, to fully custom solutions, every design is optimized for speed, user experience, and conversions.',
        image: 'https://cdn.shopify.com/videos/c/o/v/f196940502664ba8be492d5f52bfdefb.mp4',
        serviceLists: [
            { label: 'Ecommerce Development', url: '/services' },
            { label: 'Dynamic Website', url: '/services' },
            { label: 'Static Website', url: '/services' },
            { label: 'Blogging Website', url: '/services' },
            { label: 'WordPress Development', url: '/services' },
            { label: 'Ecommerce Using Shopify Web Hosting', url: '/services' },
            { label: 'Website Maintenance', url: '/services' }
        ]
    },
    {
        id: 2,
        serviceName: 'Digital Marketing',
        description:
            'Our digital marketing services help businesses reach their target audience and generate measurable results. From SEO, Local SEO, Google Ads, Social Media Marketing, to Content Marketing, we craft campaigns that increase traffic, leads, and ROI.',
        image: 'https://cdn.shopify.com/videos/c/o/v/951507feec354b77b5e3ddad19a3ea3f.mp4',
        serviceLists: [
            { label: 'Google Adwords', url: '/services' },
            { label: 'Social Media Marketing', url: '/services' },
            { label: 'Social Media Optimization', url: '/services' },
            { label: 'Link Tree Style', url: '/services' },
            { label: 'Content Marketing', url: '/services' }
        ]
    },
    {
        id: 3,
        serviceName: 'App Development',
        description:
            'We design and develop feature-rich mobile applications for iOS and Android. Our apps are user-friendly, fast, and scalable, helping businesses improve engagement, increase loyalty, and boost conversions.',
        image: 'https://cdn.shopify.com/videos/c/o/v/a83157d97c94463fb605d0b8cfc719ba.mp4',
        serviceLists: [
            { label: 'App Development', url: '/services' },
            { label: 'iOS App Development', url: '/services' },
            { label: 'Android App Development', url: '/services' },
            { label: 'Cross-Platform Solutions', url: '/services' },
            { label: 'Flutter & React Native', url: '/services' }
        ]
    },
    {
        id: 4,
        serviceName: 'Graphic Designing',
        description:
            'Our team creates professional, eye-catching graphics for both digital and print platforms. From branding, social media visuals, to marketing collateral, every design is tailored to enhance your brand identity and communicate your message effectively.',
        image: 'https://cdn.shopify.com/videos/c/o/v/296a0e7b36af46d591ff600f76bd3b3a.mp4',
        serviceLists: [
            { label: 'Brand Identity', url: '/services' },
            { label: 'Logo Designing', url: '/services' },
            { label: 'Brochure Designing', url: '/services' },
            { label: 'Post Designing', url: '/services' },
            { label: 'Banner Designing', url: '/services' }
        ]
    },
    {
        id: 5,
        serviceName: 'Bulk SMS Service',
        description:
            'We provide fast and reliable bulk SMS services to help you connect with your customers instantly. Send promotional, transactional, and OTP messages with high delivery rates and real-time tracking.',
        image: 'https://cdn.shopify.com/videos/c/o/v/f761ddacc0554ccab92ac7a7a789fab9.mp4',
        serviceLists: [
            { label: 'Bulk SMS', url: '/services' },
            { label: 'Bulk WhatsApp', url: '/services' }
        ]
    },
    {
        id: 6,
        serviceName: 'Search Engine Optimization',
        description:
            'Our SEO strategies help businesses appear at the top of search results. We focus on on-page SEO, off-page SEO, technical SEO, and Local SEO to increase visibility, attract qualified traffic, and drive long-term growth for your brand.',
        image: 'https://cdn.shopify.com/videos/c/o/v/79233ca19dc14cd9a6ea4797e1559838.mp4',
        serviceLists: [
            { label: 'Search Engine Optimization', url: '/services' },
            { label: 'Local SEO', url: '/services' },
            { label: 'Technical SEO Audit', url: '/services' },
            { label: 'Keyword Research & Scaling', url: '/services' }
        ]
    }
];

const ServiceSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    const [isDesktop, setIsDesktop] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
    );

    const reversedServices = useMemo(() => [...services].reverse(), []);

    useEffect(() => {
        const media = window.matchMedia('(min-width: 1024px)');
        const updateMedia = (e) => setIsDesktop(e.matches);
        setIsDesktop(media.matches);
        media.addEventListener('change', updateMedia);
        return () => media.removeEventListener('change', updateMedia);
    }, []);

    useEffect(() => {
        if (!isDesktop) return;

        const sectionEl = sectionRef.current;
        const textEl = textRef.current;
        const imageEl = imageRef.current;
        if (!sectionEl || !textEl || !imageEl) return;

        const totalSteps = services.length - 1;
        let currentStep = 0;

        const ctx = gsap.context(() => {
            const animateText = gsap.quickTo(textEl, 'yPercent', {
                duration: 0.6,
                ease: 'power3.inOut'
            });

            const animateImage = gsap.quickTo(imageEl, 'yPercent', {
                duration: 0.6,
                ease: 'power3.inOut'
            });

            ScrollTrigger.create({
                trigger: sectionEl,
                start: 'top top',
                end: () => `+=${totalSteps * 550}`,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onRefresh: (self) => {
                    if (self.spacer) {
                        self.spacer.style.backgroundColor = 'var(--dark)';
                    }
                },
                onUpdate: (self) => {
                    const step = Math.round(self.progress * totalSteps);
                    const clamped = Math.max(0, Math.min(totalSteps, step));
                    if (clamped !== currentStep) {
                        currentStep = clamped;
                        animateText(100 * clamped);
                        animateImage(-100 * clamped);
                    }
                }
            });
        }, sectionRef);

        const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
        const t2 = setTimeout(() => ScrollTrigger.refresh(), 400);
        const t3 = setTimeout(() => ScrollTrigger.refresh(), 1000);

        const handleLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', handleLoad);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            window.removeEventListener('load', handleLoad);
            ctx.revert();
        };
    }, [isDesktop]);

    return (
        <Container
            ref={sectionRef}
            version="v0"
            className="relative w-full text-white overflow-hidden"
            style={{ background: 'var(--dark)' }}
        >
            {isDesktop ? (
                <div className="w-full h-100 overflow-hidden z-10 grid-cols-2 items-center relative">
                    <div className="h-full relative overflow-hidden flex items-center">
                        <div
                            className="absolute pointer-events-none rounded-full"
                            style={{
                                left: '-3vw',
                                top: '-3vw',
                                width: '25vw',
                                height: '25vw',
                                filter: 'blur(80px)',
                                background: 'radial-gradient(circle, rgba(255, 8, 8, 0.6) 0%, rgba(220, 38, 38, 0.25) 50%, transparent 75%)',
                                zIndex: 0
                            }}
                        />

                        <div
                            ref={textRef}
                            className="absolute h-full w-full will-change-transform"
                            style={{ top: `-${(services.length - 1) * 100}%`, zIndex: 1 }}
                        >
                            {reversedServices.map((service) => (
                                <div
                                    key={`desktop-text-${service.id}`}
                                    className="w-full h-100 flex items-center"
                                >
                                    <div className="px-30 w-full" style={{ maxWidth: '580px' }}>
                                        <h2 className="large-text font-500 text-white uppercase">
                                            {service.serviceName}
                                        </h2>
                                        <p className="para-text font-300 my-15 text-white" style={{ opacity: 0.85 }}>
                                            {service.description}
                                        </p>

                                        <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.16)' }} />

                                        <div className="flex flex-wrap gap-12 mt-20">
                                            {service.serviceLists.map((item, idx) => (
                                                <a key={idx} href={item.url} className="decoration-none inline-flex">
                                                    <Badge
                                                        text={item.label}
                                                        shape="pill"
                                                        variant="outline"
                                                        icon="ArrowUpRight"
                                                        iconPosition="right"
                                                        iconSize={13}
                                                        capitalize={false}
                                                        bg="rgba(255, 255, 255, 0.08)"
                                                        textColor="#ffffff"
                                                        borderColor="rgba(255, 255, 255, 0.18)"
                                                        className="service-pill cursor-pointer"
                                                    />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative w-full h-full overflow-hidden">
                        <div
                            ref={imageRef}
                            className="absolute w-full h-full will-change-transform"
                            style={{ top: '0%' }}
                        >
                            {services.map((service) => (
                                <div
                                    key={`desktop-media-${service.id}`}
                                    className="w-full h-100 relative flex items-center justify-center overflow-hidden"
                                >
                                    <Image
                                        src={service.image}
                                        alt={service.serviceName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full py-40 px-20 flex flex-column gap-30" style={{ background: 'var(--dark)' }}>
                    {services.map((service) => (
                        <div key={`mobile-${service.id}`} className="w-full overflow-hidden rounded-10 flex flex-column">
                            <div
                                className="relative w-full overflow-hidden rounded-10 mb-20"
                                style={{ aspectRatio: '16 / 10' }}
                            >
                                <Image
                                    src={service.image}
                                    alt={service.serviceName}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="px-5 flex flex-column">
                                <h2 className="font-400 text-white m-0" style={{ fontSize: '24px', lineHeight: 1.2 }}>
                                    {service.serviceName}
                                </h2>
                                <p className="font-300 mt-10 mb-18 text-white" style={{ opacity: 0.8, fontSize: '14px', lineHeight: 1.65 }}>
                                    {service.description}
                                </p>

                                <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.16)', marginBottom: '18px' }} />

                                <div className="flex flex-wrap gap-8">
                                    {service.serviceLists.map((item, idx) => (
                                        <a key={idx} href={item.url} className="decoration-none inline-flex">
                                            <Badge
                                                text={item.label}
                                                shape="pill"
                                                variant="outline"
                                                icon="ArrowUpRight"
                                                iconPosition="right"
                                                iconSize={12}
                                                capitalize={false}
                                                bg="rgba(255, 255, 255, 0.08)"
                                                textColor="#ffffff"
                                                borderColor="rgba(255, 255, 255, 0.18)"
                                                className="service-pill cursor-pointer"
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .service-pill {
                    padding: 8px 18px !important;
                    font-size: 13px !important;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    transition: all 0.25s ease !important;
                }
                .service-pill:hover {
                    background-color: rgba(255, 255, 255, 0.2) !important;
                    border-color: rgba(255, 255, 255, 0.35) !important;
                    transform: translateY(-2px);
                }
            `}</style>
        </Container>
    );
};

export default React.memo(ServiceSection);