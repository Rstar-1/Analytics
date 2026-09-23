import { useState, useCallback, useEffect, useMemo, memo } from "react";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Image from "../../components/common/Image";
import Modal from "../../components/common/Modal";
import Fields from "../../components/forms/Fields";

// Design Tokens
const LIME_ACCENT = "#bef264";
const DARK_BG = "#151b26";
const PURPLE_BORDER = "#8b5cf6";

// Initial Slide Dataset
const INITIAL_SLIDES = [
    {
        id: 1,
        type: "channels",
        companyName: "INRACLICK COMPANY",
        topTag: "Key Channels in",
        title: "DIGITAL MARKETING",
        channel1: "Search Engine Optimization (SEO)",
        channel2: "Pay-Per-Click Advertising (PPC)",
        channel3: "Content Marketing",
        channel4: "Social Media Marketing (SMM)",
        bgImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80",
    },
    {
        id: 2,
        type: "cover",
        companyName: "INRACLICK COMPANY",
        title: "DIGITAL",
        highlightTitle: "MARKETING",
        subtitle: "Data-driven Client Roadmap And Performance Insights",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
        bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    },
    {
        id: 3,
        type: "overview",
        companyName: "INRACLICK COMPANY",
        topTag: "What is",
        title: "EXECUTIVE OVERVIEW",
        focusLabel: "Focus",
        focusText: "Connecting target audiences through search, social, paid, and web channels.",
        goalLabel: "Goal",
        goalText: "Expand digital reach, boost engagement, and build organic authority.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
        bgImage: "",
    },
    {
        id: 4,
        type: "thankyou",
        companyName: "INRACLICK COMPANY",
        title: "THANK",
        highlightTitle: "YOU!",
        subtitle: "Let's connect and grow digitally!",
        telephone: "+91 8779030638",
        website: "www.inraclick.com",
        socialMedia: "@reallygreatsite",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        bgImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    },
];

