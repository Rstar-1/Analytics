const pad = (n) => String(n).padStart(2, "0");

export const parseDate = (input) => {
  if (!input) return null;
  if (input instanceof Date) return isNaN(input.getTime()) ? null : input;

  if (typeof input === "object") {
    if (input.$date !== undefined) return parseDate(input.$date);
    const s = input.seconds ?? input._seconds;
    if (typeof s === "number") {
      const ns = input.nanoseconds ?? input._nanoseconds ?? 0;
      return new Date(s * 1000 + Math.floor(ns / 1e6));
    }
  }

  if (typeof input === "number") {
    return new Date(input < 1e10 ? input * 1000 : input);
  }

  if (typeof input === "string") {
    const str = input.trim();
    if (!str) return null;
    const dmy = str.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
    const d = dmy ? new Date(dmy[3], dmy[2] - 1, dmy[1]) : new Date(str);
    return isNaN(d.getTime()) ? null : d;
  }

  return null;
};

export const isValidDate = (input) => parseDate(input) !== null;

const RELATIVE_UNITS = [
  [60, "second", 1],
  [3600, "minute", 60],
  [86400, "hour", 3600],
  [604800, "day", 86400],
  [2592000, "week", 604800],
  [31536000, "month", 2592000],
  [Infinity, "year", 31536000],
];

export const formatRelativeTime = (date, baseDate = new Date()) => {
  const d = parseDate(date);
  if (!d) return "";

  const diffSec = Math.round((d.getTime() - baseDate.getTime()) / 1000);
  if (Math.abs(diffSec) < 45)
    return diffSec <= 0 ? "just now" : "in a few seconds";

  const absSec = Math.abs(diffSec);
  for (const [max, unit, divisor] of RELATIVE_UNITS) {
    if (absSec < max) {
      const count = Math.round(diffSec / divisor);
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        count,
        unit,
      );
    }
  }
  return formatDate(d, "short");
};

export const timeAgo = formatRelativeTime;

const FORMAT_PRESETS = {
  short: { year: "numeric", month: "short", day: "numeric" },
  human: { year: "numeric", month: "long", day: "numeric" },
  long: { year: "numeric", month: "long", day: "numeric" },
  monthyear: { year: "numeric", month: "long" },
  "month-year": { year: "numeric", month: "long" },
  monthyearshort: { year: "numeric", month: "short" },
  daymonth: { day: "numeric", month: "short" },
  time: { hour: "2-digit", minute: "2-digit", hour12: true },
  time12: { hour: "2-digit", minute: "2-digit", hour12: true },
  time24: { hour: "2-digit", minute: "2-digit", hour12: false },
  datetime: {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  },
  full: {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  },
  "datetime-long": {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  },
};

export const formatDate = (date, format = "human", options = {}) => {
  const fallback = options?.fallback !== undefined ? options.fallback : "";
  const locale = options?.locale || "en-US";

  const d = parseDate(date);
  if (!d)
    return typeof date === "string" && date.trim() ? date.trim() : fallback;

  if (typeof format === "object" && format !== null) {
    try {
      return d.toLocaleString(locale, format);
    } catch {
      return fallback;
    }
  }

  const fmt = String(format).toLowerCase();
  if (fmt === "relative" || fmt === "ago") return formatRelativeTime(d);
  if (fmt === "iso") return d.toISOString();
  if (
    fmt === "dash" ||
    fmt === "input" ||
    fmt === "iso-date" ||
    fmt === "yyyy-mm-dd"
  ) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  if (fmt === "numeric" || fmt === "slash" || fmt === "dd/mm/yyyy") {
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  }
  if (fmt === "slash-us" || fmt === "mm/dd/yyyy") {
    return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`;
  }

  const preset = FORMAT_PRESETS[fmt] || FORMAT_PRESETS.human;
  return d.toLocaleString(locale, preset);
};

export const formatDateTime = (date, format = "datetime", options = {}) =>
  formatDate(date, format, options);
export const formatTime = (date, is24Hour = false, options = {}) =>
  formatDate(date, is24Hour ? "time24" : "time12", options);
export const toDateInputString = (date) => formatDate(date, "input");

export const getDateRangeString = (startDate, endDate, format = "short") =>
  [parseDate(startDate), parseDate(endDate)]
    .filter(Boolean)
    .map((d) => formatDate(d, format))
    .join(" – ");

export const isToday = (date) => {
  const d = parseDate(date);
  return !!d && d.toDateString() === new Date().toDateString();
};

export const isPast = (date) => {
  const d = parseDate(date);
  return d ? d.getTime() < Date.now() : false;
};

export const isFuture = (date) => {
  const d = parseDate(date);
  return d ? d.getTime() > Date.now() : false;
};

export const daysBetween = (d1, d2) => {
  const date1 = parseDate(d1);
  const date2 = parseDate(d2);
  if (!date1 || !date2) return 0;
  return Math.round(
    Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24),
  );
};

export default formatDate;
