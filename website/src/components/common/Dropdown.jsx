import React, { useEffect, useRef, useCallback, memo, useMemo } from "react";

const ALIGN_STYLES = {
  left: { left: 0 },
  right: { right: 0 },
  center: { left: "50%", transform: "translateX(-50%)" },
  full: { left: 0, right: 0, width: "100%" },
};

const Dropdown = memo(({
  isOpen,
  onClose,
  triggerRef,
  children,
  className = "",
  style = {},
  align = "left",
  minWidth = "200px",
  padding = "0",
  items,
  ...props
}) => {
  const dropdownRef = useRef(null);

  const handleClickOutside = useCallback(
    (event) => {
      if (!dropdownRef.current) return;
      const target = event.target;
      const el = target?.nodeType === 3 ? target.parentElement : target;
      if (!el) return;

      if (dropdownRef.current.contains(el)) return;
      if (triggerRef?.current && triggerRef.current.contains(el)) return;
      if (
        dropdownRef.current.previousElementSibling &&
        dropdownRef.current.previousElementSibling.contains(el)
      ) {
        return;
      }

      onClose?.();
    },
    [onClose, triggerRef]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen || !onClose) return;

    document.addEventListener("pointerdown", handleClickOutside, true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handleClickOutside, handleKeyDown]);

  const computedStyle = useMemo(() => ({
    position: "absolute",
    top: "calc(100% + 4px)",
    zIndex: 1000,
    minWidth: align === "full" ? "100%" : minWidth,
    padding,
    borderRadius: "2px",
    border: "1px solid #e2e8f0",
    ...(ALIGN_STYLES[align] || ALIGN_STYLES.left),
    ...style,
  }), [align, minWidth, padding, style]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`bg-white ${className}`}
      style={computedStyle}
      {...props}
    >
      {items ? (
        <div className="grid-cols-1 gap-6">
          {items.map((item, idx) =>
            item.divider ? (
              <div key={idx} style={{ height: 1, backgroundColor: "#e2e8f0", margin: "4px 0" }} />
            ) : (
              <div
                key={idx}
                disabled={item.disabled}
                onClick={(e) => {
                  item.onClick?.(e);
                  onClose?.();
                }}
                className={`w-full text-left flex items-center gap-8 px-10 py-7 bordb ${item.danger ? "text-danger" : "text-dark"
                  } ${item.disabled ? "cursor-not-allowed" : ""}`}
              >
                {item.icon && <p className="text-gray mini-text font-400">{item.icon}</p>}
                <p className="text-gray mini-text font-400">{item.label}</p>
                {item.badge && (
                  <p className="text-gray mini-text font-400">
                    {item.badge}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      ) : (
        children
      )}
    </div>
  );
});

Dropdown.displayName = "Dropdown";

export default Dropdown;