const PRESET_PHOTOS = [
    { label: "Team Office", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" },
    { label: "Collaboration", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" },
    { label: "Analytics & Charts", url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80" },
    { label: "Executive Work", url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" },
    { label: "Modern Workplace", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" },
];

// Company Logo
const SlideLogo = memo(({ companyName }) => (
    <div className="flex items-center gap-10">
        <div className="flex items-end gap-3" style={{ height: "26px" }}>
            <span style={{ width: "5px", height: "13px", backgroundColor: LIME_ACCENT, borderRadius: "2px" }} />
            <span style={{ width: "5px", height: "19px", backgroundColor: LIME_ACCENT, borderRadius: "2px" }} />
            <div style={{ position: "relative", width: "5px", height: "25px", backgroundColor: LIME_ACCENT, borderRadius: "2px" }}>
                <Icon name="ArrowUpRight" width="15" height="15" stroke={LIME_ACCENT} strokeWidth="3.5" style={{ position: "absolute", top: "-11px", right: "-5px" }} />
            </div>
        </div>
        <span className="font-bold tracking-wider text-white" style={{ fontSize: "15px", letterSpacing: "1.2px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
            {companyName || "INRACLICK COMPANY"}
        </span>
    </div>
));
SlideLogo.displayName = "SlideLogo";

// Decorative SVG Wave
const WaveDecoration = memo(() => (
    <svg viewBox="0 0 500 500" className="absolute bottom-0 right-0 pointer-events-none" style={{ width: "48%", height: "88%", zIndex: 1 }} preserveAspectRatio="none">
        <path d="M 500 120 C 380 220 180 340 220 500 L 500 500 Z" fill={LIME_ACCENT} />
        <circle cx="380" cy="420" r="140" fill={LIME_ACCENT} />
    </svg>
));
WaveDecoration.displayName = "WaveDecoration";

// Reusable Circular Image Frame
const CirclePhoto = memo(({ src, alt = "Slide Photo" }) => (
    <div className="relative flex items-center justify-center" style={{ width: "clamp(260px, 32vw, 390px)", height: "clamp(260px, 32vw, 390px)", zIndex: 2, marginRight: "2%" }}>
        <div className="w-full h-full rounded-full overflow-hidden b-shadow" style={{ border: "6px solid #ffffff", boxShadow: "0 20px 45px rgba(0,0,0,0.5)" }}>
            <Image src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
    </div>
));
CirclePhoto.displayName = "CirclePhoto";

// Shared Slide Layout Wrapper
const SlideLayout = memo(({ slide, bgOverlay, children, extraDecor }) => {
    const bgStyle = slide.bgImage ? {
        backgroundImage: bgOverlay || `linear-gradient(90deg, rgba(21, 27, 38, 0.94) 0%, rgba(21, 27, 38, 0.85) 50%, rgba(21, 27, 38, 0.7) 100%), url(${slide.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    } : undefined;

    return (
        <div className="relative w-full h-full overflow-hidden flex flex-column justify-between p-40" style={{ backgroundColor: DARK_BG, ...bgStyle }}>
            {extraDecor}
            <div className="relative z-10"><SlideLogo companyName={slide.companyName} /></div>
            {children}
        </div>
    );
});
SlideLayout.displayName = "SlideLayout";

// Slide 1: Thank You
const SlideThankYou = memo(({ slide }) => (
    <SlideLayout
        slide={slide}
        extraDecor={<WaveDecoration />}
        bgOverlay={slide.bgImage ? `linear-gradient(90deg, rgba(21, 27, 38, 0.95) 0%, rgba(21, 27, 38, 0.88) 55%, rgba(21, 27, 38, 0.72) 100%), url(${slide.bgImage})` : undefined}
    >
        <div className="relative z-10 flex items-center justify-between mt-20">
            <div className="flex flex-column" style={{ maxWidth: "56%" }}>
                <h1 className="font-bold tracking-tight uppercase" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.8rem)", lineHeight: "1.05", margin: 0 }}>
                    <span className="text-white">{slide.title} </span>
                    <span style={{ color: LIME_ACCENT }}>{slide.highlightTitle}</span>
                </h1>
                <p className="italic mt-12 text-white font-300" style={{ fontSize: "clamp(1.1rem, 2vw, 1.45rem)" }}>{slide.subtitle}</p>
                <div className="flex flex-column gap-12 mt-36" style={{ maxWidth: "440px" }}>
                    {[["Telephone", slide.telephone], ["Website", slide.website], ["Social Media", slide.socialMedia]].map(([label, val]) => (
                        <div key={label} className="flex items-center text-white" style={{ fontSize: "16px" }}>
                            <span style={{ width: "130px", opacity: 0.9 }}>{label}</span>
                            <span className="font-bold mr-16">:</span>
                            <span style={{ fontWeight: "500" }}>{val}</span>
                        </div>
                    ))}
                </div>
            </div>
            <CirclePhoto src={slide.image} alt="Team" />
        </div>
    </SlideLayout>
));
SlideThankYou.displayName = "SlideThankYou";

// Slide 2: Digital Marketing Cover
const SlideCover = memo(({ slide }) => (
    <SlideLayout
        slide={slide}
        extraDecor={<WaveDecoration />}
        bgOverlay={slide.bgImage ? `linear-gradient(90deg, rgba(21, 27, 38, 0.94) 0%, rgba(21, 27, 38, 0.82) 50%, rgba(21, 27, 38, 0.65) 100%), url(${slide.bgImage})` : undefined}
    >
        <div className="relative z-10 flex items-center justify-between my-auto">
            <div className="flex flex-column" style={{ maxWidth: "56%" }}>
                <h1 className="font-bold tracking-tight uppercase flex flex-column" style={{ fontSize: "clamp(2.8rem, 6.2vw, 5.2rem)", lineHeight: "0.95", margin: 0 }}>
                    <span className="text-white">{slide.title}</span>
                    <span style={{ color: LIME_ACCENT, marginTop: "4px" }}>{slide.highlightTitle}</span>
                </h1>
                <p className="mt-28 text-white" style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)", lineHeight: "1.4", maxWidth: "460px" }}>{slide.subtitle}</p>
            </div>
            <CirclePhoto src={slide.image} alt="Marketing" />
        </div>
    </SlideLayout>
));
SlideCover.displayName = "SlideCover";

// Slide 3: Executive Overview
const SlideOverview = memo(({ slide }) => (
    <SlideLayout slide={slide} extraDecor={<div className="absolute top-0 right-0 h-full pointer-events-none" style={{ width: "22%", backgroundColor: LIME_ACCENT, zIndex: 1 }} />}>
        <div className="relative z-10 flex items-center justify-between my-auto">
            <div className="flex flex-column" style={{ maxWidth: "52%" }}>
                <span className="mb-8 text-white" style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)" }}>{slide.topTag}</span>
                <h1 className="font-bold uppercase tracking-tight mb-28" style={{ color: LIME_ACCENT, fontSize: "clamp(2rem, 4.2vw, 3.4rem)", lineHeight: "1.1", margin: "0 0 28px 0" }}>
                    {slide.title}
                </h1>
                {[[slide.focusLabel, slide.focusText], [slide.goalLabel, slide.goalText]].map(([lbl, txt], idx) => (
                    <div key={idx} className={idx === 0 ? "mb-20" : ""}>
                        <p className="text-white" style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)", lineHeight: "1.5", margin: 0 }}>
                            <strong style={{ color: LIME_ACCENT, fontWeight: "700" }}>{lbl} </strong>{txt}
                        </p>
                    </div>
                ))}
            </div>
            <div className="relative flex items-center justify-center" style={{ width: "clamp(280px, 36vw, 440px)", height: "clamp(220px, 28vw, 340px)", zIndex: 2, marginRight: "6%" }}>
                <div className="w-full h-full overflow-hidden b-shadow" style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}>
                    <Image src={slide.image} alt="Overview" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    </SlideLayout>
));
SlideOverview.displayName = "SlideOverview";

// Slide 4: Key Channels
const SlideChannels = memo(({ slide }) => (
    <SlideLayout slide={slide} bgOverlay={slide.bgImage ? `linear-gradient(rgba(21, 27, 38, 0.92), rgba(21, 27, 38, 0.92)), url(${slide.bgImage})` : undefined}>
        <div className="relative z-10">
            <p className="text-white headpara-text font-4000">{slide.topTag}</p>
            <h2 className="font-bold uppercase tracking-wide mt-8" style={{ color: LIME_ACCENT, fontSize: "clamp(1.8rem, 3.8vw, 2.8rem)", margin: 0, lineHeight: "1.1" }}>
                {slide.title}
            </h2>
        </div>
        <div className="relative gap-12 grid-cols-4">
            {["channel1", "channel2", "channel3", "channel4"].map((k, idx) => (
                <div key={k} className="flex items-center justify-center text-center p-20 rounded-6 b-shadow" style={{ backgroundColor: idx % 2 === 0 ? LIME_ACCENT : "#ffffff", minHeight: "160px" }}>
                    <span className="font-bold text-dark" style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", lineHeight: "1.4" }}>{slide[k]}</span>
                </div>
            ))}
        </div>
    </SlideLayout>
));
SlideChannels.displayName = "SlideChannels";

// Slide Content Router
const SLIDE_MAP = {
    thankyou: SlideThankYou,
    cover: SlideCover,
    overview: SlideOverview,
    channels: SlideChannels,
};

const SlideRenderer = memo(({ slide }) => {
    const Component = SLIDE_MAP[slide?.type];
    return Component ? <Component slide={slide} /> : null;
});
SlideRenderer.displayName = "SlideRenderer";

// Individual Slide Item in List
const SlideCard = memo(({ slide, index, total, onEdit }) => {
    const handleEdit = useCallback(() => onEdit(slide), [onEdit, slide]);
    const label = useMemo(() => `Slide ${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`, [index, total]);

    return (
        <div className="relative w-full rounded-12 overflow-hidden b-shadow border-ec" style={{ aspectRatio: "16 / 9", minHeight: "520px", boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)" }}>
            <div className="absolute top-0 right-0 m-12 z-20">
                <Button version="icon" icon="Edit" bg="white" color="dark" onClick={handleEdit} title="Edit this slide content" />
            </div>
            <div className="absolute top-0 left-0 z-10 py-4 px-15 bg-white">
                <p className="mini-text text-dark font-400">{label}</p>
            </div>
            <SlideRenderer slide={slide} />
        </div>
    );
});
SlideCard.displayName = "SlideCard";

// Subheading helper for Modal
const SectionHeader = memo(({ title }) => (
    <div className="bordb pt-8 pb-4">
        <span className="small-text font-600 text-dark">{title}</span>
    </div>
));
SectionHeader.displayName = "SectionHeader";

// Slide Edit Sidebar Modal
const SlideEditModal = memo(({ isOpen, onClose, slide, onChange, onSave }) => {
    const handlePreset = useCallback((url) => onChange("image", url), [onChange]);
    const footer = useMemo(() => (
        <div className="flex items-center justify-end gap-12 w-full">
            <Button version="v2" bg="tertiary" color="dark" text="Cancel" onClick={onClose} />
            <Button version="v2" bg="primary" color="white" icon="Check" text="Save Changes" onClick={onSave} />
        </div>
    ), [onClose, onSave]);

    if (!slide) return null;

    const fld = (key, label, placeholder = "", type = "text", rows) => (
        <Fields key={key} type={type} label={label} value={slide[key] || ""} onChange={(v) => onChange(key, v)} placeholder={placeholder} rows={rows} />
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} type="sidebar" placement="right" size="sm" title={`Edit Slide ${slide.id}: ${slide.title || slide.type}`} footer={footer}>
            <div className="flex flex-column gap-16 py-8">
                <div className="p-12 rounded-8" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                    <span className="mini-text text-gray font-500">Slide Type: </span>
                    <span className="mini-text font-bold text-primary uppercase">{slide.type}</span>
                </div>
                {fld("companyName", "Company Logo Name", "e.g. INRACLICK COMPANY")}
                {fld("title", "Main Title", "Primary Headline")}

                {(slide.type === "thankyou" || slide.type === "cover") && (
                    <>
                        {fld("highlightTitle", "Accent / Highlight Title (Lime Green)", "e.g. YOU! or MARKETING")}
                        {fld("subtitle", "Subtitle / Tagline", "e.g. Let's connect and grow digitally!")}
                    </>
                )}

                {slide.type === "thankyou" && (
                    <>
                        <SectionHeader title="Contact Information" />
                        {fld("telephone", "Telephone")}
                        {fld("website", "Website URL")}
                        {fld("socialMedia", "Social Media Handle")}
                    </>
                )}

                {slide.type === "overview" && (
                    <>
                        {fld("topTag", "Top Tag")}
                        <SectionHeader title="Overview Points" />
                        {fld("focusLabel", "Focus Point Heading")}
                        {fld("focusText", "Focus Point Description", "", "textarea", 2)}
                        {fld("goalLabel", "Goal Point Heading")}
                        {fld("goalText", "Goal Point Description", "", "textarea", 2)}
                    </>
                )}

                {slide.type === "channels" && (
                    <>
                        {fld("topTag", "Top Tag")}
                        <SectionHeader title="Marketing Channels" />
                        {fld("channel1", "Channel 1 (Lime Card)")}
                        {fld("channel2", "Channel 2 (White Card)")}
                        {fld("channel3", "Channel 3 (Lime Card)")}
                        {fld("channel4", "Channel 4 (White Card)")}
                    </>
                )}

                {slide.image !== undefined && (
                    <>
                        <SectionHeader title="Slide Photo" />
                        {fld("image", "Image URL")}
                        <div>
                            <span className="mini-text text-gray font-500 mb-6 block">Quick Presets:</span>
                            <div className="flex gap-8 flex-wrap">
                                {PRESET_PHOTOS.map((p) => (
                                    <button
                                        key={p.label}
                                        type="button"
                                        onClick={() => handlePreset(p.url)}
                                        className={`mini-text px-10 py-6 rounded-4 border-ec cursor-pointer ${slide.image === p.url ? "bg-primary text-white font-bold" : "bg-white text-dark hover:bg-light"}`}
                                        style={{ border: "1px solid #cbd5e1" }}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
});
SlideEditModal.displayName = "SlideEditModal";

// Main Slides Component
export default function Slide() {
    const [slides, setSlides] = useState(INITIAL_SLIDES);
    const [editingSlide, setEditingSlide] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [presentIndex, setPresentIndex] = useState(null);

    const handleOpenEdit = useCallback((slide) => {
        setEditingSlide({ ...slide });
        setIsModalOpen(true);
    }, []);

    const handleFieldChange = useCallback((field, val) => {
        setEditingSlide((prev) => (prev ? { ...prev, [field]: val } : null));
    }, []);

    const handleSaveEdit = useCallback(() => {
        if (!editingSlide) return;
        setSlides((prev) => prev.map((s) => (s.id === editingSlide.id ? { ...editingSlide } : s)));
        setIsModalOpen(false);
    }, [editingSlide]);

    const handleCloseEdit = useCallback(() => setIsModalOpen(false), []);

    const handleStartPresentation = useCallback((index = 0) => {
        setPresentIndex(index);
        const el = document.documentElement;
        (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
    }, []);

    const handlePresentFirst = useCallback(() => handleStartPresentation(0), [handleStartPresentation]);

    const handleExitPresentation = useCallback(() => {
        setPresentIndex(null);
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
        }
    }, []);

    const handlePrevPresentation = useCallback(() => {
        setPresentIndex((prev) => (prev === null || prev <= 0 ? slides.length - 1 : prev - 1));
    }, [slides.length]);

    const handleNextPresentation = useCallback(() => {
        setPresentIndex((prev) => (prev === null || prev >= slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const handleJumpPresentation = useCallback((i) => setPresentIndex(i), []);

    useEffect(() => {
        if (presentIndex === null) return;
        const onKeyDown = (e) => {
            if (["ArrowRight", " ", "PageDown"].includes(e.key)) handleNextPresentation();
            else if (["ArrowLeft", "PageUp"].includes(e.key)) handlePrevPresentation();
            else if (e.key === "Escape") handleExitPresentation();
        };
        const onFsChange = () => {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) setPresentIndex(null);
        };

        window.addEventListener("keydown", onKeyDown);
        document.addEventListener("fullscreenchange", onFsChange);
        document.addEventListener("webkitfullscreenchange", onFsChange);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("fullscreenchange", onFsChange);
            document.removeEventListener("webkitfullscreenchange", onFsChange);
        };
    }, [presentIndex, handleNextPresentation, handlePrevPresentation, handleExitPresentation]);

    const presentationFooter = useMemo(() => (
        <div className="flex items-center justify-between w-full px-12">
            <Button version="v2" bg="tertiary" color="dark" icon="ChevronLeft" text="Previous Slide" onClick={handlePrevPresentation} />
            <div className="flex items-center gap-8">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => handleJumpPresentation(i)}
                        className="cursor-pointer border-0"
                        style={{
                            width: presentIndex === i ? "24px" : "10px",
                            height: "10px",
                            borderRadius: "5px",
                            backgroundColor: presentIndex === i ? "#6366f1" : "#cbd5e1",
                            transition: "all 0.2s ease",
                        }}
                        title={`Jump to Slide ${i + 1}`}
                    />
                ))}
            </div>
            <Button version="v2" bg="primary" color="white" icon="ChevronRight" iconPosition="right" text="Next Slide" onClick={handleNextPresentation} />
        </div>
    ), [slides, presentIndex, handlePrevPresentation, handleNextPresentation, handleJumpPresentation]);

    const activeSlide = presentIndex !== null ? slides[presentIndex] : null;

    return (
        <Container>
            <div className="w-full h-550 overflow-auto">
                <div className="flex items-center gap-10 justify-end pb-12">
                    <Button version="v2" bg="primary" color="white" icon="Video" text="Present Slide Show" onClick={handlePresentFirst} />
                </div>

                <div className="grid-cols-1 gap-12 w-full">
                    {slides.map((slide, index) => (
                        <SlideCard key={slide.id} slide={slide} index={index} total={slides.length} onEdit={handleOpenEdit} />
                    ))}
                </div>

                <SlideEditModal isOpen={isModalOpen} onClose={handleCloseEdit} slide={editingSlide} onChange={handleFieldChange} onSave={handleSaveEdit} />

                <Modal
                    isOpen={presentIndex !== null}
                    onClose={handleExitPresentation}
                    size="fullscreen"
                    title={`INRACLICK PRESENTATION - Slide ${(presentIndex ?? 0) + 1} of ${slides.length}`}
                    footer={presentationFooter}
                >
                    {activeSlide && (
                        <div className="flex flex-column items-center justify-center w-full h-full py-12">
                            <div
                                className="w-full relative rounded-12 overflow-hidden b-shadow"
                                style={{ maxWidth: "1280px", aspectRatio: "16 / 9", maxHeight: "calc(100vh - 180px)", boxShadow: "0 25px 65px rgba(0,0,0,0.35)" }}
                            >
                                <SlideRenderer slide={activeSlide} />
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </Container>
    );
}
