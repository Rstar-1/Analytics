import React, { forwardRef, memo } from "react";

const VERSION_CLASSES = {
  v0: "w-full",
  v1: "container mx-auto",
  v2: "container2",
  v3: "container3 mx-auto",
  v4: "p-10",
};

const Container = memo(
  forwardRef(
    (
      {
        children,
        version = "v4",
        className = "",
        style = {},
        as: Component = "section",
        ...props
      },
      ref
    ) => {
      const containerClass = VERSION_CLASSES[version] || "w-full";

      return (
        <Component ref={ref} style={style} {...props}>
          <div className={`${containerClass} ${className}`}>{children}</div>
        </Component>
      );
    }
  )
);

Container.displayName = "Container";

export default Container;
