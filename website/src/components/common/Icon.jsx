import React from "react";

const Icon = React.memo(({ name, icon, className = "", width, height, strokeWidth, fill, stroke, ...props }) => {
    const defaultWidth = width || "14";
    const defaultHeight = height || "15";
    const defaultStrokeWidth = strokeWidth || "2";
    const iconName = name || icon;

    switch (iconName) {
        case "Home":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            );
        case "Grid":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
            );
        case "Management":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <line x1="4" y1="21" x2="4" y2="14"></line>
                    <line x1="4" y1="10" x2="4" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="3"></line>
                    <line x1="20" y1="21" x2="20" y2="16"></line>
                    <line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="1" y1="14" x2="7" y2="14"></line>
                    <line x1="9" y1="8" x2="15" y2="8"></line>
                    <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
            );
        case "GitHub":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
            );
        case "CMS":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="12" y1="3" x2="12" y2="21"></line>
                </svg>
            );
        case "AI":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                    <rect x="9" y="9" width="6" height="6"></rect>
                    <line x1="9" y1="1" x2="9" y2="4"></line>
                    <line x1="15" y1="1" x2="15" y2="4"></line>
                    <line x1="9" y1="20" x2="9" y2="23"></line>
                    <line x1="15" y1="20" x2="15" y2="23"></line>
                    <line x1="20" y1="9" x2="23" y2="9"></line>
                    <line x1="20" y1="14" x2="23" y2="14"></line>
                    <line x1="1" y1="9" x2="4" y2="9"></line>
                    <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
            );
        case "Meta":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
                </svg>
            );
        case "Json":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
            );
        case "Builder":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
            );
        case "Google Analytic":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
            );
        case "Task Manager":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <line x1="9" y1="9" x2="15" y2="9"></line>
                    <line x1="9" y1="13" x2="15" y2="13"></line>
                    <line x1="9" y1="17" x2="15" y2="17"></line>
                </svg>
            );
        case "Reviews":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            );
        case "Analytic":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
            );
        case "ChevronRight":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            );
        case "ChevronLeft":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            );
        case "ChevronDown":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            );
        case "ChevronsUpDown":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polyline points="7 15 12 20 17 15"></polyline>
                    <polyline points="7 9 12 4 17 9"></polyline>
                </svg>
            );
        case "Info":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            );
        case "Alert":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            );
        case "Filter":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
            );
        case "MoreVertical":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                </svg>
            );
        case "Users":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            );
        case "Customers":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            );
        case "Settings":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
            );
        case "Reports":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            );
        case "Sun":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            );
        case "Moon":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            );
        case "Help":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            );
        case "Logout":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
            );
        case "Lock":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
            );
        case "Unlock":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                </svg>
            );
        case "Star":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "currentColor"} className={`flex ${className}`} {...props}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
            );
        case "Search":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            );
        case "Loading":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} style={{ animation: "spin 1.2s linear infinite", ...props.style }} {...props}>
                    <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.1)" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--primary)" />
                </svg>
            );
        case "Edit":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            );
        case "Trash":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            );
        case "MapPin":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            );
        case "Shield":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 11 2 2 4-4" />
                </svg>
            );
        case "ShieldCheck":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 11 2 2 4-4" />
                </svg>
            );
        case "Grow":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="16" y1="11" x2="22" y2="11" />
                </svg>
            );
        case "Business":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
            );
        case "ArrowLeft":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
            );
        case "ArrowRight":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            );
        case "ArrowUpRight":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
            );
        case "ArrowUp":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
            );
        case "Google":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} className={`flex ${className}`} {...props}>
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
            );
        case "Trustpilot":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} className={`flex ${className}`} {...props}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={fill || "#00b67a"} />
                </svg>
            );
        case "Facebook":
            return (
                <svg viewBox="0 0 320 512" width={defaultWidth} height={defaultHeight} fill={fill || "#1877F2"} className={`flex ${className}`} {...props}>
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
            );
        case "FacebookCircle":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} fill={fill || "#1877F2"} className={`flex ${className}`} {...props}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            );
        case "YouTube":
            return (
                <svg viewBox="0 0 576 512" width={defaultWidth} height={defaultHeight} fill={fill || "#FF0000"} className={`flex ${className}`} {...props}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.583V175.185l142.739 81.205-142.739 81.276z" />
                </svg>
            );
        case "Instagram":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} fill={fill || "#E1306C"} className={`flex ${className}`} {...props}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
            );
        case "Check":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            );
        case "WhatsApp":
            return (
                <svg viewBox="0 0 16 16" width={defaultWidth} height={defaultHeight} fill={fill || "#16a34a"} className={`flex ${className}`} {...props}>
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
            );
        case "WhatsAppShare":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} fill={fill || "#16a34a"} className={`flex ${className}`} {...props}>
                    <path d="M12.031 7.247c-2.611 0-4.734 2.122-4.734 4.734 0 1.057.349 2.033.94 2.822l-1.002 2.997 3.078-.979c.749.52 1.655.827 2.632.827 2.612 0 4.735-2.122 4.735-4.735 0-2.611-2.123-4.734-4.649-4.734z" />
                </svg>
            );
        case "Twitter":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} fill={fill || "#1DA1F2"} className={`flex ${className}`} {...props}>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            );
        case "LinkedIn":
            return (
                <svg viewBox="0 0 448 512" width={defaultWidth} height={defaultHeight} fill={fill || "#0A66C2"} className={`flex ${className}`} {...props}>
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                </svg>
            );
        case "CopyLink":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
            );
        case "Heart":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            );
        case "Trending":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
            );
        case "Send":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            );
        case "LinkedInOutline":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                </svg>
            );
        case "TwitterOutline":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
            );
        case "Cart":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            );
        case "Bag":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
            );
        case "Percent":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <line x1="19" y1="5" x2="5" y2="19"></line>
                    <circle cx="6.5" cy="6.5" r="2.5"></circle>
                    <circle cx="17.5" cy="17.5" r="2.5"></circle>
                </svg>
            );
        case "Receipt":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"></path>
                    <line x1="8" y1="6" x2="16" y2="6"></line>
                    <line x1="8" y1="10" x2="16" y2="10"></line>
                    <line x1="8" y1="14" x2="12" y2="14"></line>
                </svg>
            );
        case "Mail":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            );
        case "Map":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                    <line x1="8" y1="2" x2="8" y2="18"></line>
                    <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
            );
        case "Clock":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            );
        case "Phone":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
            );
        case "Call":
            return (
                <svg viewBox="0 0 512 512" width={defaultWidth} height={defaultHeight} fill={fill || "currentColor"} className={`flex ${className}`} {...props}>
                    <path d="M493.4 401.5l-104-71.1c-11.3-7.7-26.5-6.3-36.3 3.5l-44.5 44.5c-61.9-31.5-112.5-82.1-144-144l44.5-44.5c9.8-9.8 11.2-25 3.5-36.3l-71.1-104c-8.5-12.4-25.1-16.6-38.6-9.9L24.8 77.2C10.1 84.6 0 100.1 0 117.2c0 217.6 177.2 394.8 394.8 394.8 17.1 0 32.6-10.1 40-24.8l38.2-77.9c6.7-13.5 2.5-30.1-9.9-38.6z" />
                </svg>
            );
        case "Support":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                </svg>
            );
        case "Payment":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
            );
        case "Refresh":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                </svg>
            );
        case "Clipboard":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <path d="M9 12l2 2 4-4"></path>
                </svg>
            );
        case "Box":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
            );
        case "Sheets":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="7" y1="7" x2="17" y2="7"></line>
                    <line x1="7" y1="12" x2="13" y2="12"></line>
                </svg>
            );
        case "Layers":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
            );
        case "GridDots":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "currentColor"} className={`flex ${className}`} {...props}>
                    <circle cx="5" cy="6" r="2" />
                    <circle cx="12" cy="6" r="2" />
                    <circle cx="19" cy="6" r="2" />
                    <circle cx="5" cy="18" r="2" />
                    <circle cx="12" cy="18" r="2" />
                    <circle cx="19" cy="18" r="2" />
                </svg>
            );
        case "Building":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                    <path d="M6 12H4a2 2 0 0 0-2 2v8h4"></path>
                    <path d="M18 9h2a2 2 0 0 1 2 2v11h-4"></path>
                    <path d="M10 6h4"></path>
                    <path d="M10 10h4"></path>
                    <path d="M10 14h4"></path>
                    <path d="M10 18h4"></path>
                </svg>
            );
        case "Media":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"></path>
                    <rect x="6" y="6" width="5" height="5"></rect>
                    <line x1="14" y1="6" x2="18" y2="6"></line>
                    <line x1="14" y1="10" x2="18" y2="10"></line>
                    <line x1="6" y1="15" x2="18" y2="15"></line>
                    <line x1="6" y1="18" x2="18" y2="18"></line>
                </svg>
            );
        case "Globe":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
            );
        case "Award":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
            );
        case "Curtain":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                    <line x1="15" y1="3" x2="15" y2="21" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                </svg>
            );
        case "Sheet":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                </svg>
            );
        case "Roll":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                </svg>
            );
        case "Film":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 12h18" />
                    <path d="M12 3v18" />
                    <circle cx="8" cy="8" r="1.5" />
                    <circle cx="16" cy="16" r="1.5" />
                </svg>
            );
        case "CurtainAlt":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                    <line x1="15" y1="3" x2="15" y2="21" />
                </svg>
            );
        case "ClearFilm":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <line x1="9" y1="4" x2="9" y2="20" />
                    <line x1="15" y1="4" x2="15" y2="20" />
                    <line x1="4" y1="9" x2="20" y2="9" />
                    <line x1="4" y1="15" x2="20" y2="15" />
                </svg>
            );
        case "Menu":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            );
        case "Close":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} className={`flex ${className}`} {...props}>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            );
        case "Feather":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                    <line x1="16" y1="8" x2="2" y2="22"></line>
                </svg>
            );
        case "Code":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
            );
        case "Rocket":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg>
            );
        case "Zap":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "currentColor"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
            );
        case "Video":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
            );
        case "Hangup":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} fill={fill || "currentColor"} className={`flex ${className}`} {...props}>
                    <path d="M12 9c-2.5 0-4.8.8-6.6 2.2l-2.1-2.1C5.8 7.3 8.7 6.3 12 6.3s6.2 1 8.7 2.8l-2.1 2.1C16.8 9.8 14.5 9 12 9z" />
                </svg>
            );
        case "Volume":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
            );
        case "Eye":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            );
        case "EyeOff":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
            );
        case "Calendar":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            );
        case "ExternalLink":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
            );
        case "Upload":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
            );
        case "File":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                </svg>
            );
        case "Plus":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            );
        case "Minus":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            );
        case "Bot":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M12 6V2" />
                    <path d="M9 2h6" />
                    <rect x="4" y="6" width="16" height="14" rx="3" />
                    <line x1="2" y1="13" x2="4" y2="13" />
                    <line x1="20" y1="13" x2="22" y2="13" />
                    <circle cx="9" cy="12" r="1.5" fill={stroke || "currentColor"} />
                    <circle cx="15" cy="12" r="1.5" fill={stroke || "currentColor"} />
                    <line x1="9" y1="16" x2="15" y2="16" />
                </svg>
            );
        case "Sparkles":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
                    <path d="m19 4-.7 2a1 1 0 0 1-.6.6L15.7 7.3l2 .7a1 1 0 0 1 .6.6l.7 2 .7-2a1 1 0 0 1 .6-.6l2-.7-2-.7a1 1 0 0 1-.6-.6Z" />
                </svg>
            );
        case "Battery":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
                    <line x1="22" x2="22" y1="11" y2="13" />
                </svg>
            );
        case "Screen":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M4 8V4h4" />
                    <path d="M20 8V4h-4" />
                    <path d="M4 16v4h4" />
                    <path d="M20 16v4h-4" />
                </svg>
            );
        case "Display":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke={stroke || "currentColor"} strokeWidth={defaultStrokeWidth} fill={fill || "none"} strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <polyline points="13 5 19 5 19 11" />
                    <polyline points="11 19 5 19 5 13" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
            );
        case "CaseGrid":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} fill={stroke || fill || "currentColor"} className={`flex ${className}`} {...props}>
                    <circle cx="8" cy="5" r="1.5" />
                    <circle cx="12" cy="5" r="1.5" />
                    <circle cx="16" cy="5" r="1.5" />
                    <circle cx="8" cy="9.5" r="1.5" />
                    <circle cx="12" cy="9.5" r="1.5" />
                    <circle cx="16" cy="9.5" r="1.5" />
                    <circle cx="8" cy="14.5" r="1.5" />
                    <circle cx="12" cy="14.5" r="1.5" />
                    <circle cx="16" cy="14.5" r="1.5" />
                    <circle cx="8" cy="19" r="1.5" />
                    <circle cx="12" cy="19" r="1.5" />
                    <circle cx="16" cy="19" r="1.5" />
                </svg>
            );
        default:
            return null;
    }
});

