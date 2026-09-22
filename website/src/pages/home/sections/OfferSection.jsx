import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';

const offerBanners = [
    {
        id: 1,
        title: 'Turn Chairs',
        description: 'Elevate your space with 40% off our timeless designs!',
        buttonText: 'Shop Now',
        discountLabel: 'Save',
        discountPercent: '40%',
        bgColor: '#F9EAE9',
        badgeBg: 'var(--primary)',
        badgeColor: '#000000',
        image: 'https://hyper-theme-demo.myshopify.com/cdn/shop/files/collection-slider-3.jpg?v=1750909889&width=600'
    },
    {
        id: 2,
        title: 'Cross Chairs',
        description: "Get 30% off elegant, timeless seating miss out!",
        buttonText: 'Shop Now',
        discountLabel: 'Save',
        discountPercent: '30%',
        bgColor: '#E3EFE6',
        badgeBg: 'var(--warning)',
        badgeColor: '#FFFFFF',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80'
    }
];

const categoryPills = [
    {
        id: 1,
        name: 'Living Room',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 2,
        name: 'Planters',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 3,
        name: 'Gravel Rug',
        image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 4,
        name: 'Table Mirror',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 5,
        name: 'Table Wears',
        image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 6,
        name: 'Dining Decor',
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 9,
        name: 'Living Room',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 2,
        name: 'Planters',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 3,
        name: 'Gravel Rug',
        image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 4,
        name: 'Table Mirror',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=120&q=80'
    }
];

const OfferSection = () => {
    return (
        <Container>
            <div className="w-full py-50 overflow-hidden">
                <div className="grid-cols-2 sm-grid-cols-1 gap-12">
                    {offerBanners.map((banner) => (
                        <div
                            key={banner.id}
                            style={{
                                backgroundColor: banner.bgColor,
                            }}
                            className='flex items-center gap-12 p-25 sm-p-16 rounded-10'
                        >
                            <div className='w-50'>
                                <h2 className='text-dark head-text font-600'>
                                    {banner.title}
                                </h2>
                                <p className='small-text mt-4 text-gray'>
                                    {banner.description}
                                </p>
                                <Button
                                    text={banner.buttonText}
                                    version="v2"
                                    bg="dark"
                                    color="white"
                                    className="rounded-30 mt-20"
                                />
                            </div>
                            <div className='relative w-50'>
                                <div className='absolute top-0 right-0 rounded-full z-10 flex items-center justify-center m-10'
                                    style={{
                                        width: '76px',
                                        height: '76px',
                                        backgroundColor: banner.badgeBg,
                                        color: banner.badgeColor,
                                    }}
                                >
                                    <div className='text-center'>
                                        <p className='mini-text text-white'>
                                            {banner.discountLabel}
                                        </p>
                                        <p className='small-text text-white font-600'>
                                            {banner.discountPercent}
                                        </p>
                                    </div>
                                </div>
                                <Image
                                    src={banner.image}
                                    alt={banner.title}
                                    className='w-full h-250 sm-h-200 object-cover flex rounded-10'
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                    className='flex items-center gap-12 mt-30 overflow-auto'
                >
                    {categoryPills.map((item, idx) => (
                        <div
                            key={`${item.id}-${idx}`}
                            className='flex items-center gap-10 cursor-pointer bg-white py-6 px-6 rounded-30 border-ec'
                            style={{ minWidth: '140px' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#141414';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#EAEAEA';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >

                            <Image
                                src={item.image}
                                alt={item.name}
                                width='30px'
                                height='30px'
                                className='rounded-full object-cover flex'
                            />
                            <p className='mini-text font-500 text-dark'>
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default React.memo(OfferSection);