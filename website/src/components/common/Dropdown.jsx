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

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      onClose?.();
    }
  }, [onClose]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      onClose?.();
    }
  }, [onClose]);

  useEffect(() => {
    if (!isOpen || !onClose) return;

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handleClickOutside, handleKeyDown]);

  const computedStyle = useMemo(() => ({
    position: "absolute",
    top: "calc(100% + 4px)",
    zIndex: 1000,
    minWidth: align === "full" ? "100%" : minWidth,
    padding,
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.04)",
    borderRadius: "8px",
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
        <div className="flex flex-column gap-2 p-6">
          {items.map((item, idx) =>
            item.divider ? (
              <div key={idx} style={{ height: 1, backgroundColor: "#e2e8f0", margin: "4px 0" }} />
            ) : (
              <button
                key={idx}
                type="button"
                disabled={item.disabled}
                onClick={(e) => {
                  item.onClick?.(e);
                  onClose?.();
                }}
                className={`w-full text-left flex items-center gap-8 px-12 py-8 rounded-4 font-13 cursor-pointer transition-all border-none ${
                  item.danger ? "text-danger hover-bg-danger-light" : "text-dark hover-bg-light"
                } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                style={{ background: "transparent" }}
              >
                {item.icon && <span className="flex items-center">{item.icon}</span>}
                <span className="flex-grow">{item.label}</span>
                {item.badge && (
                  <span className="mini-badge bg-primary text-white px-6 py-2 rounded-10 font-10">
                    {item.badge}
                  </span>
                )}
              </button>
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
