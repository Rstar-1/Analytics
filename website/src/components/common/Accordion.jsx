import React, { useState, useEffect, useCallback, useRef, memo } from "react";

export const AccordionItem = memo(
  ({
    id,
    idx = 0,
    item = {},
    isOpen = false,
    onToggle,
    version = "v1",
    itemClassName = "",
    children,
  }) => {
    const isV2 = String(version || item?.version || "").toLowerCase().includes("2");
    const title = item?.title || item?.question || "";
    const body = children ?? item?.children ?? item?.content ?? item?.answer ?? "";
    const numStr = String(idx + 1).padStart(2, "0");

    const handleClick = useCallback(() => {
      onToggle?.(id);
    }, [onToggle, id]);

    return (
      <div className={`bordb py-18 ${itemClassName}`}>
        <div className="cursor-pointer" onClick={handleClick}>
          <div className="flex items-center w-full">
            {!isV2 && (
              <div className="w-5">
                <p className="rounded-full font-500 small-text text-dark icon-lg border-ec">
                  {numStr}
                </p>
              </div>
            )}
            <div className={`flex justify-between items-center ${isV2 ? "w-full" : "w-95"}`}>
              <h3 className="text-dark mid-text font-500">{title}</h3>
              <p
                style={{
                  fontSize: isOpen ? "28px" : "22px",
                  fontWeight: "400",
                  lineHeight: "1",
                  color: isOpen ? "var(--warningtext)" : "var(--dark)",
                  userSelect: "none",
                  transition: "color 0.2s ease",
                }}
              >
                {isOpen ? "−" : "+"}
              </p>
            </div>
          </div>

          <div
            style={{
              maxHeight: isOpen ? "300px" : "0px",
              opacity: isOpen ? 1 : 0,
              overflow: "hidden",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="p-15">
              {typeof body === "string" ? (
                <p className="font-400 small-text text-gray">{body}</p>
              ) : (
                body
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

const Accordion = memo(
  ({
    items = [],
    allowMultiple = false,
    version = "v1",
    className = "",
    itemClassName = "",
    defaultOpenIndex,
    defaultOpenId,
    defaultOpenIds,
    children,
  }) => {
    const isMulti = Boolean(allowMultiple === true || allowMultiple === "true");

    const getInitialOpenIds = useCallback(() => {
      if (defaultOpenIds && Array.isArray(defaultOpenIds)) return defaultOpenIds;
      if (defaultOpenId !== undefined) return [defaultOpenId];
      if (typeof defaultOpenIndex === "number" && items && items.length > 0) {
        const idx = Math.max(0, Math.min(items.length - 1, defaultOpenIndex));
        const item = items[idx];
        return [item?.id !== undefined ? item.id : idx];
      }
      if (items && items.length > 0) {
        const fromItems = items
          .filter((item) => item?.defaultOpen || item?.isOpen)
          .map((item, idx) => (item.id !== undefined ? item.id : idx));
        if (fromItems.length > 0) {
          return isMulti ? fromItems : [fromItems[0]];
        }
      }
      if (children) {
        const childArr = React.Children.toArray(children).filter(React.isValidElement);
        if (typeof defaultOpenIndex === "number" && childArr.length > 0) {
          const idx = Math.max(0, Math.min(childArr.length - 1, defaultOpenIndex));
          const child = childArr[idx];
          return [child?.props?.id !== undefined ? child.props.id : idx];
        }
        const fromChildren = childArr
          .filter((c) => c?.props?.defaultOpen || c?.props?.isOpen)
          .map((c, idx) => (c?.props?.id !== undefined ? c.props.id : idx));
        if (fromChildren.length > 0) {
          return isMulti ? fromChildren : [fromChildren[0]];
        }
      }
      return [];
    }, [defaultOpenIds, defaultOpenId, defaultOpenIndex, items, children, isMulti]);

    const [openIds, setOpenIds] = useState(getInitialOpenIds);
    const hasInitializedRef = useRef(false);

    useEffect(() => {
      if (!hasInitializedRef.current && items && items.length > 0) {
        hasInitializedRef.current = true;
        const initial = getInitialOpenIds();
        if (initial.length > 0) {
          setOpenIds(initial);
        }
      }
    }, [items, getInitialOpenIds]);

    // Keep openIds valid if switching dynamically between multi and single
    useEffect(() => {
      if (!isMulti) {
        setOpenIds((prev) => (prev.length > 1 ? [prev[prev.length - 1]] : prev));
      }
    }, [isMulti]);

    const toggleItem = useCallback(
      (id) => {
        setOpenIds((prev) => {
          const isOpen = prev.includes(id);
          if (isMulti) {
            return isOpen ? prev.filter((itemId) => itemId !== id) : [...prev, id];
          } else {
            return isOpen ? [] : [id];
          }
        });
      },
      [isMulti]
    );

    const isItemOpen = useCallback(
      (id) => {
        return openIds.includes(id);
      },
      [openIds]
    );

    if (children && (!items || items.length === 0)) {
      return (
        <div className={`grid-cols-1 ${className}`}>
          {React.Children.map(children, (child, idx) => {
            if (!React.isValidElement(child)) return child;
            const id = child.props.id !== undefined ? child.props.id : idx;
            return React.cloneElement(child, {
              id,
              idx,
              version: child.props.version || version,
              isOpen: child.props.isOpen !== undefined ? child.props.isOpen : isItemOpen(id),
              onToggle: child.props.onToggle || toggleItem,
            });
          })}
        </div>
      );
    }

    return (
      <div className={`grid-cols-1 ${className}`}>
        {items.map((item, idx) => {
          const id = item.id !== undefined ? item.id : idx;
          return (
            <AccordionItem
              key={id}
              id={id}
              idx={idx}
              item={item}
              version={item.version || version}
              isOpen={isItemOpen(id)}
              onToggle={toggleItem}
              itemClassName={itemClassName}
            />
          );
        })}
      </div>
    );
  }
);

Accordion.displayName = "Accordion";

export default Accordion;
