import React from "react";
import Container from "../../common/Container";
import Breadcrumb from "../../common/Breadcrumb";
import Skeleton from "../../common/Skeleton";
import defaultBannerImg from "../../../assets/about-banner.jpg";

const Banner = ({ title, desc, style, breadcrumbs, productData, loading, bgImage, image, backgroundImage }) => {
    if (loading) {
        return <Skeleton variant="banner" style={style} />;
    }

    const mainHeading = desc || title || "Banner";
    const bannerImg = bgImage || backgroundImage || image || defaultBannerImg;
    const bannerBackground = bannerImg
        ? (bannerImg.includes('gradient') || bannerImg.startsWith('url(')
            ? bannerImg
            : `linear-gradient(rgba(10, 15, 25, 0.75), rgba(10, 15, 25, 0.85)), url(${bannerImg}) center/cover no-repeat`)
        : 'radial-gradient(ellipse at 50% 50%, #2e0f06ff 0%, #6b3620ff 55%, #311106ff 100%)';

    const itemsList = productData
        ? [
            { label: 'Home', path: '/home' },
            { label: productData.category || 'Products', path: '/products' },
            { label: productData.title || 'Product Detail' }
        ]
        : Array.isArray(breadcrumbs)
            ? breadcrumbs
            : [
                { label: 'Home', path: '/home' },
                { label: title || 'Page' }
            ];

    return (

        <Container className="relative"
            style={{
                background: bannerBackground,
                padding: '120px 0px 80px 0px',
                ...style
            }}>
            {/* <div
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '90%',
                    height: '450px',
                    background: 'radial-gradient(circle, rgba(219, 94, 31, 0.24) 0%, rgba(0, 0, 0, 0) 70%)',
                    pointerEvents: 'none',
                    borderRadius: '50%'
                }}
            /> */}
            <div className="relative w-full py-60 text-center">
                <h2 className="text-white font-600 large-text text-center mt-40">
                    {mainHeading}
                </h2>

                <div className="mt-8 flex justify-center">
                    <Breadcrumb items={itemsList} className="justify-center" />
                </div>
            </div>
        </Container>
    );
};

export default Banner;
