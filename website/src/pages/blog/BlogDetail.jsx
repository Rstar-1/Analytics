import React from 'react';
import Banner from '../../components/layout/generic/Banner';
import MediaDetailSection from './sections/MediaDetailSection';
import bannerImg from '../../assets/about-banner.jpg';

const BlogDetail = () => {
    return (
        <>
            <Banner
                title="Blog Detail"
                desc="Blog Details"
                bgImage={bannerImg}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Blog', path: '/blog' },
                    { label: 'Blog Detail', path: '/blog-detail' }
                ]}
            />
            <MediaDetailSection />
        </>
    );
};

export default BlogDetail;