import React, { lazy, Suspense } from 'react';
import Banner from '../../components/layout/generic/Banner';
import Loader from '../../components/common/generic/Loader';
import bannerImg from '../../assets/about-banner.jpg';

const ServiceDetailSection = lazy(() => import('./sections/ServiceDetailSection'));
const PatchSection = lazy(() => import('../home/sections/PatchSection'));
const FeedSection = lazy(() => import('../home/sections/FeedSection'));

const Service = () => {
    return (
        <>
            <Banner
                title="Our Services"
                desc="What We Offer"
                bgImage={bannerImg}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Services', path: '/service' }
                ]}
            />
            <Suspense fallback={<Loader />}>
                <ServiceDetailSection />
                <FeedSection />
                <PatchSection />
            </Suspense>
        </>
    );
};

export default Service;
