import React, { lazy, Suspense, memo } from 'react';
import HeroSections from './sections/HeroSections';

const HeroBanner = lazy(() => import('./sections/HeroBanner'));
const CategorySection = lazy(() => import('./sections/CategorySection'));
const FeatureSection = lazy(() => import('./sections/FeatureSection'));
const OfferSection = lazy(() => import('./sections/OfferSection'));
const PatchSection = lazy(() => import('./sections/PatchSection'));
const ServiceSection = lazy(() => import('./sections/ServiceSection'));
const TrendingSection = lazy(() => import('./sections/TrendingSection'));
const AboutSection = lazy(() => import('./sections/AboutSection'));
const AboutSections = lazy(() => import('./sections/AboutSections'));
const BlogSection = lazy(() => import('./sections/BlogSection'));
const FeedSection = lazy(() => import('./sections/FeedSection'));
const CompareSection = lazy(() => import('./sections/CompareSection'));

const ecomSections = [
    { Component: HeroBanner, minHeight: '500px' },
    { Component: CategorySection, minHeight: '300px' },
    { Component: FeatureSection, minHeight: '400px' },
    { Component: AboutSection, minHeight: '400px' },
    { Component: CompareSection, minHeight: '300px' },
    { Component: TrendingSection, minHeight: '400px' },
    { Component: OfferSection, minHeight: '300px' }
];

const standardSections = [
    { Component: HeroSections, isEager: true },
    { Component: AboutSections, minHeight: '400px' },
    { Component: ServiceSection, minHeight: '600px' },
    { Component: FeedSection, minHeight: '400px' },
    { Component: BlogSection, minHeight: '400px' },
    { Component: PatchSection, minHeight: '300px' }
];

const SectionFallback = memo(({ minHeight = '100px' }) => (
    <div className="w-full" style={{ minHeight }} />
));

const Home = () => {
    const isEcom = import.meta.env.VITE_ECOM === 'true';
    const activeSections = isEcom ? ecomSections : standardSections;

    return (
        <main className="w-full" style={{ overflowX: 'clip' }}>
            {activeSections.map(({ Component, isEager, minHeight }, index) => {
                if (isEager) {
                    return <Component key={index} />;
                }
                return (
                    <Suspense key={index} fallback={<SectionFallback minHeight={minHeight} />}>
                        <Component />
                    </Suspense>
                );
            })}
        </main>
    );
};

export default memo(Home);