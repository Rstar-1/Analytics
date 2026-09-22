import React, { memo, useState, useCallback, useMemo } from "react";
import FormBuilder from "../forms/FormBuilder";
import Button from "./Button";
import Icon from "./Icon";

export const MODAL_WIDTHS = {
  sm: "30%",
  md: "40%",
  lg: "50%",
  xl: "60%",
  full: "80%",
};

export const Modal = memo(
  ({
    isOpen: controlledIsOpen,
    onClose: controlledOnClose,
    trigger,
    title = "Modal Title",
    children,
    footer,
    size = "sm",
    closeOnOverlayClick = true,
    type = "modal",
    placement = "left",
    bodyHeight,
  }) => {
    const [localIsOpen, setLocalIsOpen] = useState(false);

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : localIsOpen;

    const handleClose = useCallback(() => {
      if (isControlled) {
        controlledOnClose?.();
      } else {
        setLocalIsOpen(false);
      }
    }, [isControlled, controlledOnClose]);

    const handleOpen = useCallback(() => {
      if (!isControlled) {
        setLocalIsOpen(true);
      }
    }, [isControlled]);

    const isSidebar = type === "sidebar";

    const wrapperClass = isSidebar
      ? "flex fixed top-0 left-0 w-full h-100 z-99"
      : "flex items-center justify-center fixed top-0 left-0 w-full h-100 z-99 overflow-hidden";

    const wrapperStyle = useMemo(
      () =>
        isSidebar
          ? {
              justifyContent: placement === "right" ? "flex-end" : "flex-start",
              alignItems: "stretch",
            }
          : undefined,
      [isSidebar, placement]
    );

    const cardClass = isSidebar
      ? `bg-white relative z-999 b-shadow border-ec p-0 overflow-auto h-100 sm-w-full ${
          placement === "right" ? "animate-sidebar-right" : "animate-sidebar-left"
        }`
      : "bg-white relative z-999 rounded-10 b-shadow border-ec p-0 overflow-auto animate-modal-scale sm-w-full";

    const sizeStyle = useMemo(
      () => ({
        width: MODAL_WIDTHS[size] || MODAL_WIDTHS.sm,
        maxWidth: "100%",
      }),
      [size]
    );

    return (
      <>
        {trigger &&
          React.cloneElement(trigger, {
            onClick: (e) => {
              trigger.props.onClick?.(e);
              handleOpen();
            },
          })}

        {isOpen && (
          <div className={wrapperClass} style={wrapperStyle}>
            <div
              onClick={closeOnOverlayClick ? handleClose : undefined}
              style={{
                backgroundColor: "rgba(15, 22, 35, 0.55)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
              className="absolute top-0 left-0 w-full h-full animate-backdrop"
            />

            <div className={cardClass} style={sizeStyle}>
              {/* Modal Header */}
              <div className="flex items-center justify-between bordb px-14 py-10 sticky top-0 left-0 bg-white z-99">
                <h3 className="mid-text font-500 text-dark">
                  {title}
                </h3>
                <Button
                  onClick={handleClose}
                  version="icon"
                  bg="light-danger"
                  color="danger"
                  className="center-div cursor-pointer border-0"
                  aria-label="Close modal"
                >
                  <Icon name="Close" width="20" height="20" />
                </Button>
              </div>

              {/* Modal Body */}
              <div
                className="overflow-auto w-full"
                style={
                  isSidebar
                    ? { height: "calc(100vh - 60px)" }
                    : {
                        height: bodyHeight || "auto",
                        maxHeight: bodyHeight ? undefined : "70vh",
                      }
                }
              >
                <div className="px-20 py-10">{children}</div>

                {/* Modal Footer */}
                {footer !== null && (
                  <div className="flex items-center justify-center gap-4 bordh p-14">
                    {footer && footer !== true ? (
                      footer
                    ) : (
                      <Button
                        onClick={handleClose}
                        bg="secondary"
                        color="white"
                        version="v0"
                      >
                        Close
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

Modal.displayName = "Modal";

export const CrudModal = memo(
  ({
    title = "Form Details",
    fields = [],
    onSubmit,
    children,
    size = "md",
    col,
    ...props
  }) => (
    <Modal title={title} footer={null} size={size} {...props}>
      {children || (
        <FormBuilder fields={fields} onSubmit={onSubmit} col={col} />
      )}
    </Modal>
  )
);

CrudModal.displayName = "CrudModal";

export const DeleteModal = memo(
  ({
    isOpen,
    onClose,
    onDelete,
    title = "Delete Confirmation",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    ...props
  }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = useCallback(async () => {
      if (!onDelete) return;
      setLoading(true);
      try {
        await onDelete();
        onClose?.();
      } catch (error) {
        console.error("Delete failed:", error);
      } finally {
        setLoading(false);
      }
    }, [onDelete, onClose]);

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        size="sm"
        footer={null}
        {...props}
      >
        <div className="text-center py-16">
          <div
            className="flex items-center justify-center rounded-full bg-light-danger text-danger mb-12 mx-auto"
            style={{ width: "56px", height: "56px" }}
          >
            <Icon name="Trash" width="26" height="26" strokeWidth="2" />
          </div>
          <h4 className="title-text font-bold text-dark">{title}</h4>
          <p className="mini-text text-gray mt-10">{message}</p>
          <div className="flex items-center gap-12 w-full mt-20 justify-center">
            <Button
              onClick={onClose}
              bg="tertiary"
              color="dark"
              version="v2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={loading}
              bg="danger"
              color="white"
              version="v2"
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);

DeleteModal.displayName = "DeleteModal";

export default Modal;