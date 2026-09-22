import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import slider1 from '../../../assets/collection-slider-1.jpg';
import slider2 from '../../../assets/collection-slider-2.jpg';
import slider3 from '../../../assets/collection-slider-3.jpg';
import Heading from '../../../components/layout/generic/Heading';
import { useCart } from '../../../context/CartContext';

const products = [
    {
        id: 1,
        badge: { text: 'Sale', color: '#C8281E' },
        category: 'TABLES',
        name: 'Cross Table Bark',
        price: '$170.00',
        originalPrice: '$200.00',
        image: slider1,
        colors: ['#A06236']
    },
    {
        id: 2,
        badge: { text: 'Sale', color: '#C8281E' },
        category: 'RACK WALL',
        name: 'Axis Storage System',
        price: '$135.00',
        originalPrice: '$185.00',
        image: slider2,
        colors: ['#B0997B']
    },
    {
        id: 3,
        badge: { text: 'Sale', color: '#C8281E' },
        category: 'CHAIRS',
        name: 'Task Chair Luxe',
        price: '$559.00',
        originalPrice: '$599.00',
        image: slider3,
        colors: ['#5A3A1E']
    },
    {
        id: 4,
        badge: { text: 'Sale', color: '#C8281E' },
        category: 'CHAIRS',
        name: 'Cross Chair Heritage',
        price: '$589.00',
        originalPrice: '$600.00',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=500&q=80',
        colors: ['#D9D0C3', '#4A3525']
    },
    {
        id: 5,
        badge: { text: 'New', color: '#0F8354' },
        category: 'BAR STOOLS',
        name: 'Plush Stool',
        price: '$219.00',
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=500&q=80',
        colors: ['#E5E5E5']
    },
    {
        id: 6,
        badge: { text: 'Sale', color: '#C8281E' },
        category: 'ACCESSORIES',
        name: 'Grind Vessel',
        price: '$65.00',
        originalPrice: '$100.00',
        image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=500&q=80',
        colors: ['#2B3856', '#D6C5B3']
    }
];

const featureSections = [1, 2];

const ProductCard = ({ item, onClick }) => {
    const { addToCart } = useCart();

    return (
        <div
            onClick={onClick}
            className='cursor-pointer'
            style={{ minWidth: '270px', maxWidth: '270px' }}
        >
            <div className="h-300 w-full overflow-hidden rounded-10 relative product-card">
                {item.badge && (
                    <div className='top-0 left-0 absolute'>
                        <p className='m-12 bg-danger px-12 py-1 mini-text font-400 rounded-20 text-white'>
                            {item.badge.text}
                        </p>
                    </div>
                )}
                <Image
                    src={item.image}
                    alt={item.name}
                    className="flex w-full h-full object-cover"
                />
                <div className='product-btn w-full absolute bottom-0 left-0'>
                    <div className='p-18'>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(item);
                            }}
                            text="Add to Cart"
                            icon="Cart"
                            iconWidth="18"
                            iconHeight="18"
                            iconStrokeWidth="2"
                            iconPosition='left'
                            version="v3"
                            bg="primary"
                            color="white"
                            className='rounded-30 w-full'
                        />
                    </div>
                </div>
            </div>

            <p className='text-gray font-500 uppercase mini-text mt-5'
            >
                {item.category}
            </p>

            <h3 className='headmini-text text-dark uppercase font-600 mt-2'>
                {item.name}
            </h3>

            <div className='flex items-center gap-6 mt-2'>
                <p className='mini-text text-danger font-600'>
                    {item.price}
                </p>
                {item.originalPrice && (
                    <p className='mini-text text-gray font-400 line-through'>
                        {item.originalPrice}
                    </p>
                )}
            </div>

            {item.colors && (
                <div className='flex items-center gap-8 mt-6'>
                    {item.colors.map((color, cIdx) => (
                        <span
                            key={cIdx}
                            style={{
                                width: '14px',
                                height: '14px',
                                borderRadius: '3px',
                                backgroundColor: color,
                                border: '1px solid rgba(0,0,0,0.15)'
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const ProductSliderSection = ({ products, onProductClick }) => {
    const scrollRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(25);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const maxScroll = scrollWidth - clientWidth;
            if (maxScroll > 0) {
                const progress = Math.min(100, Math.max(25, ((scrollLeft / maxScroll) * 75) + 25));
                setScrollProgress(progress);
            }
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className='mt-40'>
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                style={{
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
                className="flex gap-12 overflow-auto"
            >
                {products.map((item) => (
                    <ProductCard
                        key={item.id}
                        item={item}
                        onClick={() => onProductClick(item)}
                    />
                ))}
            </div>

            <div className='flex items-center justify-between mt-20'>
                <div style={{ height: '3px' }} className='w-80 sm-w-60 bg-tertiary relative'>
                    <div
                        style={{
                            height: '3px',
                            width: `${scrollProgress}%`,
                            transition: 'width 0.2s ease'
                        }}
                        className='top-0 left-0 bg-primary absolute'
                    />
                </div>

                <div className='flex items-center gap-12'>
                    <Button
                        aria-label="Previous Products"
                        onClick={() => scroll('left')}
                        icon="ArrowLeft"
                        iconWidth="18"
                        iconHeight="18"
                        iconStrokeWidth="2"
                        variant="outline"
                        version="icon"
                        color='primary'
                        className="border-primary rounded-30"
                    />
                    <Button
                        aria-label="Next Products"
                        onClick={() => scroll('right')}
                        icon="ArrowRight"
                        iconWidth="18"
                        iconHeight="18"
                        iconStrokeWidth="2"
                        variant="outline"
                        version="icon"
                        color='primary'
                        className="border-primary rounded-30"
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureSection = () => {
    const navigate = useNavigate();

    return (
        <Container style={{ background: 'var(--forth)' }}>
            <div className="w-full py-50">
                <style>{`
                    .product-card .product-btn {
                        opacity: 0;
                        visibility: hidden;
                        transform: translateY(12px);
                        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
                    }
                    .product-card:hover .product-btn {
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(0);
                    }
                    .product-card img {
                        transition: transform 0.5s ease;
                    }
                    .product-card:hover img {
                        transform: scale(1.04);
                    }
                `}</style>

                <Heading
                    version="v2"
                    tag="SPECIAL OFFERS FOR YOU"
                    title="Featured Products & Popular Designs"
                    actionText="Shop All Products"
                    actionLink="/products"
                />

                {featureSections.map((sectionId) => (
                    <ProductSliderSection
                        key={sectionId}
                        products={products}
                        onProductClick={(item) => navigate(`/product/${item.id}`, { state: { product: item } })}
                    />
                ))}
            </div>
        </Container>
    );
};

export default React.memo(FeatureSection);