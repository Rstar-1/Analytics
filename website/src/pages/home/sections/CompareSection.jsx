import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/common/Container";
import Image from "../../../components/common/Image";
import Icon from "../../../components/common/Icon";
import Button from "../../../components/common/Button";

import watchUltra from "../../../assets/watch-ultra.jpg";
import watchLuxe from "../../../assets/watch-luxe.jpg";
import watchActive from "../../../assets/watch-active.jpg";

const PRODUCTS = [
    {
        id: "timefit-ultra",
        name: "TimeFit Ultra",
        image: watchUltra,
        description: "Hecht and Colin describe employing a process similar...",
        aluminumCase: "44mm or 40mm",
        battery: "Up to 18 hours",
        screen: "S8 SiP",
        display: "Up to 1,000 nits",
    },
    {
        id: "timefit-luxe",
        name: "TimeFit Luxe",
        image: watchLuxe,
        description: "Inspired to create a chair where the back and arms are moulded...",
        aluminumCase: "46mm or 42mm",
        battery: "Up to 18 hours",
        screen: "S10 SiP",
        display: "Up to 2,000 nits",
    },
    {
        id: "pulsetrack-active",
        name: "PulseTrack Active",
        image: watchActive,
        description: "Inspired to create a chair where the back and arms are moulded...",
        aluminumCase: "49mm",
        battery: "Up to 36 hours",
        screen: "S9 SiP",
        display: "Up to 3,000 nits",
    },
];

const FEATURES = [
    { key: "description", label: "Description", icon: "FileText" },
    { key: "aluminumCase", label: "Aluminium Case", icon: "AluminiumCase" },
    { key: "battery", label: "Battery", icon: "Battery" },
    { key: "screen", label: "Screen", icon: "Screen" },
    { key: "display", label: "Display", icon: "Display" },
];

const CompareHeaderLead = React.memo(({ onLearnMore }) => (
    <div className="w-30 pr-26">
        <h2 className="head-text text-dark font-600 mt-4">Find Your Perfect Match</h2>
        <p className="small-text text-gray font-400 mt-6">
            We've handpicked our top models so you can compare features and pick the one that fits your lifestyle best.
        </p>
        <Button
            version="v2"
            text="Learn More"
            onClick={onLearnMore}
            bg="primary"
            color="white"
            className="mt-22 rounded-20"
        />
    </div>
));

CompareHeaderLead.displayName = "CompareHeaderLead";

const CompareProductHeader = React.memo(({ product, onShop }) => (
    <div className="grid-cols-1 gap-12 cursor-pointer" onClick={() => onShop(product.id)}>
        <Image
            src={product.image}
            alt={product.name}
            className="w-full h-300 rounded-5 object-cover flex"
        />
        <h3 className="small-text mt-3 font-600 text-center">{product.name}</h3>
    </div>
));

CompareProductHeader.displayName = "CompareProductHeader";

const CompareFeatureRow = React.memo(({ feature, products }) => (
    <div className="flex w-full bordh" style={{ minHeight: "70px" }}>
        <div className="flex items-center gap-12 w-30 bordr px-14">
            <Icon name={feature.icon} width="24" height="24" stroke="var(--dark)" />
            <p className="small-text font-600 text-dark">{feature.label}</p>
        </div>
        <div className="w-70 grid-cols-3 gap-12">
            {products.map((product, index) => (
                <div
                    key={product.id}
                    className={`flex items-center px-12 ${index < products.length - 1 ? "bordr" : ""}`}
                >
                    <p className="mini-text text-gray font-400">{product[feature.key] || "—"}</p>
                </div>
            ))}
        </div>
    </div>
));

CompareFeatureRow.displayName = "CompareFeatureRow";

const CompareSection = () => {
    const navigate = useNavigate();

    const handleLearnMore = useCallback(() => navigate("/products"), [navigate]);
    const handleShop = useCallback((id) => navigate(`/products?id=${id}`), [navigate]);

    return (
        <Container>
            <div className="py-50 w-full">
                <div className="flex items-center w-full">
                    <CompareHeaderLead onLearnMore={handleLearnMore} />
                    <div className="w-70 grid-cols-3 gap-12">
                        {PRODUCTS.map((product) => (
                            <CompareProductHeader
                                key={product.id}
                                product={product}
                                onShop={handleShop}
                            />
                        ))}
                    </div>
                </div>

                {FEATURES.map((feature) => (
                    <CompareFeatureRow
                        key={feature.key}
                        feature={feature}
                        products={PRODUCTS}
                    />
                ))}
            </div>
        </Container>
    );
};

CompareSection.displayName = "CompareSection";

export default React.memo(CompareSection);
