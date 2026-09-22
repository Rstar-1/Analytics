import React, { lazy, Suspense } from 'react';
import Banner from '../../components/layout/generic/Banner';
import Loader from '../../components/common/generic/Loader';
import aboutBanner from '../../assets/about-banner.jpg';

const DetailSection = lazy(() => import('./sections/DetailSection'));
const PatchSection = lazy(() => import('../home/sections/PatchSection'));
const OfferSection = lazy(() => import('../home/sections/OfferSection'));
const FeedSection = lazy(() => import('../home/sections/FeedSection'));

const ecomSections = [
    DetailSection,
    PatchSection,
    OfferSection,
];

const standardSections = [
    DetailSection,
    FeedSection,
    PatchSection
];

const About = () => {
    const isEcom = import.meta.env.VITE_ECOM === 'true';
    const activeSections = isEcom ? ecomSections : standardSections;

    return (
        <>
            <Banner
                title="About Us"
                desc="About Our Story"
                bgImage={aboutBanner}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'About Us', path: '/about' }
                ]}
            />
            <Suspense fallback={<Loader />}>
                {activeSections.map((Component, index) => (
                    <Component key={index} />
                ))}
            </Suspense>
        </>
    );
};

export default About;