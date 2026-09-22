import React, { useState, useEffect, useCallback, useMemo, useRef, useId } from "react";
import Icon from "./../common/Icon";
import {
  MONTH_NAMES,
  DAY_NAMES_MON,
  DAY_NAMES_SUN,
  pad,
  getOptLabel,
  getOptValue,
  normalizeVersion,
  getInputStyle,
  getBoxStyle,
  getDragDropStyle,
  getOtpBoxStyle,
  getQuantityStyle,
  SLIDER_STYLES,
} from "./fieldsStyles";

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - 15 + i);

const CalendarDropdown = React.memo(
  ({
    isRange = false,
    value,
    datepickerM,
    datepickerY,
    setDatepickerM,
    setDatepickerY,
    onChange,
    onClose,
  }) => {
    const fromDate = isRange ? value?.fromDate || "" : "";
    const toDate = isRange ? value?.toDate || "" : "";

    const firstDayIndex = new Date(datepickerY, datepickerM, 1).getDay();
    const adjustedIndex = isRange
      ? firstDayIndex === 0 ? 6 : firstDayIndex - 1
      : firstDayIndex;
    const totalDays = new Date(datepickerY, datepickerM + 1, 0).getDate();

    const days = useMemo(
      () => [
        ...Array(adjustedIndex).fill(""),
        ...Array.from({ length: totalDays }, (_, i) => i + 1),
      ],
      [adjustedIndex, totalDays]
    );

    const changeMonth = useCallback(
      (offset) => {
        const d = new Date(datepickerY, datepickerM + offset, 1);
        setDatepickerM(d.getMonth());
        setDatepickerY(d.getFullYear());
      },
      [datepickerY, datepickerM, setDatepickerM, setDatepickerY]
    );

    const handleDayClick = useCallback(
      (day) => {
        if (!day) return;
        const cellDate = `${datepickerY}-${pad(datepickerM + 1)}-${pad(day)}`;
        if (isRange) {
          if (!fromDate || (fromDate && toDate)) {
            onChange?.({ fromDate: cellDate, toDate: "" });
          } else if (new Date(cellDate) < new Date(fromDate)) {
            onChange?.({ fromDate: cellDate, toDate: "" });
          } else {
            onChange?.({ fromDate, toDate: cellDate });
            onClose();
          }
        } else {
          onChange?.(cellDate);
          onClose();
        }
      },
      [datepickerY, datepickerM, isRange, fromDate, toDate, onChange, onClose]
    );

    return (
      <div
        className="absolute z-10 mt-4 bg-white rounded-5 p-12 w-full text-center shadow-md border-ec"
        style={{ top: "100%", left: 0, boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
      >
        <div className="grid-cols-2 gap-3 mb-8">
          <select
            value={datepickerM}
            onChange={(e) => setDatepickerM(Number(e.target.value))}
            className="mini-text border-0 rounded px-2 py-2"
          >
            {MONTH_NAMES.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>
          <select
            value={datepickerY}
            onChange={(e) => setDatepickerY(Number(e.target.value))}
            className="mini-text border-0 rounded px-2 py-2"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="small-text text-gray font-500 cursor-pointer" onClick={() => changeMonth(-1)}>◀</div>
          <p className="mini-text text-dark font-500">{MONTH_NAMES[datepickerM]} {datepickerY}</p>
          <div className="small-text text-gray font-500 cursor-pointer" onClick={() => changeMonth(1)}>▶</div>
        </div>

        <div className="grid-cols-7 gap-4">
          {(isRange ? DAY_NAMES_MON : DAY_NAMES_SUN).map((d) => (
            <p className="mini-text text-dark font-500" key={d}>{d}</p>
          ))}

          {days.map((d, i) => {
            const cellDate = d ? `${datepickerY}-${pad(datepickerM + 1)}-${pad(d)}` : "";
            const isStart = isRange && fromDate && cellDate === fromDate;
            const isEnd = isRange && toDate && cellDate === toDate;
            const isInRange = isRange && d && fromDate && toDate && new Date(cellDate) > new Date(fromDate) && new Date(cellDate) < new Date(toDate);
            const isSelected = !isRange && d && value === cellDate;

            const bg = (isStart || isEnd || isSelected)
              ? "var(--secondary, #3b82f6)"
              : isInRange ? "rgba(99, 102, 241, 0.15)" : "transparent";

            const color = (isStart || isEnd || isSelected)
              ? "var(--white, #fff)"
              : d ? "var(--gray, #4b5563)" : "transparent";

            return (
              <p
                key={i}
                className={`mini-text font-500 flex items-center justify-center ${d ? "cursor-pointer" : ""}`}
                onClick={() => handleDayClick(d)}
                style={{ width: "100%", height: "36px", background: bg, color, borderRadius: 2 }}
              >
                {d}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
);
CalendarDropdown.displayName = "CalendarDropdown";

const OtpGroup = React.memo(
  ({ count = 6, value = "", onChange, otpRefs, version = "v1", error = false }) => {
    const [focusedIdx, setFocusedIdx] = useState(-1);
    const otpArray = useMemo(
      () => (typeof value === "string" ? value.split("").slice(0, count) : []),
      [value, count]
    );

    const handlePaste = useCallback(
      (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").trim().slice(0, count);
        if (/^\d+$/.test(pasted)) {
          onChange?.(pasted);
          const focusIndex = Math.min(pasted.length, count - 1);
          otpRefs.current[focusIndex]?.focus();
        }
      },
      [count, onChange, otpRefs]
    );

    const handleChange = useCallback(
      (e, index) => {
        const char = e.target.value.slice(-1);
        if (char && !/^\d+$/.test(char)) return;
        const newOtp = [...otpArray];
        newOtp[index] = char;
        onChange?.(newOtp.join(""));
        if (char && index < count - 1) {
          otpRefs.current[index + 1]?.focus();
        }
      },
      [count, otpArray, onChange, otpRefs]
    );

    const handleKeyDown = useCallback(
      (e, index) => {
        if (e.key === "Backspace") {
          const newOtp = [...otpArray];
          if (e.target.value) {
            newOtp[index] = "";
            onChange?.(newOtp.join(""));
          } else if (index > 0) {
            newOtp[index - 1] = "";
            onChange?.(newOtp.join(""));
            otpRefs.current[index - 1]?.focus();
          }
        }
      },
      [otpArray, onChange, otpRefs]
    );

    return (
      <div className="flex gap-10" style={{ padding: "4px 0" }}>
        {Array.from({ length: count }).map((_, index) => {
          const isFocused = focusedIdx === index;
          return (
            <input
              key={index}
              ref={(el) => {
                if (otpRefs?.current) otpRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={otpArray[index] || ""}
              onPaste={handlePaste}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => setFocusedIdx(index)}
              onBlur={() => setFocusedIdx(-1)}
              className="text-center font-600 mini-text"
              style={getOtpBoxStyle(version, isFocused, error)}
            />
          );
        })}
      </div>
    );
  }
);
OtpGroup.displayName = "OtpGroup";

const Fields = React.memo(
  ({
    type = "input",
    label,
    value,
    onChange,
    options = [],
    validation = {},
    length = 6,
    otpCount,
    border,
    position = "x",
    outline = true,
    style,
    className = "",
    wrapperClassName = "",
    fieldClassName = "",
    icon,
    iconPosition = "right",
    error: propError,
    version = "v1",
    ...props
  }) => {
    const [localError, setLocalError] = useState("");
    const error = propError !== undefined ? propError : localError;
    const [isFocused, setIsFocused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const fieldId = useId();
    const fieldRef = useRef(null);
    const otpRefs = useRef([]);
    const fileInputRef = useRef(null);

    const toggleOpen = useCallback(() => {
      setIsOpen((prev) => {
        const next = !prev;
        if (next && typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("field-dropdown-open", { detail: fieldId })
          );
        }
        return next;
      });
    }, [fieldId]);

    const parseDateVal = (val) => {
      const d = typeof val === "string" ? val : val?.fromDate || val?.toDate;
      const parsed = d ? new Date(d) : new Date();
      return isNaN(parsed.getTime()) ? new Date() : parsed;
    };

    const [datepickerM, setDatepickerM] = useState(() => parseDateVal(value).getMonth());
    const [datepickerY, setDatepickerY] = useState(() => parseDateVal(value).getFullYear());

    const [internalQty, setInternalQty] = useState(() => {
      if (value !== undefined && value !== null && value !== "") {
        const num = Number(value);
        return !isNaN(num) ? num : 1;
      }
      if (props.defaultValue !== undefined && props.defaultValue !== null && props.defaultValue !== "") {
        const num = Number(props.defaultValue);
        return !isNaN(num) ? num : 1;
      }
      return 1;
    });

    useEffect(() => {
      if (value !== undefined && value !== null && value !== "") {
        const num = Number(value);
        if (!isNaN(num)) setInternalQty(num);
      }
    }, [value]);

    useEffect(() => {
      if (!isOpen) return;
      const handleOutsideClick = (e) => {
        if (fieldRef.current && !fieldRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      const handleOtherOpen = (e) => {
        if (e.detail !== fieldId) setIsOpen(false);
      };

      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
      window.addEventListener("field-dropdown-open", handleOtherOpen);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("touchstart", handleOutsideClick);
        window.removeEventListener("field-dropdown-open", handleOtherOpen);
      };
    }, [isOpen, fieldId]);

    const validate = useCallback(
      (val) => {
        if (validation.required && !val) return "This field is required";
        if (validation.minLength && val?.length < validation.minLength) {
          return `Minimum ${validation.minLength} characters`;
        }
        if (validation.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          return "Invalid Email";
        }
        return "";
      },
      [validation.required, validation.minLength, validation.email]
    );

    const handleChange = useCallback(
      (e) => {
        const val = e?.target?.type === "checkbox" ? e.target.checked : e?.target?.value;
        setLocalError(validate(val));
        onChange?.(val);
      },
      [validate, onChange]
    );

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    const displayValue = useMemo(() => {
      const isMulti = type === "multiselect";
      if (isMulti) {
        if (!value || !value.length) return "Select";
        const labels = value.slice(0, 2).map((val) => {
          const opt = options.find((o) => getOptValue(o) === val);
          return opt ? getOptLabel(opt) : val;
        });
        return labels.join(", ") + (value.length > 2 ? ` +${value.length - 2}` : "");
      }
      const opt = options.find((o) => getOptValue(o) === value);
      return opt ? getOptLabel(opt) : value || "Select";
    }, [type, value, options]);

    const computedInputStyle = useMemo(
      () => getInputStyle(version, { error: Boolean(error), isFocused, outline, border }),
      [version, error, isFocused, outline, border]
    );

    const computedBoxStyle = useMemo(
      () => getBoxStyle(version, { error: Boolean(error), isFocused, isOpen, outline, border }),
      [version, error, isFocused, isOpen, outline, border]
    );

    const commonProps = useMemo(
      () => ({
        value: value !== undefined && value !== null ? value : "",
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        style: { ...computedInputStyle, ...style },
        "aria-label": props["aria-label"] || label || undefined,
        ...props,
      }),
      [value, handleChange, handleFocus, handleBlur, computedInputStyle, style, props, label]
    );

    const clsInput = `text-gray w-full mini-text ${className}`;
    const minQty = props.min !== undefined ? Number(props.min) : 1;
    const maxQty = props.max !== undefined ? Number(props.max) : Infinity;
    const stepQty = props.step !== undefined ? Math.max(1, Number(props.step)) : 1;
    const isQtyDisabled = Boolean(props.disabled);

    const handleQtyUpdate = useCallback(
      (nextVal) => {
        const clamped = Math.min(maxQty, Math.max(minQty, nextVal));
        setInternalQty(clamped);
        onChange?.(clamped);
      },
      [minQty, maxQty, onChange]
    );

    const handleQtyDecrement = useCallback(
      (e) => {
        e?.preventDefault?.();
        e?.stopPropagation?.();
        if (isQtyDisabled || internalQty <= minQty) return;
        handleQtyUpdate(internalQty - stepQty);
      },
      [isQtyDisabled, internalQty, minQty, stepQty, handleQtyUpdate]
    );

    const handleQtyIncrement = useCallback(
      (e) => {
        e?.preventDefault?.();
        e?.stopPropagation?.();
        if (isQtyDisabled || internalQty >= maxQty) return;
        handleQtyUpdate(internalQty + stepQty);
      },
      [isQtyDisabled, internalQty, maxQty, stepQty, handleQtyUpdate]
    );

    const renderField = () => {
      const isInput = ["text", "input", "number", "email", "tel"].includes(type);
      if (isInput) {
        const inputType = type === "input" ? "text" : type;
        const isLeft = iconPosition === "left";
        return icon ? (
          <div className="relative w-full flex items-center overflow-hidden">
            {isLeft && (
              <div className="absolute left-0 text-gray flex items-center pointer-events-none p-10 mx-2 rounded-5">
                <Icon name={icon} width="16" height="16" stroke="var(--gray)" />
              </div>
            )}
            <input
              type={inputType}
              {...commonProps}
              style={{
                ...commonProps.style,
                ...(isLeft ? { paddingLeft: "38px", textIndent: "0" } : { paddingRight: "38px" }),
              }}
              className={clsInput}
            />
            {!isLeft && (
              <div className="absolute right-0 text-gray flex items-center pointer-events-none p-10 mx-2 rounded-5">
                <Icon name={icon} width="16" height="16" stroke="var(--gray)" />
              </div>
            )}
          </div>
        ) : (
          <input type={inputType} {...commonProps} className={clsInput} />
        );
      }

      switch (type) {
        case "password": {
          const hasLeftIcon = icon && iconPosition === "left";
          return (
            <div className="relative w-full flex items-center overflow-hidden">
              {hasLeftIcon && (
                <div className="absolute left-0 text-gray flex items-center pointer-events-none p-10 mx-2 rounded-5">
                  <Icon name={icon} width="16" height="16" stroke="var(--gray)" />
                </div>
              )}
              <input
                type={showPassword ? "text" : "password"}
                {...commonProps}
                style={{
                  ...commonProps.style,
                  ...(hasLeftIcon ? { paddingLeft: "38px", textIndent: "0" } : {}),
                  paddingRight: "38px",
                  ...style,
                }}
                className={clsInput}
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-0 top-0 h-full flex items-center pr-14 cursor-pointer text-gray"
                style={{ background: "transparent" }}
              >
                <Icon name={showPassword ? "Eye" : "EyeOff"} width="15" height="15" />
              </div>
            </div>
          );
        }

        case "range-datepicker": {
          const fromDate = value?.fromDate || "";
          const toDate = value?.toDate || "";
          return (
            <div
              className={`dropdown-box ${className}`}
              style={{ ...computedBoxStyle, zIndex: isOpen ? 50 : 1, ...style }}
            >
              <div
                className="flex items-center justify-between h-full px-14 cursor-pointer"
                onClick={toggleOpen}
              >
                <div className="center-div">
                  <Icon name="Calendar" width="16" height="16" stroke="gray" className="cursor-pointer" />
                </div>
                <div className="mini-text text-gray font-500 w-40">
                  {fromDate ? fromDate.split("-").reverse().join(" / ") : "Start Date"}
                </div>
                <span className="mini-text text-gray w-10">➔</span>
                <div className="mini-text text-gray font-500 w-40">
                  {toDate ? toDate.split("-").reverse().join(" / ") : "End Date"}
                </div>
              </div>

              {isOpen && (
                <CalendarDropdown
                  isRange={true}
                  value={value}
                  datepickerM={datepickerM}
                  datepickerY={datepickerY}
                  setDatepickerM={setDatepickerM}
                  setDatepickerY={setDatepickerY}
                  onChange={onChange}
                  onClose={() => setIsOpen(false)}
                />
              )}
            </div>
          );
        }

        case "datepicker": {
          const dateStr = typeof value === "string" ? value : (value?.fromDate ? `${value.fromDate}${value?.toDate ? ` - ${value.toDate}` : ''}` : "");
          return (
            <div
              className={`dropdown-box ${className}`}
              style={{ ...computedBoxStyle, zIndex: isOpen ? 50 : 1, ...style }}
            >
              <div
                className="flex items-center justify-between h-full px-14 cursor-pointer"
                onClick={() => {
                  if (!isOpen && dateStr) {
                    const parsed = new Date(dateStr);
                    if (!isNaN(parsed.getTime())) {
                      setDatepickerM(parsed.getMonth());
                      setDatepickerY(parsed.getFullYear());
                    }
                  }
                  toggleOpen();
                }}
              >
                <p className="mini-text text-gray line-clamp1">{dateStr || "mm/dd/yyyy"}</p>
                <Icon name="Calendar" width="16" height="16" stroke="gray" className="cursor-pointer" />
              </div>

              {isOpen && (
                <CalendarDropdown
                  isRange={false}
                  value={dateStr}
                  datepickerM={datepickerM}
                  datepickerY={datepickerY}
                  setDatepickerM={setDatepickerM}
                  setDatepickerY={setDatepickerY}
                  onChange={onChange}
                  onClose={() => setIsOpen(false)}
                />
              )}
            </div>
          );
        }

        case "color": {
          const hexValue = value || "#339af0";
          return (
            <div
              className={`flex items-center gap-6 cursor-pointer h-input ${className}`}
              style={{ ...computedBoxStyle, ...style }}
            >
              <span className="rounded-full ml-10" style={{ width: "20px", height: "20px", backgroundColor: hexValue }} />
              <p className="mini-text text-gray uppercase font-500">{hexValue}</p>
              <input
                type="color"
                value={hexValue}
                onChange={handleChange}
                className="absolute top-0 left-0 w-full h-full cursor-pointer"
                style={{ opacity: 0 }}
                aria-label={label || "Color picker"}
              />
            </div>
          );
        }

        case "textarea": {
          const isV4 = normalizeVersion(version) === "v4";
          return (
            <textarea
              {...commonProps}
              style={{
                ...computedInputStyle,
                ...style,
                resize: "vertical",
                minHeight: "90px",
                padding: "10px 10px",
                textIndent: "0px",
                borderRadius: isV4 ? "0px" : (style?.borderRadius || "6px"),
              }}
            />
          );
        }

        case "checkbox": {
          if (!options || options.length === 0) {
            return (
              <div className="flex items-center gap-3 py-4">
                <input
                  type="checkbox"
                  checked={!!value}
                  onChange={(e) => onChange?.(e.target.checked)}
                  className="cursor-pointer"
                />
              </div>
            );
          }

          const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
          return (
            <div className={position === "y" ? "grid grid-cols-1 gap-12 py-4" : "flex items-center gap-12 py-4"}>
              {options.map((opt) => {
                const optLabel = getOptLabel(opt);
                const optVal = getOptValue(opt);
                const isChecked = selectedValues.includes(optVal);

                return (
                  <label key={optVal} className="flex items-center gap-3 cursor-pointer" style={{ userSelect: "none" }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        const nextValues = isChecked
                          ? selectedValues.filter((v) => v !== optVal)
                          : [...selectedValues, optVal];
                        onChange?.(nextValues);
                      }}
                    />
                    <p className="mini-text text-gray font-400">{optLabel}</p>
                  </label>
                );
              })}
            </div>
          );
        }

        case "radio": {
          if (!options || options.length === 0) {
            return (
              <div className="flex items-center gap-3 py-4">
                <input
                  type="radio"
                  checked={!!value}
                  onChange={(e) => onChange?.(e.target.checked)}
                  className="cursor-pointer"
                  style={{ width: "14px", height: "14px", accentColor: "var(--primary)" }}
                />
              </div>
            );
          }

          return (
            <div className={position === "y" ? "grid-cols-1 gap-12 py-4" : "flex items-center gap-12 py-4"}>
              {options.map((opt) => {
                const optLabel = getOptLabel(opt);
                const optVal = getOptValue(opt);
                return (
                  <label key={optVal} className="flex items-center gap-3 cursor-pointer" style={{ userSelect: "none" }}>
                    <input
                      type="radio"
                      checked={value === optVal}
                      onChange={() => onChange?.(optVal)}
                      className="cursor-pointer"
                      style={{ width: "14px", height: "14px", accentColor: "var(--primary)" }}
                    />
                    <p className="mini-text text-gray mt-2">{optLabel}</p>
                  </label>
                );
              })}
            </div>
          );
        }

        case "switch": {
          const isChecked = !!value;
          return (
            <div
              onClick={() => onChange?.(!isChecked)}
              className={`relative cursor-pointer rounded-20 ${isChecked ? "bg-success" : "bg-gray"}`}
              style={{
                display: "inline-block",
                width: "45px",
                height: "23px",
                transition: "background-color 0.2s ease-in-out",
                marginTop: "4px",
              }}
            >
              <span
                className="absolute bg-white rounded-full"
                style={{
                  top: "3px",
                  left: isChecked ? "25px" : "3px",
                  width: "17px",
                  height: "17px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                  transition: "left 0.2s ease-in-out",
                }}
              />
            </div>
          );
        }

        case "url":
          return (
            <div className="flex items-center w-full relative">
              <input
                type="url"
                {...commonProps}
                style={value ? { ...computedInputStyle, paddingRight: "40px", ...style } : { ...computedInputStyle, ...style }}
                className={clsInput}
              />
              {value && (
                <button
                  type="button"
                  onClick={() => {
                    let targetUrl = value;
                    if (!/^https?:\/\//i.test(targetUrl)) targetUrl = `https://${targetUrl}`;
                    window.open(targetUrl, "_blank");
                  }}
                  className="absolute flex items-center justify-center cursor-pointer border-0 rounded-5"
                  style={{
                    right: "10px",
                    background: "none",
                    color: "#6366f1",
                    padding: "6px",
                    transition: "all 0.15s ease-in-out",
                  }}
                  title="Open link in new tab"
                >
                  <Icon name="ExternalLink" width="18" height="18" stroke="currentColor" />
                </button>
              )}
            </div>
          );

        case "file": {
          const hasFile = value && value.length > 0;
          const fileName = hasFile ? value[0].name : "No file chosen";
          return (
            <div className={`cursor-pointer relative overflow-hidden ${className}`} style={{ ...computedBoxStyle, ...style }}>
              <div className="flex items-center justify-between px-12 h-full">
                <span className="mini-text text-gray">{fileName}</span>
                <div className="flex items-center gap-4 relative z-10">
                  {hasFile ? (
                    <p
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange?.(null);
                      }}
                      className="mini-text text-gray"
                    >
                      <Icon name="Close" width="16" height="16" stroke="var(--gray)" />
                    </p>
                  ) : (
                    <Icon name="Upload" width="16" height="16" stroke="var(--gray)" />
                  )}
                </div>
                <input
                  type="file"
                  onChange={(e) => onChange?.(e.target.files)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-0"
                  aria-label={label || "File upload"}
                />
              </div>
            </div>
          );
        }

        case "dragfile": {
          const handleDrag = (e, activeState) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(activeState);
          };

          return (
            <div
              onDragEnter={(e) => handleDrag(e, true)}
              onDragOver={(e) => handleDrag(e, true)}
              onDragLeave={(e) => handleDrag(e, false)}
              onDrop={(e) => {
                handleDrag(e, false);
                if (e.dataTransfer.files?.length) onChange?.([...e.dataTransfer.files]);
              }}
              onClick={() => fileInputRef.current?.click()}
              style={{ ...getDragDropStyle(isDragging), ...style }}
            >
              <div className="flex flex-column items-center" style={{ pointerEvents: "none" }}>
                <Icon name="Upload" width="36" height="36" stroke="currentColor" style={{ marginBottom: "10px", color: "#6366f1" }} />
                <p className="small-text font-600" style={{ margin: "0 0 6px 0" }}>Drag & Drop Files here</p>
                <p className="mini-text" style={{ margin: "0", color: "#6b7280" }}>
                  or <span style={{ textDecoration: "underline", color: "#6366f1" }}>click to browse</span> from file manager
                </p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={(e) => {
                  if (e.target.files?.length) onChange?.([...e.target.files]);
                }}
                style={{ display: "none" }}
                aria-label={label || "Drag and drop file upload"}
              />
              {value && Array.isArray(value) && value.length > 0 && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-column gap-8"
                  style={{ marginTop: "16px", textAlign: "left", pointerEvents: "auto" }}
                >
                  <div className="font-600" style={{ fontSize: "12px", color: "#4b5563" }}>
                    Selected Files ({value.length})
                  </div>
                  {value.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white mini-text"
                      style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", color: "#1f2937" }}
                    >
                      <div className="flex items-center gap-8" style={{ overflow: "hidden" }}>
                        <Icon name="File" width="16" height="16" stroke="currentColor" style={{ color: "#6b7280", flexShrink: 0 }} />
                        <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{file.name}</span>
                        <span style={{ color: "#9ca3af", fontSize: "11px", flexShrink: 0 }}>({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newFiles = [...value];
                          newFiles.splice(index, 1);
                          onChange?.(newFiles);
                        }}
                        className="flex items-center justify-center cursor-pointer border-0"
                        style={{ background: "none", color: "#9ca3af", padding: "4px", borderRadius: "4px" }}
                        title="Remove file"
                      >
                        <Icon name="Close" width="14" height="14" stroke="currentColor" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }

        case "select":
        case "multiselect": {
          const isMulti = type === "multiselect";
          return (
            <div className={`dropdown-box ${className}`} style={{ ...computedBoxStyle, zIndex: isOpen ? 50 : 1, ...style }}>
              <div className="flex items-center justify-between h-full px-14 cursor-pointer" onClick={toggleOpen}>
                <p className="mini-text text-gray line-clamp1">{displayValue}</p>
                {isMulti && value?.length ? (
                  <Icon
                    name="Close"
                    width="16"
                    height="16"
                    stroke="gray"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange?.([]);
                    }}
                  />
                ) : (
                  <Icon
                    name="ChevronDown"
                    width="16"
                    height="16"
                    stroke="gray"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "0.2s" }}
                  />
                )}
              </div>

              {isOpen && (
                <div
                  className="absolute z-10 mt-4 w-full bg-white rounded-5 overflow-auto border-ec"
                  style={{ maxHeight: 138, top: "100%", left: 0 }}
                >
                  {options.map((opt) => {
                    const optVal = getOptValue(opt);
                    const optLabel = getOptLabel(opt);
                    const isChecked = isMulti
                      ? Array.isArray(value) ? value.includes(optVal) : false
                      : value === optVal;

                    const handleSelect = () => {
                      setLocalError("");
                      if (isMulti) {
                        const currentValues = Array.isArray(value) ? value : value ? [value] : [];
                        const nextValues = currentValues.includes(optVal)
                          ? currentValues.filter((v) => v !== optVal)
                          : [...currentValues, optVal];
                        onChange?.(nextValues);
                      } else {
                        onChange?.(optVal);
                        setIsOpen(false);
                      }
                    };

                    return (
                      <div
                        key={optVal}
                        className="flex items-center gap-8 p-12 cursor-pointer mini-text text-gray bordb"
                        style={{ userSelect: "none", transition: "background-color 0.15s ease" }}
                        onClick={handleSelect}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f9fafb"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleSelect}
                          onClick={(e) => e.stopPropagation()}
                          className="cursor-pointer"
                        />
                        <span className="flex-1 cursor-pointer">{optLabel}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        case "quantity": {
          const qtyStyles = getQuantityStyle(version, { error: Boolean(error), isFocused });
          return (
            <div className={`${className || ""}`} style={{ ...qtyStyles.container, ...style }}>
              <button
                type="button"
                onClick={handleQtyDecrement}
                disabled={isQtyDisabled || internalQty <= minQty}
                style={{
                  ...qtyStyles.btn,
                  opacity: isQtyDisabled || internalQty <= minQty ? 0.5 : 1,
                  cursor: isQtyDisabled || internalQty <= minQty ? "not-allowed" : "pointer",
                }}
                aria-label="Decrease quantity"
              >
                <Icon name="Minus" width={qtyStyles.iconSize} height={qtyStyles.iconSize} stroke="currentColor" strokeWidth="3" />
              </button>

              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={internalQty}
                disabled={isQtyDisabled}
                onFocus={handleFocus}
                onBlur={(e) => {
                  handleBlur(e);
                  const num = Number(internalQty);
                  if (isNaN(num) || num < minQty) {
                    handleQtyUpdate(minQty);
                  } else if (num > maxQty) {
                    handleQtyUpdate(maxQty);
                  }
                }}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  if (raw === "") {
                    setInternalQty("");
                    onChange?.("");
                    return;
                  }
                  const num = parseInt(raw, 10);
                  if (!isNaN(num)) handleQtyUpdate(num);
                }}
                style={qtyStyles.input}
                aria-label="Quantity"
              />

              <button
                type="button"
                onClick={handleQtyIncrement}
                disabled={isQtyDisabled || internalQty >= maxQty}
                style={{
                  ...qtyStyles.btn,
                  opacity: isQtyDisabled || internalQty >= maxQty ? 0.5 : 1,
                  cursor: isQtyDisabled || internalQty >= maxQty ? "not-allowed" : "pointer",
                }}
                aria-label="Increase quantity"
              >
                <Icon name="Plus" width={qtyStyles.iconSize} height={qtyStyles.iconSize} stroke="currentColor" strokeWidth="3" />
              </button>
            </div>
          );
        }

        case "rating":
          return (
            <div className="flex items-center gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="cursor-pointer" onClick={() => !props.disabled && onChange?.(star)}>
                  <Icon
                    name="Star"
                    width="22"
                    height="22"
                    stroke={star <= value ? "var(--warning)" : "var(--tertiary)"}
                    fill={star <= value ? "var(--warning)" : "var(--tertiary)"}
                  />
                </div>
              ))}
            </div>
          );

        case "otp": {
          const count = otpCount || length || 6;
          return (
            <OtpGroup
              count={count}
              value={value}
              onChange={onChange}
              otpRefs={otpRefs}
              version={version}
              error={Boolean(error)}
            />
          );
        }

        case "slider":
        case "range": {
          const min = props.min !== undefined ? props.min : 0;
          const max = props.max !== undefined ? props.max : 100000;
          const step = props.step !== undefined ? props.step : 100;
          const val = typeof value === "number" ? value : Number(value) || max;
          const percentage = ((val - min) / (max - min)) * 100;
          const trackBg = `linear-gradient(to right, var(--primary, #1e40af) 0%, var(--primary, #1e40af) ${percentage}%, #f1f5f9 ${percentage}%, #f1f5f9 100%)`;

          return (
            <div className="py-4 w-full">
              <style>{SLIDER_STYLES}</style>
              <div className="flex justify-between items-center mb-4">
                <p className="mini-text text-gray font-400">₹{min}</p>
                <p className="mini-text text-primary font-600">Up to ₹{val.toLocaleString()}</p>
                <p className="mini-text text-gray font-400">₹{max.toLocaleString()}</p>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={val}
                onChange={(e) => onChange?.(Number(e.target.value))}
                className="custom-slider-input"
                style={{ background: trackBg }}
                aria-label={label || "Price range filter"}
              />
            </div>
          );
        }

        default:
          return null;
      }
    };

    if (type === "quantity" && !label && !error) {
      return renderField();
    }

    return (
      <div
        ref={fieldRef}
        className={`w-full grid-cols-1 ${wrapperClassName || fieldClassName || ""}`.trim()}
      >
        {label && <label className="mini-text font-500 text-gray mb-4 block">{label}</label>}
        {renderField()}
        {error && <small className="text-danger mt-2 mini-text">{error}</small>}
      </div>
    );
  }
);

Fields.displayName = "Fields";

export default Fields;