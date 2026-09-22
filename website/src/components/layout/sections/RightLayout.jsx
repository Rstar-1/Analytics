import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../common/Icon';
import Image from '../../common/Image';
import Button from '../../common/Button';
import { useCart } from '../../../context/CartContext';

export const RightOperationalGrid = React.memo(({ data }) => {
    const cards = Array.isArray(data?.operationalCards) ? data.operationalCards : [];
    return (
        <div>
            <h3 className="head-text text-dark font-600 uppercase">
                {data?.operationalTitle || "Transforming Operational Vision Digital Realities"}
            </h3>
            <p className="text-gray small-text font-400 mt-6 leading-relaxed">
                {data?.description}
            </p>
            <div className="grid-cols-2 sm-grid-cols-1 mt-20 gap-12">
                {cards.map((card, idx) => (
                    <div key={idx} className="p-14 rounded-5 border-ec bg-white">
                        <div className="icon-lg rounded-full bg-light-primary">
                            <Icon name={card.icon} width="16" height="16" stroke="var(--primary)" strokeWidth="2.5" />
                        </div>
                        <h4 className="mid-text font-600 text-dark mt-10">{card.title}</h4>
                        <p className="mini-text text-gray mt-2">{card.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
});

export const RightFeatureStack = React.memo(({ data }) => {
    const features = Array.isArray(data?.features) ? data.features : [];
    return (
        <div>
            <h4 className="text-dark head-text font-600 uppercase">
                {data?.experienceTagline}
            </h4>
            <p className="small-text text-gray font-400 mt-6 leading-relaxed">
                {data?.description}
            </p>
            <div className="grid-cols-1 gap-12 mt-16">
                {features.map((feat, idx) => (
                    <div
                        key={idx}
                        className="px-10 py-16 border-ec flex rounded-5 bg-white items-center gap-12"
                    >
                        <div className="w-10 flex justify-center">
                            <div className="icon-lg rounded-full bg-light-primary">
                                <Icon name={feat.icon} width="16" height="16" stroke={feat.accentColor} strokeWidth="2.5" />
                            </div>
                        </div>
                        <div className="w-90">
                            <h4 className="mid-text font-600 text-dark">{feat.title}</h4>
                            <p className="mini-text text-gray font-400 mt-2">
                                {feat.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export const RightPartnerFinance = React.memo(({ data }) => {
    const list = Array.isArray(data?.partnerFeatures)
        ? data.partnerFeatures
        : Array.isArray(data?.featureList)
        ? data.featureList
        : [];

    return (
        <div>
            <p className="bg-light-primary text-primary small-text px-16 py-5 font-500 rounded-5 w-max">About Us</p>
            <h2 className="head-text text-dark font-600 pt-16">
                {data?.financeTitle || "Know Your Trusted Partner in Business and Finance"}
            </h2>
            <p className="small-text text-gray font-400 mt-13 leading-relaxed">
                {data?.financeDesc || "We believe that every business deserves a strong financial foundation. With decades of experience in the industry, our team is dedicated to providing personalized, strategic financial solutions that help our clients thrive."}
            </p>
            <div className="grid-cols-1 gap-12 mt-19">
                {list.map((feature, idx) => (
                    <div key={idx} className="bg-tertiary p-18 rounded-5">
                        <div className="flex sm-grid-cols-1 items-center gap-12">
                            <div className="bg-primary flex items-center justify-center rounded-5 flex-shrink-0" style={{ width: '50px', height: '50px' }}>
                                <Icon name={feature.icon || "Check"} width="18" height="18" strokeWidth="2" stroke="white" />
                            </div>
                            <div className="w-80 sm-w-full ml-4 sm-ml-1">
                                <h4 className="mid-text text-dark font-600">{feature.title}</h4>
                                <p className="small-text text-gray font-400 mt-2">
                                    {feature.description || feature.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export const RightStoreCollection = React.memo(({ data, onShopClick }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const store = Array.isArray(data?.storeCollection) ? { items: data.storeCollection } : (data?.storeCollection || {});
    const items = Array.isArray(store?.items) ? store.items : Array.isArray(data?.items) ? data.items : [];

    const handleProductClick = (item) => {
        navigate(`/product/${item.id}`, { state: { product: item } });
    };

    return (
        <div>
            <div className="flex items-center gap-8 border-ec w-max px-14 py-4 rounded-20 bg-white shadow-xs">
                <Icon name="Settings" width="13" height="13" className="text-primary" />
                <span className="mini-text text-dark font-700 uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                    {store.tag || "Curated Store"}
                </span>
            </div>

            <h3 className="text-dark head-text font-700 mt-14 sm-mt-8 leading-snug">
                {store.title || "Delivering Innovative Furniture & Modern Living Spaces."}
            </h3>
            <p className="text-gray small-text font-400 mt-10 leading-relaxed">
                {store.description || "Explore curated handcrafted furniture pieces designed for durability, comfort, and timeless aesthetics for contemporary interiors."}
            </p>

            <div className="grid-cols-3 sm-grid-cols-2 gap-12 w-85 sm-w-full mt-20">
                {items.slice(0, 3).map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleProductClick(item)}
                        className="cursor-pointer relative"
                    >
                        <div className="h-150 overflow-hidden rounded-5 relative">
                            <Image
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover flex"
                            />
                            <Button
                                type="button"
                                version="icon"
                                bg="white"
                                color="dark"
                                title="Add to Cart"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart({
                                        id: item.id,
                                        name: item.name,
                                        category: item.category,
                                        price: item.price,
                                        image: item.image
                                    });
                                }}
                                className="absolute top-0 right-0 rounded-30 m-6"
                            >
                                <Icon name="Cart" width="11" height="11" stroke="var(--primary)" strokeWidth="2" />
                            </Button>
                        </div>
                        <div className="mt-10">
                            <h6 className="headmini-text font-600 text-dark">{item.name}</h6>
                            <p className="mini-text text-primary font-500">{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Button
                text="Shop Collection"
                version="v2"
                bg="dark"
                color="white"
                className="rounded-30 mt-22 cursor-pointer inline-flex items-center"
                onClick={onShopClick}
                icon="ArrowRight"
                iconPosition="right"
            />
        </div>
    );
});

export const RIGHT_VARIANTS = {
    1: RightOperationalGrid,
    2: RightFeatureStack,
    3: RightPartnerFinance,
    4: RightStoreCollection
};

const RightLayout = React.memo(({ variant = 1, data, onShopClick, ...props }) => {
    const Component = RIGHT_VARIANTS[variant] || RIGHT_VARIANTS[1];
    return <Component data={data} onShopClick={onShopClick} {...props} />;
});

export default RightLayout;