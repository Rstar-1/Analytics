export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAY_NAMES_MON = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
export const DAY_NAMES_SUN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const pad = (n) => String(n).padStart(2, "0");
export const getOptLabel = (opt) =>
  opt && typeof opt === "object" ? opt.label : opt;
export const getOptValue = (opt) =>
  opt && typeof opt === "object" ? opt.value : opt;

export const normalizeVersion = (version) => {
  const v = String(version ?? "")
    .toLowerCase()
    .trim();
  switch (v) {
    case "0":
    case "v0":
      return "v0";
    case "2":
    case "v2":
      return "v2";
    case "3":
    case "v3":
      return "v3";
    case "4":
    case "v4":
      return "v4";
    default:
      return "v1";
  }
};

const resolveBorder = (val, def) => (typeof val === "string" ? val : def);

export const getInputStyle = (
  version = "v1",
  { error, isFocused, outline = true, border = false } = {},
) => {
  const normVer = normalizeVersion(version);
  const base = {
    height: "40px",
    padding: "0px",
    fontSize: "13px",
    outline: "none",
    textIndent: "14px",
    width: "100%",
  };

  switch (normVer) {
    case "v0": {
      const bColor = error
        ? "var(--danger)"
        : isFocused
          ? "var(--primary)"
          : border
            ? resolveBorder(border, "var(--border, #e2e8f0)")
            : outline
              ? "var(--border, #e2e8f0)"
              : "transparent";
      return {
        ...base,
        height: "32px",
        borderRadius: "4px",
        fontSize: "12px",
        border: `1px solid ${bColor}`,
        backgroundColor: isFocused ? "var(--white)" : "var(--forth)",
        color: "var(--dark)",
        transition: "all 0.2s ease",
      };
    }
    case "v2": {
      const bColor = error
        ? "var(--danger)"
        : isFocused
          ? "var(--primary)"
          : border
            ? resolveBorder(border, "var(--forth)")
            : outline
              ? "var(--forth)"
              : "transparent";
      return {
        ...base,
        borderRadius: "30px",
        border: `1px solid ${bColor}`,
        backgroundColor: isFocused ? "var(--white)" : "var(--forth)",
        color: "var(--dark)",
        transition: "all 0.2s ease",
      };
    }
    case "v3":
      return {
        ...base,
        borderRadius: "5px",
        border: `1px solid ${error ? "var(--danger)" : isFocused ? "var(--primary)" : "transparent"}`,
        backgroundColor: isFocused ? "var(--white)" : "var(--forth)",
        color: "var(--gray)",
        transition: "all 0.2s ease",
      };
    case "v4": {
      const bottomColor = error
        ? "var(--danger)"
        : isFocused
          ? "var(--primary)"
          : border
            ? resolveBorder(border, "var(--primary)")
            : outline
              ? "#94a3b8"
              : "#cbd5e1";
      return {
        ...base,
        borderRadius: "0px",
        border: "none",
        borderBottom: `2px solid ${bottomColor}`,
        backgroundColor: isFocused ? "var(--white)" : "transparent",
        color: "var(--dark)",
        textIndent: "4px",
        transition:
          "border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
      };
    }
    default:
      return {
        ...base,
        borderRadius: "8px",
        border: `1px solid ${error ? "var(--danger)" : isFocused ? "var(--secondary)" : outline ? "#ececec" : "var(--forth)"}`,
        backgroundColor: "var(--white)",
        color: "var(--gray)",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      };
  }
};

