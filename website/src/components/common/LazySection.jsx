import { memo, useEffect, useMemo, useRef, useState } from 'react';

const LazySection = memo(
  ({
    children,
    className = "",
    placeholderHeight = 300,
    placeholder = null,
    rootMargin = "300px 0px",
    threshold = 0.01,
    once = true,
  }) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const placeholderStyle = useMemo(
      () => ({
        minHeight:
          typeof placeholderHeight === "number"
            ? `${placeholderHeight}px`
            : placeholderHeight,
      }),
      [placeholderHeight]
    );

    useEffect(() => {
      if (isVisible && once) return;

      if (
        typeof window === "undefined" ||
        !("IntersectionObserver" in window)
      ) {
        setIsVisible(true);
        return;
      }

      const element = containerRef.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        },
        {
          rootMargin,
          threshold,
        }
      );

      observer.observe(element);

      return () => observer.disconnect();
    }, [isVisible, once, rootMargin, threshold]);

    return (
      <div
        ref={containerRef}
        className={className}
        style={!isVisible ? placeholderStyle : undefined}
      >
        {isVisible ? children : placeholder}
      </div>
    );
  }
);

LazySection.displayName = "LazySection";

export default LazySection;