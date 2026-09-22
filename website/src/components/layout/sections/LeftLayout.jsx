import React from 'react';
import Icon from '../../common/Icon';
import Image from '../../common/Image';
import { resolveImagePath } from '../../../utils/imageResolver';

export const LeftBadgeVisual = React.memo(({ data }) => (
    <div className="relative">
        <div className="rounded-5 overflow-hidden h-500 sm-h-350 relative">
            <Image
                src={resolveImagePath(data?.images?.meeting || data?.badgeImage)}
                alt="Strategy Meeting"
                className="w-full h-full object-cover flex"
            />
        </div>
        <div
            className="absolute bottom-0 right-0 bg-white rounded-10 m-8 z-10"
            style={{ maxWidth: '280px' }}
        >
            <div className="p-15">
                <div className="flex items-center gap-12">
                    <div className="icon-lg rounded-full bg-light-primary flex items-center justify-center">
                        <Icon name="Award" width="20" height="20" stroke="var(--primary)" strokeWidth="2.5" />
                    </div>
                    <div>
                        <h5 className="mid-text font-700 text-dark">{data?.experienceYears || "30+"} Years</h5>
                        <p className="mini-text text-gray font-400">Proven Industry Authority</p>
                    </div>
                </div>
                <p className="mini-text text-gray text-muted mt-6 font-400 line-clamp2">
                    {data?.badgeDesc || "Trusted by leading enterprises worldwide for reliable, scalable technical solutions."}
                </p>
            </div>
        </div>
    </div>
));

export const LeftOverlayVisual = React.memo(({ data }) => (
    <div className="h-480 sm-h-350 rounded-10 overflow-hidden relative shadow-sm">
        <Image
            src={resolveImagePath(data?.images?.developer || data?.overlayImage)}
            alt="Digital Innovation"
            className="w-full h-full object-cover flex"
        />
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(15, 22, 35, 0.12) 6%, rgba(15, 22, 35, 1) 80%)',
                zIndex: 1
            }}
        />
        <div className="absolute bottom-0 left-0 w-full z-10">
            <div className="p-26">
                <h4 className="text-white title-text font-600 uppercase">
                    {data?.overlayTitle || "Engineering Scalable Products That Stand The Test Of Time"}
                </h4>
                <p className="text-white small-text text-muted font-400 mt-5">
                    {data?.overlaySubtitle || "Delivering mission-critical digital systems for leaders."}
                </p>
            </div>
        </div>
    </div>
));

export const LeftCollageVisual = React.memo(({ data, isStore = false }) => {
    const cards = isStore
        ? (Array.isArray(data?.storeCollageImages) ? data.storeCollageImages : [])
        : (Array.isArray(data?.officeCards) ? data.officeCards : []);

    return (
        <div>
            <div className="grid-cols-2 gap-12">
                <Image
                    className="w-full h-280 sm-h-150 rounded-10 object-cover flex"
                    src={cards[0]?.src}
                    alt={cards[0]?.alt || "Visual Showcase 1"}
                />
                <Image
                    className="w-full h-280 sm-h-150 rounded-10 object-cover flex"
                    src={cards[1]?.src}
                    alt={cards[1]?.alt || "Visual Showcase 2"}
                    style={cards[1]?.grayscale ? { filter: "grayscale(100%)" } : {}}
                />
            </div>
            <div className="mt-12">
                <Image
                    className="w-full h-190 sm-h-150 rounded-10 object-cover flex"
                    src={cards[2]?.src}
                    alt={cards[2]?.alt || "Visual Showcase 3"}
                />
            </div>
        </div>
    );
});

export const LEFT_VARIANTS = {
    1: LeftBadgeVisual,
    2: LeftOverlayVisual,
    3: LeftCollageVisual
};

const LeftLayout = React.memo(({ variant = 1, data, isStore = false, ...props }) => {
    const Component = LEFT_VARIANTS[variant] || LEFT_VARIANTS[1];
    return <Component data={data} isStore={isStore} {...props} />;
});

export default LeftLayout;