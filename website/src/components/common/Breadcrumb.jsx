import React, { memo, useCallback } from "react";
import { NavLink } from "react-router-dom";
import Icon from "./Icon";

const Breadcrumb = memo(
  ({
    items = [],
    showIcon = true,
    separator = "ChevronRight",
    separatorIcon,
    color = "white",
    className = "",
    onItemClick,
  }) => {
    if (!items?.length) return null;

    const isDark = color === "dark" || className.includes("text-dark");
    const linkCls = isDark
      ? "text-gray hover:text-dark transition-colors cursor-pointer"
      : "text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer";
    const activeCls = isDark ? "text-dark font-500" : "text-white font-500";
    const sepCls = isDark ? "text-gray opacity-60" : "text-white opacity-60";

    const handleClick = useCallback(
      (item, e) => {
        item.onClick?.(item, e);
        onItemClick?.(item, e);
      },
      [onItemClick]
    );

    const renderSeparator = useCallback(
      (idx) => {
        const sep = separatorIcon || separator;
        const isIcon =
          sep === "ChevronRight" ||
          sep === "ArrowRight" ||
          (typeof sep === "string" && !["/", ">", "-", "•", "|"].includes(sep.trim()));

        return (
          <span key={`sep-${idx}`} className={`flex items-center mx-2 ${sepCls}`} aria-hidden="true">
            {isIcon ? (
              <Icon name={sep} width="12" height="12" stroke="currentColor" />
            ) : (
              <span>{sep}</span>
            )}
          </span>
        );
      },
      [separator, separatorIcon, sepCls]
    );

    return (
      <nav
        aria-label="breadcrumb"
        className={`flex items-center gap-8 w-full flex-wrap small-text ${className}`}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const hasIcon = Boolean(showIcon && item.icon);
          const targetPath = item.path || item.link || item.href;

          const itemContent = (
            <span className="flex items-center gap-6">
              {hasIcon && (
                typeof item.icon === "string" ? (
                  <Icon name={item.icon} width="14" height="14" className="flex-shrink-0" />
                ) : (
                  item.icon
                )
              )}
              <span>{item.label || item.title || item.name}</span>
            </span>
          );

          return (
            <React.Fragment key={item.id || idx}>
              {idx > 0 && renderSeparator(idx)}
              {!isLast && targetPath ? (
                <NavLink
                  to={targetPath}
                  className={linkCls}
                  onClick={(e) => handleClick(item, e)}
                >
                  {itemContent}
                </NavLink>
              ) : (
                <span
                  className={isLast ? activeCls : linkCls}
                  onClick={(e) => handleClick(item, e)}
                >
                  {itemContent}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

export default Breadcrumb;