export const getBoxStyle = (
  version = "v1",
  { error, isFocused, isOpen, outline = true, border = false } = {},
) => {
  const normVer = normalizeVersion(version);
  const active = Boolean(isFocused || isOpen);
  const base = {
    height: "40px",
    position: "relative",
    width: "100%",
    outline: "none",
    transition: "all 0.2s ease",
  };

  switch (normVer) {
    case "v0": {
      const bColor = error
        ? "var(--danger)"
        : active
          ? "var(--primary)"
          : border
            ? resolveBorder(border, "var(--border, #e2e8f0)")
            : outline
              ? "var(--border, #e2e8f0)"
              : "transparent";
      return {
        ...base,
        height: "32px",
        borderRadius: "4px",
        fontSize: "12px",
        border: `1px solid ${bColor}`,
        backgroundColor: active ? "var(--white)" : "var(--forth)",
      };
    }
    case "v2": {
      const bColor = error
        ? "var(--danger)"
        : active
          ? "var(--primary)"
          : border
            ? resolveBorder(border, "var(--forth)")
            : outline
              ? "var(--forth)"
              : "transparent";
      return {
        ...base,
        borderRadius: "30px",
        border: `1px solid ${bColor}`,
        backgroundColor: active ? "var(--white)" : "var(--forth)",
      };
    }
    case "v3":
      return {
        ...base,
        borderRadius: "5px",
        border: `1px solid ${error ? "var(--danger)" : active ? "var(--primary)" : "transparent"}`,
        backgroundColor: active ? "var(--white)" : "var(--forth)",
      };
    case "v4": {
      const bottomColor = error
        ? "var(--danger)"
        : active
          ? "var(--primary)"
          : border
            ? resolveBorder(border, "var(--primary)")
            : outline
              ? "#94a3b8"
              : "#cbd5e1";
      return {
        ...base,
        borderRadius: "0px",
        border: "none",
        borderBottom: `2px solid ${bottomColor}`,
        backgroundColor: active ? "var(--white)" : "transparent",
        color: "var(--dark)",
        transition:
          "border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
      };
    }
    default:
      return {
        ...base,
        borderRadius: "8px",
        border: `1px solid ${error ? "var(--danger)" : active ? "var(--secondary)" : "var(--tertiary)"}`,
        backgroundColor: "var(--white)",
      };
  }
};

export const getDragDropStyle = (isDragging) => ({
  border: isDragging
    ? "1px solid var(--primary)"
    : "1px dashed var(--secondary)",
  backgroundColor: isDragging ? "#eef2ff" : "#f5f7ff",
  borderRadius: "12px",
  padding: "30px 20px",
  color: "var(--primary)",
  fontWeight: "500",
  textAlign: "center",
  cursor: "pointer",
  userSelect: "none",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  transform: isDragging ? "scale(1.01)" : "scale(1)",
  boxShadow: isDragging ? "0 4px 14px rgba(79, 70, 229, 0.18)" : "none",
});

export const getOtpBoxStyle = (
  versionOrFocused = "v1",
  isFocused = false,
  error = false,
) => {
  const focused =
    typeof versionOrFocused === "boolean" ? versionOrFocused : isFocused;
  const version =
    typeof versionOrFocused === "string" ? versionOrFocused : "v1";
  const normVer = normalizeVersion(version);

  const base = {
    outline: "none",
    textAlign: "center",
    fontWeight: "600",
    transition: "all 0.15s ease",
    boxShadow:
      focused && !error && normVer !== "v4"
        ? "0 0 0 3px rgba(30, 64, 175, 0.12)"
        : "none",
    transform: focused ? "translateY(-1px)" : "none",
  };

  switch (normVer) {
    case "v0":
      return {
        ...base,
        width: "32px",
        height: "32px",
        fontSize: "12px",
        borderRadius: "4px",
        border: `1px solid ${error ? "var(--danger)" : focused ? "var(--primary)" : "var(--border, #e2e8f0)"}`,
        backgroundColor: focused ? "var(--white)" : "var(--forth)",
        color: "var(--dark)",
      };
    case "v2":
      return {
        ...base,
        width: "42px",
        height: "42px",
        fontSize: "14px",
        borderRadius: "50%",
        border: `1px solid ${error ? "var(--danger)" : focused ? "var(--primary)" : "var(--forth)"}`,
        backgroundColor: focused ? "var(--white)" : "var(--forth)",
        color: "var(--dark)",
      };
    case "v3":
      return {
        ...base,
        width: "42px",
        height: "42px",
        fontSize: "14px",
        borderRadius: "5px",
        border: `1px solid ${error ? "var(--danger)" : focused ? "var(--primary)" : "transparent"}`,
        backgroundColor: focused ? "var(--white)" : "var(--forth)",
        color: "var(--dark)",
      };
    case "v4":
      return {
        ...base,
        width: "42px",
        height: "42px",
        fontSize: "14px",
        borderRadius: "0px",
        border: "none",
        borderBottom: `2px solid ${error ? "var(--danger)" : focused ? "var(--primary)" : "#94a3b8"}`,
        backgroundColor: focused ? "var(--white)" : "transparent",
        color: "var(--dark)",
      };
    default:
      return {
        ...base,
        width: "42px",
        height: "42px",
        fontSize: "14px",
        borderRadius: "8px",
        border: `1px solid ${error ? "var(--danger)" : focused ? "var(--primary)" : "var(--forth, #e2e8f0)"}`,
        backgroundColor: "var(--white)",
        color: "var(--dark)",
      };
  }
};

