import React, { memo, useMemo, useCallback } from "react";
import Icon from "./Icon";

const TabItem = memo(
  ({ name, count, icon, active, isV2, isV3, value, onSelect }) => {
    const handleClick = useCallback(() => {
      onSelect?.(value);
    }, [onSelect, value]);

    const renderIcon = () => {
      if (!icon) return null;
      return typeof icon === "string" ? (
        <Icon name={icon} width="14" height="14" className="flex-shrink-0" />
      ) : (
        <span className="flex items-center justify-center flex-shrink-0">{icon}</span>
      );
    };

    let itemCls = "";
    let itemStyle = {};

    if (isV2) {
      itemCls = `px-18 py-6 rounded-20 cursor-pointer flex items-center gap-8 small-text ${active
        ? "bg-primary text-white font-500"
        : "text-gray font-500"
        }`;
    } else if (isV3) {
      itemCls = `px-16 py-6 rounded-5 cursor-pointer flex items-center gap-8 small-text ${active
        ? "bg-primary text-white font-500"
        : "text-gray font-500"
        }`;
    } else {
      itemCls = `px-16 py-8 cursor-pointer flex items-center gap-6 small-text ${active
        ? "text-primary font-600 bg-light-primary"
        : "text-gray font-500"
        }`;
      itemStyle = {
        borderBottom: active ? "3px solid var(--primary)" : "",
        marginBottom: "-1px",
      };
    }

    return (
      <div
        className={itemCls}
        onClick={handleClick}
        style={itemStyle}
      >
        {renderIcon()}
        <p>{name}</p>

        {count != null && (
          <p
            className={`rounded-20 mini-text px-8 py-2 font-500 ${active
              ? isV2 || isV3
                ? "bg-white text-primary"
                : "bg-primary text-white"
              : "bg-tertiary text-gray"
              }`}
            style={
              active && (isV2 || isV3)
                ? { backgroundColor: "rgba(255, 255, 255, 0.25)", color: "#ffffff" }
                : undefined
            }
          >
            {count}
          </p>
        )}
      </div>
    );
  }
);

TabItem.displayName = "TabItem";

const Tab = memo(
  ({
    tabs = [],
    activeTab,
    onChange,
    version = "v1",
    className = "",
    style = {},
  }) => {
    const isV2 = String(version).includes("2");
    const isV3 = String(version).includes("3");

    const normalizedTabs = useMemo(
      () =>
        tabs.map((tab) => {
          const isObj = typeof tab === "object" && tab !== null;
          return {
            name: isObj ? tab.name || tab.label : tab,
            count: isObj ? tab.count : null,
            icon: isObj ? tab.icon : null,
            value: isObj ? tab.value ?? tab.name ?? tab.label : tab,
          };
        }),
      [tabs]
    );

    const handleSelect = useCallback(
      (val) => {
        onChange?.(val);
      },
      [onChange]
    );

    const containerCls = isV2
      ? "gap-6 p-4 rounded-30 bg-forth w-max max-w-full"
      : isV3
        ? "gap-8 w-full max-w-full"
        : "bordb gap-8 w-full";

    return (
      <div
        className={`flex items-center ${containerCls} ${className}`}
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          ...style,
        }}
      >
        {normalizedTabs.map((tab) => (
          <TabItem
            key={tab.value}
            {...tab}
            isV2={isV2}
            isV3={isV3}
            active={activeTab === tab.value}
            onSelect={handleSelect}
          />
        ))}
      </div>
    );
  }
);

Tab.displayName = "Tab";

export default Tab;