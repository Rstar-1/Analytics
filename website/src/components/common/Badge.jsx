import React, { memo } from "react";
import Icon from "./Icon";

export const getBadgeTheme = (val) => {
    switch (String(val || "").trim().toLowerCase()) {
        // Red / Danger / Inactive / Critical / Admin
        case "danger": case "red": case "error":
        case "admin": case "administrator":
        case "inactive": case "failed": case "cancelled": case "rejected": case "expired": case "blocked": case "private":
        case "high": case "critical": case "urgent":
            return { bg: "#fee2e2", color: "#991b1b", border: "#fca5a5" };

        // Green / Success / Active / Approved / User
        case "success": case "green":
        case "user": case "member": case "public":
        case "active": case "completed": case "approved": case "published": case "verified": case "delivered":
        case "low":
            return { bg: "#dcfce3", color: "#166534", border: "#86efac" };

        // Amber / Warning / Pending / Review
        case "warning": case "amber": case "yellow":
        case "pending": case "processing": case "paused": case "review": case "refunded":
        case "medium":
            return { bg: "#fef3c7", color: "#b45309", border: "#fcd34d" };

        // Blue / Primary / Manager / Enterprise
        case "primary": case "blue":
        case "manager": case "enterprise":
            return { bg: "#eff6ff", color: "#1f5ac0", border: "#bfdbfe" };

        // Cyan / Info / Staff
        case "info": case "cyan": case "staff":
            return { bg: "#e0f2fe", color: "#0369a1", border: "#7dd3fc" };

        // Purple / Vendor / Partner / Premium
        case "purple": case "violet": case "indigo":
        case "vendor": case "partner": case "premium":
            return { bg: "#ede9fe", color: "#5b21b6", border: "#c4b5fd" };

        // Dark / Black
        case "dark": case "black":
            return { bg: "#f4f4f5", color: "#18181b", border: "#d4d4d8" };

        // Forth / Neutral Background
        case "forth":
            return { bg: "var(--forth, #fafafa)", color: "var(--gray, #585a63)", border: "transparent" };

        // White
        case "white":
            return { bg: "#ffffff", color: "#0f1623", border: "#e2e8f0" };

        // Secondary / Gray / Default
        case "secondary": case "gray": case "standard": default:
            return { bg: "#f1f5f9", color: "#475569", border: "#cbd5e1" };
    }
};

export const getShapeClass = (shape) => {
    switch (shape) {
        case "rounded": case "rect": case "tag":
            return "rounded-5";
        case "square":
            return "rounded-0";
        case "circle":
            return "rounded-full";
        case "pill": default:
            return "rounded-20";
    }
};

export const getSizeClass = (size) => {
    switch (size) {
        case "sm": case "mini":
            return "px-10 py-5 mini-text";
        case "lg": case "large":
            return "px-17 py-6 small-text";
        case "md": default:
            return "px-16 py-7 mini-text";
    }
};

// Backward compatibility proxies
export const BADGE_THEMES = new Proxy({}, { get: (_, prop) => getBadgeTheme(prop) });
export const BADGE_MAP = new Proxy({}, { get: (_, prop) => getBadgeTheme(prop) });
export const getColorTheme = getBadgeTheme;

const isColorCode = (str) => typeof str === "string" && (str.startsWith("#") || str.startsWith("rgb"));

