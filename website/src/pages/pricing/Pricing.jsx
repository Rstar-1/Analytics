import React, { lazy, Suspense } from 'react';
import Banner from '../../components/layout/generic/Banner';
import Loader from '../../components/common/generic/Loader';
import bannerImg from '../../assets/about-banner.jpg';

const PriceSection = lazy(() => import('./sections/PriceSection'));
const PatchSection = lazy(() => import('../home/sections/PatchSection'));

const Pricing = () => {
    return (
        <>
            <Banner
                title="Pricing Plan"
                desc="Flexible Pricing for Your Business Growth"
                bgImage={bannerImg}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Pricing', path: '/pricing' }
                ]}
            />
            <Suspense fallback={<Loader />}>
                <PriceSection />
                <PatchSection />
            </Suspense>
        </>
    );
};

export default Pricing;
