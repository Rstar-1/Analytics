import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';
import products from '../../../data/product.json';

const initialProducts = products;

const colorFilters = [
    { name: 'Blue', color: '#60A5FA', count: 3 },
    { name: 'Brown', color: '#9A3412', count: 1 },
    { name: 'Charcoal', color: '#374151', count: 2 },
    { name: 'Chocolate', color: '#451A03', count: 4 },
    { name: 'Grey', color: '#D1D5DB', count: 2 },
    { name: 'Light Beige', color: '#F3E8FF', count: 3 },
    { name: 'Olive', color: '#365314', count: 3 },
    { name: 'Red', color: '#DC2626', count: 1 },
    { name: 'Soft Green', color: '#86EFAC', count: 3 },
    { name: 'Yellow', color: '#FDE047', count: 2 }
];

const FilterSection = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('grid');
    const [compareEnabled, setCompareEnabled] = useState(false);
    const [priceMax, setPriceMax] = useState(3429);
    const [selectedColors, setSelectedColors] = useState([]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(true);

    const toggleColor = (name) => {
        setSelectedColors((prev) =>
            prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
        );
    };

    return (
        <Container>
            <div className="w-full py-40">
                <div
                    className='flex sm-grid-cols-1 items-center w-full gap-12 justify-between'
                >
                    <div className='flex items-center gap-12'>
                        <button
                            onClick={() => setIsFilterVisible(!isFilterVisible)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 22px',
                                borderRadius: '30px',
                                border: '1px solid #E2E8F0',
                                backgroundColor: isFilterVisible ? '#F8FAFC' : '#FFFFFF',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#0F172A'
                            }}
                        >
                            <Icon name="Filter" width="16" height="16" stroke="#0F172A" />
                            <span>Filter</span>
                        </button>
                        <span style={{ fontSize: '14px', color: '#64748B' }}>14 products</span>
                    </div>

                    <div className='flex items-center flex-wrap' style={{ gap: '20px' }}>
                        {/* Compare Toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>Compare:</span>
                            <div
                                onClick={() => setCompareEnabled(!compareEnabled)}
                                style={{
                                    width: '42px',
                                    height: '22px',
                                    borderRadius: '12px',
                                    backgroundColor: compareEnabled ? '#0F172A' : '#CBD5E1',
                                    padding: '2px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <div
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        backgroundColor: '#FFFFFF',
                                        transform: compareEnabled ? 'translateX(20px)' : 'translateX(0)',
                                        transition: 'transform 0.2s ease'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Sort Dropdown */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px', color: '#0F172A', fontWeight: '500' }}>Sort by:</span>
                            <select
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: '1px solid #E2E8F0',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#0F172A',
                                    backgroundColor: '#FFFFFF',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="newest">Newest Arrivals</option>
                            </select>
                        </div>

                        {/* View Mode Toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px', color: '#64748B' }}>View as:</span>
                            <button
                                onClick={() => setViewMode('grid')}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    backgroundColor: viewMode === 'grid' ? '#0F172A' : '#F1F5F9',
                                    color: viewMode === 'grid' ? '#FFFFFF' : '#0F172A',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <Icon name="Grid" width="16" height="16" stroke={viewMode === 'grid' ? '#FFFFFF' : '#0F172A'} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    backgroundColor: viewMode === 'list' ? '#0F172A' : '#F1F5F9',
                                    color: viewMode === 'list' ? '#FFFFFF' : '#0F172A',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <Icon name="List" width="16" height="16" stroke={viewMode === 'list' ? '#FFFFFF' : '#0F172A'} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='mt-30 flex sm-grid-cols-1 items-start gap-12'>
                    {isFilterVisible && (
                        <div className='w-20 sm-w-full'>
                            {/* Availability Filter */}
                            <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '24px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>Availability</h4>
                                    <span style={{ fontSize: '18px', fontWeight: '400', color: '#64748B', cursor: 'pointer' }}>−</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '14px', color: '#475569' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <input
                                                type="checkbox"
                                                checked={inStockOnly}
                                                onChange={(e) => setInStockOnly(e.target.checked)}
                                                style={{ width: '16px', height: '16px', accentColor: '#0F172A', cursor: 'pointer' }}
                                            />
                                            <span>In stock</span>
                                        </div>
                                        <span style={{ color: '#94A3B8', fontSize: '13px' }}>14</span>
                                    </label>
                                    <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '14px', color: '#475569' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#0F172A', cursor: 'pointer' }} />
                                            <span>Out of stock</span>
                                        </div>
                                        <span style={{ color: '#94A3B8', fontSize: '13px' }}>0</span>
                                    </label>
                                </div>
                            </div>

                            {/* Price Range Filter */}
                            <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '24px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>Price</h4>
                                    <span style={{ fontSize: '18px', fontWeight: '400', color: '#64748B', cursor: 'pointer' }}>−</span>
                                </div>
                                <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px 0' }}>
                                    The highest price is $3,429.00
                                </p>
                                {/* Slider Track */}
                                <input
                                    type="range"
                                    min="0"
                                    max="3429"
                                    value={priceMax}
                                    onChange={(e) => setPriceMax(Number(e.target.value))}
                                    style={{ width: '100%', accentColor: '#0F172A', cursor: 'pointer', marginBottom: '16px' }}
                                />
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <div style={{ flex: 1, backgroundColor: '#F1F5F9', borderRadius: '20px', padding: '8px 14px', fontSize: '13px', color: '#0F172A' }}>
                                        $ 0
                                    </div>
                                    <span style={{ color: '#94A3B8' }}>$</span>
                                    <div style={{ flex: 1, backgroundColor: '#F1F5F9', borderRadius: '20px', padding: '8px 14px', fontSize: '13px', color: '#0F172A', fontWeight: '600' }}>
                                        {priceMax}
                                    </div>
                                </div>
                            </div>

                            {/* Color Filter */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>Color</h4>
                                    <span style={{ fontSize: '18px', fontWeight: '400', color: '#64748B', cursor: 'pointer' }}>−</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {colorFilters.map((c) => {
                                        const isSelected = selectedColors.includes(c.name);
                                        return (
                                            <div
                                                key={c.name}
                                                onClick={() => toggleColor(c.name)}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    color: isSelected ? '#0F172A' : '#475569',
                                                    fontWeight: isSelected ? '600' : '400'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <span
                                                        style={{
                                                            width: '16px',
                                                            height: '16px',
                                                            borderRadius: '3px',
                                                            backgroundColor: c.color,
                                                            border: '1px solid rgba(0,0,0,0.15)'
                                                        }}
                                                    />
                                                    <span>{c.name}</span>
                                                </div>
                                                <span style={{ color: '#94A3B8', fontSize: '13px' }}>{c.count}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={viewMode ? 'w-full pl-20 sm-pl-1' : 'w-80 sm-w-full'}>
                        <div
                            className="grid-cols-4 sm-grid-cols-2 gap-12"
                        >
                            {initialProducts.map((item) => {
                                if (item.isBanner) {
                                    return (
                                        <div
                                            key={item.id}
                                            className='h-350 sm-h-250 overflow-hidden rounded-10 relative'
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                className='h-350 sm-h-250 object-cover flex w-full filter-b4'
                                            />
                                            <div className='absolute bottom-0 left-0 px-10 py-20'>
                                                <p className='text-primary font-500 small-text'>
                                                    {item.subtitle}
                                                </p>
                                                <h3 className='text-white font-600 title-text mt-5'>
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
                                        style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                                    >
                                        {/* Product Card Box */}
                                        <div
                                            className='h-250 sm-h-150 rounded-10 overflow-hidden'
                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                className='h-250 sm-h-150 w-full flex object-cover'
                                            />
                                        </div>

                                        {/* Product Info below Card */}
                                        <div className='mt-8'>
                                            <p
                                                className='font-500 mini-text text-gray line-clamp-1 uppercase'
                                            >
                                                {item.category}
                                            </p>
                                            <h4
                                                className='font-600 mid-text text-dark line-clamp-2 uppercase'
                                            >
                                                {item.name}
                                            </h4>
                                            <div className='flex items-center gap-6 mt-4'>
                                                <span className='font-600 mini-text' style={{ color: item.originalPrice ? '#C8281E' : '#0F172A' }}>
                                                    ${item.price.toFixed(2)}
                                                </span>
                                                {item.originalPrice && (
                                                    <span className='font-500 mini-text' style={{ color: '#94A3B8', textDecoration: 'line-through' }}>
                                                        ${item.originalPrice.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    );
};

export default FilterSection;