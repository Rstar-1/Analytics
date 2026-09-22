import React, { useState, forwardRef, useCallback } from "react";

const isVideoSrc = (url) => {
  if (!url || typeof url !== "string") return false;
  return /\.(mp4|webm|ogg)($|\?|#)/i.test(url);
};

export const Image = React.memo(
  ({
    src,
    alt = "",
    fallback = "/images/fallback.webp",
    className = "",
    loading = "lazy",
    width,
    height,
    aspectRatio,
    style,
    decoding,
    preload = "metadata",
    ...props
  }) => {
    const [prevSrc, setPrevSrc] = useState(src);
    const [imgSrc, setImgSrc] = useState(src);

    if (src !== prevSrc) {
      setPrevSrc(src);
      setImgSrc(src);
    }

    const isEager =
      loading === "eager" ||
      props.fetchPriority === "high" ||
      props.fetchpriority === "high";

    const handleError = useCallback(() => {
      if (imgSrc !== fallback) {
        setImgSrc(fallback);
      }
    }, [imgSrc, fallback]);

    if (isVideoSrc(src)) {
      return (
        <video
          src={src}
          className={className}
          style={{
            aspectRatio,
            objectFit: "cover",
            width: width || "100%",
            height: height || "100%",
            ...style,
          }}
          autoPlay
          loop
          muted
          playsInline
          preload={preload}
          {...props}
        />
      );
    }

    return (
      <img
        src={imgSrc || fallback}
        alt={alt}
        loading={loading}
        decoding={decoding || (isEager ? "sync" : "async")}
        width={width}
        height={height}
        className={className}
        style={{
          aspectRatio,
          objectFit: aspectRatio ? "cover" : undefined,
          ...style,
        }}
        onError={handleError}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export const ImageDiv = React.memo(
  forwardRef(
    (
      {
        image,
        fallback = "/images/fallback.webp",
        children,
        className = "",
        innerClassName = "",
        overlay = false,
        overlayClass = "",
        innerRef,
        preload = "metadata",
        ...props
      },
      ref
    ) => {
      const [prevImage, setPrevImage] = useState(image);
      const [bgImage, setBgImage] = useState(image);

      if (image !== prevImage) {
        setPrevImage(image);
        setBgImage(image);
      }

      const isVideo = isVideoSrc(bgImage);

      return (
        <div
          ref={ref}
          className={`relative overflow-hidden ${className}`}
          {...props}
        >
          {isVideo ? (
            <video
              ref={innerRef}
              src={bgImage}
              className={`${innerClassName} absolute inset-0 w-full h-full object-cover`}
              style={{ zIndex: 0 }}
              autoPlay
              loop
              muted
              playsInline
              preload={preload}
            />
          ) : (
            <div
              ref={innerRef}
              className={innerClassName}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                background: `url(${bgImage || fallback}) center/cover no-repeat`,
              }}
            />
          )}
          {overlay && (
            <div
              className={overlayClass}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
              }}
            />
          )}
          <div className="relative z-20 h-full">{children}</div>
        </div>
      );
    }
  )
);

ImageDiv.displayName = "ImageDiv";

export default Image;