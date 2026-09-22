import React from 'react'
import Banner from '../../components/layout/generic/Banner'
import FilterSection from './sections/FilterSection'
import SpecifySection from './sections/SpecifySection'
import bannerImg from '../../assets/about-banner.jpg'

const Product = () => {
    return (
        <>
            <Banner
                title="Products Collection"
                desc="Products"
                bgImage={bannerImg}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Products', path: '/products' }
                ]}
            />
            <FilterSection />
            <SpecifySection />
        </>
    )
}

export default Product