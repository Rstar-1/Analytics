import React from 'react';
import Banner from '../../components/layout/generic/Banner';
import DetailSection from './sections/DetailSection';
import bannerImg from '../../assets/about-banner.jpg';

const ProductDetail = () => {
    return (
        <>
            <Banner
                title="Product Detail"
                desc="Arc Chair Limited"
                bgImage={bannerImg}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Products', path: '/products' },
                    { label: 'Arc Chair Limited', path: '/product-detail' }
                ]}
            />
            <DetailSection />
        </>
    );
};

export default ProductDetail;