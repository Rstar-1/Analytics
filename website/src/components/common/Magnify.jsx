import React, { useRef, useState, useEffect, useCallback, useMemo, memo } from "react";

const ImageMagnifier = memo(({
  src,
  alt = "Magnified visual",
  width = "100%",
  height = "100%",
  zoomWidth = 320,
  zoomHeight = 320,
  zoomScale = 2.5,
  zoomPosition = "right",
  objectFit = "cover",
  borderRadius = "6px",
  className = "",
  imgClassName = "",
}) => {
  const imgRef = useRef(null);
  const [showZoom, setShowZoom] = useState(false);
  const [backgroundPos, setBackgroundPos] = useState("0% 0%");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMove = useCallback((e) => {
    if (!imgRef.current) return;
    const { left, top, width: imgW, height: imgH } = imgRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / imgW) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / imgH) * 100));
    setBackgroundPos(`${x}% ${y}%`);
  }, []);

  const handleMouseEnter = useCallback(() => setShowZoom(true), []);
  const handleMouseLeave = useCallback(() => setShowZoom(false), []);

  const zoomStyle = useMemo(() => {
    const base = {
      position: "absolute",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08)",
      backgroundColor: "#fff",
      backgroundImage: `url(${src})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${zoomScale * 100}%`,
      backgroundPosition: backgroundPos,
      zIndex: 50,
      pointerEvents: "none",
    };

    if (zoomPosition === "inside") {
      return { ...base, inset: 0, width: "100%", height: "100%", borderRadius };
    }
    if (zoomPosition === "left") {
      return { ...base, top: 0, right: "105%", width: `${zoomWidth}px`, height: `${zoomHeight}px` };
    }
    return { ...base, top: 0, left: "105%", width: `${zoomWidth}px`, height: `${zoomHeight}px` };
  }, [src, zoomScale, backgroundPos, zoomPosition, zoomWidth, zoomHeight, borderRadius]);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <div
        ref={imgRef}
        onMouseMove={handleMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          cursor: "crosshair",
          borderRadius,
        }}
        className="border-ec bg-white flex items-center justify-center relative"
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit,
          }}
          className={imgClassName}
        />
      </div>

      {showZoom && !isMobile && <div style={zoomStyle} />}
    </div>
  );
});

ImageMagnifier.displayName = "ImageMagnifier";

export { ImageMagnifier as Magnify };
export default ImageMagnifier;