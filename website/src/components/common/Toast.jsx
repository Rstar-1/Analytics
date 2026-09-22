import React, { memo, useCallback, useEffect, useState } from "react";
import Icon from "./Icon";
import Button from "./Button";

export const TYPES = {
  success: { color: "var(--success)", title: "Success", icon: "Check" },
  error: { color: "var(--danger)", title: "Error", icon: "Close" },
  info: { color: "var(--info)", title: "Info", icon: "i" },
  warning: { color: "var(--warning)", title: "Warning", icon: "!" },
};

const getType = (type) => TYPES[type] || (type === "danger" ? TYPES.error : TYPES.success);

export const Toast = memo(
  ({
    type = "success",
    title,
    message,
    onClose,
    className = "",
    style = {},
  }) => {
    const config = getType(type);

    const handleClose = useCallback(
      (e) => {
        e?.stopPropagation();
        onClose?.();
      },
      [onClose]
    );

    return (
      <div
        className={`toast-in bg-white rounded-5 relative b-shadow mb-8 ${className}`}
        style={{
          minWidth: 300,
          borderLeft: `6px solid ${config.color}`,
          ...style,
        }}
      >
        <div className="flex items-center gap-12 p-14">
          <div
            className="rounded-full icon-lg"
            style={{ background: config.color }}
          >
            {["Check", "Close"].includes(config.icon) ? (
              <Icon
                name={config.icon}
                width={config.icon === "Check" ? 18 : 16}
                height={config.icon === "Check" ? 18 : 16}
                stroke="#fff"
                strokeWidth="3.5"
              />
            ) : (
              <p
                className="font-500 text-white small-text"
              >
                {config.icon}
              </p>
            )}
          </div>

          <div className="">
            <h4 className="font-600 headmini-text text-dark line-clamp1">
              {title || config.title}
            </h4>

            {message && (
              <p className="text-gray mini-text">
                {message}
              </p>
            )}
          </div>

          {onClose && (
            <Button
              version="icon"
              bg="transparent"
              icon="Close"
              iconWidth="15"
              iconHeight="15"
              iconStrokeWidth="2"
              color="danger"
              onClick={handleClose}
              title="Close"
              className='absolute top-0 right-0 m-2'
            />
          )}
        </div>
      </div>
    );
  }
);

Toast.displayName = "Toast"

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = ({ detail }) => {
      const id = Date.now() + Math.random();

      setToasts((prev) => [...prev, { ...detail, id }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, detail.duration ?? 3200);
    };

    window.addEventListener("toast", handleToast);

    return () => window.removeEventListener("toast", handleToast);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <div
      className="fixed z-999"
      style={{
        right: 24,
        bottom: 24,
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-in">
          <Toast
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

export const showToast = (message, type = "success") => {
  if (typeof window === "undefined") return;

  const data =
    typeof message === "object"
      ? message
      : { message, type };

  window.dispatchEvent(
    new CustomEvent("toast", {
      detail: data,
    })
  );
};

export default Toast;