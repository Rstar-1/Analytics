import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';
import Heading from '../../../components/layout/generic/Heading';
import { feedCMS } from '../../../utils/apiData';

const FeedSection = () => {
    const [swiperInstance, setSwiperInstance] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el || !swiperInstance || typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    swiperInstance.autoplay?.start();
                } else {
                    swiperInstance.autoplay?.stop();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [swiperInstance]);

    return (
        <Container>
            <div ref={sectionRef} className='w-full py-50'>
                <style>{`
                    .feed-swiper {
                        padding-bottom: 36px !important;
                    }
                    .feed-swiper .swiper-pagination {
                        bottom: 0px !important;
                    }
                    .feed-swiper .swiper-pagination-bullet {
                        background: var(--gray);
                        opacity: 0.35;
                        width: 8px;
                        height: 8px;
                        transition: all 0.3s ease;
                    }
                    .feed-swiper .swiper-pagination-bullet-active {
                        background: var(--primary);
                        opacity: 1;
                        width: 22px;
                        border-radius: 4px;
                    }
                    .feed-card .shop-look-btn-wrapper {
                        max-height: 0;
                        opacity: 0;
                        visibility: hidden;
                        margin-top: 0;
                        overflow: hidden;
                        transform: translateY(12px);
                        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-top 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
                    }
                    .feed-card:hover .shop-look-btn-wrapper {
                        max-height: 55px;
                        opacity: 1;
                        visibility: visible;
                        margin-top: 10px;
                        transform: translateY(0);
                    }
                    .feed-card img {
                        transition: transform 0.5s ease;
                    }
                    .feed-card:hover img {
                        transform: scale(1.04);
                    }
                    .feed-nav-btn {
                        width: 38px !important;
                        height: 38px !important;
                        padding: 0 !important;
                        display: inline-flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        border-radius: 50% !important;
                        border: 1px solid var(--border-color, #e2e8f0) !important;
                        background: var(--white) !important;
                        color: var(--dark) !important;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }
                    .feed-nav-btn:hover {
                        background: var(--primary) !important;
                        color: #ffffff !important;
                        border-color: var(--primary) !important;
                    }
                `}</style>

                <div className="flex items-end justify-between gap-12">
                    <div className="w-full">
                        <Heading
                            version="v2"
                            tag={feedCMS.heading.tag}
                            title={feedCMS.heading.title}
                        />
                    </div>
                    <div className="flex items-center gap-8 sm-hidden mb-4">
                        <Button
                            version="icon"
                            variant='outline'
                            icon="ChevronLeft"
                            iconWidth="18"
                            iconHeight="18"
                            className='rounded-20'
                            onClick={() => swiperInstance?.slidePrev()}
                            aria-label="Previous Slide"
                        />
                        <Button
                            version="icon"
                            variant='outline'
                            icon="ChevronRight"
                            iconWidth="18"
                            iconHeight="18"
                            className='rounded-20'
                            onClick={() => swiperInstance?.slideNext()}
                            aria-label="Next Slide"
                        />
                    </div>
                </div>

                <div className='mt-30'>
                    <Swiper
                        onSwiper={setSwiperInstance}
                        modules={[Autoplay, Pagination]}
                        spaceBetween={16}
                        slidesPerView={1.2}
                        loop={feedCMS.feedItems && feedCMS.feedItems.length > 4}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            480: { slidesPerView: 1.8, spaceBetween: 16 },
                            640: { slidesPerView: 2.2, spaceBetween: 16 },
                            768: { slidesPerView: 3, spaceBetween: 16 },
                            1024: { slidesPerView: 4, spaceBetween: 16 },
                        }}
                        className="feed-swiper"
                    >
                        {feedCMS.feedItems.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className='feed-card relative rounded-10 overflow-hidden h-400 cursor-pointer'>
                                    {/* Main Background Image */}
                                    <Image
                                        src={item.image}
                                        alt="Instagram Feed Post"
                                        className="feed-img w-full h-full object-cover flex"
                                        loading="lazy"
                                        decoding="async"
                                    />

                                    <div className='absolute top-0 right-0'>
                                        <div className='bg-white rounded-full icon-lg m-15 flex items-center justify-center shadow-sm'>
                                            <Icon name="Instagram" width="18" height="18" className="text-danger" />
                                        </div>
                                    </div>

                                    <div className='absolute bottom-0 left-0 w-full'>
                                        <div className='p-15'>
                                            <div className='flex items-center gap-12'>
                                                {item.products.map((prodImg, idx) => (
                                                    <div key={idx} className='bg-white p-2 rounded-5 shadow-sm'>
                                                        <Image
                                                            src={prodImg}
                                                            alt="Tagged Product"
                                                            width='50px'
                                                            height='50px'
                                                            className="flex object-cover rounded-5"
                                                            loading="lazy"
                                                            decoding="async"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='shop-look-btn-wrapper w-full'>
                                                <Button
                                                    text={feedCMS.buttonText}
                                                    version="v3"
                                                    bg="white"
                                                    color="dark"
                                                    className='rounded-30 font-500'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </Container>
    );
};

export default React.memo(FeedSection);