export const getQuantityStyle = (version = "v1", { error, isFocused } = {}) => {
  const normVer = normalizeVersion(version);
  const baseContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "130px",
    transition: "all 0.2s ease",
  };
  const baseBtn = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    flexShrink: 0,
    backgroundColor: "var(--primary)",
    color: "#ffffff",
    transition:
      "background-color 0.15s ease, opacity 0.15s ease, transform 0.1s ease",
  };
  const baseInput = {
    outline: "none",
    background: "transparent",
    width: "100%",
    minWidth: "0",
    textAlign: "center",
    fontWeight: "600",
    border: "none",
    fontSize: "13px",
    color: "var(--dark)",
  };

  switch (normVer) {
    case "v0":
      return {
        container: {
          ...baseContainer,
          height: "32px",
          width: "115px",
          borderRadius: "4px",
          border: `1px solid ${error ? "var(--danger)" : isFocused ? "var(--primary)" : "var(--border, #e2e8f0)"}`,
          backgroundColor: isFocused ? "var(--white)" : "var(--forth)",
          padding: "0 4px",
        },
        btn: { ...baseBtn, width: "24px", height: "24px", borderRadius: "3px" },
        input: { ...baseInput, fontSize: "12px" },
        iconSize: 12,
      };
    case "v2":
      return {
        container: {
          ...baseContainer,
          height: "40px",
          borderRadius: "30px",
          border: `1px solid ${error ? "var(--danger)" : isFocused ? "var(--primary)" : "var(--forth)"}`,
          backgroundColor: isFocused ? "var(--white)" : "var(--forth)",
          padding: "0 5px",
        },
        btn: { ...baseBtn, width: "30px", height: "30px", borderRadius: "50%" },
        input: baseInput,
        iconSize: 14,
      };
    case "v3":
      return {
        container: {
          ...baseContainer,
          height: "40px",
          borderRadius: "5px",
          border: `1px solid ${error ? "var(--danger)" : isFocused ? "var(--primary)" : "transparent"}`,
          backgroundColor: isFocused ? "var(--white)" : "var(--forth)",
          padding: "0 5px",
        },
        btn: { ...baseBtn, width: "28px", height: "28px", borderRadius: "5px" },
        input: baseInput,
        iconSize: 14,
      };
    case "v4":
      return {
        container: {
          ...baseContainer,
          height: "40px",
          borderRadius: "0px",
          border: "none",
          borderBottom: `2px solid ${error ? "var(--danger)" : isFocused ? "var(--primary)" : "#94a3b8"}`,
          backgroundColor: isFocused ? "var(--white)" : "transparent",
          padding: "0 4px",
        },
        btn: { ...baseBtn, width: "28px", height: "28px", borderRadius: "0px" },
        input: baseInput,
        iconSize: 14,
      };
    default:
      return {
        container: {
          ...baseContainer,
          height: "40px",
          borderRadius: "8px",
          border: `1px solid ${error ? "var(--danger)" : isFocused ? "var(--secondary, #10b981)" : "var(--tertiary, #ececec)"}`,
          backgroundColor: "var(--white)",
          padding: "0 5px",
        },
        btn: { ...baseBtn, width: "28px", height: "28px", borderRadius: "5px" },
        input: baseInput,
        iconSize: 14,
      };
  }
};

export const SLIDER_STYLES = `
  .custom-slider-input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 9999px;
    outline: none;
    transition: background 0.1s ease;
  }
  .custom-slider-input::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    border-radius: 9999px;
    background: transparent;
  }
  .custom-slider-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--primary, #1e40af);
    border: 2.5px solid #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-top: -6px;
    transition: transform 0.15s ease, background-color 0.15s ease;
  }
  .custom-slider-input::-webkit-slider-thumb:hover { transform: scale(1.15); }
  .custom-slider-input::-webkit-slider-thumb:active { transform: scale(0.95); }
  .custom-slider-input::-moz-range-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    border-radius: 9999px;
    background: transparent;
  }
  .custom-slider-input::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--primary, #1e40af);
    border: 2.5px solid #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.15s ease;
  }
  .custom-slider-input::-moz-range-thumb:hover { transform: scale(1.15); }
`;
