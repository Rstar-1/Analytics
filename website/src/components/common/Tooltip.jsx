import React, { memo, useState, useCallback, useMemo } from "react";

const POSITIONS = {
    top: {
        bottom: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
    },
    bottom: {
        top: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
    },
    left: {
        right: "calc(100% + 8px)",
        top: "50%",
        transform: "translateY(-50%)",
    },
    right: {
        left: "calc(100% + 8px)",
        top: "50%",
        transform: "translateY(-50%)",
    },
};

const THEME_STYLES = {
    dark: { bg: "#1e293b", color: "#ffffff", border: "transparent" },
    light: { bg: "#ffffff", color: "#0f172a", border: "#e2e8f0" },
    primary: { bg: "var(--primary, #1e74db)", color: "#ffffff", border: "transparent" },
    success: { bg: "var(--success, #10b981)", color: "#ffffff", border: "transparent" },
    danger: { bg: "var(--danger, #ef4444)", color: "#ffffff", border: "transparent" },
};

export const TOOLTIP_POSITIONS = [
    { label: "Top Position", value: "top" },
    { label: "Bottom Position", value: "bottom" },
    { label: "Left Position", value: "left" },
    { label: "Right Position", value: "right" },
];

export const TOOLTIP_THEMES = [
    { label: "Dark Slate", value: "dark" },
    { label: "Light Bordered", value: "light" },
    { label: "Primary Blue", value: "primary" },
    { label: "Success Green", value: "success" },
    { label: "Danger Red", value: "danger" },
];

const Tooltip = memo(({
    children,
    text,
    position = "top",
    theme = "dark",
    disabled = false,
    className = "",
    style = {},
}) => {
    const [show, setShow] = useState(false);

    const handleEnter = useCallback(() => {
        if (!disabled && text) setShow(true);
    }, [disabled, text]);

    const handleLeave = useCallback(() => {
        setShow(false);
    }, []);

    const activeTheme = THEME_STYLES[theme] || THEME_STYLES.dark;

    const tooltipStyle = useMemo(() => ({
        position: "absolute",
        zIndex: 999,
        padding: "6px 10px",
        background: activeTheme.bg,
        color: activeTheme.color,
        border: `1px solid ${activeTheme.border}`,
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "500",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        animation: "modalFadeIn 0.15s ease-out",
        ...(POSITIONS[position] || POSITIONS.top),
        ...style,
    }), [activeTheme, position, style]);

    if (disabled || !text) return children;

    return (
        <div
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className={`relative inline-flex ${className}`}
        >
            {children}

            {show && (
                <span style={tooltipStyle}>
                    {text}
                </span>
            )}
        </div>
    );
});

Tooltip.displayName = "Tooltip";

export default Tooltip;