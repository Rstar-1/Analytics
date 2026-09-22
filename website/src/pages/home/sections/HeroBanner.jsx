import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import agencyVideo from '../../../assets/agency.mp4';
import heroMask1 from '../../../assets/hero-bg1-mask.png';
import heroMask3 from '../../../assets/hero-bg3-mask.png';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';

import { configData } from '../../../utils/apiData';

const HEIGHT_MAP = {
    sticky: { 1: 'h-800 sm-h-550', 2: 'h-700 sm-h-550' },
    normal: { 1: 'h-650 sm-h-550', 2: 'h-550' }
};

const HeroBackground = React.memo(() => (
    <div className='absolute top-0 left-0 w-full h-full z-10'>
        <Image
            src={agencyVideo}
            alt="Agency Hero Background Video"
            className='w-full h-full flex object-cover'
        />
        <div
            className='absolute w-full h-full top-0 left-0'
            style={{
                background: 'radial-gradient(ellipse 85% 75% at 70% 0%, rgba(255, 175, 40, 0.28) 0%, rgba(0, 0, 0, 0.5) 90%, rgba(10, 10, 10, 0.95) 100%), linear-gradient(180deg, rgba(10, 10, 10, 0.6) 90%, rgba(10, 10, 10, 0.9) 100%)',
            }}
        />
    </div>
));

const HeroContent = React.memo(({ onGetInTouch, isHeaderSticky, heroVersion }) => (
    <div className={`w-full ${isHeaderSticky ? '' : heroVersion === 1 ? 'pb-100 sm-pb-30' : 'pb-20'} relative z-20`}>
        <h1 className='largemid-text text-white font-600'>
            A ERA IN
            <br />
            <span className='text-primary'>COMMUNICATION</span>
        </h1>
        <p className='text-white headpara-text font-400 sm-mt-6 mt-12'>
            Are You Struggling To Turn Your <br />Ideas Into Something Users Love? Pixelr Designs Digital Products.
        </p>
        <Button
            text="Get In Touch"
            icon="ArrowUpRight"
            iconPosition="right"
            iconWidth="16"
            iconHeight="16"
            version="v2"
            className="rounded-20 mt-18"
            onClick={onGetInTouch}
        />
    </div>
));

const BreadcrumbTab = React.memo(({ isMobile, heroVersion }) => {
    if (heroVersion !== 2) return null;

    return (
        <div
            className="absolute z-30 flex items-center justify-center"
            style={{
                width: isMobile ? '90%' : '450px',
                height: isMobile ? '56px' : '68px',
                backgroundColor: 'var(--white)',
                bottom: '-5px',
                left: '50%',
                transform: 'translateX(-50%)',
                WebkitMaskImage: `url(${heroMask3})`,
                WebkitMaskSize: '100% 100%',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'bottom center',
                maskImage: `url(${heroMask3})`,
                maskSize: '100% 100%',
                maskRepeat: 'no-repeat',
                maskPosition: 'bottom center',
            }}
        />
    );
});

const HeroBanner = React.memo(() => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    const heroVersion = configData?.HeroBanner?.[0]?.HeroBannerType ?? 1;
    const isHeaderSticky = Boolean(
        configData?.HeaderSticky ??
        configData?.Header?.HeaderSticky ??
        configData?.Header?.[0]?.HeaderSticky
    );

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    const handleGetInTouch = useCallback(() => {
        navigate('/connect');
    }, [navigate]);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    const heightClass = HEIGHT_MAP[isHeaderSticky ? 'sticky' : 'normal']?.[heroVersion] || (isHeaderSticky ? 'h-700 sm-h-550' : 'h-550');

    const containerStyle = useMemo(() => {
        if (heroVersion === 1) {
            const maskSize = isMobile ? '260% 100%' : '110% 100%';
            return {
                WebkitMaskImage: `url(${heroMask1})`,
                WebkitMaskSize: maskSize,
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                position: 'relative',
                maskImage: `url(${heroMask1})`,
                maskSize,
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
            };
        }
        return {
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0 0 25px 25px'
        };
    }, [isMobile, heroVersion]);

    return (
        <Container className={`${heightClass} flex items-center`} style={containerStyle}>
            <HeroBackground />
            <HeroContent isHeaderSticky={isHeaderSticky} heroVersion={heroVersion} onGetInTouch={handleGetInTouch} />
            <BreadcrumbTab isMobile={isMobile} heroVersion={heroVersion} />
        </Container>
    );
});

export default HeroBanner;