export const Badge = memo(({
    text = "",
    children,
    color,
    theme,
    bg,
    textColor,
    borderColor,
    shape = "pill",
    variant = "filled",
    size = "md",
    icon,
    iconPosition = "left",
    iconSize = 12,
    iconStrokeWidth = "2.5",
    dot,
    capitalize = true,
    className = "",
    style = {},
    onClick,
    onRemove,
    ...props
}) => {
    const label = text || children;
    const resolvedTheme = getBadgeTheme(color || theme || label);
    const effectiveVariant = (dot || variant === "status" || variant === "dot") ? "status" : variant;
    const sizeClass = getSizeClass(size);
    const shapeClass = getShapeClass(shape);

    switch (effectiveVariant) {
        case "status": {
            const dotColor = typeof dot === "string" ? dot : (textColor || resolvedTheme.color);
            const statusTextColor = textColor || resolvedTheme.color;
            return (
                <div
                    onClick={onClick}
                    className={`inline-flex items-center gap-6 ${onClick ? "cursor-pointer hover:opacity-85" : ""} ${className}`}
                    style={style}
                    {...props}
                >
                    <span
                        style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: dotColor,
                            boxShadow: `0 0 6px ${dotColor}`,
                            flexShrink: 0,
                        }}
                    />
                    <p
                        className={`${capitalize ? "capitalize" : ""} ${sizeClass} font-500`}
                        style={{ color: statusTextColor, padding: 0, margin: 0 }}
                    >
                        {label}
                    </p>
                </div>
            );
        }

        case "outline":
        case "filled":
        default: {
            const isOutline = effectiveVariant === "outline";
            const finalBg = bg || (isOutline ? "transparent" : resolvedTheme.bg);
            const finalColor = textColor || resolvedTheme.color;
            const finalBorder = borderColor || (isOutline ? (resolvedTheme.border || finalColor) : "transparent");

            const bgClass = !isColorCode(finalBg) && String(finalBg).startsWith("bg-") ? finalBg : "";
            const textClass = !isColorCode(finalColor) && String(finalColor).startsWith("text-") ? finalColor : "";

            const inlineStyle = {
                display: "inline-flex",
                alignItems: "center",
                gap: icon ? 6 : 4,
                backgroundColor: bgClass ? undefined : finalBg,
                color: textClass ? undefined : finalColor,
                border: finalBorder !== "transparent" ? `1px solid ${finalBorder}` : undefined,
                lineHeight: 1,
                ...style,
            };

            return (
                <p
                    onClick={onClick}
                    className={`${shapeClass} ${sizeClass} ${bgClass} ${textClass} ${capitalize ? "capitalize" : ""} font-500 ${onClick ? "cursor-pointer hover:opacity-90" : ""} ${className}`}
                    style={inlineStyle}
                    {...props}
                >
                    {icon && iconPosition === "left" && (
                        <Icon name={icon} width={iconSize} height={iconSize} strokeWidth={iconStrokeWidth} stroke="currentColor" />
                    )}
                    <span>{label}</span>
                    {icon && iconPosition === "right" && (
                        <Icon name={icon} width={iconSize} height={iconSize} strokeWidth={iconStrokeWidth} stroke="currentColor" />
                    )}
                    {onRemove && (
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(e);
                            }}
                            className="cursor-pointer flex items-center ml-2 hover:opacity-75"
                            title="Remove"
                        >
                            <Icon name="Close" width={10} height={10} strokeWidth="2.5" stroke="currentColor" />
                        </span>
                    )}
                </p>
            );
        }
    }
});
Badge.displayName = "Badge";

export const BadgeList = memo(({
    items = [],
    color = "primary",
    shape = "rounded",
    size = "md",
    gap = 4,
    className = "",
    renderItem,
    onItemClick,
    ...props
}) => {
    const list = Array.isArray(items) ? items : [];
    if (!list.length) return null;

    return (
        <div className={`flex items-center gap-${gap} flex-wrap ${className}`} {...props}>
            {list.map((item, idx) => {
                if (renderItem) return renderItem(item, idx);
                const label = typeof item === "object" && item !== null ? item.label || item.name || item.text : item;
                const itemColor = typeof item === "object" && item !== null ? item.color || color : color;
                const itemShape = typeof item === "object" && item !== null ? item.shape || shape : shape;
                const itemIcon = typeof item === "object" && item !== null ? item.icon : undefined;

                return (
                    <Badge
                        key={idx}
                        text={label}
                        color={itemColor}
                        shape={itemShape}
                        size={size}
                        icon={itemIcon}
                        onClick={onItemClick ? () => onItemClick(item, idx) : undefined}
                    />
                );
            })}
        </div>
    );
});
BadgeList.displayName = "BadgeList";

export default Badge;
