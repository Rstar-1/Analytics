import React, { useState, useEffect } from 'react';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';

const topMarqueeData = [
    { text: "PREMIUM AUDIO SOLUTIONS", icon: "Sound" },
    { text: "2-YEAR EXTENDED WARRANTY", icon: "Shield" },
    { text: "GLOBAL EXPRESS DELIVERY", icon: "Box" },
    { text: "NEXT-GEN SOUND SYSTEMS", icon: "Sparkles" },
    { text: "CRAFTED PRECISION AUDIO", icon: "Star" }
];

const bottomMarqueeData = [
    "BANG & OLUFSEN",
    "BOSE HI-FI SOUND",
    "MASTER & DYNAMIC",
    "SENNHEISER STUDIO",
    "BOWERS & WILKINS",
    "SONY AUDIOPHILE"
];

const MarqueeSection = () => {
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        let frameId;
        const handleScroll = () => {
            frameId = requestAnimationFrame(() => {
                setScrollOffset(window.scrollY);
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(frameId);
        };
    }, []);

    const topList = [...topMarqueeData, ...topMarqueeData, ...topMarqueeData, ...topMarqueeData];
    const bottomList = [...bottomMarqueeData, ...bottomMarqueeData, ...bottomMarqueeData, ...bottomMarqueeData];

    const topShift = (scrollOffset * 0.08) % 50;
    const bottomShift = 50 - ((scrollOffset * 0.08) % 50);

    return (
        <Container version="v0">
            <div className="relative w-full py-30 overflow-hidden">
                <div
                    className="w-full py-24 flex items-center overflow-hidden bg-primary"
                    style={{ transform: 'rotate(-1.8deg)' }}
                >
                    <div
                        className="flex items-center gap-12"
                        style={{
                            transform: `translateX(-${topShift}%)`,
                            willChange: 'transform'
                        }}
                    >
                        {topList.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-12" style={{ minWidth: '320px' }}>
                                <Icon name={item.icon} width="20" height="20" className="text-white" />
                                <p className="para-text text-white font-600 uppercase">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="w-full py-30 flex items-center overflow-hidden bg-forth mt-12"
                    style={{ transform: 'rotate(1.5deg)' }}
                >
                    <div
                        className="flex items-center gap-12"
                        style={{
                            transform: `translateX(-${bottomShift}%)`,
                            willChange: 'transform'
                        }}
                    >
                        {bottomList.map((brand, idx) => (
                            <div key={idx} className="flex items-center gap-12" style={{ minWidth: '220px' }}>
                                <p className="para-text text-dark font-600 uppercase">
                                    {brand}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default MarqueeSection;
