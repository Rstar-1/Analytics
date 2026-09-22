import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import Heading from '../../../components/layout/generic/Heading';
import { configData } from '../../../utils/apiData';
import { resolveImagePath } from '../../../utils/imageResolver';
import slider1 from '../../../assets/collection-slider-1.jpg';
import slider2 from '../../../assets/collection-slider-2.jpg';
import slider3 from '../../../assets/collection-slider-3.jpg';

const categories = [
    {
        id: 1,
        name: "Sale Items",
        title: "Sale Items",
        image: slider3,
        icon: slider3,
        iconName: "Tag",
        bgColor: "#FEF2F2",
        accentColor: "#DC2626",
        description: "Explore limited time deals, discounted items, and seasonal sale collections."
    },
    {
        id: 2,
        name: "Press Tables",
        title: "Press Tables",
        image: slider1,
        icon: slider1,
        iconName: "Grid",
        bgColor: "#EFF6FF",
        accentColor: "#2563EB",
        description: "Engineered solid press tables designed for durability, style, and functional spaces."
    },
    {
        id: 3,
        name: "Lighting",
        title: "Lighting",
        image: slider2,
        icon: slider2,
        iconName: "Sun",
        bgColor: "#FFFBEB",
        accentColor: "#D97706",
        description: "Modern ambient and task lighting fixtures crafted to brighten every interior."
    },
    {
        id: 4,
        name: "Spoke Sofa",
        title: "Spoke Sofa",
        image: slider3,
        icon: slider3,
        iconName: "Layers",
        bgColor: "#F5F3FF",
        accentColor: "#7C3AED",
        description: "Luxurious spoke sofas combining ergonomic comfort with timeless aesthetics."
    },
    {
        id: 5,
        name: "Storage",
        title: "Storage",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=300&q=80",
        icon: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=300&q=80",
        iconName: "Box",
        bgColor: "#ECFDF5",
        accentColor: "#059669",
        description: "Minimalist modular shelving, cabinets, and storage solutions for modern living."
    },
    {
        id: 6,
        name: "Turn Chairs",
        title: "Turn Chairs",
        image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=300&q=80",
        icon: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=300&q=80",
        iconName: "RotateCcw",
        bgColor: "#FFF1F2",
        accentColor: "#E11D48",
        description: "360-degree swivel turn chairs offering flexible mobility and ergonomic back support."
    },
    {
        id: 7,
        name: "Longe Chairs",
        title: "Longe Chairs",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80",
        icon: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80",
        iconName: "Armchair",
        bgColor: "#F0FDF4",
        accentColor: "#16A34A",
        description: "Plush lounge chairs designed for relaxation, quiet moments, and executive seating."
    },
    {
        id: 8,
        name: "Curve Coat",
        title: "Curve Coat",
        image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=300&q=80",
        icon: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=300&q=80",
        iconName: "Shield",
        bgColor: "#FDF2F8",
        accentColor: "#DB2777",
        description: "Sleek sculptural coat stands and entryway accessories with organic curve accents."
    },
    {
        id: 9,
        name: "Cross Tables",
        title: "Cross Tables",
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=300&q=80",
        icon: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=300&q=80",
        iconName: "Plus",
        bgColor: "#F8FAFC",
        accentColor: "#475569",
        description: "Sturdy geometric cross tables ideal for conference rooms and communal workspaces."
    },
    {
        id: 10,
        name: "Bend Chairs",
        title: "Bend Chairs",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80",
        icon: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80",
        iconName: "Zap",
        bgColor: "#EFF6FF",
        accentColor: "#1D4ED8",
        description: "Form-molded bentwood chairs combining artisanal craft with industrial strength."
    },
    {
        id: 11,
        name: "Bar Chairs",
        title: "Bar Chairs",
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=300&q=80",
        icon: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=300&q=80",
        iconName: "Coffee",
        bgColor: "#FEF3C7",
        accentColor: "#B45309",
        description: "Counter-height and bar stools designed for cafes, kitchen islands, and social lounges."
    },
    {
        id: 12,
        name: "Accessories",
        title: "Accessories",
        image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=300&q=80",
        icon: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=300&q=80",
        iconName: "Sliders",
        bgColor: "#F1F5F9",
        accentColor: "#334155",
        description: "Curated home accents, desk items, and decorative accessories to elevate any room."
    }
];