export const ALL_ICONS = [
    "Home", "Grid", "Management", "GitHub", "CMS", "AI", "Meta",
    "Json", "Builder", "Google Analytic", "Task Manager", "Reviews", "Analytic",
    "ChevronRight", "ChevronLeft", "ChevronDown", "ChevronsUpDown", "Info", "Alert", "Filter",
    "MoreVertical", "Users", "Customers", "Settings", "Reports", "Sun", "Moon", "Help",
    "Logout", "Lock", "Unlock", "Star", "Search", "Loading", "Edit", "Trash",
    "MapPin", "Shield", "ShieldCheck", "Grow", "Business", "ArrowLeft", "ArrowRight",
    "ArrowUpRight", "ArrowUp", "Google", "Trustpilot", "Facebook", "FacebookCircle",
    "YouTube", "Instagram", "Check", "WhatsApp", "WhatsAppShare",
    "Twitter", "LinkedIn", "CopyLink", "Heart", "Trending",
    "Send", "LinkedInOutline", "TwitterOutline", "Cart", "Bag",
    "Percent", "Receipt", "Mail", "Map", "Clock", "Phone", "Call",
    "Support", "Payment", "Refresh",
    "Clipboard", "Box", "Sheets", "Layers", "GridDots", "Building", "Media", "Globe",
    "Award", "Curtain", "Sheet", "Roll", "Film", "CurtainAlt", "ClearFilm", "Menu", "Close", "Feather",
    "Code", "Rocket", "Zap", "Video", "Hangup", "Volume",
    "Eye", "EyeOff", "Calendar", "ExternalLink", "Upload", "File", "Plus", "Minus", "Bot",
    "Sparkles", "Battery", "Screen", "Display",
    "CaseGrid"
];

export default Icon;
