import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Icon from "../Icon";

const CIRCUMFERENCE = 40 * Math.PI;

const ScrollToTop = React.memo(() => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const total = scrollHeight - clientHeight;
      if (circleRef.current && total > 0) {
        circleRef.current.style.strokeDashoffset =
          CIRCUMFERENCE * (1 - scrollTop / total);
      }
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`scroll-to-top-btn flex items-center justify-center b-shadow z-99 border-0 cursor-pointer rounded-full bg-forth ${isVisible ? "visible" : ""
          }`}
        aria-label="Scroll to top"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(0.8)",
          pointerEvents: isVisible ? "all" : "none",
        }}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          style={{ transform: "rotate(-90deg)", overflow: "visible" }}
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#eef2f6"
            strokeWidth="2.5"
          />
          <circle
            ref={circleRef}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 10ms linear" }}
          />
        </svg>
        <div className="absolute">
          <Icon
            name="ArrowUp"
            width="18"
            height="18"
            strokeWidth="2.5"
            stroke="var(--primary)"
          />
        </div>
      </button>

      <style>{`
        .scroll-to-top-btn {
          position: fixed;
          bottom: 85px;
          right: 6px;
          width: 50px;
          height: 50px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .scroll-to-top-btn:hover {
          transform: scale(1.08) !important;
        }
      `}</style>
    </>
  );
});

ScrollToTop.displayName = "ScrollToTop";

export default ScrollToTop;