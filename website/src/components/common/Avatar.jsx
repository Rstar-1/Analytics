import React, { memo, useState, useCallback, useMemo } from "react";
import Image from "./Image";
import Icon from "./Icon";

const STATUS_COLORS = {
  online: "#10b981",
  busy: "#ef4444",
  away: "#f59e0b",
  offline: "#94a3b8",
};

export const Avatar = memo(
  ({
    src,
    alt = "Avatar",
    name,
    size = 48,
    shape = "circle",
    status,
    borderColor = "var(--primary, #1e74db)",
    borderWidth = 0,
    className = "",
    style = {},
    onClick,
    ...props
  }) => {
    const [hasError, setHasError] = useState(false);

    const handleError = useCallback(() => {
      setHasError(true);
    }, []);

    const handleClick = useCallback(
      (e) => {
        onClick?.(e);
      },
      [onClick]
    );

    const initials = useMemo(() => {
      const source = name || alt;
      if (!source || source === "Avatar") return "";
      const parts = source.trim().split(/\s+/);
      return parts.length > 1
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : parts[0].slice(0, 2).toUpperCase();
    }, [name, alt]);

    const borderRadius = shape === "circle" ? "50%" : shape === "square" ? "0px" : "8px";
    const statusColor = status && (STATUS_COLORS[status] || status);
    const dotSize = Math.max(8, Math.round(size * 0.26));

    return (
      <div
        onClick={handleClick}
        className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${
          onClick ? "cursor-pointer hover:opacity-90 transition-opacity" : ""
        } ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius,
          border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
          backgroundColor: !src || hasError ? "var(--light-primary, #eef5ff)" : "transparent",
          color: "var(--primary, #1e74db)",
          ...style,
        }}
        {...props}
      >
        {src && !hasError ? (
          <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            onError={handleError}
            className="w-full h-full object-cover"
            style={{ borderRadius, objectFit: "cover" }}
          />
        ) : initials ? (
          <span
            className="font-600 uppercase"
            style={{ fontSize: `${Math.max(10, Math.round(size * 0.38))}px` }}
          >
            {initials}
          </span>
        ) : (
          <Icon
            name="User"
            width={Math.round(size * 0.5)}
            height={Math.round(size * 0.5)}
            stroke="currentColor"
          />
        )}

        {statusColor && status !== "none" && (
          <span
            className="absolute rounded-full"
            style={{
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              backgroundColor: statusColor,
              border: "2px solid #ffffff",
              bottom: 0,
              right: 0,
              zIndex: 2,
            }}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export const AvatarGroup = memo(
  ({
    avatars = [],
    max,
    badgeText,
    size = 42,
    overlap = 10,
    className = "",
    style = {},
    onClick,
  }) => {
    const margin = typeof overlap === "number" ? (overlap > 0 ? -overlap : overlap) : -10;
    const visibleAvatars = typeof max === "number" && max > 0 ? avatars.slice(0, max) : avatars;
    const remainingCount = avatars.length - visibleAvatars.length;
    const displayBadge = badgeText || (remainingCount > 0 ? `+${remainingCount}` : null);

    const handleGroupClick = useCallback(
      (e) => {
        onClick?.(e);
      },
      [onClick]
    );

    return (
      <div
        onClick={handleGroupClick}
        className={`flex items-center ${onClick ? "cursor-pointer" : ""} ${className}`}
        style={style}
      >
        {visibleAvatars.map((avatar, idx) => {
          const src = typeof avatar === "string" ? avatar : avatar?.src;
          const alt = typeof avatar === "string" ? `User ${idx + 1}` : avatar?.alt || `User ${idx + 1}`;

          return (
            <Avatar
              key={idx}
              src={src}
              alt={alt}
              size={size}
              borderWidth={2}
              borderColor="#ffffff"
              style={{
                marginLeft: idx > 0 ? `${margin}px` : 0,
                zIndex: idx + 1,
              }}
            />
          );
        })}

        {displayBadge && (
          <div
            className="rounded-full flex items-center justify-center font-700 select-none flex-shrink-0"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              marginLeft: `${margin}px`,
              backgroundColor: "var(--light-primary, #eef5ff)",
              color: "var(--primary, #1e74db)",
              fontSize: `${Math.max(11, Math.round(size * 0.32))}px`,
              border: "2px solid #ffffff",
              zIndex: visibleAvatars.length + 1,
            }}
          >
            {displayBadge}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export default Avatar;