const CategoryVersion1 = React.memo(({ items, onCategoryClick }) => (
    <div className="grid-cols-6 sm-grid-cols-3 mt-30 border-ec">
        {items.map((item, index) => {
            const isLastInRow = (index + 1) % 6 === 0;
            const isTopRow = index < 6;
            return (
                <div
                    key={item.id}
                    onClick={() => onCategoryClick(item)}
                    style={{
                        borderRight: isLastInRow ? 'none' : '1px solid #EBEBEB',
                        borderBottom: isTopRow ? '1px solid #EBEBEB' : 'none'
                    }}
                    className="p-25 sm-p-14 grid-cols-1 cursor-pointer"
                >
                    <Image
                        src={resolveImagePath(item.image || item.icon)}
                        alt={item.title || item.name}
                        width="100px"
                        height="100px"
                        className="rounded-full object-cover flex mx-auto"
                    />
                    <p className="small-text text-center text-dark font-500 mt-16">
                        {item.title || item.name}
                    </p>
                </div>
            );
        })}
    </div>
));

const CategoryVersion2 = React.memo(({ items, onCategoryClick }) => (
    <div className="grid-cols-6 sm-grid-cols-3 mt-30 gap-12">
        {items?.slice(0, 6)?.map((cat, idx) => (
            <div
                key={cat.id}
                className="px-12 py-16 border-ec rounded-10 cursor-pointer text-center"
                onClick={() => onCategoryClick(cat)}
            >
                <div className="relative">
                    <Image
                        src={resolveImagePath(cat.icon || cat.image)}
                        alt={cat.name || cat.title}
                        width="110"
                        height="110"
                        loading={idx < 3 ? "eager" : "lazy"}
                        fetchPriority={idx < 3 ? "high" : undefined}
                        className="flex object-cover rounded-full mx-auto"
                    />
                </div>
                <p className="text-dark font-500 small-text text-center mt-18">
                    {cat.name || cat.title}
                </p>
            </div>
        ))}
    </div>
));

const CategoryVersion3 = React.memo(({ items, onCategoryClick }) => (
    <>
        <style>{`
            .category-card {
                transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
            }
            .category-card:hover {
                transform: translateY(-2px);
            }
            .card-image-right {
                clip-path: polygon(18% 0, 100% 0, 100% 100%, 0% 100%);
                transition: clip-path 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .category-card:hover .card-image-right {
                clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
            }
        `}</style>
        <div className="grid-cols-3 sm-grid-cols-1 mt-30" style={{ gap: '20px' }}>
            {items?.slice(0, 6)?.map((cat) => (
                <div
                    key={cat.id}
                    className="category-card bg-forth rounded-5 overflow-hidden flex cursor-pointer relative"
                    onClick={() => onCategoryClick(cat)}
                >
                    <div className="w-50 sm-w-60 p-20">
                        <div>
                            <div
                                className="icon-lg rounded-5"
                                style={{ backgroundColor: cat.bgColor, color: cat.accentColor }}
                            >
                                <Icon name={cat.iconName} width="22" height="22" stroke={cat.accentColor} />
                            </div>
                            <h3 className="mid-text text-dark font-600 pt-8">{cat.name || cat.title}</h3>
                            <p className="text-gray mini-text line-clamp3 mt-4">
                                {cat.description}
                            </p>
                        </div>
                        <p className="mini-text font-500 mt-6 flex items-center gap-4" style={{ color: cat.accentColor }}>
                            Explore Products <Icon name="ArrowRight" width="13" height="13" stroke="currentColor" />
                        </p>
                    </div>

                    <div className="card-image-right w-50 sm-w-40 relative overflow-hidden rounded-5 h-200">
                        <Image
                            src={resolveImagePath(cat.icon || cat.image)}
                            alt={cat.name || cat.title}
                            className="card-image-element w-full h-full object-cover flex"
                            loading="lazy"
                        />
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: '60px',
                                height: '60px',
                                background: cat.accentColor,
                                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                                opacity: 0.85,
                                zIndex: 2
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    </>
));

const VERSION_COMPONENTS = {
    1: CategoryVersion1,
    2: CategoryVersion2,
    3: CategoryVersion3
};

const CategorySection = React.memo(() => {
    const navigate = useNavigate();
    const categoryVersion = configData?.Category?.[0]?.CategoryVersion ?? 1;

    const handleCategoryClick = useCallback((cat) => {
        const query = typeof cat === 'object' ? (cat.name || cat.title || cat.id) : cat;
        navigate(`/product?category=${encodeURIComponent(query)}`);
    }, [navigate]);

    const ActiveVersionComponent = VERSION_COMPONENTS[categoryVersion] || CategoryVersion1;

    return (
        <Container>
            <div className="w-full py-50">
                <Heading
                    version="v1"
                    tag="WHAT WE PROVIDE"
                    title="Expert Innovative And Deliver Exceptional For NOT Solution Now."
                />
                <ActiveVersionComponent items={categories} onCategoryClick={handleCategoryClick} />
            </div>
        </Container>
    );
});

export default CategorySection;
