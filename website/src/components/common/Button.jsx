import React, { memo, useCallback, useMemo } from "react";
import Icon from "./Icon";

const VERSION_CLASSES = {
  v0: "px-16 py-4 sm-px-12 sm-py-4 mini-text",
  v1: "px-20 py-9 para-text",
  v2: "px-19 py-8 sm-px-10 sm-py-7 mini-text",
  v3: "w-full py-9 sm-py-12 mini-text",
  icon: "p-8",
  none: "",
};

const isColorCode = (str) =>
  typeof str === "string" && (str.startsWith("#") || str.startsWith("rgb"));

const Button = memo(
  ({
    text = "",
    children,
    version = "v1",
    bg = "primary",
    color = "white",
    border = "",
    className = "",
    style = {},
    onClick = () => {},
    type = "button",
    disabled = false,
    variant = "filled",
    icon = "",
    iconWidth = "16",
    iconHeight = "16",
    iconStrokeWidth = "2.5",
    iconPosition = "left",
    iconFill,
    iconStroke,
    ...props
  }) => {
    const isOutline = variant === "outline";
    const isHexBg = isColorCode(bg);
    const isHexColor = isColorCode(color);
    const isHexBorder = isColorCode(border);

    // Dynamic border class
    const borderClass = useMemo(() => {
      if (border === "none" || border === "0") return "border-0";
      if (border) return isHexBorder ? "" : `border-${border}`;
      if (isOutline) {
        if (!bg || bg === "none" || bg === "transparent") {
          if (color && color !== "white") return isHexColor ? "" : `border-${color}`;
          return "border-0";
        }
        return isHexBg ? "" : `border-${bg}`;
      }
      return "border-0";
    }, [border, isOutline, isHexBorder, isHexBg, bg, color, isHexColor]);

    // Dynamic background class
    const bgClass = useMemo(() => {
      if (isOutline) return "bg-transparent";
      return isHexBg ? "" : `bg-${bg}`;
    }, [isOutline, isHexBg, bg]);

    // Dynamic text color class
    const textClass = useMemo(() => {
      if (isOutline) {
        if (color && color !== "white") return isHexColor ? "" : `text-${color}`;
        if (border && border !== "none" && border !== "0") return isHexBorder ? "" : `text-${border}`;
        if (bg && bg !== "none" && bg !== "transparent") return isHexBg ? "" : `text-${bg}`;
        return "";
      }
      return isHexColor ? "" : `text-${color}`;
    }, [isOutline, color, border, isHexColor, isHexBorder, isHexBg, bg]);

    const versionClass = VERSION_CLASSES[version] || "w-full py-7 small-text";

    // Computed inline styles guaranteed to apply correctly across all browsers
    const computedStyle = useMemo(() => {
      const base = { ...style };
      if (disabled) base.cursor = "not-allowed";
      if (isHexBg && !isOutline) base.backgroundColor = bg;
      if (isHexColor) base.color = color;

      // Handle border explicitly
      if (border === "none" || border === "0") {
        base.border = "none";
      } else if (border === "transparent") {
        base.border = "1px solid transparent";
      } else if (border) {
        base.border = isHexBorder
          ? `1px solid ${border}`
          : `1px solid var(--${border}, currentColor)`;
      } else if (isOutline) {
        if (bg === "none") {
          base.border = "none";
        } else if (bg === "transparent") {
          base.border = "1px solid transparent";
        } else if (bg) {
          base.border = isHexBg
            ? `1px solid ${bg}`
            : `1px solid var(--${bg}, currentColor)`;
        } else {
          base.border = "none";
        }
      } else {
        base.border = "none";
      }

      // Handle outline text color fallback
      if (isOutline && color === "white") {
        const activeColor = (border && border !== "none" && border !== "0") ? border : (bg && bg !== "none" && bg !== "transparent" ? bg : "");
        if (activeColor) {
          if (isColorCode(activeColor)) {
            base.color = activeColor;
          } else {
            base.color = `var(--${activeColor}, currentColor)`;
          }
        }
      }

      return base;
    }, [style, disabled, isHexBg, isOutline, bg, isHexColor, color, border, isHexBorder]);

    const handleClick = useCallback(
      (e) => {
        if (disabled) return;
        onClick?.(e);
      },
      [disabled, onClick]
    );

    const defaultStroke = iconStroke || computedStyle.color || style.color || "currentColor";

    const iconElement = useMemo(() => {
      if (!icon) return null;
      return (
        <Icon
          name={icon}
          width={iconWidth}
          height={iconHeight}
          strokeWidth={iconStrokeWidth}
          stroke={defaultStroke}
          fill={iconFill}
        />
      );
    }, [icon, iconWidth, iconHeight, iconStrokeWidth, defaultStroke, iconFill]);

    const content = children || text;

    return (
      <button
        type={type}
        onClick={handleClick}
        disabled={disabled}
        className={`${versionClass} rounded-5 ${borderClass} ${bgClass} ${textClass} ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } ${className}`}
        style={computedStyle}
        {...props}
      >
        {icon ? (
          content ? (
            <span className="flex items-center justify-center gap-8 w-full">
              {iconPosition !== "right" && iconElement}
              <span>{content}</span>
              {iconPosition === "right" && iconElement}
            </span>
          ) : (
            iconElement
          )
        ) : (
          content
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;